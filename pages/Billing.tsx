import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { MOCK_INVOICES } from '../constants';
import { InvoiceType } from '../types';
import { FileText, Download, Send, CheckCircle2, AlertTriangle, Plus } from 'lucide-react';

export const Billing: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="flex items-center gap-4 border-green-500/30 bg-green-500/10">
          <div className="p-3 rounded-full bg-green-500/20 text-green-600">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Estado ARCA (AFIP)</p>
            <p className="text-lg font-bold text-green-600">Conectado</p>
          </div>
        </GlassCard>
        <GlassCard className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-blue-500/20 text-blue-600">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Facturado Mes</p>
            <p className="text-lg font-bold text-gray-800">$2.450.000</p>
          </div>
        </GlassCard>
        <GlassCard className="flex items-center gap-4">
           <div className="p-3 rounded-full bg-yellow-500/20 text-yellow-600">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pendientes</p>
            <p className="text-lg font-bold text-gray-800">3 Comprobantes</p>
          </div>
        </GlassCard>
      </div>

      {/* Main Table Area */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-white/30">
          <h2 className="text-lg font-semibold text-gray-800">Comprobantes Emitidos</h2>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-xl font-medium text-sm transition-all shadow-lg shadow-green-500/25"
          >
            <Plus size={16} /> Nueva Factura
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/30 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Número</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4 text-right">Monto</th>
                <th className="px-6 py-4 text-center">Estado</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20">
              {MOCK_INVOICES.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/20 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded border ${inv.type === InvoiceType.A ? 'border-purple-500/50 text-purple-600' : 'border-blue-500/50 text-blue-600'} text-xs font-bold`}>
                      {inv.type === InvoiceType.A ? 'A' : 'B'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-gray-600">{inv.number}</td>
                  <td className="px-6 py-4 text-gray-500">{inv.date}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{inv.clientName}</div>
                    <div className="text-xs text-gray-500">{inv.cuit}</div>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-gray-800">
                    ${inv.amount.toLocaleString('es-AR')}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${inv.status === 'Pagada' ? 'bg-green-500/20 text-green-600' : 'bg-yellow-500/20 text-yellow-600'}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button className="p-1.5 hover:bg-white/30 rounded text-gray-500 hover:text-gray-700" title="Descargar PDF">
                        <Download size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-white/30 rounded text-gray-500 hover:text-gray-700" title="Enviar Email">
                        <Send size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-2xl bg-white/90 border-white/50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Emitir Nueva Factura</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Tipo de Comprobante</label>
                <select className="w-full bg-white/30 border border-white/30 rounded-xl px-3 py-2 text-sm text-gray-700">
                  <option>Factura B (Consumidor Final)</option>
                  <option>Factura A (Resp. Inscripto)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Punto de Venta</label>
                <select className="w-full bg-white/30 border border-white/30 rounded-xl px-3 py-2 text-sm text-gray-700">
                  <option>0001 - Principal</option>
                </select>
              </div>
            </div>

            <div className="border border-white/30 rounded-xl p-4 mb-6 bg-white/20">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Cliente</span>
                <span className="font-medium text-green-600 cursor-pointer">+ Buscar</span>
              </div>
              <p className="font-semibold text-lg text-gray-800">Juan Pérez</p>
              <p className="text-sm text-gray-500">CUIT: 20-33445566-7</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm text-gray-500 border-b border-white/30 pb-2">
                <span>Concepto</span>
                <span>Subtotal</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                 <span>Servicio Técnico - Reparación #52</span>
                 <span>$40.000</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-4 border-t border-white/30 text-gray-800">
                 <span>TOTAL</span>
                 <span>$40.000</span>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl hover:bg-white/30 transition-colors text-sm text-gray-600">Cancelar</button>
              <button className="px-6 py-2 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-xl text-sm shadow-lg shadow-green-500/25">
                Emitir (CAE)
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};
