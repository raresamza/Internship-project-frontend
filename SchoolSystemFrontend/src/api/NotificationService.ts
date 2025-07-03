import axios from 'axios';
import api from '../utils/axios';
// const API_URL = 'https://localhost:7213/api/Notification';
const API_PREFIX = '/Notification';

export interface Notification {
    id: number;
    message: string;
    createdAt: string;
    isRead: boolean;
    type?: string;
  }


  export const fetchNotifications = async (): Promise<Notification[]> => {
    const response = await api.get<Notification[]>(`${API_PREFIX}`);
    return response.data;
  };

// Fetch unread notification count
export const fetchUnreadNotificationCount = async (): Promise<number> => {
    const response = await api.get<number>(`${API_PREFIX}/unread-count`);
    return response.data;
  };

export async function markNotificationAsRead(id: number): Promise<void> {
    await api.post(`${API_PREFIX}/mark-as-read/${id}`, null, {
      params: { id }
    });
  }