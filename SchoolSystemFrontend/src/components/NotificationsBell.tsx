import { Bell } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { fetchNotifications, fetchUnreadNotificationCount, markNotificationAsRead } from '../api/NotificationService';
import { Notification } from '../api/NotificationService';

const NotificationsBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fetchData = async () => {
    const notifs = await fetchNotifications();
    const count = await fetchUnreadNotificationCount();

    setNotifications(notifs);
    setUnreadCount(count);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const count = await fetchUnreadNotificationCount();
      setUnreadCount(count);
    }, 10000); 
  
    return () => clearInterval(interval); 
  }, []);

  const handleBellClick = async () => {
    setDropdownOpen(prev => !prev);
    await fetchData();
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      await markNotificationAsRead(notification.id);
      toast.success("Marked as read!");
      await fetchData();
    }
  };

  useEffect(() => {
    fetchUnreadNotificationCount().then(setUnreadCount);
  }, []);

  return (
    <div className="relative inline-block text-left">
      <button
        className="relative p-2 rounded-full hover:bg-gray-100"
        onClick={handleBellClick}
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-md border rounded-md z-50">
          <div className="p-2 border-b font-semibold">Notifications</div>
          {notifications.length === 0 ? (
            <div className="p-4 text-gray-500 text-sm text-center">No notifications</div>
          ) : (
            <ul className="max-h-64 overflow-y-auto">
              {notifications.map(notification => (
                <li
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`cursor-pointer px-4 py-2 border-b hover:bg-gray-100 ${
                    !notification.isRead ? 'font-semibold' : 'text-gray-500'
                  }`}
                >
                  {notification.message}
                  <div className="text-xs text-gray-400">{new Date(notification.createdAt).toLocaleString()}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsBell;
