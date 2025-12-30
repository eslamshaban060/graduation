import { useState } from "react";
import { Sun, Mail, Lock, ArrowLeft, Check, Loader2 } from "lucide-react";
import Toast from "./Toast";

const ForgotPassword = ({ setShowForgotPassword, showToast, toast }) => {
  const [resetStep, setResetStep] = useState("email");
  const [resetEmail, setResetEmail] = useState("");
  const [resetEmailError, setResetEmailError] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    setResetEmailError("");

    if (!resetEmail) {
      setResetEmailError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      setResetEmailError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      showToast("OTP Sent", "Verification code sent to your email", "success");
      setResetStep("otp");
      setIsLoading(false);
    }, 1500);
  };

  const handleVerifyOTP = async () => {
    setOtpError("");
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setOtpError("Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      showToast("Verified", "Code verified successfully", "success");
      setResetStep("newPassword");
      setIsLoading(false);
    }, 1500);
  };

  const handleResetPassword = async () => {
    setNewPasswordError("");
    setConfirmPasswordError("");

    let hasError = false;

    if (!newPassword) {
      setNewPasswordError("Password is required");
      hasError = true;
    } else if (newPassword.length < 8) {
      setNewPasswordError("Password must be at least 8 characters");
      hasError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      hasError = true;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      hasError = true;
    }

    if (hasError) return;

    setIsLoading(true);
    setTimeout(() => {
      showToast("Success", "Password changed successfully", "success");
      setResetStep("success");
      setIsLoading(false);

      setTimeout(() => {
        setShowForgotPassword(false);
        setResetStep("email");
        setResetEmail("");
        setResetEmailError("");
        setOtp(["", "", "", "", "", ""]);
        setOtpError("");
        setNewPassword("");
        setNewPasswordError("");
        setConfirmPassword("");
        setConfirmPasswordError("");
      }, 2000);
    }, 1500);
  };

  const handleOTPChange = (index, value) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/30 to-primary/5 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        ></div>
      </div>

      {/* Toast */}
      <Toast toast={toast} />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-card/80 backdrop-blur-xl rounded-2xl shadow-card border border-border p-8">
          {/* Header */}
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-hero shadow-glow">
              <Sun className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold">
              {resetStep === "email" && "Reset Password"}
              {resetStep === "otp" && "Verify Email"}
              {resetStep === "newPassword" && "New Password"}
              {resetStep === "success" && "Success! ✓"}
            </h2>
            <p className="text-muted-foreground text-sm">
              {resetStep === "email" &&
                "Enter your email to receive verification code"}
              {resetStep === "otp" && "Enter the code sent to your email"}
              {resetStep === "newPassword" && "Enter your new password"}
              {resetStep === "success" &&
                "Your password has been changed successfully"}
            </p>
          </div>

          {/* Email Step */}
          {resetStep === "email" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="engineer@minia.edu.eg"
                    value={resetEmail}
                    onChange={(e) => {
                      setResetEmail(e.target.value);
                      setResetEmailError("");
                    }}
                    className={`w-full pl-10 pr-4 h-12 rounded-xl border-2 bg-background focus:outline-none transition-smooth ${
                      resetEmailError
                        ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20"
                        : "border-input focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                </div>
                {resetEmailError && (
                  <p className="text-sm text-destructive font-medium flex items-center gap-1 animate-in slide-in-from-top-2">
                    <span className="inline-block w-1 h-1 rounded-full bg-destructive"></span>
                    {resetEmailError}
                  </p>
                )}
              </div>

              <button
                onClick={handleSendOTP}
                disabled={isLoading}
                className="w-full h-12 rounded-xl gradient-hero text-primary-foreground font-medium shadow-glow hover:opacity-90 transition-smooth disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Verification Code"
                )}
              </button>
            </div>
          )}

          {/* OTP Step */}
          {resetStep === "otp" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-center block">
                  Verification Code
                </label>
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        handleOTPChange(index, e.target.value);
                        setOtpError("");
                      }}
                      onKeyDown={(e) => handleOTPKeyDown(index, e)}
                      className={`w-12 h-14 text-center text-xl font-semibold rounded-xl border-2 bg-background focus:outline-none transition-smooth ${
                        otpError
                          ? "border-destructive focus:border-destructive"
                          : "border-input focus:border-primary"
                      }`}
                    />
                  ))}
                </div>
                {otpError && (
                  <p className="text-sm text-destructive font-medium text-center flex items-center justify-center gap-1 animate-in slide-in-from-top-2">
                    <span className="inline-block w-1 h-1 rounded-full bg-destructive"></span>
                    {otpError}
                  </p>
                )}
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Sent to: {resetEmail}
                </p>
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={isLoading}
                className="w-full h-12 rounded-xl gradient-hero text-primary-foreground font-medium shadow-glow hover:opacity-90 transition-smooth disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Code"
                )}
              </button>

              <button
                onClick={handleSendOTP}
                className="w-full text-sm text-primary hover:text-primary-glow transition-smooth"
              >
                Resend Code
              </button>
            </div>
          )}

          {/* New Password Step */}
          {resetStep === "newPassword" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setNewPasswordError("");
                    }}
                    className={`w-full pl-10 pr-4 h-12 rounded-xl border-2 bg-background focus:outline-none transition-smooth ${
                      newPasswordError
                        ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20"
                        : "border-input focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                </div>
                {newPasswordError && (
                  <p className="text-sm text-destructive font-medium flex items-center gap-1 animate-in slide-in-from-top-2">
                    <span className="inline-block w-1 h-1 rounded-full bg-destructive"></span>
                    {newPasswordError}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setConfirmPasswordError("");
                    }}
                    className={`w-full pl-10 pr-4 h-12 rounded-xl border-2 bg-background focus:outline-none transition-smooth ${
                      confirmPasswordError
                        ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20"
                        : "border-input focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                </div>
                {confirmPasswordError && (
                  <p className="text-sm text-destructive font-medium flex items-center gap-1 animate-in slide-in-from-top-2">
                    <span className="inline-block w-1 h-1 rounded-full bg-destructive"></span>
                    {confirmPasswordError}
                  </p>
                )}
              </div>

              <button
                onClick={handleResetPassword}
                disabled={isLoading}
                className="w-full h-12 rounded-xl gradient-hero text-primary-foreground font-medium shadow-glow hover:opacity-90 transition-smooth disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Changing...
                  </>
                ) : (
                  "Change Password"
                )}
              </button>
            </div>
          )}

          {/* Success Step */}
          {resetStep === "success" && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                <Check className="w-10 h-10 text-primary" />
              </div>
              <p className="text-muted-foreground">Redirecting to login...</p>
            </div>
          )}

          {/* Back Button */}
          {resetStep !== "success" && (
            <button
              onClick={() => {
                setShowForgotPassword(false);
                setResetStep("email");
              }}
              className="w-full mt-6 text-sm text-muted-foreground hover:text-primary transition-smooth flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
