import React, { useEffect, useState } from "react";
import { Bell, Trash2, Check, X } from "lucide-react";
import { supabase } from "../../lib/supabase ";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
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
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

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
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="gradient-card rounded-2xl p-6 md:p-8 shadow-card border border-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center relative shadow-glow">
                <Bell className="w-7 h-7 text-primary-foreground" />
                {unreadCount > 0 && !isLoading && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Notifications
                </h1>
                <p className="text-sm text-muted-foreground">
                  Stay updated with your system
                </p>
              </div>
            </div>
            {unreadCount > 0 && !isLoading && (
              <div className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20">
                {unreadCount} New{" "}
                {unreadCount === 1 ? "Notification" : "Notifications"}
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="gradient-card rounded-2xl p-12 border border-border shadow-card">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              </div>
              <p className="text-sm text-muted-foreground">
                Loading notifications...
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Notifications List */}
            {notifications.length === 0 ? (
              <div className="gradient-card rounded-2xl p-12 border border-border shadow-card text-center">
                <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <Bell className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  No Notifications
                </h3>
                <p className="text-muted-foreground">
                  You're all caught up! Check back later.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="group gradient-card rounded-2xl border border-border shadow-card hover:shadow-glow transition-all duration-300 overflow-hidden"
                  >
                    <div className="flex">
                      {/* Left Accent Bar */}
                      <div className="w-1 gradient-hero flex-shrink-0" />

                      {/* Content */}
                      <div className="flex-1 p-5 md:p-6">
                        <div className="flex flex-col md:flex-row items-start gap-4">
                          {/* Icon */}
                          <div className="flex-shrink-0 w-12 h-12 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
                            <Bell className="w-6 h-6 text-primary-foreground" />
                          </div>

                          {/* Main Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mb-3">
                              <h3 className="text-base md:text-lg font-bold text-foreground line-clamp-2">
                                {notification.title}
                              </h3>
                              <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full whitespace-nowrap font-medium">
                                {formatDate(notification.date)}
                              </span>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-4">
                              <a
                                href={notification.link}
                                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 gradient-hero text-primary-foreground rounded-xl text-sm font-semibold transition-smooth hover:shadow-glow hover-scale"
                              >
                                <Check className="w-4 h-4" />
                                View Details
                              </a>

                              <button
                                onClick={() =>
                                  deleteNotification(notification.id)
                                }
                                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-xl text-sm font-semibold transition-smooth"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
