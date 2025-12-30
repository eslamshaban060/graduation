import { AlertTriangle } from "lucide-react";

const DeleteConfirmModal = ({ admin, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60  backdrop-blur-sm">
      <div
        style={{ maxWidth: "500px" }}
        className="gradient-card rounded-2xl border border-border shadow-glow w-full  p-6"
      >
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-destructive" />
        </div>

        <h3 className="text-xl font-bold text-center mb-2">Delete User</h3>
        <p className="text-center text-muted-foreground mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{admin.name}</span>?
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-muted rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-destructive text-destructive-foreground rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
