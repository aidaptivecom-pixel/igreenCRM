
export interface KPI {
  label: string;
  value: string;
  trend: number;
  trendUp: boolean;
  icon: string;
}

export enum RepairStatus {
  RECEIVED = 'Recibido',
  DIAGNOSTIC = 'Diagnóstico',
  APPROVAL = 'Aprobación',
  REPAIRING = 'En Reparación',
  READY = 'Listo',
  DELIVERED = 'Entregado'
}

export enum InvoiceType {
  A = 'Factura A',
  B = 'Factura B',
  C = 'Factura C'
}

export interface ClientActivity {
  date: string;
  action: string;
  detail: string;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: 'Particular' | 'Empresa';
  origin?: 'WhatsApp' | 'Instagram' | 'Google' | 'Referido' | 'Local' | 'MercadoLibre' | 'Web';
  totalSpent: number;
  repairsCount?: number;
  purchasesCount?: number;
  lastVisit?: string;
  tags: string[];
  createdAt?: string;
  activity?: ClientActivity[];
}

export interface RepairOrder {
  id: string;
  device: string;
  issue: string;
  client: Client;
  status: RepairStatus;
  cost: number;
  dateIn: string;
  dateOutEst: string;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isMe: boolean;
  channel: 'whatsapp' | 'instagram' | 'email' | 'web';
}

export interface Conversation {
  id: string;
  clientName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  channel: 'whatsapp' | 'instagram' | 'email' | 'web';
  status: 'urgent' | 'pending' | 'resolved';
  messages: Message[];
}

export interface Sale {
  id: string;
  date: string;
  clientName: string;
  items: string[];
  total: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Delivered';
}

export interface Invoice {
  id: string;
  number: string;
  type: InvoiceType;
  clientName: string;
  cuit: string;
  amount: number;
  date: string;
  status: 'Pagada' | 'Pendiente' | 'Anulada';
}

export type AppointmentType = 'Reparación' | 'Diagnóstico' | 'Colocación' | 'Entrega' | 'Presupuesto';
export type AppointmentStatus = 'Confirmado' | 'Pendiente' | 'Cancelado' | 'Completado' | 'NoShow';

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  phone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  duration: number; // minutos
  type: AppointmentType;
  device: string;
  service: string;
  status: AppointmentStatus;
  notes?: string;
  googleCalendarId?: string;
  notificationsSent: {
    confirmation: boolean;
    reminder24h: boolean;
    reminder2h: boolean;
  };
}

export type PaymentMethod = 'MercadoPago' | 'Efectivo' | 'Transferencia' | 'Débito' | 'Crédito';
export type PaymentStatus = 'Pendiente' | 'Pagado' | 'Reembolsado';
export type DeliveryType = 'Retiro' | 'Envío domicilio' | 'Envío sucursal';
export type SaleStatus = 'Pendiente pago' | 'Preparando' | 'Enviado' | 'Entregado' | 'Cancelado';

export interface SaleItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface SaleOrder {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  items: SaleItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  status: SaleStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  mercadoPagoId?: string;
  deliveryType: DeliveryType;
  shippingAddress?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export type ProductType = 'Repuesto' | 'Venta' | 'Ambos';
export type MovementType = 'Compra' | 'Venta' | 'Uso reparación' | 'Ajuste' | 'Devolución';

export interface StockMovement {
  id: string;
  date: string;
  type: MovementType;
  quantity: number; // positivo = entrada, negativo = salida
  reference?: string; // ID venta o reparación
  notes?: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  description?: string;
  type: ProductType;
  category: string;
  compatibleDevices?: string[];
  costUSD?: number;
  costARS: number;
  priceARS: number;
  priceWithInstall?: number;
  stock: number;
  stockCommitted: number;
  stockAvailable: number; // calculado
  alertMin: number;
  supplier?: string;
  warrantyDays?: number;
  image?: string;
  visibleWeb: boolean;
  featured: boolean;
  movements?: StockMovement[];
  createdAt: string;
  updatedAt: string;
}
