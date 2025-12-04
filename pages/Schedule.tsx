import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { MOCK_APPOINTMENTS } from '../constants';
import { Appointment, AppointmentStatus } from '../types';
import { 
  Calendar, ChevronLeft, ChevronRight, Plus, 
  Clock, MapPin, User, CheckCircle2, AlertCircle, X,
  Smartphone, Monitor, RefreshCw
} from 'lucide-react';

const START_HOUR = 9;
const END_HOUR = 19;
const TOTAL_HOURS = END_HOUR - START_HOUR;
const PIXELS_PER_HOUR = 120;
const PIXELS_PER_MINUTE = PIXELS_PER_HOUR / 60;

const getStatusColor = (status: AppointmentStatus) => {
  switch(status) {
    case 'Confirmado': return 'bg-green-500/20 border-green-500/50 text-green-700';
    case 'Pendiente': return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-700';
    case 'Cancelado': return 'bg-red-500/10 border-red-500/30 text-red-600';
    case 'Completado': return 'bg-gray-500/20 border-gray-500/50 text-gray-600';
    case 'NoShow': return 'bg-purple-500/20 border-purple-500/50 text-purple-600';
    default: return 'bg-gray-500/20 border-gray-500';
  }
};

const getStatusBadge = (status: AppointmentStatus) => {
  switch(status) {
    case 'Confirmado': return '🟢';
    case 'Pendiente': return '🟡';
    case 'Cancelado': return '🔴';
    case 'Completado': return '⚪';
    case 'NoShow': return '⚫';
    default: return '';
  }
};

export const Schedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('2025-12-04');
  const [selectedView, setSelectedView] = useState<'day' | 'week' | 'month'>('day');
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const dayAppointments = MOCK_APPOINTMENTS.filter(apt => apt.date === selectedDate);
  
  const stats = {
    total: dayAppointments.length,
    confirmed: dayAppointments.filter(a => a.status === 'Confirmado').length,
    pending: dayAppointments.filter(a => a.status === 'Pendiente').length,
    completed: dayAppointments.filter(a => a.status === 'Completado').length,
  };

  const timeToPixels = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return ((hours - START_HOUR) * 60 + minutes) * PIXELS_PER_MINUTE;
  };

  const handlePrevDay = () => {
    setSelectedDate(prev => prev === '2025-12-04' ? '2025-12-03' : '2025-12-04');
  };

  const handleNextDay = () => {
    setSelectedDate(prev => prev === '2025-12-04' ? '2025-12-05' : '2025-12-04');
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-6">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/30 rounded-xl p-1 border border-white/30">
            {['Día', 'Semana', 'Mes'].map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view === 'Día' ? 'day' : view === 'Semana' ? 'week' : 'month')}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  (view === 'Día' && selectedView === 'day') || (view === 'Semana' && selectedView === 'week') || (view === 'Mes' && selectedView === 'month')
                  ? 'bg-white/50 text-gray-800 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {view}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
             <button onClick={handlePrevDay} className="p-2 hover:bg-white/20 rounded-full transition-colors text-gray-600"><ChevronLeft size={20} /></button>
             <h2 className="text-xl font-semibold capitalize min-w-[200px] text-center text-gray-800">
               {new Date(selectedDate).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
             </h2>
             <button onClick={handleNextDay} className="p-2 hover:bg-white/20 rounded-full transition-colors text-gray-600"><ChevronRight size={20} /></button>
             <button className="text-sm text-green-600 hover:text-green-500 font-medium">Hoy</button>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2 text-sm">
            <RefreshCw size={16} /> Sync
          </button>
          <button onClick={() => setShowNewModal(true)} className="btn-primary flex items-center gap-2">
            <Plus size={18} /> Nuevo Turno
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Calendar Grid (Day View) */}
        <div className="flex-1 glass-card p-0 flex flex-col overflow-hidden relative">
           <div className="h-12 border-b border-white/30 flex items-center px-6 bg-white/20">
              <span className="text-sm text-gray-500 font-medium">Horario</span>
              <div className="ml-16 border-l border-white/30 pl-4 h-full flex items-center">
                <span className="text-sm font-medium text-gray-700">Eventos</span>
              </div>
           </div>

           <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-white/10">
             <div className="absolute top-0 left-0 right-0" style={{ height: TOTAL_HOURS * PIXELS_PER_HOUR }}>
               {Array.from({ length: TOTAL_HOURS }).map((_, i) => (
                 <div key={i} className="flex border-b border-gray-300/30 h-[120px] group hover:bg-white/10 transition-colors">
                    <div className="w-20 shrink-0 border-r border-white/30 p-2 text-xs text-gray-500 font-mono text-right relative">
                       <span className="-top-3 relative block">{START_HOUR + i}:00</span>
                    </div>
                    <div className="flex-1 relative">
                      <div className="absolute top-1/2 left-0 right-0 border-t border-gray-300/30 border-dashed w-full h-px opacity-30"></div>
                    </div>
                 </div>
               ))}
                <div className="w-20 border-r border-white/30 p-2 text-xs text-gray-500 font-mono text-right relative h-0">
                   <span className="-top-3 relative block">{END_HOUR}:00</span>
                </div>
             </div>

             <div className="absolute top-0 left-20 right-0 h-full">
                <div className="absolute w-full border-t-2 border-red-500/50 z-10 pointer-events-none" style={{ top: timeToPixels('12:15') }}>
                   <div className="absolute -left-1.5 -top-1.5 w-3 h-3 bg-red-500 rounded-full"></div>
                </div>

                {dayAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    onClick={() => setSelectedAppointment(apt)}
                    style={{
                      top: timeToPixels(apt.time),
                      height: apt.duration * PIXELS_PER_MINUTE,
                    }}
                    className={`
                      absolute left-2 right-4 rounded-xl p-3 border-l-4 shadow-lg backdrop-blur-md cursor-pointer
                      transition-all hover:scale-[1.01] hover:brightness-110 z-0 hover:z-20
                      flex flex-col justify-center overflow-hidden
                      ${getStatusColor(apt.status)}
                    `}
                  >
                    <div className="flex justify-between items-start">
                      <div className="font-semibold text-sm truncate flex items-center gap-2">
                        <span>{apt.clientName}</span>
                      </div>
                      <span className="text-xs font-mono opacity-80">{apt.time} ({apt.duration}m)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs opacity-80 mt-1 truncate">
                      <span className="font-medium">{apt.type}</span>
                      <span>•</span>
                      <span>{apt.device}</span>
                    </div>
                  </div>
                ))}
             </div>
           </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 flex flex-col gap-6 shrink-0">
          <GlassCard className="p-4 space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Resumen del Día</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/30 rounded-xl p-3 text-center">
                <span className="block text-2xl font-bold text-gray-800">{stats.total}</span>
                <span className="text-xs text-gray-500">Total</span>
              </div>
              <div className="bg-green-500/15 rounded-xl p-3 text-center">
                <span className="block text-2xl font-bold text-green-600">{stats.confirmed}</span>
                <span className="text-xs text-green-600/70">Confirmados</span>
              </div>
              <div className="bg-yellow-500/15 rounded-xl p-3 text-center">
                <span className="block text-2xl font-bold text-yellow-600">{stats.pending}</span>
                <span className="text-xs text-yellow-600/70">Pendientes</span>
              </div>
              <div className="bg-gray-500/15 rounded-xl p-3 text-center">
                <span className="block text-2xl font-bold text-gray-500">{stats.completed}</span>
                <span className="text-xs text-gray-500">Completados</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden">
             <div className="p-4 border-b border-white/30 bg-white/20">
                <h3 className="font-semibold text-gray-800">Próximos Turnos</h3>
             </div>
             <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {dayAppointments.length > 0 ? (
                  dayAppointments
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((apt) => (
                      <div key={apt.id} className="p-3 rounded-xl bg-white/30 border border-white/30 hover:bg-white/40 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-sm text-gray-800">{apt.clientName}</span>
                          <span className="text-xs text-gray-500 bg-white/40 px-1.5 py-0.5 rounded">{apt.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                           <span className="truncate">{apt.service}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                            apt.status === 'Confirmado' ? 'border-green-500/30 text-green-600' :
                            apt.status === 'Pendiente' ? 'border-yellow-500/30 text-yellow-600' :
                            'border-gray-500/30 text-gray-500'
                          }`}>
                            {apt.status}
                          </span>
                        </div>
                      </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    No hay turnos para este día.
                  </div>
                )}
             </div>
          </GlassCard>
        </div>
      </div>

      {/* New Appointment Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-lg bg-white/90 border-white/50 animate-in slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Nuevo Turno</h3>
              <button onClick={() => setShowNewModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <form className="space-y-4">
              <div className="relative">
                <label className="block text-xs text-gray-500 mb-1 ml-1">Cliente</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input type="text" placeholder="Buscar cliente..." className="glass-input w-full pl-10" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1 ml-1">Fecha</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input type="date" defaultValue={selectedDate} className="glass-input w-full pl-10" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 ml-1">Hora</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select className="glass-input w-full pl-10 appearance-none">
                      <option>09:00</option>
                      <option>09:30</option>
                      <option>10:00</option>
                      <option>10:30</option>
                      <option>11:00</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1 ml-1">Tipo</label>
                  <select className="glass-input w-full">
                    <option>Reparación</option>
                    <option>Diagnóstico</option>
                    <option>Entrega</option>
                    <option>Colocación</option>
                  </select>
                </div>
                <div>
                   <label className="block text-xs text-gray-500 mb-1 ml-1">Duración</label>
                   <select className="glass-input w-full">
                    <option value="30">30 min</option>
                    <option value="60">1 hora</option>
                    <option value="90">1.5 horas</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1 ml-1">Dispositivo & Servicio</label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input type="text" placeholder="Ej: iPhone 13 - Cambio Pantalla" className="glass-input w-full pl-10" />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1 ml-1">Notas</label>
                <textarea rows={3} className="glass-input w-full py-2" placeholder="Detalles adicionales..."></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowNewModal(false)} className="btn-secondary text-sm">Cancelar</button>
                <button type="button" onClick={() => setShowNewModal(false)} className="btn-primary text-sm">Guardar Turno</button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
      
      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
           <GlassCard className="w-full max-w-md bg-white/90 border-white/50 animate-in slide-up relative">
              <button 
                onClick={() => setSelectedAppointment(null)} 
                className="absolute top-4 right-4 p-1 hover:bg-white/30 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
              
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                   <span className="text-2xl">{getStatusBadge(selectedAppointment.status)}</span>
                   <h3 className="text-xl font-bold text-gray-800">{selectedAppointment.type}</h3>
                </div>
                <p className="text-gray-500">{selectedAppointment.service}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                   <User className="text-gray-400" size={18} />
                   <div>
                     <p className="font-medium text-gray-800">{selectedAppointment.clientName}</p>
                     <p className="text-xs text-gray-500">{selectedAppointment.phone}</p>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <Smartphone className="text-gray-400" size={18} />
                   <p className="font-medium text-gray-800">{selectedAppointment.device}</p>
                </div>
                <div className="flex items-center gap-3">
                   <Clock className="text-gray-400" size={18} />
                   <p className="font-medium text-gray-800">{selectedAppointment.time} <span className="text-gray-500 font-normal">({selectedAppointment.duration} min)</span></p>
                </div>
                {selectedAppointment.notes && (
                  <div className="bg-white/40 p-3 rounded-lg text-sm text-gray-600 italic">
                    "{selectedAppointment.notes}"
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                 <button className="flex-1 btn-secondary text-sm">Reprogramar</button>
                 <button className="flex-1 btn-primary text-sm">Iniciar Servicio</button>
              </div>
           </GlassCard>
        </div>
      )}

    </div>
  );
};
