// // import { supabase } from "./subapase/SubapaseAPI";

// import { supabase } from "./subapase/SubapaseAPI";


// // /* =======================
// //    TYPES
// // ======================= */

// interface Color {
//   colorName: string;
//   hex: string;
//   price: number;
//   salePrice: number | null;
//   images: string;
// }

// export interface Product {
//   name: string;
//   sizes: number[];
//   colors: Color[];
// }





// export const menShoes:Product[] = [
//   {    name: "Men's Canvas Piper",
//     sizes: [39, 40, 41, 42, 43, 44, 45, 46],
//     colors: [
//       {
//         colorName: "black",
//         hex: "#000000",
//         price: 120,
//         salePrice: null,
//         images:
//           "/shoes/men/Men's Canvas Piper/A10643_24Q2_Canvas-Piper-2-Natural-Black-Natural-Black-Natural-Black_PDP_LEFT__1.webp",
//       },
//       {
//         colorName: "blue",
//         hex: "#040a54",
//         price: 120,
//         salePrice: null,
//         images:
//           "/shoes/men/Men's Canvas Piper/A10800_24Q2_Canvas-Piper-2-Deep-Navy-Blizzard_PDP_LEFT__1_d87a979e-8165-44ac-a29e-149aa87897c4.webp",
//       },
//       {
//         colorName: "white & creem",
//         hex: "#faedc6",
//         price: 120,
//         salePrice: null,
//         images:
//           "/shoes/men/Men's Canvas Piper/A11505_25Q2_Canvas_Piper_Blizzard_Bark_Brown_PDP_LEFT-2000x2000_39e3beff-5163-4a8e-bc1c-001232adde5c.webp",
//       },
//       {
//         colorName: "white",
//         hex: "#fff",
//         price: 120,
//         salePrice: null,
//         images:
//           "/shoes/men/Men's Canvas Piper/A11516_25Q1_Canvas_Piper_Natural_White_Hanami_Night_Blizzard_PDP_LEFT-2000x2000.webp",
//       },
//     ],
//   },

//   {    name: "Men's Tree Runner",
//     sizes: [39, 40, 41, 42, 43, 44, 45, 46],
//     colors: [
//       { colorName: "creem", hex: "#eeebcb", price: 105, salePrice: 85, images: "/shoes/men/Men's Tree Runner/TR2MWHE_SHOE_LEFT_GLOBAL_MENS_TREE_RUNNER_WHEAT_DARK_BEIGE.webp" },
//       { colorName: "black", hex: "#000000", price: 105, salePrice: 85, images: "/shoes/men/Men's Tree Runner/TR3MJBK080_SHOE_LEFT_GLOBAL_MENS_TREE_RUNNER_JET_BLACK_BLACK.webp" },
//       { colorName: "black & white", hex: "#444444", price: 105, salePrice: 85, images: "/shoes/men/Men's Tree Runner/TR3MJBW080_SHOE_LEFT_GLOBAL_MENS_TREE_RUNNER_JET_BLACK_WHITE.webp" },
//       { colorName: "white", hex: "#f5f5f5", price: 105, salePrice: 85, images: "/shoes/men/Men's Tree Runner/TR3MKWW_SHOE_LEFT_GLOBAL_MENS_TREE_RUNNER_KAIKOURA_WHITE_WHITE_f54746ea-c9a5-45dc-907c-90ddc0ae6ecf.webp" },
//     ],
//   },

//   {    name: "Men's Wool Cruiser Slip On",
//     sizes: [39, 40, 41, 42, 43, 44, 45, 46],
//     colors: [
//       { colorName: "dark - gray", hex: "#3d3d3d", price: 115, salePrice: null, images: "/shoes/men/Men's Wool Cruiser Slip On/A11636_25Q3_Wool-Cruiser-Slip-On-Dark-Grey-Light-Grey-Sole_PDP_LEFT__1.webp" },
//       { colorName: "blue", hex: "#161c36", price: 115, salePrice: null, images: "/shoes/men/Men's Wool Cruiser Slip On/A11643_25Q4_Wool-Cruiser-Slip-On-Dark-Navy-Blizzard-Sole_PDP_LEFT.webp" },
//       { colorName: "gray", hex: "#aeaeae", price: 115, salePrice: null, images: "/shoes/men/Men's Wool Cruiser Slip On/A11717_25Q3_Wool_Cruiser_Slip_On_Medium_Grey_Blizzard_Sole_PDP_LEFT.webp" },
//       { colorName: "white", hex: "#fff", price: 115, salePrice: null, images: "/shoes/men/Men's Wool Cruiser Slip On/A11823_25Q3_Wool_Cruiser_Slip_On_Natural_White_Natural_White_Sole_PDP_LEFT.webp" },
//     ],
//   },

//   {    name: "Men's Wool Cruiser Waterproof",
//     sizes: [39, 40, 41, 42, 43, 44, 45, 46],
//     colors: [
//       { colorName: "gray", hex: "#969696", price: 145, salePrice: null, images: "/shoes/men/Men's Wool Cruiser Waterproof/A11660_25Q3_Wool-Cruiser-Waterproof-Dark-Grey-Light-Grey-Sole_PDP_LEFT.webp" },
//       { colorName: "black", hex: "#000000", price: 145, salePrice: null, images: "/shoes/men/Men's Wool Cruiser Waterproof/A11788_25Q3_Wool-Cruiser-Waterproof-Natural-Black-Natural-Black-Sole_PDP_LEFT.webp" },
//       { colorName: "black & white", hex: "#272727", price: 145, salePrice: null, images: "/shoes/men/Men's Wool Cruiser Waterproof/A11806_25Q3_Wool-Cruiser-Waterproof-Natural-Black-Natural-White-Sole_PDP_LEFT.webp" },
//       { colorName: "creem", hex: "#f1edbd", price: 145, salePrice: null, images: "/shoes/men/Men's Wool Cruiser Waterproof/A11867_25Q3_Wool-Cruiser-Waterproof-Stony-Cream-Rugged-Beige-Stony-Cream-Sole_PDP_LEFT.webp" },
//     ],
//   },

//   {    name: "Men's Wool Runner NZ",
//     sizes: [39, 40, 41, 42, 43, 44, 45, 46],
//     colors: [
//       { colorName: "black ", hex: "#141414", price: 135, salePrice: 100, images: "/shoes/men/Men's Wool Runner NZ/A12005_25Q3_Wool-Runner-NZ-Dark-Jungle-Stony-Cream-Sole_PDP_LEFT.webp" },
//       { colorName: "blue", hex: "#0b1a31", price: 135, salePrice: 100, images: "/shoes/men/Men's Wool Runner NZ/A12011_25Q3_Wool_Runner_NZ_Dark_Navy_Blizzard_Sole_PDP_LEFT.webp" },
//       { colorName: "dark - gray", hex: "#4c4c4c", price: 135, salePrice: 100, images: "/shoes/men/Men's Wool Runner NZ/A12012_25Q3_Wool-Runner-NZ-Dark-Grey-Light-Grey-Sole_PDP_LEFT__1.webp" },
//       { colorName: "gray", hex: "#aeaeae", price: 135, salePrice: 100, images: "/shoes/men/Men's Wool Runner NZ/A12017_25Q3_Wool_Runner_NZ_Medium_Grey_Blizzard_Sole_PDP_LEFT.webp" },
//     ],
//   },

//   {    name: "Men's Wool Runner NZ Mid Waterproof",
//     sizes: [39, 40, 41, 42, 43, 44, 45, 46],
//     colors: [
//       { colorName: "gray", hex: "#5b5b5b", price: 165, salePrice: null, images: "/shoes/men/Men's Wool Runner NZ Mid Waterproof/A12008_25Q3_Wool-Runner-NZ-Mid-Waterproof-Dark-Jungle-Dark-Jungle-Sole_PDP_LEFT.webp" },
//       { colorName: "dark - blue", hex: "#121638", price: 165, salePrice: null, images: "/shoes/men/Men's Wool Runner NZ Mid Waterproof/A12026_25Q4_Wool-Runner-NZ-Mid-Waterproof-Natural-Black-Royal-Blue-Barely-Grey-Sole_PDP_LEFT.webp" },
//       { colorName: "blak", hex: "#000000", price: 165, salePrice: null, images: "/shoes/men/Men's Wool Runner NZ Mid Waterproof/A12032_25Q3_Wool-Runner-NZ-Mid-Waterproof-Natural-Black-Natural-Black-Sole_PDP_LEFT_91ddb877-4dbc-4ba0-a29d-8277624bef25.webp" },
//       { colorName: "creem", hex: "#e6e5ab", price: 165, salePrice: null, images: "/shoes/men/Men's Wool Runner NZ Mid Waterproof/A12061_25Q3_Wool-Runner-NZ-Mid-Waterproof-Stony-Cream-Rugged-Beige-Stony-Cream-Sole_PDP_LEFT.webp" },
//     ],
//   },
// ];

// export const womenShoes: Product[] = [
//   {
//     name: "Women's Allbirds Sliper",
//     sizes: [39, 40, 41, 42, 43, 44, 45, 46],
//     colors: [
//       {
//         colorName: "white",
//         hex: "#ffffff",
//         price: 120,
//         salePrice: 80,
//         images:
//           "/shoes/women/Allbirds Slipper/A11826_25Q4_Wool-Slipper-Fluff-Natural-White-Natural-White-Sole_PDP_LEFT.webp",
//       },
//       {
//         colorName: "gray",
//         hex: "#9b9b9b",
//         price: 120,
//         salePrice: 80,
//         images:
//           "/shoes/women/Allbirds Slipper/A11582_25Q4_Slipper-Tweed-Dark-Grey-Dark-Grey-Sole_PDP_LEFT.webp",
//       },
      
//       {
//         colorName: "black",
//         hex: "#030303",
//         price: 120,
//         salePrice: 80,
//         images:
//           "/shoes/women/Allbirds Slipper/A12031_25Q4_Wool-Slipper-Natural-Black-Natural-Black-Sole_PDP_LEFT_4dce0f1d-9e6f-4ce1-9ea6-f95f161147cc.webp",
//       },

//     ],
//   },

//   {
//     name: "Women's Breezer Mary Jane",
//     sizes: [39, 40, 41, 42, 43, 44, 45, 46],
//     colors: [
//       { colorName: "red", hex: "#d72c2c", price: 105, salePrice: null, images: "/shoes/women/Women's Breezer Mary Jane/A12121_25Q4_Breezer-Mary-Jane-Warm-Red-Dark-Anthracite-Sole_PDP_LEFT.webp" },
//       { colorName: "gray", hex: "#535353", price: 105, salePrice: null, images: "/shoes/women/Women's Breezer Mary Jane/A12120_25Q4_Breezer-Mary-Jane-Anthracite-Dark-Anthracite-Sole_PDP_LEFT.webp" },
      
//       { colorName: "black", hex: "#070707", price: 105, salePrice: null, images: "/shoes/women/Women's Breezer Mary Jane/A12122_25Q4_Breezer-Mary-Jane-Natural-Black-Natural-Black-Sole_PDP_LEFT.webp" },

//     ],
//   },

//   {
//     name: "Women's Lounger Lift Velvet",
//     sizes: [39, 40, 41, 42, 43, 44, 45, 46],
//     colors: [
//       { colorName: "orange", hex: "#ea783f", price: 115, salePrice: null, images: "/shoes/women/Women's Lounger Lift Velvet/A11863_25Q4_Lounger-Lift-Velvet-Sienna-Blush-Blizzard-Sole_PDP_LEFT.webp" },
//       { colorName: "black", hex: "#191919", price: 115, salePrice: null, images: "/shoes/women/Women's Lounger Lift Velvet/A11583_25Q4_Lounger-Lift-Velvet-Dark-Grey-Blizzard-Sole_PDP_LEFT.webp" },
      

//     ],
//   },

//   {
//     name: "Women's Strider",
//     sizes: [39, 40, 41, 42, 43, 44, 45, 46],
//     colors: [
//       { colorName: "white", hex: "#e6dede", price: 145, salePrice: null, images: "/shoes/women/Women's Strider/A11651_25Q3_Strider-Blizzard-Dark-Navy-Blizzard-Sole_PDP_LEFT_f5dd079c-8d74-4d3b-bb81-862710162f7a.webp" },
//       { colorName: "dark - blue", hex: "#09155a", price: 145, salePrice: null, images: "/shoes/women/Women's Strider/A11678_25Q3_Strider-Dark-Navy-Blizzard-Sole_PDP_LEFT__1_32f93643-db0d-471e-845d-fdf810efd1c4.webp" },
//       { colorName: "gray", hex: "#7e7979", price: 145, salePrice: null, images: "/shoes/women/Women's Strider/A11729_25Q3_Strider-Medium-Grey-Blizzard-Sole_PDP_LEFT_f3f69829-38dd-4707-b6c5-4e9a3c81e74e.webp" },
//       { colorName: "black", hex: "#000000", price: 145, salePrice: null, images: "/shoes/women/Women's Strider/A11791_25Q3_Strider-Natural-Black-Natural-Black-Sole_PDP_LEFT__1_b5bc9ce1-565c-4767-bffd-3a92ad54fb71.webp" },
//     ],
//   },

//   {
//     name: "Women's Tree Breezer",
//     sizes: [39, 40, 41, 42, 43, 44, 45, 46],
//     colors: [
//       { colorName: "black ", hex: "#141414", price: 135, salePrice: null, images: "/shoes/women/Women's Tree Breezer/TB1WJBK_SHOE_LEFT_GLOBAL_WOMENS_TREE_BREEZER_JET_BLACK_BLACK.webp" },
//       { colorName: "gray", hex: "#ababab", price: 135, salePrice: null, images: "/shoes/women/Women's Tree Breezer/TB1WMST_SHOE_LEFT_GLOBAL_WOMENS_TREE_BREEZERS_MIST_DARK_GREY.webp" },
//       { colorName: "dark - blue", hex: "#0c145f", price: 135, salePrice: null, images: "/shoes/women/Women's Tree Breezer/TB1WNNT_SHOE_LEFT_GLOBAL_WOMENS_TREE_BREEZERS_NAVY_NIGHT_DARK_NAVY.webp" },
//     ],
//   },

//   {
//     name: "Women's Tree Glider",
//     sizes: [39, 40, 41, 42, 43, 44, 45, 46],
//     colors: [
//       { colorName: "creem", hex: "#d5dab9", price: 165, salePrice: null, images: "/shoes/women/Women's Tree Glider/A11070_24Q2_Tree-Glider-Natural-White-Blizzard_PDP_LEFT__1_12d49ca8-3cd6-4455-923e-1d1cc7ca72ae.webp" },
//       { colorName: "gray", hex: "#5b5b5b", price: 165, salePrice: null, images: "/shoes/women/Women's Tree Glider/A11068_24Q3_Tree_Glider_Cloudy_Grey_Light_Grey_PDP_LEFT-2000x2000.webp" },
      
//       { colorName: "dark - blue", hex: "#170e6d", price: 165, salePrice: null, images: "/shoes/women/Women's Tree Glider/A11076_24Q4_Tree_Glider_Deep_Navy_Blizzard_PDP_LEFT-2000x2000_b0f1cd48-5658-4f6f-8fc3-33d842812e88.webp" },
//       { colorName: "black", hex: "#000000", price: 165, salePrice: null, images: "/shoes/women/Women's Tree Glider/A11187_24Q4_Tree-Glider-Natural-Black-Rugged-Khaki_PDP_LEFT_f68de53b-9508-46a9-869f-24019b173440.webp" },
//     ],
//   },
// ];
// /* =======================
//    SUPABASE INSERT TYPES
// ======================= */

// interface ProductInsert {
//   name: string;
//   sizes: number[];
//   gender: "men" | "women";
// }

// interface ProductColorInsert {
//   product_id: string;
//   color_name: string;
//   hex: string;
//   price: number;
//   sale_price: number | null;
// }

// interface ProductImageInsert {
//   product_color_id: string;
//   image: string;
// }

// /* =======================
//    UPLOAD FUNCTION
// ======================= */

// async function uploadAllProducts(
//   products: Product[],
//   gender: "men" | "women"
// ) {
//   try {
//     const productsToInsert: ProductInsert[] = [];
//     const colorsToInsert: ProductColorInsert[] = [];
//     const imagesToInsert: ProductImageInsert[] = [];

//     const productIdMap = new Map<string, string>();

//     /* 1️⃣ Prepare products */
//     products.forEach(product => {
//       productsToInsert.push({
//         name: product.name,
//         sizes: product.sizes,
//         gender,
//       });
//     });

//     /* 2️⃣ Insert products */
//     const { data: insertedProducts, error: productError } = await supabase
//       .from("products")
//       .insert(productsToInsert)
//       .select("id, name");

//     if (productError || !insertedProducts) {
//       console.error("❌ Product insert failed", productError);
//       return;
//     }

//     insertedProducts.forEach(p => productIdMap.set(p.name, p.id));

//     /* 3️⃣ Prepare colors */
//     products.forEach(product => {
//       const productId = productIdMap.get(product.name);
//       if (!productId) return;

//       product.colors.forEach(color => {
//         colorsToInsert.push({
//           product_id: productId,
//           color_name: color.colorName,
//           hex: color.hex,
//           price: color.price,
//           sale_price: color.salePrice,
//         });
//       });
//     });

//     /* 4️⃣ Insert colors */
//     const { data: insertedColors, error: colorsError } = await supabase
//       .from("product_colors")
//       .insert(colorsToInsert)
//       .select("id, product_id, color_name");

//     if (colorsError || !insertedColors) {
//       console.error("❌ Colors insert failed", colorsError);
//       return;
//     }

//     /* 5️⃣ Prepare images */
//     insertedColors.forEach(insertedColor => {
//       const originalProduct = products.find(
//         p => productIdMap.get(p.name) === insertedColor.product_id
//       );

//       const originalColor = originalProduct?.colors.find(
//         c => c.colorName === insertedColor.color_name
//       );

//       if (!originalColor) return;

//       imagesToInsert.push({
//         product_color_id: insertedColor.id,
//         image: originalColor.images,
//       });
//     });

//     /* 6️⃣ Insert images */
//     const { error: imagesError } = await supabase
//       .from("product_images")
//       .insert(imagesToInsert);

//     if (imagesError) {
//       console.error("❌ Images insert failed", imagesError);
//       return;
//     }

//     console.log(`✅ ${gender.toUpperCase()} PRODUCTS UPLOADED`);
//   } catch (error) {
//     console.error("❌ Unexpected error", error);
//   }
// }

// /* =======================
//    RUN
// ======================= */

// async function main() {
//   await uploadAllProducts(menShoes, "men");
//   await uploadAllProducts(womenShoes, "women");
// }

// main();

