import { Alert, Box, Button, Stack } from '@mui/joy';
import { FC, PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type NotificationSeverity = 'success' | 'warning' | 'danger' | 'neutral';

interface INotification {
  title: string;
  message: string;
  severity: NotificationSeverity;
  /**
   * Clears the notification after the specified time in milliseconds.
   * 0 means it will not clear automatically. Default is 6000ms (6 seconds).
   */
  clearAfter?: number; // in milliseconds
}

interface INotificationContextType {
  notify: (notification: string | INotification, severity?: NotificationSeverity) => void;
}

const NotificationContext = createContext<INotificationContextType>({
  notify: () => {},
});

export const useNotification = (): INotificationContextType => useContext(NotificationContext);

export const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [notification, setNotification] = useState<INotification | null>(null);

  const notify = useCallback((_notification: string | INotification, severity: NotificationSeverity = 'danger') => {
    if (typeof _notification === 'string') {
      setNotification({ title: '', message: _notification, severity, clearAfter: 6000 });
    } else {
      setNotification(_notification);
    }
  }, []);

  useEffect(() => {
    if (!notification) return undefined;
    if (notification.clearAfter === 0) return undefined;
    const timer = setTimeout(() => setNotification(null), notification.clearAfter ?? 6000);
    return () => clearTimeout(timer);
  }, [notification]);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {notification && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            maxWidth: 'max-content',
            width: '90%',
          }}
        >
          <Alert
            color={notification.severity}
            variant="outlined"
            sx={{ whiteSpace: 'pre-wrap', cursor: 'pointer' }}
            onClick={() => setNotification(null)}
          >
            <Stack>
              <p style={{ fontWeight: 'bold' }}>{notification.title}</p>
              <p>{notification.message}</p>
              {notification.clearAfter === 0 && (
                <Button variant="soft" color={notification.severity} onClick={() => setNotification(null)}>
                  Aceptar
                </Button>
              )}
            </Stack>
          </Alert>
        </Box>
      )}
    </NotificationContext.Provider>
  );
};
