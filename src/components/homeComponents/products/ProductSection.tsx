import BigCards from "./BigCards"
import BestSellersSlider from "./catigoryCards.jsx/BestSellersSlider"
import CarouselHomeOne from "./catigoryCards.jsx/CarouselHomeOne"
import TwoSliders from "./TwoSliders"

// type Props = {}

function ProductSection() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden ">
      <CarouselHomeOne />
      <BestSellersSlider />
      <BigCards />
      <TwoSliders/>
    </div>
  )
}

export default ProductSection