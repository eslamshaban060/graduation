import { supabase } from "@/lib/supabase ";
import bcrypt from "bcryptjs";

/* ================= LOGIN ================= */
export const loginAdmin = async (email, password) => {
  const { data, error } = await supabase
    .from("admins")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !data) {
    throw new Error("USER_NOT_FOUND");
  }

  const valid = await bcrypt.compare(password, data.password);
  if (!valid) {
    throw new Error("WRONG_PASSWORD");
  }

  return data;
};

/* ================= OTP ================= */
export const sendOTP = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await supabase.from("password_resets").insert({
    email,
    otp,
    expires_at: new Date(Date.now() + 10 * 60 * 1000),
  });

  console.log("OTP:", otp); // مؤقت
  return true;
};

export const verifyOTP = async (email, otp) => {
  const { data } = await supabase
    .from("password_resets")
    .select("*")
    .eq("email", email)
    .eq("otp", otp)
    .gt("expires_at", new Date())
    .single();

  if (!data) throw new Error("INVALID_OTP");
  return true;
};

export const resetPassword = async (email, newPassword) => {
  const hashed = await bcrypt.hash(newPassword, 10);

  await supabase.from("admins").update({ password: hashed }).eq("email", email);

  await supabase.from("password_resets").delete().eq("email", email);
  return true;
};
