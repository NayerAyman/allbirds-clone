// src/pages/Login.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../subapase/SubapaseAPI";
import AuthForm from "../subapase/AuthForm";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        // المستخدم مسجل دخول → اذهب مباشرة لسجل الطلبات
        navigate("/order-history");
      }
    };

    checkUser();

    // مراقبة أي تغييرات في تسجيل الدخول أو الخروج
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        navigate("/order-history");
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  return <AuthForm />;
};

export default Login;
