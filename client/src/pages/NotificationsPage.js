import { useEffect, useState } from 'react';
import NotificationList from '../components/notifications/NotificationList';
import { fetchNotifications, markNotificationRead } from '../services/notificationService';

export default function NotificationsPage() {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    const data = await fetchNotifications();
    setItems(data);
  };

  useEffect(() => { loadItems(); }, []);

  const handleRead = async id => {
    await markNotificationRead(id);
    loadItems();
  };

  return (
    <div>
      <h3 className="mb-3">Notifications</h3>
      <NotificationList items={items} onRead={handleRead} />
    </div>
  );
}
