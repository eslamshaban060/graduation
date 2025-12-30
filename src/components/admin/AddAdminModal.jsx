// import { useState } from "react";
// import { UserPlus, X, AlertCircle } from "lucide-react";

// const AddAdminModal = ({ onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     role: "Engineer",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const e = {};
//     if (!formData.name || formData.name.length < 3)
//       e.name = "Name must be at least 3 characters";
//     if (!formData.email) e.email = "Email is required";
//     if (!formData.phone) e.phone = "Phone is required";
//     if (!formData.password || formData.password.length < 8)
//       e.password = "Password must be at least 8 characters";
//     if (formData.password !== formData.confirmPassword)
//       e.confirmPassword = "Passwords do not match";

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const submit = (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     onSave(formData);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
//       <div className="gradient-card rounded-2xl border border-border shadow-glow w-full max-w-2xl">
//         {/* Header */}
//         <div className="border-b border-border p-6 flex justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center">
//               <UserPlus className="w-5 h-5 text-primary-foreground" />
//             </div>
//             <h3 className="text-xl font-bold">Add New User</h3>
//           </div>
//           <button onClick={onClose}>
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Form */}
//         <form
//           onSubmit={submit}
//           className="p-6 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
//         >
//           {/* Inputs Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//             {[
//               ["name", "Full Name"],
//               ["email", "Email"],
//               ["phone", "Phone"],
//             ].map(([key, label]) => (
//               <div key={key}>
//                 <label className="block text-sm font-medium mb-2">
//                   {label} *
//                 </label>
//                 <input
//                   name={key}
//                   value={formData[key]}
//                   onChange={(e) =>
//                     setFormData({ ...formData, [key]: e.target.value })
//                   }
//                   className={`w-full px-4 py-3 bg-input border rounded-lg ${
//                     errors[key] ? "border-destructive" : "border-border"
//                   }`}
//                 />
//                 {errors[key] && (
//                   <p className="text-destructive text-sm mt-1 flex gap-1">
//                     <AlertCircle className="w-3 h-3" />
//                     {errors[key]}
//                   </p>
//                 )}
//               </div>
//             ))}

//             {/* Role */}
//             <div>
//               <label className="block text-sm font-medium mb-2">Role *</label>
//               <select
//                 value={formData.role}
//                 onChange={(e) =>
//                   setFormData({ ...formData, role: e.target.value })
//                 }
//                 className="w-full px-4 py-3 bg-input border border-border rounded-lg"
//               >
//                 <option value="Engineer">Engineer</option>
//                 <option value="Admin">Admin</option>
//               </select>
//             </div>

//             {/* Password */}
//             {["password", "confirmPassword"].map((key) => (
//               <div key={key}>
//                 <label className="block text-sm font-medium mb-2">
//                   {key === "password" ? "Password" : "Confirm Password"} *
//                 </label>
//                 <input
//                   type="password"
//                   value={formData[key]}
//                   onChange={(e) =>
//                     setFormData({ ...formData, [key]: e.target.value })
//                   }
//                   className={`w-full px-4 py-3 bg-input border rounded-lg ${
//                     errors[key] ? "border-destructive" : "border-border"
//                   }`}
//                 />
//                 {errors[key] && (
//                   <p className="text-destructive text-sm mt-1">{errors[key]}</p>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Actions */}
//           <div className="flex gap-3 pt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-3 bg-muted rounded-lg"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex-1 px-6 py-3 gradient-hero text-primary-foreground rounded-lg"
//             >
//               Save User
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddAdminModal;
import { useState } from "react";
import { UserPlus, X, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const AddAdminModal = ({ onClose, onSave }) => {
  const { user } = useAuth(); // جلب بيانات اليوزر
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Engineer",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.name || formData.name.length < 3)
      e.name = "Name must be at least 3 characters";
    if (!formData.email) e.email = "Email is required";
    if (!formData.phone) e.phone = "Phone is required";
    if (!formData.password || formData.password.length < 8)
      e.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      e.confirmPassword = "Passwords do not match";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  // ✅ تحديد خيارات الرول حسب دور اليوزر
  let roleOptions = [];
  if (user?.role === "Owner") {
    roleOptions = ["Engineer", "Admin"];
  } else if (user?.role === "Admin") {
    roleOptions = ["Engineer"];
  } else if (user?.role === "Engineer") {
    roleOptions = [];
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="gradient-card rounded-2xl border border-border shadow-glow w-full max-w-2xl">
        {/* Header */}
        <div className="border-b border-border p-6 flex justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold">Add New User</h3>
          </div>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={submit}
          className="p-6 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
        >
          {/* Inputs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[
              ["name", "Full Name"],
              ["email", "Email"],
              ["phone", "Phone"],
            ].map(([key, label]) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-2">
                  {label} *
                </label>
                <input
                  name={key}
                  value={formData[key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                  className={`w-full px-4 py-3 bg-input border rounded-lg ${
                    errors[key] ? "border-destructive" : "border-border"
                  }`}
                />
                {errors[key] && (
                  <p className="text-destructive text-sm mt-1 flex gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors[key]}
                  </p>
                )}
              </div>
            ))}

            {/* Role */}
            <div>
              <label className="block text-sm font-medium mb-2">Role *</label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full px-4 py-3 bg-input border border-border rounded-lg"
                disabled={roleOptions.length === 0} // لو مفيش خيارات يبقى select معطل
              >
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* Password */}
            {["password", "confirmPassword"].map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-2">
                  {key === "password" ? "Password" : "Confirm Password"} *
                </label>
                <input
                  type="password"
                  value={formData[key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                  className={`w-full px-4 py-3 bg-input border rounded-lg ${
                    errors[key] ? "border-destructive" : "border-border"
                  }`}
                />
                {errors[key] && (
                  <p className="text-destructive text-sm mt-1">{errors[key]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-muted rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 gradient-hero text-primary-foreground rounded-lg"
            >
              Save User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdminModal;
