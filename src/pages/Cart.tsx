import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  addToOrder,
} from "../subapase/SupabaseCart";
import type { CartItem } from "../subapase/SupabaseCart";
import Swal from "sweetalert2";

// Time ago utility
function timeAgo(dateString: string) {
  const now = new Date();
  const past = new Date(dateString);
  const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return `${Math.floor(diff / 86400)} day(s) ago`;
}

export default function Cart() {
  const queryClient = useQueryClient();

  const { data: cart = [], isLoading } = useQuery<CartItem[]>({
    queryKey: ["cart-items"],
    queryFn: getCartItems,
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = async (item: CartItem, delta: number) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) {
      await removeFromCart(item.id);
      queryClient.setQueryData<CartItem[]>(["cart-items"], old =>
        old?.filter(i => i.id !== item.id)
      );
    } else {
      await updateQuantity(item.id, newQuantity);
      queryClient.setQueryData<CartItem[]>(["cart-items"], old =>
        old?.map(i => (i.id === item.id ? { ...i, quantity: newQuantity } : i))
      );
    }
  };

  const handleClearCart = async () => {
    await clearCart();
    queryClient.setQueryData(["cart-items"], []);
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    try {
      await addToOrder(cart, total);
      await clearCart();
      queryClient.setQueryData(["cart-items"], []);
      Swal.fire({
        icon: "success",
        title: "Order placed successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed to place order.",
        showConfirmButton: true,
      });
    }
  };

  if (isLoading)
    return <p className="text-center mt-30  lg:mt-20  text-lg ">Loading your cart...</p>;
  if (cart.length === 0)
    return (
      <h2 className="text-center text-xl mt-30  lg:mt-20  font-semibold ">
        Your cart is empty 🛒
      </h2>
    );

  return (
    <div className="container max-w-5xl mx-auto mt-30  lg:mt-20 px-4 py-8 sm:py-12">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-900">
        Your Shopping Cart
      </h2>

      <div className="space-y-4 sm:space-y-6">
        {cart.map(item => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6 transition-shadow hover:shadow-lg"
          >
            {/* Product Info */}
            <div className="flex items-center gap-4 flex-1">
              <img
                src={item.product_image || "/placeholder.webp"}
                alt={item.product_name || item.product_id}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md border border-gray-200"
              />
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-base sm:text-lg text-gray-900">{item.product_name}</p>
                <p className="text-gray-600 text-xs sm:text-sm">
                  <span className="font-medium">Color:</span> {item.color_name}
                </p>
                <p className="text-gray-600 text-xs sm:text-sm">
                  <span className="font-medium">Size:</span> {item.size}
                </p>
                <p className="text-gray-500 text-xs">{timeAgo(item.created_at)}</p>
              </div>
            </div>

            {/* Quantity & Price */}
            <div className="flex flex-row items-center justify-between w-full sm:w-auto sm:flex-col sm:items-end gap-4 sm:gap-2 mt-4 sm:mt-0">
              {/* Quantity Controls */}
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => handleQuantityChange(item, -1)}
                  className="px-3 py-2 text-gray-700 hover:bg-gray-100 transition text-sm sm:px-4 sm:py-2"
                >
                  -
                </button>
                <span className="px-4 py-2 text-gray-800 font-medium border-x border-gray-300 text-sm sm:px-6">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item, 1)}
                  className="px-3 py-2 text-gray-700 hover:bg-gray-100 transition text-sm sm:px-4 sm:py-2"
                >
                  +
                </button>
              </div>

              {/* Price & Remove */}
              <div className="flex flex-col items-end gap-1 sm:gap-2">
                <p className="text-base sm:text-lg font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => handleQuantityChange(item, -item.quantity)}
                  className="text-red-600 hover:text-red-700 text-xs sm:text-sm font-medium transition"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total and Actions */}
      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Total: ${total.toFixed(2)}</h3>
        <div className="flex gap-3 sm:gap-4 flex-col sm:flex-row">
          <button
            onClick={handleClearCart}
            className="bg-red-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md hover:bg-red-700 transition font-medium text-sm sm:text-base"
          >
            Clear Cart
          </button>
          <button
            onClick={handlePlaceOrder}
            className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md hover:bg-blue-700 transition font-medium text-sm sm:text-base"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
