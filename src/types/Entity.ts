export type PriorityLevel = 'Alta' | 'Media' | 'Baja';
export type TicketStatus = 'Abierto' | 'En Proceso' | 'Resuelto';

export interface EntityItem {
  id: string;
  title: string;
  department: string;
  priority: PriorityLevel;
  status: TicketStatus;
  description: string;
  createdAt?: string;
}