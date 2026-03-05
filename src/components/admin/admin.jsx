import React, { useEffect, useState } from "react";
import { Shield, UserPlus, Search, Users } from "lucide-react";
import { supabase } from "../../lib/supabase ";

import AdminCard from "./AdminCard";
import AddAdminModal from "./AddAdminModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import Toasts from "./Toasts";
import { useAuth } from "@/context/AuthContext";

const AdminManagement = () => {
  const { user } = useAuth();
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
      4000,
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
        })),
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
    a.name.toLowerCase().includes(searchTerm.toLowerCase()),
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

  if (user?.role === "Engineer") {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Toasts toasts={toasts} setToasts={setToasts} />

        {/* Header */}
        <div className="gradient-card rounded-2xl p-6 md:p-8 shadow-card border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
                <Shield className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Admin Management
                </h1>
                <p className="text-muted-foreground text-sm">
                  Manage users and permissions
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowAddUser(true)}
              className="p-3 gradient-hero rounded-xl text-primary-foreground flex items-center gap-2 hover:shadow-glow transition-smooth"
            >
              <UserPlus className="w-5 h-5" />
              <span className="hidden md:inline">Add Admin</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="gradient-card rounded-2xl p-4 border border-border shadow-card">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name..."
              className="w-full pr-12 pl-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gradient-card rounded-2xl border border-border shadow-card">
            <div className="relative w-20 h-20 mb-6">
              {/* Outer Ring */}
              <div className="absolute inset-0 border-4 border-border rounded-full"></div>
              {/* Spinning Ring */}
              <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              {/* Inner Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Loading Admins
            </h3>
            <p className="text-muted-foreground text-sm">
              Please wait while we fetch the data...
            </p>
          </div>
        ) : (
          <>
            {/* Grid */}
            {filteredAdmins.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAdmins.map((admin) => (
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
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 gradient-card rounded-2xl border border-border shadow-card">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Users className="w-10 h-10 text-muted-foreground opacity-50" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No Admins Found
                </h3>
                <p className="text-muted-foreground text-sm">
                  {searchTerm
                    ? "Try a different search term"
                    : "Click 'Add Admin' to get started"}
                </p>
              </div>
            )}
          </>
        )}

        {/* Modals */}
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
