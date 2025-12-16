import { useContext } from 'react';
import { NotificationContext } from '../services/NotificationContext';

export const useNotify = () => useContext(NotificationContext)!;
