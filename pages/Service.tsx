import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { MOCK_REPAIRS } from '../constants';
import { RepairStatus } from '../types';
import { Smartphone, Laptop, Tablet, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const COLUMNS = [
  { id: RepairStatus.RECEIVED, title: 'Recibido', color: 'border-blue-500' },
  { id: RepairStatus.DIAGNOSTIC, title: 'Diagnóstico', color: 'border-purple-500' },
  { id: RepairStatus.REPAIRING, title: 'En Proceso', color: 'border-yellow-500' },
  { id: RepairStatus.READY, title: 'Listo', color: 'border-green-500' },
];

export const Service: React.FC = () => {
  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Tablero de Reparaciones</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-400 transition-colors shadow-lg shadow-green-500/25">
          + Nueva Orden
        </button>
      </div>

      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-6 h-full min-w-[1000px] pb-4">
          {COLUMNS.map((col) => {
            const repairs = MOCK_REPAIRS.filter(r => r.status === col.id);
            
            return (
              <div key={col.id} className="w-1/4 flex flex-col">
                <div className={`flex items-center justify-between mb-4 pb-2 border-b-2 ${col.color}`}>
                  <h3 className="font-medium text-gray-700">{col.title}</h3>
                  <span className="bg-white/40 px-2 py-0.5 rounded text-xs text-gray-600">{repairs.length}</span>
                </div>
                
                <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                  {repairs.map((repair) => (
                    <GlassCard key={repair.id} className="p-4 cursor-grab active:cursor-grabbing hover:border-green-500/30 group">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-mono text-green-700 bg-green-500/20 px-1.5 py-0.5 rounded">{repair.id}</span>
                        <div className="text-gray-500">
                          {repair.device.includes('iPhone') && <Smartphone size={14} />}
                          {repair.device.includes('Mac') && <Laptop size={14} />}
                          {repair.device.includes('iPad') && <Tablet size={14} />}
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-sm mb-1 text-gray-800">{repair.device}</h4>
                      <p className="text-xs text-gray-500 mb-3">{repair.issue}</p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-[10px] text-white">
                          {repair.client.name.charAt(0)}
                        </div>
                        <span className="text-xs text-gray-700">{repair.client.name}</span>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-gray-500 pt-3 border-t border-white/30">
                        <span className="flex items-center gap-1">
                          <Clock size={10} /> {repair.dateOutEst}
                        </span>
                        <span className="text-green-600 font-medium">
                          ${repair.cost.toLocaleString('es-AR')}
                        </span>
                      </div>
                    </GlassCard>
                  ))}
                  {repairs.length === 0 && (
                    <div className="h-24 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400">
                      Sin órdenes
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
