import { Check, X } from "lucide-react";

const Toast = ({ toast }) => {
  if (!toast.show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5">
      <div
        className={`rounded-xl p-4 shadow-2xl border-2 ${
          toast.type === "success"
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-destructive text-destructive-foreground border-destructive"
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            {toast.type === "success" ? (
              <Check className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">{toast.title}</h4>
            <p className="text-sm opacity-90 mt-1">{toast.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
