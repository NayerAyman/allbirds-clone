import { supabase } from "./SubapaseAPI";

/* ================= TYPES ================= */

export type CartItem = {
  id: string;
  user_id: string;
  product_id: string;
  product_name: string;   // new
  product_image: string;  // new
  color_name: string;
  size: number;
  quantity: number;
  price: number;
  created_at: string;
};

export type OrderItem = {
  product_id: string;
  product_name: string;
  product_image: string;
  color_name: string;
  size: number;
  quantity: number;
  price: number;
};

export type Order = {
  id: number;
  user_id: string;
  total_price: number;
  created_at: string;
  order_items: OrderItem[];
};

/* ================= GET CART ================= */

export async function getCartItems(): Promise<CartItem[]> {
  const { data, error } = await supabase
    .from("cart_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

/* ================= ADD TO CART (SMART) ================= */

type AddToCartInput = {
  product_id: string;
  product_name: string;      // new
  product_image: string;     // new
  color_name: string;
  size: number | string;
  price: number;
};

export async function addToCart({
  product_id,
  product_name,
  product_image,
  color_name,
  size,
  price,
}: AddToCartInput): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not logged in");

  const sizeNumber = Number(size);

  let existingItem;
  try {
    const { data, error } = await supabase
      .from("cart_items")
      .select("id, quantity")
      .eq("user_id", user.id)
      .eq("product_id", product_id)
      .eq("color_name", color_name)
      .eq("size", sizeNumber)
      .maybeSingle();

    if (error && error.code !== "PGRST116") throw error;
    existingItem = data;
  } catch (err) {
    console.error("Error checking existing cart item:", err);
    existingItem = null;
  }

  if (existingItem) {
    await supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + 1 })
      .eq("id", existingItem.id);
    return;
  }

  await supabase.from("cart_items").insert({
    user_id: user.id,
    product_id,
    product_name,
    product_image,
    color_name,
    size: sizeNumber,
    price,
    quantity: 1,
  });
}

/* ================= UPDATE QUANTITY ================= */

export async function updateQuantity(
  cartItemId: string,
  quantity: number
): Promise<void> {
  if (quantity <= 0) {
    await removeFromCart(cartItemId);
    return;
  }

  const { error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", cartItemId);

  if (error) throw error;
}

/* ================= REMOVE ITEM ================= */

export async function removeFromCart(cartItemId: string): Promise<void> {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartItemId);

  if (error) throw error;
}

/* ================= CLEAR CART ================= */

export async function clearCart(): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", user.id);

  if (error) throw error;
}

/* ================= ADD TO ORDER ================= */

export async function addToOrder(cart: CartItem[], total: number) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not logged in");
  if (cart.length === 0) return;

  // 1️⃣ Insert order
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      total_price: total,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (orderError || !orderData) throw orderError || new Error("Failed to create order");

  const orderId = orderData.id;

  // 2️⃣ Insert order items
  const orderItems = cart.map(item => ({
    order_id: orderId,
    product_id: item.product_id,
    product_name: item.product_name,
    product_image: item.product_image,
    color_name: item.color_name,
    size: item.size,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw itemsError;

  return orderData;
}

/* ================= GET ORDER HISTORY ================= */

export async function getOrderHistory(): Promise<Order[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      user_id,
      total_price,
      created_at,
      order_items (
        product_id,
        product_name,
        product_image,
        color_name,
        size,
        quantity,
        price
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}
