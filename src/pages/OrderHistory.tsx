// src/pages/OrderHistory.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { supabase } from "../subapase/SubapaseAPI";

// Utility to show "time ago"
const timeAgo = (dateString: string) => {
  const now = new Date();
  const past = new Date(dateString);
  const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return `${Math.floor(diff / 86400)} day(s) ago`;
};

// --- Types ---
interface OrderItem {
  product_id: string;
  product_name: string;
  product_image: string;
  size: number | string;
  color_name?: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  order_items: OrderItem[];
  total_price: number;
  created_at: string;
}

const OrderHistory: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user.id;

      if (!userId) {
        Swal.fire({
          icon: "info",
          title: "Not authenticated",
          text: "You need to login first",
        });
        navigate("/login");
        return;
      }

      // ✅ Fetch orders with relational order_items
      const { data, error } = await supabase
        .from("orders")
        .select(`
          id,
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
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error.message);
        Swal.fire({ icon: "error", title: "Error", text: error.message });
      } else if (data) {
        setOrders(data);
      }

      setLoading(false);
    };

    fetchOrders();
  }, [navigate]);

  if (loading) return <div className="text-center mt-30  text-lg font-medium text-gray-700">Loading orders...</div>;
  if (orders.length === 0) return <p className="text-center  mt-30 text-lg font-medium text-gray-700">You have no orders yet.</p>;

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8 mt-30 md:py-12  min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 md:mb-10 text-center text-gray-800">Your Order History</h1>

      <ul className="space-y-6 md:space-y-8">
        {orders.map((order, index) => (
          <li key={order.id} className="bg-white rounded-2xl shadow-xl p-4 md:p-8 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2 sm:gap-0">
              <p className="font-semibold text-lg md:text-xl text-gray-900">Order #{index + 1}</p>
              <p className="text-sm text-gray-500">{timeAgo(order.created_at)}</p>
            </div>

            {/* Items */}
            <div className="space-y-4">
              {order.order_items.map((item, idx) => (
                <div key={idx} className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray-100 py-3 md:py-4 last:border-b-0 gap-4 md:gap-0">
                  <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
                    <img
                      src={item.product_image || "/placeholder.webp"}
                      alt={item.product_name}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-lg border border-gray-200 shadow-sm"
                    />
                    <div>
                      <p className="font-medium text-base md:text-lg text-gray-800">{item.product_name}</p>
                      <p className="text-sm text-gray-600">
                        Size: {item.size} {item.color_name ? `| Color: ${item.color_name}` : ""}
                      </p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-base md:text-lg text-gray-900 self-end md:self-auto">${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-end mt-4 md:mt-6">
              <p className="font-bold text-lg md:text-xl text-gray-900">Total: ${order.total_price.toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;