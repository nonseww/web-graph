import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

interface Notification {
  type: 'success' | 'error' | null;
  message: string | null;
}

interface NotificationContextType {
  notification: Notification;
  notify: (n: Notification) => void;
  clear: () => void;
}

export const NotificationContext =
  createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification>({
    type: null,
    message: null,
  });

  const notify = (n: Notification) => setNotification(n);
  const clear = () => setNotification({ type: null, message: null });

  return (
    <NotificationContext.Provider value={{ notification, notify, clear }}>
      {children}
    </NotificationContext.Provider>
  );
};
