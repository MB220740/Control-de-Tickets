import { EntityItem } from '../types/Entity';
import { api } from './api';

export const getItems = async (): Promise<EntityItem[]> => {
  const response = await api.get<EntityItem[]>('/tickets');
  return response.data;
};

export const getItemById = async (id: string): Promise<EntityItem> => {
  const response = await api.get<EntityItem>(`/tickets/${id}`);
  return response.data;
};

export const createItem = async (data: Omit<EntityItem, 'id'>): Promise<EntityItem> => {
  const response = await api.post<EntityItem>('/tickets', data);
  return response.data;
};

export const updateItem = async (id: string, data: Partial<EntityItem>): Promise<EntityItem> => {
  const response = await api.put<EntityItem>(`/tickets/${id}`, data);
  return response.data;
};

export const deleteItem = async (id: string): Promise<void> => {
  await api.delete(`/tickets/${id}`);
};