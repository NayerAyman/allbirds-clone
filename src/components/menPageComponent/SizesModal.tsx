import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function SizesModal({
  isOpen,
  onClose,
  productColors,
  sizes,
  activeColorIndex,
  selectedSize,
  setActiveColorIndex,
  setSelectedSize,
  onAddToCart,
}: {
  isOpen: boolean;
  onClose: () => void;
  productColors: { color_name: string; hex: string }[];
  sizes: number[];
  activeColorIndex: number;
  selectedSize: number | null;
  setActiveColorIndex: (index: number) => void;
  setSelectedSize: (size: number) => void;
  onAddToCart: () => void;
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={onClose}
      >
        {/* Background Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-linear-to-r from-black/40 via-black/20 to-black/40 backdrop-blur-xs"/>
        </Transition.Child>

        {/* Centering Modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6">
              <Dialog.Title className="text-2xl font-bold text-gray-800 mb-5 text-center">
                Choose Options
              </Dialog.Title>

              {/* COLORS */}
              <div className="mb-6">
                <h4 className="text-gray-700 font-semibold mb-2">Color</h4>
                <div className="flex gap-3">
                  {productColors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveColorIndex(i)}
                      className={`w-10 h-10 rounded-full border-2 transition-transform duration-200 ${
                        activeColorIndex === i
                          ? "ring-2 ring-offset-2 ring-offset-gray-100 ring-black scale-110"
                          : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: c.hex || "#ddd" }}
                    />
                  ))}
                </div>
              </div>

              {/* SIZES */}
              <div className="mb-6">
                <h4 className="text-gray-700 font-semibold mb-2">Size</h4>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 border rounded-lg font-medium transition-colors duration-200 ${
                        selectedSize === s
                          ? "bg-black text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={onAddToCart}
                className="w-full py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-500 text-white font-semibold text-lg shadow-lg hover:opacity-95 transition"
              >
                Add to Cart
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="mt-3 w-full py-2 rounded-lg text-gray-600 hover:text-gray-800 transition text-center"
              >
                Cancel
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
