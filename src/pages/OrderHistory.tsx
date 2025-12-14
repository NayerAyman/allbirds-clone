// src/pages/OrderHistory.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../subapase/SubapaseAPI";
import Swal from "sweetalert2";
import { getAllProducts } from "../subapase/GetData";

interface OrderItem {
  product: string;
  qty: number;
  price: number;
}

interface Order {
  id: number;
  items: OrderItem[];
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

      const { data, error } = await supabase
        .from("orders") 
        .select("*")
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

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mt-25 mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Order History</h1>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded-lg shadow-md bg-white">
              <p className="font-semibold">Order ID: {order.id}</p>
              <p className="text-sm text-gray-500">
                Date: {new Date(order.created_at).toLocaleString()}
              </p>
              <p className="font-semibold">Total: ${order.total_price.toFixed(2)}</p>
              <p className="text-gray-700">
                Items:{" "}
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.product} x {item.qty}
                    {idx < order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      )}

      <button className=" bg-amber-300 p-2 " onClick={()=>getAllProducts()}>get data</button>
    </div>
  );
};

export default OrderHistory;
