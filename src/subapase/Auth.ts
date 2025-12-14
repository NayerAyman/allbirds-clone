// src/api/auth.ts

import { supabase } from "./SubapaseAPI";

export const loginUser = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signupUser = async (email: string, password: string) => {
  return await supabase.auth.signUp({ email, password });
};
