import { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  Sun,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase ";

/* ─── Toast ─── */
const Toast = ({ toast }) => {
  if (!toast) return null;
  return (
    <div
      className={`
        fixed top-6 right-6 z-50 flex items-center gap-3 min-w-[300px]
        bg-card border rounded-xl px-5 py-4 shadow-card
        animate-in slide-in-from-right-4 duration-300
        ${toast.type === "success" ? "border-l-4 border-l-primary" : "border-l-4 border-l-destructive"}
      `}
    >
      {toast.type === "success" ? (
        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
      ) : (
        <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
      )}
      <span className="text-sm font-medium text-foreground">
        {toast.message}
      </span>
    </div>
  );
};

/* ─── Transition Overlay ─── */
const TransitionOverlay = ({ isVisible }) => (
  <div
    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-500"
    style={{
      opacity: isVisible ? 1 : 0,
      pointerEvents: isVisible ? "all" : "none",
    }}
  >
    <div
      className="absolute w-72 h-72 rounded-full blur-3xl opacity-10 pointer-events-none"
      style={{ background: "hsl(var(--primary))" }}
    />
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 rounded-full border-2 border-border" />
      <div
        className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
        style={{
          borderTopColor: "hsl(var(--primary))",
          animationDuration: "0.85s",
        }}
      />
      <div
        className="absolute inset-3 rounded-full border-2 border-transparent"
        style={{
          borderTopColor: "hsl(var(--accent))",
          borderRightColor: "hsl(var(--accent))",
          animation: "spin 1.3s linear infinite reverse",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Sun className="w-6 h-6 text-primary animate-pulse" />
      </div>
    </div>
    <p className="mt-5 text-xs tracking-widest uppercase text-muted-foreground font-mono">
      Redirecting…
    </p>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

/* ─── Field ─── */
const Field = ({ label, icon: Icon, error, success, children }) => (
  <div className="space-y-1.5 mb-5">
    <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
      <Icon className="w-3.5 h-3.5 text-primary" />
      {label}
    </label>
    {children}
    {error && (
      <p className="flex items-center gap-1.5 text-xs text-destructive animate-in slide-in-from-top-1">
        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
        {error}
      </p>
    )}
  </div>
);

/* ─── Input ─── */
const Input = ({
  hasError,
  hasSuccess,
  leftIcon: LeftIcon,
  rightSlot,
  ...props
}) => (
  <div className="relative">
    {LeftIcon && (
      <LeftIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
    )}
    <input
      {...props}
      className={`
        w-full h-12 rounded-xl border-2 bg-background text-foreground text-sm
        placeholder:text-muted-foreground focus:outline-none transition-smooth
        ${LeftIcon ? "pl-10" : "pl-4"} ${rightSlot ? "pr-11" : "pr-4"}
        ${
          hasError
            ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20"
            : hasSuccess
              ? "border-primary/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
              : "border-input focus:border-primary focus:ring-2 focus:ring-primary/20"
        }
      `}
    />
    {rightSlot && (
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        {rightSlot}
      </div>
    )}
  </div>
);

/* ─── Logo block ─── */
const LogoBlock = ({ icon: Icon, title, subtitle }) => (
  <div className="flex flex-col items-center text-center mb-8">
    <div className="relative mb-4">
      <div className="absolute inset-0 rounded-2xl blur-lg opacity-30 gradient-hero" />
      <div className="relative w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center shadow-glow">
        <Icon className="w-7 h-7 text-primary-foreground" />
      </div>
    </div>
    <h1 className="text-2xl font-semibold text-foreground tracking-tight">
      {title}
    </h1>
    {subtitle && (
      <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
    )}
  </div>
);

/* ─── Main Component ─── */
export default function AuthPages() {
  const [currentPage, setCurrentPage] = useState("login");
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
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { login } = useAuth();
  const router = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const generateOtp = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  const sendOtpEmail = async (email, otpCode) => {
    try {
      await emailjs.send(
        "service_s0vy33p",
        "template_ku9xnlg",
        { to_email: email, otp: otpCode },
        "5vsjCvHVuerH6eaHA",
      );
      showToast(`OTP sent to ${email}`, "success");
    } catch {
      showToast("Failed to send OTP", "error");
    }
  };

  const validateEmail = (value) => {
    setEmail(value);
    if (!value) {
      setEmailError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError("Please enter a valid email");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (value) => {
    setPassword(value);
    if (!value) {
      setPasswordError("Password is required");
      return false;
    }
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleLogin = async () => {
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);
    if (!emailValid || !passwordValid) {
      showToast("Please check your credentials", "error");
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error || !data) {
      showToast("Invalid email or password", "error");
      setIsLoading(false);
      return;
    }

    showToast("Login successful!", "success");
    login({
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      phone: data.phone,
      imageBase64: data.imageBase64,
    });
    setIsLoading(false);
    setShowOverlay(true);
    setTimeout(() => router("/dashboard"), 1300);
  };

  const handleForgotPassword = async () => {
    if (!validateEmail(email)) {
      showToast("Please enter a valid email", "error");
      return;
    }
    setIsLoading(true);
    const { data, error } = await supabase
      .from("admins")
      .select("id")
      .eq("email", email)
      .single();
    if (error || !data) {
      showToast("Email not found", "error");
      setIsLoading(false);
      return;
    }
    const otpCode = generateOtp();
    setGeneratedOtp(otpCode);
    await sendOtpEmail(email, otpCode);
    setIsLoading(false);
    setCurrentPage("otp");
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5)
      document.getElementById(`otp-${index + 1}`)?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      document.getElementById(`otp-${index - 1}`)?.focus();
  };

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
    setIsLoading(true);
    const { error } = await supabase
      .from("admins")
      .update({ password: newPassword })
      .eq("email", email);
    if (error) {
      showToast("Failed to reset password", "error");
      setIsLoading(false);
      return;
    }
    showToast("Password reset successful!", "success");
    setIsLoading(false);
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

  /* ── Eye toggle button ── */
  const EyeToggle = ({ show, onToggle }) => (
    <button
      type="button"
      onClick={onToggle}
      className="text-muted-foreground hover:text-foreground transition-smooth"
      tabIndex={-1}
    >
      {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  );

  /* ── Submit button ── */
  const SubmitBtn = ({ onClick, children, loading }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="
        w-full h-12 rounded-xl gradient-hero text-primary-foreground
        font-semibold text-sm shadow-glow hover-glow flex items-center justify-center gap-2
        disabled:opacity-60 disabled:cursor-not-allowed transition-smooth
        hover:opacity-90 active:scale-[0.99]
      "
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" /> Loading…
        </>
      ) : (
        children
      )}
    </button>
  );

  /* ── Back button ── */
  const BackBtn = ({ onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-6"
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </button>
  );

  return (
    <>
      <TransitionOverlay isVisible={showOverlay} />
      <Toast toast={toast} />

      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden p-4">
        {/* Ambient glows */}
        <div
          className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full blur-3xl opacity-[0.07] pointer-events-none"
          style={{ background: "hsl(var(--primary))" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-[0.06] pointer-events-none"
          style={{ background: "hsl(var(--accent))" }}
        />

        {/* Card */}
        <div
          className={`
            relative z-10 w-full max-w-md
            bg-card border border-border rounded-2xl shadow-card p-10
            transition-all duration-700
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
          `}
        >
          {/* ══ LOGIN ══ */}
          {currentPage === "login" && (
            <>
              <LogoBlock
                icon={Sun}
                title="Solar Manager"
                subtitle="Sign in to your account"
              />

              <Field
                label="Email"
                icon={Mail}
                error={emailError}
                success={email && !emailError}
              >
                <Input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  hasError={!!emailError}
                  hasSuccess={!!(email && !emailError)}
                  leftIcon={Mail}
                  onChange={(e) => validateEmail(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                />
              </Field>

              <Field label="Password" icon={Lock} error={passwordError}>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  hasError={!!passwordError}
                  hasSuccess={!!(password && !passwordError)}
                  leftIcon={Lock}
                  rightSlot={
                    <EyeToggle
                      show={showPassword}
                      onToggle={() => setShowPassword(!showPassword)}
                    />
                  }
                  onChange={(e) => validatePassword(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                />
              </Field>

              <div className="flex justify-end mb-6">
                <button
                  type="button"
                  onClick={() => setCurrentPage("forgot")}
                  className="text-sm font-medium text-primary hover:text-primary-glow transition-smooth"
                >
                  Forgot password?
                </button>
              </div>

              <SubmitBtn onClick={handleLogin} loading={isLoading}>
                Sign In
              </SubmitBtn>
            </>
          )}

          {/* ══ FORGOT PASSWORD ══ */}
          {currentPage === "forgot" && (
            <>
              <BackBtn onClick={() => setCurrentPage("login")} />
              <LogoBlock
                icon={Lock}
                title="Forgot Password"
                subtitle="Enter your email to receive OTP"
              />

              <Field label="Email" icon={Mail} error={emailError}>
                <Input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  hasError={!!emailError}
                  hasSuccess={!!(email && !emailError)}
                  leftIcon={Mail}
                  onChange={(e) => validateEmail(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleForgotPassword)}
                />
              </Field>

              <SubmitBtn onClick={handleForgotPassword} loading={isLoading}>
                Send OTP
              </SubmitBtn>
            </>
          )}

          {/* ══ OTP ══ */}
          {currentPage === "otp" && (
            <>
              <BackBtn onClick={() => setCurrentPage("forgot")} />
              <LogoBlock
                icon={Mail}
                title="Verify OTP"
                subtitle={`6-digit code sent to ${email}`}
              />

              {/* OTP boxes */}
              <div className="flex gap-3 justify-center mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="
                      w-12 h-14 text-center text-xl font-bold rounded-xl border-2
                      border-input bg-background text-foreground
                      focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                      transition-smooth
                    "
                  />
                ))}
              </div>

              <div className="text-center mb-6">
                <button
                  type="button"
                  onClick={async () => {
                    const otpCode = generateOtp();
                    setGeneratedOtp(otpCode);
                    await sendOtpEmail(email, otpCode);
                  }}
                  className="text-sm font-medium text-primary hover:text-primary-glow transition-smooth"
                >
                  Resend OTP
                </button>
              </div>

              <SubmitBtn onClick={handleVerifyOtp} loading={isLoading}>
                Verify OTP
              </SubmitBtn>
            </>
          )}

          {/* ══ RESET PASSWORD ══ */}
          {currentPage === "reset" && (
            <>
              <LogoBlock
                icon={Lock}
                title="Reset Password"
                subtitle="Enter your new password"
              />

              <Field label="New Password" icon={Lock}>
                <Input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={newPassword}
                  leftIcon={Lock}
                  rightSlot={
                    <EyeToggle
                      show={showNewPassword}
                      onToggle={() => setShowNewPassword(!showNewPassword)}
                    />
                  }
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Field>

              <Field label="Confirm Password" icon={Lock}>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  hasError={
                    !!(confirmPassword && newPassword !== confirmPassword)
                  }
                  leftIcon={Lock}
                  rightSlot={
                    <EyeToggle
                      show={showConfirmPassword}
                      onToggle={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  }
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleResetPassword)}
                />
              </Field>

              <SubmitBtn onClick={handleResetPassword} loading={isLoading}>
                Reset Password
              </SubmitBtn>
            </>
          )}
        </div>
      </div>
    </>
  );
}
