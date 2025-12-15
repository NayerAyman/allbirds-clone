// src/api/auth.ts

import Swal from "sweetalert2";
import { supabase } from "./SubapaseAPI";

export const loginUser = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signupUser = async (email: string, password: string) => {
  return await supabase.auth.signUp({ email, password });
};




// --------------log out--------------------


export const handleLogout = async () => {
  
  const { error } = await supabase.auth.signOut();
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Logout failed",
      text: error.message,
    });
  } else {
    Swal.fire({
      icon: "success",
      title: "Logged out successfully",
      showConfirmButton: false,
      timer: 1500,
    });

  }
};