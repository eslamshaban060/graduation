import { Trash2, Mail, Calendar, User } from "lucide-react";

const roleColors = {
  "Super Admin": "bg-primary/10 text-primary border-primary/30",
  Admin: "bg-primary/20 text-primary-glow border-primary/40",
  Engineer: "bg-accent/10 text-accent border-accent/30",
};

const AdminCard = ({ admin, onDelete }) => {
  return (
    <div className="gradient-card rounded-xl p-6 border border-border shadow-card hover-scale transition-smooth">
      {/* Avatar & Role */}
      <div className="flex items-start justify-between mb-4">
        {/* <div className="w-14 h-14 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-bold text-xl shadow-glow">
          {admin.name.charAt(0)}
        </div> */}
        <div className="w-14 h-14 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-bold text-xl shadow-glow overflow-hidden">
          {/* {admin.imageBase64 ? (
            <img
              src={admin.imageBase64}
              alt={admin.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="w-12 h-12 flex items-center justify-center">
              {admin.name.charAt(0).toUpperCase()}
            </span>
          )} */}
          {admin.imageBase64 ? (
            <img
              src={getImageSrc(admin.imageBase64)}
              alt={admin.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="w-12 h-12 flex items-center justify-center">
              {admin.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${
            roleColors[admin.role]
          }`}
        >
          {admin.role}
        </span>
      </div>

      {/* Info */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="font-semibold truncate">{admin.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground truncate">
            {admin.email}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Joined {admin.joinDate}
          </span>
        </div>
      </div>

      {/* Delete */}
      {admin.role !== "Super Admin" && (
        <button
          onClick={onDelete}
          className="w-full px-4 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg font-medium flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Delete User
        </button>
      )}
    </div>
  );
};

export default AdminCard;
