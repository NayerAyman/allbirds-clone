import { supabase } from "./SubapaseAPI"
export async function getAllProducts(gender?: 'men' | 'women') {
  let query = supabase
    .from('products')
    .select(`
      id,
      name,
      sizes,
      gender,
      product_colors (
        color_name,
        hex,
        price,
        sale_price,
        product_images (
          image
        )
      )
    `);

  // إضافة فلتر على الجنس إذا تم تمريره
  if (gender) {
    query = query.eq('gender', gender);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  console.log('Products with colors and images:', data);
  return data;
}
