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
    case 'Pendiente pago': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
    case 'Preparando': return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
    case 'Enviado': return 'bg-orange-500/20 text-orange-700 border-orange-500/30';
    case 'Entregado': return 'bg-green-500/20 text-green-700 border-green-500/30';
    case 'Cancelado': return 'bg-red-500/20 text-red-700 border-red-500/30';
    default: return 'bg-gray-500/20 text-gray-600';
  }
};

const getPaymentIcon = (method: string) => {
  switch(method) {
    case 'MercadoPago': return <CreditCard size={14} className="text-blue-500" />;
    case 'Efectivo': return <Banknote size={14} className="text-green-500" />;
    case 'Transferencia': return <Banknote size={14} className="text-purple-500" />;
    default: return <CreditCard size={14} />;
  }
};

const getDeliveryIcon = (type: string) => {
  switch(type) {
    case 'Retiro': return <Store size={14} className="text-orange-500" />;
    default: return <Truck size={14} className="text-cyan-500" />;
  }
};

export const Sales: React.FC = () => {
  const [orders, setOrders] = useState<SaleOrder[]>(MOCK_SALE_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<SaleOrder | null>(null);
  const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);
  const [showCancelled, setShowCancelled] = useState(false);

  const today = '2025-12-04';
  const salesToday = orders
    .filter(o => o.createdAt.startsWith(today) && o.status !== 'Cancelado')
    .reduce((acc, o) => acc + o.total, 0);
  
  const salesWeek = 892000;
  const pendingOrders = orders.filter(o => o.status === 'Pendiente pago' || o.status === 'Preparando').length;

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-6">
      {/* 1. Header & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <GlassCard className="p-4 flex items-center gap-4 min-w-[180px]">
             <div className="p-3 bg-green-500/20 rounded-full text-green-600">
               <DollarSign size={20} />
             </div>
             <div>
               <p className="text-xs text-gray-500 uppercase">Hoy</p>
               <p className="text-lg font-bold text-gray-800">${salesToday.toLocaleString()}</p>
             </div>
          </GlassCard>
          <GlassCard className="p-4 flex items-center gap-4 min-w-[180px]">
             <div className="p-3 bg-blue-500/20 rounded-full text-blue-600">
               <DollarSign size={20} />
             </div>
             <div>
               <p className="text-xs text-gray-500 uppercase">Semana</p>
               <p className="text-lg font-bold text-gray-800">${salesWeek.toLocaleString()}</p>
             </div>
          </GlassCard>
          <GlassCard className="p-4 flex items-center gap-4 min-w-[180px]">
             <div className="p-3 bg-yellow-500/20 rounded-full text-yellow-600">
               <Package size={20} />
             </div>
             <div>
               <p className="text-xs text-gray-500 uppercase">Pendientes</p>
               <p className="text-lg font-bold text-gray-800">{pendingOrders}</p>
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
                  <h3 className="font-medium text-gray-700">{col.label}</h3>
                  <span className="bg-white/40 px-2 py-0.5 rounded text-xs text-gray-600">{colOrders.length}</span>
                </div>
                
                <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                  {colOrders.map((order) => (
                    <GlassCard 
                      key={order.id} 
                      onClick={() => setSelectedOrder(order)}
                      className="p-4 cursor-pointer hover:border-white/50 group relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start mb-2 relative z-10">
                        <span className="text-xs font-mono font-bold bg-white/40 px-1.5 py-0.5 rounded text-gray-800">{order.id}</span>
                        <span className="text-xs text-gray-500">{order.createdAt.split('T')[0] === today ? 'Hoy' : 'Ayer'}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2 relative z-10">
                         <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 flex items-center justify-center text-[10px] font-bold text-white">
                            {order.clientName.charAt(0)}
                         </div>
                         <span className="text-sm font-medium truncate text-gray-800">{order.clientName}</span>
                      </div>

                      <div className="flex justify-between items-center mb-3 relative z-10">
                         <span className="text-xs text-gray-500">{order.items.length} items</span>
                         <span className="text-sm font-bold text-green-600">${order.total.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs text-gray-500 border-t border-white/30 pt-3 relative z-10">
                         <div className="flex items-center gap-1">
                            {getPaymentIcon(order.paymentMethod)}
                            <span className="truncate max-w-[60px]">{order.paymentMethod}</span>
                         </div>
                         <div className="flex items-center gap-1">
                            {getDeliveryIcon(order.deliveryType)}
                            <span className="truncate max-w-[60px]">{order.deliveryType}</span>
                         </div>
                         {order.trackingNumber && (
                           <div className="ml-auto text-[10px] bg-blue-500/15 text-blue-600 px-1.5 py-0.5 rounded">
                             {order.trackingNumber.slice(-4)}...
                           </div>
                         )}
                      </div>
                    </GlassCard>
                  ))}
                  {colOrders.length === 0 && (
                    <div className="h-24 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-2xl bg-white/90 border-white/50 animate-in slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-2xl font-bold text-gray-800">{selectedOrder.id}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs border ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">Creado el {new Date(selectedOrder.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-1 hover:bg-white/30 rounded-full transition-colors">
                <XCircle size={24} className="text-gray-500" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
               <div className="p-4 rounded-xl bg-white/30 border border-white/30">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                    <User size={16} /> Cliente
                  </h4>
                  <div className="space-y-1">
                    <p className="font-medium text-gray-800">{selectedOrder.clientName}</p>
                    <p className="text-sm text-gray-500">{selectedOrder.clientEmail}</p>
                    <p className="text-sm text-gray-500">{selectedOrder.clientPhone}</p>
                  </div>
               </div>

               <div className="p-4 rounded-xl bg-white/30 border border-white/30">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                    <Truck size={16} /> Envío
                  </h4>
                  <div className="space-y-1">
                    <p className="font-medium text-gray-800">{selectedOrder.deliveryType}</p>
                    {selectedOrder.shippingAddress && (
                      <p className="text-sm text-gray-500">{selectedOrder.shippingAddress}</p>
                    )}
                    {selectedOrder.trackingNumber ? (
                      <div className="mt-2">
                        <span className="text-xs text-blue-600 bg-blue-500/15 px-2 py-1 rounded cursor-pointer hover:bg-blue-500/25">
                          Tracking: {selectedOrder.trackingNumber}
                        </span>
                      </div>
                    ) : (
                      selectedOrder.status === 'Enviado' && <p className="text-xs text-yellow-600">Sin tracking asignado</p>
                    )}
                  </div>
               </div>
            </div>

            <div className="mb-6 border border-white/30 rounded-xl overflow-hidden">
               <table className="w-full text-sm text-left">
                  <thead className="bg-white/30 text-gray-600 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3">Producto</th>
                      <th className="px-4 py-3 text-center">Cant</th>
                      <th className="px-4 py-3 text-right">Precio</th>
                      <th className="px-4 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/20 bg-white/20">
                    {selectedOrder.items.map((item, i) => (
                      <tr key={i}>
                        <td className="px-4 py-3 text-gray-800">{item.name}</td>
                        <td className="px-4 py-3 text-center text-gray-500">{item.quantity}</td>
                        <td className="px-4 py-3 text-right text-gray-500">${item.unitPrice.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right font-medium text-gray-800">${item.subtotal.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-8">
               <div className="flex-1 p-4 rounded-xl bg-white/30 border border-white/30">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                    <CreditCard size={16} /> Pago
                  </h4>
                  <div className="flex justify-between items-center text-sm mb-2">
                     <span className="text-gray-500">Método</span>
                     <span className="text-gray-800">{selectedOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mb-2">
                     <span className="text-gray-500">Estado</span>
                     <span className={selectedOrder.paymentStatus === 'Pagado' ? 'text-green-600' : 'text-yellow-600'}>
                       {selectedOrder.paymentStatus}
                     </span>
                  </div>
                  {selectedOrder.mercadoPagoId && (
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">ID Transacción</span>
                        <span className="font-mono text-xs text-gray-600">{selectedOrder.mercadoPagoId}</span>
                     </div>
                  )}
               </div>

               <div className="flex-1 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>${selectedOrder.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Envío</span>
                    <span>{selectedOrder.shippingCost > 0 ? `$${selectedOrder.shippingCost.toLocaleString()}` : 'Gratis'}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Descuento</span>
                      <span>-${selectedOrder.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold pt-3 border-t border-white/30 text-gray-800">
                    <span>Total</span>
                    <span>${selectedOrder.total.toLocaleString()}</span>
                  </div>
               </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/30">
               {selectedOrder.status !== 'Cancelado' && (
                 <button className="px-4 py-2 rounded-xl border border-red-500/30 text-red-600 hover:bg-red-500/10 transition-colors text-sm flex items-center gap-2">
                   <XCircle size={16} /> Cancelar Pedido
                 </button>
               )}
               
               <button className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-white/30 transition-colors text-sm flex items-center gap-2 text-gray-600">
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

      {/* 4. New Sale Modal */}
      {isNewSaleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-lg bg-white/90 border-white/50 animate-in slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Nueva Venta</h3>
              <button onClick={() => setIsNewSaleOpen(false)} className="text-gray-400 hover:text-gray-600">
                <XCircle size={20} />
              </button>
            </div>
            
            <form className="space-y-4">
               <div>
                  <label className="block text-xs text-gray-500 mb-1 ml-1">Cliente</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input type="text" placeholder="Buscar cliente..." className="glass-input w-full pl-10" />
                  </div>
               </div>

               <div>
                  <label className="block text-xs text-gray-500 mb-1 ml-1">Productos</label>
                  <div className="border border-white/30 rounded-xl p-4 bg-white/20 min-h-[100px] flex items-center justify-center text-gray-500 text-sm cursor-pointer hover:bg-white/30 transition-colors">
                     + Agregar Productos
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs text-gray-500 mb-1 ml-1">Método de Pago</label>
                    <select className="glass-input w-full">
                      <option>Efectivo</option>
                      <option>MercadoPago</option>
                      <option>Transferencia</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs text-gray-500 mb-1 ml-1">Entrega</label>
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
