const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "hsl(0, 0%, 100%)",
    padding: "24px",
  },
  maxWidth: {
    maxWidth: "896px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "32px",
    paddingBottom: "24px",
    borderBottom: "2px solid hsl(174, 20%, 90%)",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "8px",
  },
  bellContainer: {
    position: "relative",
  },
  bellIcon: {
    width: "32px",
    height: "32px",
    color: "hsl(174, 100%, 27%)",
  },
  badge: {
    position: "absolute",
    top: "-4px",
    right: "-4px",
    backgroundColor: "hsl(0, 84.2%, 60.2%)",
    color: "white",
    fontSize: "12px",
    fontWeight: "bold",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "hsl(174, 30%, 15%)",
    margin: 0,
  },
  subtitle: {
    color: "hsl(174, 10%, 45%)",
    fontSize: "18px",
    margin: 0,
  },
  notificationsList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  emptyState: {
    textAlign: "center",
    padding: "64px 0",
    backgroundColor: "hsl(0, 0%, 100%)",
    borderRadius: "12px",
    border: "1px solid hsl(174, 20%, 90%)",
  },
  emptyIcon: {
    width: "64px",
    height: "64px",
    margin: "0 auto 16px",
    color: "hsl(174, 10%, 45%)",
    opacity: 0.5,
  },
  emptyText: {
    color: "hsl(174, 10%, 45%)",
    fontSize: "18px",
    margin: 0,
  },
  notificationCard: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "12px",
    border: "1px solid",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
  },
  notificationUnread: {
    backgroundColor: "hsl(0, 0%, 100%)",
    borderColor: "hsl(174, 100%, 27%)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  },
  notificationRead: {
    backgroundColor: "hsl(0, 0%, 100%)",
    borderColor: "hsl(174, 20%, 90%)",
    opacity: 0.75,
  },
  unreadIndicator: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "4px",
    background:
      "linear-gradient(135deg, hsl(174, 100%, 27%), hsl(174, 85%, 35%))",
  },
  cardContent: {
    padding: "24px",
    paddingLeft: "32px",
  },
  cardInner: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
  },
  iconContainer: {
    flexShrink: 0,
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    border: "2px solid hsla(174, 100%, 27%, 0.2)",
    backgroundColor: "hsl(174, 20%, 95%)",
    color: "hsl(174, 100%, 27%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: "20px",
    height: "20px",
  },
  contentSection: {
    flex: 1,
    minWidth: 0,
  },
  contentHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "8px",
  },
  notificationTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "hsl(174, 30%, 15%)",
    margin: 0,
    transition: "color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  timestamp: {
    fontSize: "14px",
    color: "hsl(174, 10%, 45%)",
    whiteSpace: "nowrap",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "12px",
  },
  viewButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    background:
      "linear-gradient(135deg, hsl(174, 100%, 27%), hsl(174, 85%, 35%))",
    color: "white",
    borderRadius: "8px",
    fontWeight: "500",
    fontSize: "14px",
    textDecoration: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    border: "none",
    cursor: "pointer",
  },
  arrow: {
    width: "16px",
    height: "16px",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  deleteButton: {
    padding: "8px 16px",
    fontSize: "14px",
    color: "hsl(0, 84.2%, 60.2%)",
    backgroundColor: "transparent",
    border: "1px solid hsl(0, 84.2%, 60.2%)",
    borderRadius: "8px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },
  deleteIcon: {
    width: "16px",
    height: "16px",
  },
  hoverOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "hsla(174, 100%, 27%, 0.05)",
    opacity: 0,
    transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    pointerEvents: "none",
  },
};

// Dark mode styles
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  styles.container.backgroundColor = "hsl(174, 30%, 8%)";
  styles.title.color = "hsl(174, 10%, 95%)";
  styles.subtitle.color = "hsl(174, 10%, 65%)";
  styles.emptyState.backgroundColor = "hsl(174, 25%, 12%)";
  styles.emptyState.borderColor = "hsl(174, 20%, 22%)";
  styles.emptyText.color = "hsl(174, 10%, 65%)";
  styles.notificationUnread.backgroundColor = "hsl(174, 25%, 12%)";
  styles.notificationUnread.borderColor = "hsl(174, 85%, 45%)";
  styles.notificationRead.backgroundColor = "hsl(174, 25%, 12%)";
  styles.notificationRead.borderColor = "hsl(174, 20%, 22%)";
  styles.iconContainer.backgroundColor = "hsl(174, 20%, 18%)";
  styles.notificationTitle.color = "hsl(174, 10%, 95%)";
}

// export default NotificationsPage;
import React, { useEffect, useState } from "react";
import { Bell, Trash2 } from "lucide-react";
import { supabase } from "../../lib/supabase ";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  // 🔹 جلب النوتيفيكيشن من Supabase
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
          read: false, // لسه مش مخزنة في DB
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
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.bellContainer}>
              <Bell style={styles.bellIcon} />
              {unreadCount > 0 && (
                <span style={styles.badge}>{unreadCount}</span>
              )}
            </div>
            <h1 style={styles.title}>Notifications</h1>
          </div>
          <p style={styles.subtitle}>
            Stay updated with your solar panel system status
          </p>
        </div>

        {/* Notifications List */}
        <div style={styles.notificationsList}>
          {notifications.length === 0 ? (
            <div style={styles.emptyState}>
              <Bell style={styles.emptyIcon} />
              <p style={styles.emptyText}>No notifications found</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                style={{
                  ...styles.notificationCard,
                  ...styles.notificationUnread,
                }}
              >
                <div style={styles.unreadIndicator} />

                <div style={styles.cardContent}>
                  <div style={styles.cardInner}>
                    <div style={styles.iconContainer}>
                      <Bell style={styles.icon} />
                    </div>

                    <div style={styles.contentSection}>
                      <div style={styles.contentHeader}>
                        <h3 style={styles.notificationTitle}>
                          {notification.title}
                        </h3>
                        <span style={styles.timestamp}>
                          {formatDate(notification.date)}
                        </span>
                      </div>

                      <div style={styles.actions}>
                        <a href={notification.link} style={styles.viewButton}>
                          View Details
                        </a>

                        <button
                          onClick={() => deleteNotification(notification.id)}
                          style={styles.deleteButton}
                        >
                          <Trash2 style={styles.deleteIcon} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={styles.hoverOverlay} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
