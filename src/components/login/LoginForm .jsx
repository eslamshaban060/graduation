import { useState } from "react";
import { Mail, Lock, ArrowLeft, Loader2, Zap } from "lucide-react";

const LoginForm = ({ setShowForgotPassword, showToast }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async () => {
    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Validate
    let hasError = false;

    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    }

    if (hasError) return;

    setIsLoading(true);

    setTimeout(() => {
      showToast(
        "Login Successful",
        "Welcome to Solar Monitor Dashboard",
        "success"
      );
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex-1 !w-[500px] flex items-center justify-center p-8 relative z-10">
      <div className="w-full max-w-md space-y-8">
        {/* Logo & Title */}
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <div className="absolute inset-0 gradient-hero rounded-3xl blur-xl opacity-50 animate-pulse"></div>
            <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl gradient-hero shadow-glow">
              <Zap className="w-10 h-20 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Solar Monitor
            </h1>
            <p className="text-muted-foreground mt-2">
              Smart Power Station Management
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-card/50 backdrop-blur-xl rounded-2xl shadow-card border border-border p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Welcome Back</h2>
            <p className="text-sm text-muted-foreground">
              Sign in to access your dashboard
            </p>
          </div>

          <div className="space-y-4">
            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-primary" />
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="engineer@minia.edu.eg"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                className={`w-full px-4 h-12 rounded-xl border-2 bg-background/50 focus:outline-none transition-smooth ${
                  emailError
                    ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20"
                    : "border-input focus:border-primary focus:ring-2 focus:ring-primary/20"
                }`}
              />
              {emailError && (
                <p className="text-sm text-destructive font-medium flex items-center gap-1 animate-in slide-in-from-top-2">
                  <span className="inline-block w-1 h-1 rounded-full bg-destructive"></span>
                  {emailError}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-primary" />
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                className={`w-full px-4 h-12 rounded-xl border-2 bg-background/50 focus:outline-none transition-smooth ${
                  passwordError
                    ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20"
                    : "border-input focus:border-primary focus:ring-2 focus:ring-primary/20"
                }`}
              />
              {passwordError && (
                <p className="text-sm text-destructive font-medium flex items-center gap-1 animate-in slide-in-from-top-2">
                  <span className="inline-block w-1 h-1 rounded-full bg-destructive"></span>
                  {passwordError}
                </p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-input text-primary focus:ring-primary/20"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium cursor-pointer select-none"
                >
                  Remember me
                </label>
              </div>
              <button
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-primary hover:text-primary-glow transition-smooth font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full h-12 rounded-xl gradient-hero text-primary-foreground font-medium shadow-glow hover:opacity-90 hover:shadow-xl transition-smooth disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <Zap className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <button
            onClick={() => (window.location.href = "/")}
            className="text-sm text-muted-foreground hover:text-primary transition-smooth flex items-center justify-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
