import React, { useState } from "react";
import {
  FileText,
  Plus,
  Search,
  Trash2,
  X,
  Check,
  AlertCircle,
  Calendar,
  User,
  AlertTriangle,
  Filter,
} from "lucide-react";
import { supabase } from "../../lib/supabase ";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const Maintenance = () => {
  const [showAddNote, setShowAddNote] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [toasts, setToasts] = useState([]);
  const { user } = useAuth();
  const [showViewNote, setShowViewNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const currentUser = {
    name: user?.name || "Unknown",
    role: user?.role,
  };
  const handleDeleteNote = async () => {
    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", noteToDelete.id);

    if (!error) {
      showToast(`Note "${noteToDelete.title}" deleted successfully`, "success");
      fetchNotes();
    } else {
      showToast("Failed to delete note", "error");
    }

    setShowDeleteConfirm(false);
    setNoteToDelete(null);
  };

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setNotes(
        data.map((n) => ({
          id: n.id,
          title: n.title,
          description: n.content,
          author: n.writer,
          date: new Date(n.created_at).toISOString().split("T")[0],
          time: new Date(n.created_at).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }))
      );
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "General",
    description: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // Sample notes data
  const [notes, setNotes] = useState([]);
  const showToast = (message, type = "success") => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required";
    } else if (formData.title.trim().length < 5) {
      errors.title = "Title must be at least 5 characters";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      errors.description = "Description must be at least 10 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // const handleSubmit = async () => {
  //   if (!validateForm()) {
  //     showToast("Please fix the form errors", "error");
  //     return;
  //   }

  //   const { error } = await supabase.from("notes").insert({
  //     title: formData.title,
  //     content: formData.description,
  //     writer: currentUser.name,
  //   });

  //   if (error) {
  //     showToast("Failed to add note", "error");
  //     return;
  //   }

  //   showToast("Note added successfully!", "success");
  //   fetchNotes();

  //   setFormData({
  //     title: "",
  //     category: "General",
  //     description: "",
  //   });

  //   setShowAddNote(false);
  // };
  const handleSubmit = async () => {
    if (!validateForm()) {
      showToast("Please fix the form errors", "error");
      return;
    }

    // 1️⃣ محاولة إضافة النوت
    const { error } = await supabase.from("notes").insert({
      title: formData.title,
      content: formData.description,
      writer: currentUser.name,
    });

    // 2️⃣ لو حصل Error
    if (error) {
      // Notification Error
      await supabase.from("notification").insert({
        title: `Failed to add note: ${formData.title}`,
        link: "/dashboard/maintenance",
      });

      showToast("Failed to add note", "error");
      return;
    }

    // 3️⃣ لو Success
    await supabase.from("notifiction").insert({
      title: `New note added: ${formData.title.slice(0, 10)}...`,
      link: "/dashboard/maintenance",
    });

    showToast("Note added successfully!", "success");
    fetchNotes();

    setFormData({
      title: "",
      category: "General",
      description: "",
    });

    setShowAddNote(false);
  };

  useEffect(() => {
    const channel = supabase
      .channel("notification-listener")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notification" },
        (payload) => {
          showToast(payload.new?.title || "New notification", "info");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle delete confirmation
  const confirmDelete = (note) => {
    setNoteToDelete(note);
    setShowDeleteConfirm(true);
  };

  // Close modal
  const closeModal = () => {
    setShowAddNote(false);
    setFormData({
      title: "",
      category: "General",
      description: "",
    });
    setFormErrors({});
  };

  // Filter and search notes
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || note.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
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
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl gradient-hero flex items-center justify-center shadow-glow flex-shrink-0">
                <FileText className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground truncate">
                  Reports & Notes
                </h1>
                <p className="text-muted-foreground text-xs md:text-sm truncate">
                  Document issues, observations and feedback
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAddNote(true)}
              className="p-3 md:px-4 md:py-3 gradient-hero text-primary-foreground rounded-xl font-semibold hover-glow hover-scale transition-smooth flex items-center gap-2 flex-shrink-0"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden md:inline">Add Note</span>
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="gradient-card rounded-2xl p-4 md:p-6 border border-border shadow-card">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-12 pl-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
              />
            </div>
          </div>
        </div>

        {/* Notes List */}
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="gradient-card rounded-xl p-6 border border-border shadow-card hover-scale transition-smooth"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 mb-2">
                    <h3 className="text-lg md:text-xl font-bold text-foreground flex-1">
                      {note.title.slice(0, 30)}...
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {note.description.slice(0, 300)}...
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 flex-shrink-0" />
                    <span className="font-medium">{note.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>
                      {note.date} at {note.time}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => confirmDelete(note)}
                  className="px-4 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg font-medium transition-smooth flex items-center gap-2 text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
                <button
                  onClick={() => {
                    setSelectedNote(note);
                    setShowViewNote(true);
                  }}
                  className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium transition-smooth text-sm"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotes.length === 0 && (
          <div className="gradient-card rounded-2xl p-12 border border-border shadow-card text-center">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No notes found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && noteToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
              style={{ maxWidth: "500px" }}
              className="gradient-card rounded-2xl border border-border shadow-glow w-full max-w-md animate-in zoom-in-95 duration-200"
            >
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-destructive/10 mx-auto mb-4 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>

                <h3 className="text-xl font-bold text-foreground text-center mb-2">
                  Delete Note
                </h3>
                <p className="text-muted-foreground text-center mb-6">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-foreground">
                    "{noteToDelete.title}"
                  </span>
                  ? This action cannot be undone.
                </p>

                <div className="flex flex-col-reverse sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setNoteToDelete(null);
                    }}
                    className="flex-1 px-6 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-smooth"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteNote}
                    className="flex-1 px-6 py-3 bg-destructive text-destructive-foreground rounded-lg font-semibold hover:bg-destructive/90 transition-smooth"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Note Modal */}
        {showAddNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="gradient-card rounded-2xl border border-border shadow-glow w-full max-w-xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
              <div className="sticky top-0 gradient-card border-b border-border p-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center shadow-glow">
                    <Plus className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    Add New Note
                  </h3>
                </div>
                <button
                  onClick={closeModal}
                  className="text-muted-foreground hover:text-foreground transition-smooth p-1 rounded-lg hover:bg-muted"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Title <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Brief summary of the note"
                    className={`w-full px-4 py-3 bg-input border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-smooth ${
                      formErrors.title
                        ? "border-destructive focus:ring-destructive"
                        : "border-border focus:ring-ring"
                    }`}
                  />
                  {formErrors.title && (
                    <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.title}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Detailed description of the issue, observation, or feedback..."
                    rows="6"
                    className={`w-full px-4 py-3 bg-input border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-smooth resize-none ${
                      formErrors.description
                        ? "border-destructive focus:ring-destructive"
                        : "border-border focus:ring-ring"
                    }`}
                  />
                  {formErrors.description && (
                    <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.description.length} characters
                  </p>
                </div>

                {/* Info Box */}

                {/* Action Buttons */}
                <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full sm:w-auto px-6 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-smooth"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full sm:flex-1 px-6 py-3 gradient-hero text-primary-foreground rounded-lg font-semibold hover-glow hover-scale transition-smooth"
                  >
                    Add Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showViewNote && selectedNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="gradient-card rounded-2xl border border-border shadow-glow w-full max-w-xl animate-in zoom-in-95">
              <div className="p-6 flex justify-between items-center border-b border-border">
                <h3 className="text-xl font-bold text-foreground">
                  {selectedNote.title}
                </h3>
                <button
                  onClick={() => setShowViewNote(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {selectedNote.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {selectedNote.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {selectedNote.date} at {selectedNote.time}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Maintenance;
