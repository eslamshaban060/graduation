import React, { useEffect, useState } from "react";
import { Bell, Trash2, Check, X } from "lucide-react";
import { supabase } from "../../lib/supabase ";
const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const { data, error } = await supabase
      .from("notifiction")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setNotifications(
        data.map((n) => ({
          id: n.id,
          title: n.title,
          link: n.link,
          date: n.created_at,
          read: false,
        })),
      );
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // 🔹 حذف من Supabase
  const deleteNotification = async (id) => {
    const { error } = await supabase.from("notifiction").delete().eq("id", id);

    if (!error) {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const unreadCount = notifications.length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="gradient-hero p-6 rounded-xl shadow-glow">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center relative">
                <Bell className="w-7 h-7 text-primary-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-primary-foreground">
                  Notifications
                </h1>
                <p className="text-sm text-primary-foreground/90 mt-1">
                  Stay updated with your solar panel system
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <div className="px-4 py-2 bg-white/20 text-primary-foreground rounded-full text-sm font-medium">
                {unreadCount} New{" "}
                {unreadCount === 1 ? "Notification" : "Notifications"}
              </div>
            )}
          </div>
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gradient-card rounded-xl border border-border shadow-card">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Bell className="w-10 h-10 text-muted-foreground opacity-50" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No Notifications
            </h3>
            <p className="text-muted-foreground text-sm">
              You're all caught up! Check back later.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="group gradient-card rounded-xl border-2 border-primary/30 shadow-card hover-glow transition-smooth overflow-hidden"
              >
                <div className="flex">
                  {/* Left Accent Bar */}
                  <div className="w-1.5 gradient-hero flex-shrink-0" />

                  {/* Content */}
                  <div className="flex-1 p-5">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl gradient-hero flex items-center justify-center shadow-md">
                        <Bell className="w-6 h-6 text-primary-foreground" />
                      </div>

                      {/* Main Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-smooth">
                            {notification.title}
                          </h3>
                          <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full whitespace-nowrap font-medium">
                            {formatDate(notification.date)}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 mt-4">
                          <a
                            href={notification.link}
                            className="inline-flex items-center gap-2 px-4 py-2 gradient-hero text-primary-foreground rounded-lg text-sm font-medium transition-smooth hover:shadow-glow hover-scale"
                          >
                            <Check className="w-4 h-4" />
                            View Details
                          </a>

                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-lg text-sm font-medium transition-smooth"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
