import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Camera,
  Save,
  X,
  Check,
  AlertCircle,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "../../lib/supabase ";

const UserSetting = () => {
  const { user: authUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [tempImage, setTempImage] = useState(null);
  const [isSavingImage, setIsSavingImage] = useState(false);

  const [userData, setUserData] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    role: "",
    joinDate: "",
    lastLogin: "",
    password: "",
    imageBase64: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  // جلب البيانات من Supabase
  useEffect(() => {
    const fetchUser = async () => {
      if (!authUser?.id) return;

      const { data, error } = await supabase
        .from("admins")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (error) {
        showToast("Failed to load user data", "error");
        console.error(error);
        return;
      }

      setUserData({
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        joinDate: data.created_at,
        lastLogin: data.lastLogin || "",
        password: data.password,
        imageBase64: data.imageBase64,
      });

      setFormData({
        name: data.name,
        phone: data.phone,
      });

      setProfileImage(data.imageBase64 || null);
    };

    fetchUser();
  }, [authUser]);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast("Image size must be less than 5MB", "error");
      return;
    }

    if (!file.type.startsWith("image/")) {
      showToast("Please upload an image file", "error");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setTempImage(reader.result); // صورة مؤقتة
    };
    reader.readAsDataURL(file);
  };
  const handleSaveImage = async () => {
    if (!tempImage) return;

    setIsSavingImage(true);

    const { error } = await supabase
      .from("admins")
      .update({ imageBase64: tempImage })
      .eq("id", userData.id);

    if (error) {
      showToast("Failed to save image", "error");
      console.error(error);
    } else {
      setProfileImage(tempImage); // الصورة الرسمية
      setTempImage(null);
      showToast("Profile image saved successfully!", "success");
    }

    setIsSavingImage(false);
  };

  const validateProfileForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    else if (formData.name.trim().length < 3)
      errors.name = "Name must be at least 3 characters";

    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    else if (!phoneRegex.test(formData.phone))
      errors.phone = "Invalid phone format";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePasswordForm = () => {
    const errors = {};
    if (!passwordData.currentPassword)
      errors.currentPassword = "Current password is required";
    if (!passwordData.newPassword)
      errors.newPassword = "New password is required";
    else if (passwordData.newPassword.length < 8)
      errors.newPassword = "Password must be at least 8 characters";
    if (passwordData.newPassword !== passwordData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    if (
      passwordData.currentPassword &&
      passwordData.newPassword &&
      passwordData.currentPassword === passwordData.newPassword
    )
      errors.newPassword =
        "New password must be different from current password";

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (!validateProfileForm()) {
      showToast("Please fix the form errors", "error");
      return;
    }

    // تحديث البيانات في Supabase
    const { error } = await supabase
      .from("admins")
      .update({ name: formData.name, phone: formData.phone })
      .eq("id", userData.id);

    if (error) {
      showToast("Failed to update profile", "error");
      console.error(error);
      return;
    }

    setUserData((prev) => ({
      ...prev,
      name: formData.name,
      phone: formData.phone,
    }));

    setIsEditing(false);
    showToast("Profile updated successfully!", "success");
  };

  const handleChangePassword = async () => {
    if (!validatePasswordForm()) {
      showToast("Please fix the password errors", "error");
      return;
    }

    // تحديث الباسورد في Supabase
    const { error } = await supabase
      .from("admins")
      .update({ password: passwordData.newPassword })
      .eq("id", userData.id);

    if (error) {
      showToast("Failed to change password", "error");
      console.error(error);
      return;
    }

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordErrors({});
    setShowPasswordSection(false);
    showToast("Password changed successfully!", "success");
  };

  const handleCancelEdit = () => {
    setFormData({ name: userData.name, phone: userData.phone });
    setFormErrors({});
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    if (passwordErrors[name])
      setPasswordErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const roleColors = {
    "Super Admin": "bg-primary/10 text-primary border-primary/30",
    Admin: "bg-primary/20 text-primary-glow border-primary/40",
    Engineer: "bg-accent/10 text-accent border-accent/30",
  };
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Toast Notifications */}
        <div className="fixed top-4 left-4 right-4 md:left-4 md:right-auto z-50 space-y-2 max-w-md">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-glow backdrop-blur-sm border animate-in slide-in-from-top duration-300 ${
                toast.type === "success"
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : toast.type === "error"
                  ? "bg-destructive/10 border-destructive/30 text-destructive"
                  : "bg-accent/10 border-accent/30 text-accent"
              }`}
            >
              {toast.type === "success" ? (
                <Check className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="font-medium text-sm flex-1">
                {toast.message}
              </span>
              <button
                onClick={() =>
                  setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                }
                className="hover:opacity-70 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="gradient-card rounded-2xl p-6 md:p-8 shadow-card border border-border">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center shadow-glow flex-shrink-0">
              <User className="w-7 h-7 text-primary-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                My Profile
              </h1>
              <p className="text-muted-foreground text-sm md:text-base">
                Manage your account settings
              </p>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="gradient-card rounded-2xl p-6 md:p-8 shadow-card border border-border">
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div
                style={{ width: "150px", height: "150px" }}
                className=" rounded-full gradient-hero flex items-center justify-center shadow-glow overflow-hidden"
              >
                {profileImage ? (
                  <img
                    src={tempImage || profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-5xl font-bold text-primary-foreground">
                    {userData.name.charAt(0)}
                  </span>
                )}
              </div>
              {tempImage && (
                <button
                  onClick={handleSaveImage}
                  disabled={isSavingImage}
                  className="mt-4 px-6 py-2 gradient-hero text-primary-foreground rounded-lg font-semibold hover-glow transition-smooth flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isSavingImage ? "Saving..." : "Save Image"}
                </button>
              )}
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center cursor-pointer hover-scale transition-smooth shadow-glow"
              >
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  id="profile-image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <h2 className="text-2xl font-bold text-foreground mt-4">
              {userData.name}
            </h2>
            <span
              className={`inline-flex px-4 py-1 rounded-full text-sm font-semibold border mt-2 ${
                roleColors[userData.role]
              }`}
            >
              {userData.role}
            </span>
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </label>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-input border rounded-lg text-foreground focus:outline-none focus:ring-2 transition-smooth ${
                      formErrors.name
                        ? "border-destructive focus:ring-destructive"
                        : "border-border focus:ring-ring"
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.name}
                    </p>
                  )}
                </div>
              ) : (
                <div className="px-4 py-3 bg-muted rounded-lg text-foreground">
                  {userData.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <div className="px-4 py-3 bg-muted/50 rounded-lg text-muted-foreground border border-border">
                {userData.email}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Email cannot be changed
              </p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </label>
              {isEditing ? (
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-input border rounded-lg text-foreground focus:outline-none focus:ring-2 transition-smooth ${
                      formErrors.phone
                        ? "border-destructive focus:ring-destructive"
                        : "border-border focus:ring-ring"
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.phone}
                    </p>
                  )}
                </div>
              ) : (
                <div className="px-4 py-3 bg-muted rounded-lg text-foreground">
                  {userData.phone}
                </div>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Role
              </label>
              <div className="px-4 py-3 bg-muted/50 rounded-lg text-muted-foreground border border-border">
                {userData.role}
              </div>
            </div>

            {/* Join Date */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Member Since
              </label>
              <div className="px-4 py-3 bg-muted/50 rounded-lg text-muted-foreground border border-border">
                {userData.joinDate.slice(0, 10)}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="flex-1 px-6 py-3 gradient-hero text-primary-foreground rounded-lg font-semibold hover-glow hover-scale transition-smooth flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-6 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-smooth"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 px-6 py-3 gradient-hero text-primary-foreground rounded-lg font-semibold hover-glow hover-scale transition-smooth"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="gradient-card rounded-2xl p-6 md:p-8 shadow-card border border-border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center shadow-glow">
                <Lock className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Security</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your password
                </p>
              </div>
            </div>
          </div>

          {!showPasswordSection ? (
            <button
              onClick={() => setShowPasswordSection(true)}
              className="w-full px-6 py-3 gradient-hero text-primary-foreground rounded-lg font-semibold hover-glow hover-scale transition-smooth"
            >
              Change Password
            </button>
          ) : (
            <div className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Current Password <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                    className={`w-full px-4 py-3 pr-12 bg-input border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-smooth ${
                      passwordErrors.currentPassword
                        ? "border-destructive focus:ring-destructive"
                        : "border-border focus:ring-ring"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {passwordErrors.currentPassword && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {passwordErrors.currentPassword}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  New Password <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                    className={`w-full px-4 py-3 pr-12 bg-input border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-smooth ${
                      passwordErrors.newPassword
                        ? "border-destructive focus:ring-destructive"
                        : "border-border focus:ring-ring"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {passwordErrors.newPassword && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {passwordErrors.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Confirm Password <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                    className={`w-full px-4 py-3 pr-12 bg-input border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-smooth ${
                      passwordErrors.confirmPassword
                        ? "border-destructive focus:ring-destructive"
                        : "border-border focus:ring-ring"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {passwordErrors.confirmPassword && (
                  <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {passwordErrors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleChangePassword}
                  className="flex-1 px-6 py-3 gradient-hero text-primary-foreground rounded-lg font-semibold hover-glow hover-scale transition-smooth flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Password
                </button>
                <button
                  onClick={() => setShowPasswordSection(false)}
                  className="px-6 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-smooth"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
