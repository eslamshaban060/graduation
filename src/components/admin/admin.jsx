import React, { useEffect, useState } from "react";
import { Shield, UserPlus, Search } from "lucide-react";
import { supabase } from "../../lib/supabase ";

import AdminCard from "./AdminCard";
import AddAdminModal from "./AddAdminModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import Toasts from "./Toasts";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminManagement = () => {
  const router = useNavigate();
  const { user } = useAuth(); // جلب بيانات اليوزر
  const [searchTerm, setSearchTerm] = useState("");
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddUser, setShowAddUser] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [toasts, setToasts] = useState([]);

  /* ================= Toast ================= */
  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      4000
    );
  };

  /* ================= Fetch Admins ================= */
  const fetchAdmins = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("admins")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      showToast("Failed to load admins", "error");
    } else {
      setAdmins(
        data.map((a) => ({
          id: a.id,
          name: a.name,
          email: a.email,
          role: a.role,
          joinDate: a.created_at.split("T")[0],
        }))
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  /* ================= Add ================= */
  const addAdmin = async (formData) => {
    const { error } = await supabase.from("admins").insert([
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        password: formData.password,
      },
    ]);

    if (error) {
      showToast("Failed to add admin", "error");
    } else {
      showToast("Admin added successfully");
      setShowAddUser(false);
      fetchAdmins();
    }
  };

  /* ================= Delete ================= */
  const deleteAdmin = async () => {
    const { error } = await supabase
      .from("admins")
      .delete()
      .eq("id", adminToDelete.id);

    if (error) {
      showToast("Failed to delete admin", "error");
    } else {
      showToast(`"${adminToDelete.name}" deleted`);
      setShowDeleteConfirm(false);
      setAdminToDelete(null);
      fetchAdmins();
    }
  };

  /* ================= Filter Admins by Search ================= */
  const filteredBySearch = admins.filter((a) =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ================= Filter Admins by Role ================= */
  const filteredAdmins = filteredBySearch.filter((a) => {
    if (!user?.role) return false;

    switch (user.role) {
      case "Owner":
        return a.role === "Admin" || a.role === "Engineer";
      case "Admin":
        return a.role === "Engineer";
      case "Engineer":
        return false;
      default:
        return false;
    }
  });

  if (user.role === "Engineer") {
    router("/dashboard");
    return;
  }
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Toasts toasts={toasts} setToasts={setToasts} />

        {/* Header */}
        <div className="gradient-card rounded-2xl p-6 md:p-8 shadow-card border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center">
                <Shield className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Management</h1>
                <p className="text-muted-foreground text-sm">
                  Manage users and permissions
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowAddUser(true)}
              className="p-3 gradient-hero rounded-xl text-primary-foreground flex items-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              <span className="hidden md:inline">Add</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="gradient-card rounded-2xl p-4 border border-border">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name..."
              className="w-full pr-12 pl-4 py-3 bg-input border border-border rounded-lg"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading &&
            filteredAdmins.map((admin) => (
              <AdminCard
                key={admin.id}
                admin={admin}
                onDelete={() => {
                  setAdminToDelete(admin);
                  setShowDeleteConfirm(true);
                }}
              />
            ))}
        </div>

        {showAddUser && (
          <AddAdminModal
            onClose={() => setShowAddUser(false)}
            onSave={addAdmin}
          />
        )}

        {showDeleteConfirm && (
          <DeleteConfirmModal
            admin={adminToDelete}
            onCancel={() => setShowDeleteConfirm(false)}
            onConfirm={deleteAdmin}
          />
        )}
      </div>
    </div>
  );
};

export default AdminManagement;
