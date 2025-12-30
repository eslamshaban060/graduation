"use client";
import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { useAuth } from "../context/AuthContext";

import { supabase } from "../lib/supabase ";
export default function AuthPages() {
  const [currentPage, setCurrentPage] = useState("login"); // login, forgot, otp, reset
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [toast, setToast] = useState(null);
  const [generatedOtp, setGeneratedOtp] = useState(""); // نخزن الـ OTP هنا
  const { login } = useAuth();

  const router = useNavigate();
  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };
  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  const sendOtpEmail = async (email, otpCode) => {
    try {
      const templateParams = {
        to_email: email,
        otp: otpCode,
      };

      await emailjs.send(
        "service_s0vy33p",
        "template_ku9xnlg",
        templateParams,
        "5vsjCvHVuerH6eaHA"
      );

      showToast(`OTP sent to ${email}`, "success");
    } catch (err) {
      showToast("Failed to send OTP", "error");
    }
  };
  const validateEmail = (value) => {
    setEmail(value);
    if (!value) {
      setEmailError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError("Please enter a valid email");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = (value) => {
    setPassword(value);
    if (!value) {
      setPasswordError("Password is required");
      return false;
    } else if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  // تسجيل الدخول + التحقق من Supabase
  // const handleLogin = async () => {
  //   const emailValid = validateEmail(email);
  //   const passwordValid = validatePassword(password);

  //   if (!emailValid || !passwordValid) {
  //     showToast("Please check your credentials", "error");
  //     return;
  //   }

  //   // التحقق من الجدول
  //   const { data, error } = await supabase
  //     .from("admins")
  //     .select("*")
  //     .eq("email", email)
  //     .eq("password", password)
  //     .single();

  //   if (error || !data) {
  //     showToast("Invalid email or password", "error");
  //     return;
  //   }

  //   showToast("Login successful!", "success");
  //   router("/dashboard");
  // };
  const handleLogin = async () => {
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);

    if (!emailValid || !passwordValid) {
      showToast("Please check your credentials", "error");
      return;
    }

    const { data, error } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error || !data) {
      showToast("Invalid email or password", "error");
      return;
    }

    showToast("Login successful!", "success");
    router("/dashboard");
    login({
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      phone: data.phone,
      imageBase64: data.imageBase64,
    });
  };

  // إرسال OTP (التحقق من وجود الايميل في الجدول)

  const handleForgotPassword = async () => {
    if (!validateEmail(email)) {
      showToast("Please enter a valid email", "error");
      return;
    }

    // التحقق من وجود الايميل في Supabase
    const { data, error } = await supabase
      .from("admins")
      .select("id")
      .eq("email", email)
      .single();

    if (error || !data) {
      showToast("Email not found", "error");
      return;
    }

    // توليد OTP
    const otpCode = generateOtp();
    setGeneratedOtp(otpCode);

    // إرسال OTP باستخدام EmailJS
    await sendOtpEmail(email, otpCode);

    setCurrentPage("otp");
  };
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // const handleVerifyOtp = () => {
  //   const otpValue = otp.join("");
  //   if (otpValue.length !== 6) {
  //     showToast("Please enter complete OTP", "error");
  //     return;
  //   }
  //   // ممكن تضيف تحقق OTP من السيرفر هنا لو عايز
  //   showToast("OTP verified successfully", "success");
  //   setCurrentPage("reset");
  // };

  // إعادة تعيين كلمة السر

  const handleVerifyOtp = () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      showToast("Please enter complete OTP", "error");
      return;
    }

    if (otpValue !== generatedOtp) {
      showToast("Incorrect OTP", "error");
      return;
    }

    showToast("OTP verified successfully", "success");
    setCurrentPage("reset");
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      showToast("Please fill in all fields", "error");
      return;
    }
    if (newPassword.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    // تحديث الباسورد في Supabase
    const { data, error } = await supabase
      .from("admins")
      .update({ password: newPassword })
      .eq("email", email);

    if (error) {
      showToast("Failed to reset password", "error");
      return;
    }

    showToast("Password reset successful!", "success");
    setTimeout(() => {
      setCurrentPage("login");
      setEmail("");
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setOtp(["", "", "", "", "", ""]);
    }, 1500);
  };

  const handleKeyPress = (e, action) => {
    if (e.key === "Enter") action();
  };

  return (
    <>
      <style jsx>{`
        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f5f5;
          padding: 20px;
          position: relative;
        }

        .card {
          background: white;
          border-radius: 8px;
          padding: 48px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          padding: 0;
          margin-bottom: 24px;
          font-size: 14px;
        }

        .back-btn:hover {
          color: #008b7d;
        }

        .logo {
          text-align: center;
          margin-bottom: 32px;
        }

        .logo-icon {
          width: 48px;
          height: 48px;
          background: #008b7d;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          margin-bottom: 16px;
        }

        .logo h1 {
          font-size: 24px;
          color: #1a1a1a;
          margin: 0;
          font-weight: 600;
        }

        .logo p {
          color: #6b7280;
          font-size: 14px;
          margin: 8px 0 0 0;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #4a4a4a;
          margin-bottom: 8px;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          transition: color 0.2s;
        }

        .input-wrapper.error .input-icon {
          color: #ef4444;
        }

        .input-wrapper.success .input-icon {
          color: #10b981;
        }

        .form-input {
          width: 100%;
          padding: 12px 12px 12px 40px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 15px;
          transition: all 0.2s;
          background: #fafafa;
          color: black !important;
        }

        .form-input:focus {
          outline: none;
          border-color: #008b7d;
          background: white;
        }

        .form-input.error {
          border-color: #ef4444;
          background: #fef2f2;
        }

        .form-input.success {
          border-color: #10b981;
          background: #f0fdf4;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #ef4444;
          font-size: 13px;
          margin-top: 6px;
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
        }

        .password-toggle:hover {
          color: #008b7d;
        }

        .forgot {
          text-align: right;
          margin-bottom: 24px;
        }

        .forgot button {
          background: none;
          border: none;
          color: #008b7d;
          font-size: 14px;
          cursor: pointer;
          padding: 0;
        }

        .forgot button:hover {
          text-decoration: underline;
        }

        .btn-primary {
          width: 100%;
          padding: 12px;
          background: #008b7d;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary:hover {
          background: #007366;
        }

        .btn-primary:active {
          transform: scale(0.98);
        }

        .footer {
          text-align: center;
          margin-top: 24px;
          color: #6b7280;
          font-size: 14px;
        }

        .footer button {
          background: none;
          border: none;
          color: #008b7d;
          cursor: pointer;
          font-weight: 500;
          padding: 0;
        }

        .footer button:hover {
          text-decoration: underline;
        }

        .otp-container {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-bottom: 24px;
        }

        .otp-input {
          width: 50px;
          height: 56px;
          text-align: center;
          font-size: 24px;
          font-weight: 600;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          background: #fafafa;
          transition: all 0.2s;
          color: black !important;
        }

        .otp-input:focus {
          outline: none;
          border-color: #008b7d;
          background: white;
        }

        .resend {
          text-align: center;
          margin-bottom: 24px;
        }

        .resend button {
          background: none;
          border: none;
          color: #008b7d;
          font-size: 14px;
          cursor: pointer;
          padding: 0;
        }

        .resend button:hover {
          text-decoration: underline;
        }

        .toast {
          position: fixed;
          top: 24px;
          right: 24px;
          background: white;
          border-radius: 8px;
          padding: 16px 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 300px;
          animation: slideIn 0.3s ease-out;
          z-index: 1000;
        }

        .toast.success {
          border-left: 4px solid #10b981;
        }

        .toast.error {
          border-left: 4px solid #ef4444;
        }

        .toast-icon {
          flex-shrink: 0;
        }

        .toast.success .toast-icon {
          color: #10b981;
        }

        .toast.error .toast-icon {
          color: #ef4444;
        }

        .toast-message {
          flex: 1;
          color: #1a1a1a;
          font-size: 14px;
          font-weight: 500;
        }

        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @media (max-width: 480px) {
          .card {
            padding: 32px 24px;
            color: black !important;
          }

          .otp-input {
            width: 45px;
            height: 50px;
            font-size: 20px;
            color: black !important;
          }

          .toast {
            right: 16px;
            left: 16px;
            min-width: auto;
          }
        }
      `}</style>

      <div className="page">
        <div className="card">
          {/* Login Page */}
          {currentPage === "login" && (
            <>
              <div className="logo">
                <div className="logo-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                </div>
                <h1>Solar Manager</h1>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div
                  className={`input-wrapper ${
                    emailError ? "error" : email && !emailError ? "success" : ""
                  }`}
                >
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    className={`form-input ${
                      emailError
                        ? "error"
                        : email && !emailError
                        ? "success"
                        : ""
                    }`}
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => validateEmail(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                  />
                </div>
                {emailError && (
                  <div className="error-message">
                    <AlertCircle size={14} />
                    <span>{emailError}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div
                  className={`input-wrapper ${
                    passwordError
                      ? "error"
                      : password && !passwordError
                      ? "success"
                      : ""
                  }`}
                >
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className={`form-input ${
                      passwordError
                        ? "error"
                        : password && !passwordError
                        ? "success"
                        : ""
                    }`}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => validatePassword(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                  />
                  <button
                    className="password-toggle"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {passwordError && (
                  <div className="error-message">
                    <AlertCircle size={14} />
                    <span>{passwordError}</span>
                  </div>
                )}
              </div>

              <div className="forgot">
                <button type="button" onClick={() => setCurrentPage("forgot")}>
                  Forgot password?
                </button>
              </div>

              <button
                className="btn-primary"
                type="button"
                onClick={handleLogin}
              >
                Sign In
              </button>
            </>
          )}

          {/* Forgot Password Page */}
          {currentPage === "forgot" && (
            <>
              <button
                className="back-btn"
                onClick={() => setCurrentPage("login")}
              >
                <ArrowLeft size={16} />
                Back to login
              </button>

              <div className="logo">
                <div className="logo-icon">
                  <Lock size={24} />
                </div>
                <h1>Forgot Password</h1>
                <p>Enter your email to receive OTP</p>
              </div>

              <div className="form-group">
                <label htmlFor="forgot-email">Email</label>
                <div
                  className={`input-wrapper ${
                    emailError ? "error" : email && !emailError ? "success" : ""
                  }`}
                >
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    id="forgot-email"
                    className={`form-input ${
                      emailError
                        ? "error"
                        : email && !emailError
                        ? "success"
                        : ""
                    }`}
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => validateEmail(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, handleForgotPassword)}
                  />
                </div>
                {emailError && (
                  <div className="error-message">
                    <AlertCircle size={14} />
                    <span>{emailError}</span>
                  </div>
                )}
              </div>

              <button
                className="btn-primary"
                type="button"
                onClick={handleForgotPassword}
              >
                Send OTP
              </button>
            </>
          )}

          {/* OTP Verification Page */}
          {currentPage === "otp" && (
            <>
              <button
                className="back-btn"
                onClick={() => setCurrentPage("forgot")}
              >
                <ArrowLeft size={16} />
                Back
              </button>

              <div className="logo">
                <div className="logo-icon">
                  <Mail size={24} />
                </div>
                <h1>Verify OTP</h1>
                <p>Enter the 6-digit code sent to {email}</p>
              </div>

              <div className="otp-container">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    className="otp-input"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  />
                ))}
              </div>

              <div className="resend">
                <button type="button">Resend OTP</button>
              </div>

              <button
                className="btn-primary"
                type="button"
                onClick={handleVerifyOtp}
              >
                Verify OTP
              </button>
            </>
          )}

          {/* Reset Password Page */}
          {currentPage === "reset" && (
            <>
              <div className="logo">
                <div className="logo-icon">
                  <Lock size={24} />
                </div>
                <h1>Reset Password</h1>
                <p>Enter your new password</p>
              </div>

              <div className="form-group">
                <label htmlFor="new-password">New Password</label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="new-password"
                    className="form-input"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    className="password-toggle"
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password"
                    className="form-input"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, handleResetPassword)}
                  />
                  <button
                    className="password-toggle"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <button
                className="btn-primary"
                type="button"
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
            </>
          )}
        </div>

        {toast && (
          <div className={`toast ${toast.type}`}>
            <div className="toast-icon">
              {toast.type === "success" && <CheckCircle size={20} />}
              {toast.type === "error" && <XCircle size={20} />}
            </div>
            <div className="toast-message">{toast.message}</div>
          </div>
        )}
      </div>
    </>
  );
}
