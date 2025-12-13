import Header from "../components/homeComponents/header/Header";
import Hero from "../components/homeComponents/hero/Hero";
import ProductSection from "../components/homeComponents/products/ProductSection";

export default function HomePage() {
  return (
    <div className="w-full h-full bg-orange-50  flex flex-col items-center justify-start ">
      <Header />
      <Hero />
      <ProductSection />
      
    </div>
  );
}
