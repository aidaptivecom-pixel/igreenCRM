import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { MOCK_SALE_ORDERS } from '../constants';
import { SaleOrder, SaleStatus } from '../types';
import { 
  ShoppingCart, DollarSign, Filter, Plus, CreditCard, Banknote, 
  Truck, Store, Package, CheckCircle, XCircle, MoreVertical, 
  Printer, Send, AlertTriangle, ArrowRight, User, Search
} from 'lucide-react';

const COLUMNS: { status: SaleStatus, label: string, color: string }[] = [
  { status: 'Pendiente pago', label: 'Pendiente Pago', color: 'border-yellow-500' },
  { status: 'Preparando', label: 'Preparando', color: 'border-blue-500' },
  { status: 'Enviado', label: 'Enviado', color: 'border-orange-500' },
  { status: 'Entregado', label: 'Entregado', color: 'border-green-500' },
];

const getStatusColor = (status: SaleStatus) => {
  switch(status) {
    case 'Pendiente pago': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'Preparando': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'Enviado': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    case 'Entregado': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'Cancelado': return 'bg-red-500/20 text-red-400 border-red-500/30';
    default: return 'bg-gray-500/20 text-gray-400';
  }
};

const getPaymentIcon = (method: string) => {
  switch(method) {
    case 'MercadoPago': return <CreditCard size={14} className="text-blue-400" />;
    case 'Efectivo': return <Banknote size={14} className="text-green-400" />;
    case 'Transferencia': return <Banknote size={14} className="text-purple-400" />;
    default: return <CreditCard size={14} />;
  }
};

const getDeliveryIcon = (type: string) => {
  switch(type) {
    case 'Retiro': return <Store size={14} className="text-orange-400" />;
    default: return <Truck size={14} className="text-cyan-400" />;
  }
};

export const Sales: React.FC = () => {
  const [orders, setOrders] = useState<SaleOrder[]>(MOCK_SALE_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<SaleOrder | null>(null);
  const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);
  const [showCancelled, setShowCancelled] = useState(false);

  // Stats Calculations
  const today = '2025-12-04'; // Mock today
  const salesToday = orders
    .filter(o => o.createdAt.startsWith(today) && o.status !== 'Cancelado')
    .reduce((acc, o) => acc + o.total, 0);
  
  const salesWeek = 892000; // Mocked for simplicity
  const pendingOrders = orders.filter(o => o.status === 'Pendiente pago' || o.status === 'Preparando').length;
  const avgTicket = salesToday > 0 
    ? salesToday / orders.filter(o => o.createdAt.startsWith(today) && o.status !== 'Cancelado').length 
    : 0;

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-6">
      {/* 1. Header & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <GlassCard className="p-4 flex items-center gap-4 min-w-[180px]">
             <div className="p-3 bg-green-500/20 rounded-full text-green-400">
               <DollarSign size={20} />
             </div>
             <div>
               <p className="text-xs text-gray-400 uppercase">Hoy</p>
               <p className="text-lg font-bold">${salesToday.toLocaleString()}</p>
             </div>
          </GlassCard>
          <GlassCard className="p-4 flex items-center gap-4 min-w-[180px]">
             <div className="p-3 bg-blue-500/20 rounded-full text-blue-400">
               <DollarSign size={20} />
             </div>
             <div>
               <p className="text-xs text-gray-400 uppercase">Semana</p>
               <p className="text-lg font-bold">${salesWeek.toLocaleString()}</p>
             </div>
          </GlassCard>
          <GlassCard className="p-4 flex items-center gap-4 min-w-[180px]">
             <div className="p-3 bg-yellow-500/20 rounded-full text-yellow-400">
               <Package size={20} />
             </div>
             <div>
               <p className="text-xs text-gray-400 uppercase">Pendientes</p>
               <p className="text-lg font-bold">{pendingOrders}</p>
             </div>
          </GlassCard>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => setShowCancelled(!showCancelled)}
            className={`btn-secondary text-sm ${showCancelled ? 'bg-red-500/20 border-red-500/30' : ''}`}
          >
            {showCancelled ? 'Ocultar Cancelados' : 'Ver Cancelados'}
          </button>
          <button onClick={() => setIsNewSaleOpen(true)} className="btn-primary flex items-center gap-2">
            <Plus size={18} /> Nueva Venta
          </button>
        </div>
      </div>

      {/* 2. Kanban Board */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-6 h-full min-w-[1200px] pb-4">
          {[
            ...COLUMNS,
            ...(showCancelled ? [{ status: 'Cancelado' as SaleStatus, label: 'Cancelado', color: 'border-red-500' }] : [])
          ].map((col) => {
            const colOrders = orders.filter(o => o.status === col.status);
            
            return (
              <div key={col.status} className="w-1/4 flex flex-col min-w-[280px]">
                <div className={`flex items-center justify-between mb-4 pb-2 border-b-2 ${col.color}`}>
                  <h3 className="font-medium text-gray-200">{col.label}</h3>
                  <span className="bg-white/10 px-2 py-0.5 rounded text-xs text-gray-400">{colOrders.length}</span>
                </div>
                
                <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                  {colOrders.map((order) => (
                    <GlassCard 
                      key={order.id} 
                      onClick={() => setSelectedOrder(order)}
                      className="p-4 cursor-pointer hover:border-white/30 group relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start mb-2 relative z-10">
                        <span className="text-xs font-mono font-bold bg-white/10 px-1.5 py-0.5 rounded text-white">{order.id}</span>
                        <span className="text-xs text-gray-500">{order.createdAt.split('T')[0] === today ? 'Hoy' : 'Ayer'}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2 relative z-10">
                         <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-[10px] font-bold">
                            {order.clientName.charAt(0)}
                         </div>
                         <span className="text-sm font-medium truncate">{order.clientName}</span>
                      </div>

                      <div className="flex justify-between items-center mb-3 relative z-10">
                         <span className="text-xs text-gray-400">{order.items.length} items</span>
                         <span className="text-sm font-bold text-green-400">${order.total.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs text-gray-400 border-t border-white/5 pt-3 relative z-10">
                         <div className="flex items-center gap-1">
                            {getPaymentIcon(order.paymentMethod)}
                            <span className="truncate max-w-[60px]">{order.paymentMethod}</span>
                         </div>
                         <div className="flex items-center gap-1">
                            {getDeliveryIcon(order.deliveryType)}
                            <span className="truncate max-w-[60px]">{order.deliveryType}</span>
                         </div>
                         {order.trackingNumber && (
                           <div className="ml-auto text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded">
                             {order.trackingNumber.slice(-4)}...
                           </div>
                         )}
                      </div>

                      {/* Hover effect gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </GlassCard>
                  ))}
                  {colOrders.length === 0 && (
                    <div className="h-24 rounded-2xl border-2 border-dashed border-white/5 flex items-center justify-center text-xs text-gray-600">
                      Vacío
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-2xl bg-[#141414] border-white/20 animate-in slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-2xl font-bold">{selectedOrder.id}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs border ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <p className="text-sm text-gray-400">Creado el {new Date(selectedOrder.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <XCircle size={24} className="text-gray-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
               {/* Client Info */}
               <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    <User size={16} /> Cliente
                  </h4>
                  <div className="space-y-1">
                    <p className="font-medium">{selectedOrder.clientName}</p>
                    <p className="text-sm text-gray-400">{selectedOrder.clientEmail}</p>
                    <p className="text-sm text-gray-400">{selectedOrder.clientPhone}</p>
                  </div>
               </div>

               {/* Shipping Info */}
               <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    <Truck size={16} /> Envío
                  </h4>
                  <div className="space-y-1">
                    <p className="font-medium">{selectedOrder.deliveryType}</p>
                    {selectedOrder.shippingAddress && (
                      <p className="text-sm text-gray-400">{selectedOrder.shippingAddress}</p>
                    )}
                    {selectedOrder.trackingNumber ? (
                      <div className="mt-2">
                        <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded cursor-pointer hover:bg-blue-500/20">
                          Tracking: {selectedOrder.trackingNumber}
                        </span>
                      </div>
                    ) : (
                      selectedOrder.status === 'Enviado' && <p className="text-xs text-yellow-500">Sin tracking asignado</p>
                    )}
                  </div>
               </div>
            </div>

            {/* Products Table */}
            <div className="mb-6 border border-white/10 rounded-xl overflow-hidden">
               <table className="w-full text-sm text-left">
                  <thead className="bg-white/5 text-gray-400 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3">Producto</th>
                      <th className="px-4 py-3 text-center">Cant</th>
                      <th className="px-4 py-3 text-right">Precio</th>
                      <th className="px-4 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 bg-black/20">
                    {selectedOrder.items.map((item, i) => (
                      <tr key={i}>
                        <td className="px-4 py-3">{item.name}</td>
                        <td className="px-4 py-3 text-center text-gray-400">{item.quantity}</td>
                        <td className="px-4 py-3 text-right text-gray-400">${item.unitPrice.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right font-medium">${item.subtotal.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>

            {/* Totals & Payment */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
               <div className="flex-1 p-4 rounded-xl bg-white/5 border border-white/5">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    <CreditCard size={16} /> Pago
                  </h4>
                  <div className="flex justify-between items-center text-sm mb-2">
                     <span className="text-gray-400">Método</span>
                     <span>{selectedOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mb-2">
                     <span className="text-gray-400">Estado</span>
                     <span className={selectedOrder.paymentStatus === 'Pagado' ? 'text-green-400' : 'text-yellow-400'}>
                       {selectedOrder.paymentStatus}
                     </span>
                  </div>
                  {selectedOrder.mercadoPagoId && (
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">ID Transacción</span>
                        <span className="font-mono text-xs">{selectedOrder.mercadoPagoId}</span>
                     </div>
                  )}
               </div>

               <div className="flex-1 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>${selectedOrder.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Envío</span>
                    <span>{selectedOrder.shippingCost > 0 ? `$${selectedOrder.shippingCost.toLocaleString()}` : 'Gratis'}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Descuento</span>
                      <span>-${selectedOrder.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold pt-3 border-t border-white/10">
                    <span>Total</span>
                    <span>${selectedOrder.total.toLocaleString()}</span>
                  </div>
               </div>
            </div>

            {/* Actions Footer */}
            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
               {selectedOrder.status !== 'Cancelado' && (
                 <button className="px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors text-sm flex items-center gap-2">
                   <XCircle size={16} /> Cancelar Pedido
                 </button>
               )}
               
               <button className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-sm flex items-center gap-2">
                 <Printer size={16} /> Imprimir
               </button>

               {selectedOrder.status === 'Pendiente pago' && (
                 <button className="btn-secondary text-sm flex items-center gap-2">
                   <Send size={16} /> Enviar Link Pago
                 </button>
               )}

               {selectedOrder.status === 'Preparando' && (
                 <button className="btn-primary text-sm flex items-center gap-2">
                   <Truck size={16} /> Marcar Enviado
                 </button>
               )}
            </div>

          </GlassCard>
        </div>
      )}

      {/* 4. New Sale Modal (Mock) */}
      {isNewSaleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-lg bg-[#141414] border-white/20 animate-in slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Nueva Venta</h3>
              <button onClick={() => setIsNewSaleOpen(false)} className="text-gray-400 hover:text-white">
                <XCircle size={20} />
              </button>
            </div>
            
            <form className="space-y-4">
               {/* Client Search */}
               <div>
                  <label className="block text-xs text-gray-400 mb-1 ml-1">Cliente</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input type="text" placeholder="Buscar cliente..." className="glass-input w-full pl-10" />
                  </div>
               </div>

               {/* Products Mock */}
               <div>
                  <label className="block text-xs text-gray-400 mb-1 ml-1">Productos</label>
                  <div className="border border-white/10 rounded-xl p-4 bg-white/5 min-h-[100px] flex items-center justify-center text-gray-500 text-sm cursor-pointer hover:bg-white/10 transition-colors">
                     + Agregar Productos
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs text-gray-400 mb-1 ml-1">Método de Pago</label>
                    <select className="glass-input w-full">
                      <option>Efectivo</option>
                      <option>MercadoPago</option>
                      <option>Transferencia</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs text-gray-400 mb-1 ml-1">Entrega</label>
                    <select className="glass-input w-full">
                      <option>Retiro en Local</option>
                      <option>Envío a Domicilio</option>
                    </select>
                 </div>
               </div>

               <div className="pt-4 flex justify-end gap-3">
                 <button type="button" onClick={() => setIsNewSaleOpen(false)} className="btn-secondary text-sm">Cancelar</button>
                 <button type="button" onClick={() => setIsNewSaleOpen(false)} className="btn-primary text-sm">Crear Venta</button>
               </div>
            </form>
          </GlassCard>
        </div>
      )}

    </div>
  );
};