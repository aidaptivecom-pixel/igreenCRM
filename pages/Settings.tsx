
import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { 
  Building, Link as LinkIcon, Clock, Bell, Users, 
  Upload, Save, Check, AlertTriangle, XCircle, 
  ExternalLink, RefreshCw, Edit, Trash2, Plus,
  CheckCircle2
} from 'lucide-react';

const TABS = [
  { id: 'company', label: 'Empresa', icon: Building },
  { id: 'integrations', label: 'Integraciones', icon: LinkIcon },
  { id: 'hours', label: 'Horarios', icon: Clock },
  { id: 'notifications', label: 'Notificaciones', icon: Bell },
  { id: 'users', label: 'Usuarios', icon: Users },
];

const MOCK_INTEGRATIONS = [
  { 
    id: 'airtable',
    name: 'Airtable',
    icon: '📊',
    status: 'connected',
    details: 'Base: appXXXXXXXX',
    lastSync: '2025-12-04 12:30'
  },
  { 
    id: 'n8n',
    name: 'n8n',
    icon: '⚡',
    status: 'connected',
    details: 'https://n8n.igreen.com.ar',
    lastSync: '2025-12-04 12:35'
  },
  { 
    id: 'whatsapp',
    name: 'WhatsApp Business',
    icon: '💬',
    status: 'connected',
    details: '+54 9 11 3577-2057',
    lastSync: 'Verificado'
  },
  { 
    id: 'mercadopago',
    name: 'MercadoPago',
    icon: '💳',
    status: 'connected',
    details: 'Modo: Producción',
    lastSync: 'Activo'
  },
  { 
    id: 'arca',
    name: 'ARCA (AFIP)',
    icon: '🧾',
    status: 'error',
    details: 'Certificado vencido',
    lastSync: null
  },
  { 
    id: 'gcalendar',
    name: 'Google Calendar',
    icon: '📅',
    status: 'pending',
    details: 'Requiere autorización',
    lastSync: null
  },
  { 
    id: 'andreani',
    name: 'Andreani',
    icon: '🚚',
    status: 'pending',
    details: 'Esperando credenciales',
    lastSync: null
  },
  { 
    id: 'correo',
    name: 'Correo Argentino',
    icon: '📮',
    status: 'pending',
    details: 'Esperando credenciales',
    lastSync: null
  },
];

const MOCK_USERS = [
  { id: 'u1', name: 'Matías', email: 'matias@igreen.com.ar', role: 'Admin', status: 'Activo' },
  { id: 'u2', name: 'Juan Técnico', email: 'juan@igreen.com.ar', role: 'Técnico', status: 'Activo' },
  { id: 'u3', name: 'Ana Ventas', email: 'ana@igreen.com.ar', role: 'Ventas', status: 'Inactivo' },
];

const MOCK_NOTIFICATIONS = [
  { id: 'n1', label: 'Confirmación de turno', description: 'Enviar mensaje cuando se agenda un turno', enabled: true },
  { id: 'n2', label: 'Recordatorio 24hs antes', description: 'Recordar turno un día antes', enabled: true },
  { id: 'n3', label: 'Recordatorio 2hs antes', description: 'Recordar turno el mismo día', enabled: false },
  { id: 'n4', label: 'Equipo listo', description: 'Avisar cuando la reparación está terminada', enabled: true },
  { id: 'n5', label: 'Pedido enviado', description: 'Notificar envío y tracking', enabled: true },
  { id: 'n6', label: 'Pago recibido', description: 'Confirmación de pago exitoso', enabled: true },
  { id: 'n7', label: 'Factura emitida', description: 'Enviar factura adjunta automáticamente', enabled: false },
];

const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange?: () => void }) => (
  <button 
    onClick={onChange}
    className={`w-11 h-6 rounded-full transition-colors relative ${enabled ? 'bg-green-500' : 'bg-gray-600'}`}
  >
    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${enabled ? 'left-6' : 'left-1'}`} />
  </button>
);

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('company');

  // Company Form State (Mock)
  const [companyForm, setCompanyForm] = useState({
    name: 'iGreen Servicio Técnico',
    cuit: '30-71837199-2',
    address: 'Av. Santa Fe 1234, Recoleta, CABA',
    phone: '+54 9 11 3577-2057',
    email: 'ventas@igreen.com.ar',
    instagram: '@igreen.recoleta',
    hoursText: 'Lun a Vie 10-19hs'
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'connected': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'pending': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'error': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'connected': return <CheckCircle2 size={16} />;
      case 'pending': return <Clock size={16} />;
      case 'error': return <AlertTriangle size={16} />;
      default: return null;
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6">
      
      {/* Sidebar Tabs */}
      <GlassCard className="w-64 p-4 flex flex-col gap-2 h-full shrink-0">
        <h2 className="text-xl font-semibold px-4 mb-4 flex items-center gap-2">
           Configuración
        </h2>
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium
                ${isActive 
                  ? 'bg-green-500/20 text-green-400 border-l-2 border-green-400' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'}
              `}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </GlassCard>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        
        {/* TAB: EMPRESA */}
        {activeTab === 'company' && (
          <GlassCard className="animate-in slide-up max-w-3xl">
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-semibold">Perfil de Empresa</h3>
                <p className="text-sm text-gray-400">Información general del negocio visible en comprobantes y web.</p>
              </div>
              <button className="btn-primary flex items-center gap-2 text-sm">
                <Save size={16} /> Guardar Cambios
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2 text-gray-500 cursor-pointer hover:bg-white/10 transition-colors group">
                   <div className="p-2 bg-black/20 rounded-full group-hover:scale-110 transition-transform">
                      <Upload size={20} />
                   </div>
                   <span className="text-[10px] uppercase font-medium">Logo</span>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1 ml-1">Nombre de Empresa</label>
                    <input type="text" value={companyForm.name} onChange={e => setCompanyForm({...companyForm, name: e.target.value})} className="glass-input w-full" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1 ml-1">CUIT</label>
                    <input type="text" value={companyForm.cuit} onChange={e => setCompanyForm({...companyForm, cuit: e.target.value})} className="glass-input w-full" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs text-gray-400 mb-1 ml-1">Dirección Completa</label>
                    <input type="text" value={companyForm.address} onChange={e => setCompanyForm({...companyForm, address: e.target.value})} className="glass-input w-full" />
                  </div>
                </div>
              </div>

              <div className="h-px bg-white/10" />

              <div className="grid grid-cols-2 gap-6">
                 <div>
                    <label className="block text-xs text-gray-400 mb-1 ml-1">Teléfono Principal</label>
                    <input type="text" value={companyForm.phone} onChange={e => setCompanyForm({...companyForm, phone: e.target.value})} className="glass-input w-full" />
                 </div>
                 <div>
                    <label className="block text-xs text-gray-400 mb-1 ml-1">WhatsApp Business</label>
                    <input type="text" value={companyForm.phone} className="glass-input w-full" disabled />
                 </div>
                 <div>
                    <label className="block text-xs text-gray-400 mb-1 ml-1">Email Contacto</label>
                    <input type="email" value={companyForm.email} onChange={e => setCompanyForm({...companyForm, email: e.target.value})} className="glass-input w-full" />
                 </div>
                 <div>
                    <label className="block text-xs text-gray-400 mb-1 ml-1">Instagram</label>
                    <input type="text" value={companyForm.instagram} onChange={e => setCompanyForm({...companyForm, instagram: e.target.value})} className="glass-input w-full" />
                 </div>
                 <div className="col-span-2">
                    <label className="block text-xs text-gray-400 mb-1 ml-1">Horario Texto (para footer/web)</label>
                    <input type="text" value={companyForm.hoursText} onChange={e => setCompanyForm({...companyForm, hoursText: e.target.value})} className="glass-input w-full" />
                 </div>
              </div>
            </div>
          </GlassCard>
        )}

        {/* TAB: INTEGRACIONES */}
        {activeTab === 'integrations' && (
          <div className="animate-in slide-up grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_INTEGRATIONS.map((integ) => (
              <GlassCard key={integ.id} className="p-4 flex flex-col justify-between group hover:border-white/20">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl">
                      {integ.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{integ.name}</h4>
                      <p className="text-xs text-gray-400">{integ.details}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border ${getStatusColor(integ.status)}`}>
                    {getStatusIcon(integ.status)}
                    <span className="capitalize">{integ.status === 'connected' ? 'Conectado' : integ.status === 'pending' ? 'Pendiente' : 'Error'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-xs text-gray-500">
                    {integ.lastSync ? `Sync: ${integ.lastSync}` : 'Sin sincronizar'}
                  </span>
                  <div className="flex gap-2">
                    {integ.status === 'connected' ? (
                      <button className="text-xs text-gray-400 hover:text-white flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors">
                        <RefreshCw size={12} /> Probar
                      </button>
                    ) : (
                      <button className="text-xs text-white bg-blue-500 hover:bg-blue-400 px-3 py-1 rounded transition-colors">
                        Conectar
                      </button>
                    )}
                    <button className="text-gray-500 hover:text-white transition-colors">
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {/* TAB: HORARIOS */}
        {activeTab === 'hours' && (
          <GlassCard className="animate-in slide-up max-w-3xl">
             <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-semibold">Configuración de Horarios</h3>
                <p className="text-sm text-gray-400">Define la disponibilidad para turnos y atención.</p>
              </div>
              <button className="btn-primary flex items-center gap-2 text-sm">
                <Save size={16} /> Guardar
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Días de Atención</label>
                <div className="flex gap-2">
                  {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, i) => (
                    <label key={day} className="cursor-pointer">
                      <input type="checkbox" className="peer sr-only" defaultChecked={i < 5} />
                      <div className="w-12 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sm text-gray-400 peer-checked:bg-green-500/20 peer-checked:border-green-500/50 peer-checked:text-green-400 transition-all hover:bg-white/10">
                        {day}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                   <label className="block text-xs text-gray-400 mb-1 ml-1">Horario Apertura</label>
                   <select className="glass-input w-full">
                     <option>08:00</option>
                     <option>09:00</option>
                     <option selected>10:00</option>
                     <option>11:00</option>
                   </select>
                </div>
                <div>
                   <label className="block text-xs text-gray-400 mb-1 ml-1">Horario Cierre</label>
                   <select className="glass-input w-full">
                     <option>17:00</option>
                     <option>18:00</option>
                     <option selected>19:00</option>
                     <option>20:00</option>
                   </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1 ml-1">Duración Slot de Turnos</label>
                <div className="flex gap-4 items-center">
                   <select className="glass-input w-64">
                     <option>15 minutos</option>
                     <option selected>30 minutos</option>
                     <option>45 minutos</option>
                     <option>60 minutos</option>
                   </select>
                   <p className="text-xs text-gray-500">Tiempo base predeterminado para nuevos turnos.</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between border border-white/5">
                 <div>
                   <span className="font-medium text-sm block mb-1">Bloqueo de Almuerzo</span>
                   <span className="text-xs text-gray-400">No permitir turnos en horario de almuerzo.</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <input type="time" defaultValue="13:00" className="glass-input py-1 px-2 w-24 text-center" />
                    <span className="text-gray-500 text-sm">a</span>
                    <input type="time" defaultValue="14:00" className="glass-input py-1 px-2 w-24 text-center" />
                    <Toggle enabled={true} />
                 </div>
              </div>
            </div>
          </GlassCard>
        )}

        {/* TAB: NOTIFICACIONES */}
        {activeTab === 'notifications' && (
          <GlassCard className="animate-in slide-up max-w-3xl">
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-semibold">Notificaciones Automáticas</h3>
                <p className="text-sm text-gray-400">Gestiona los mensajes automáticos enviados por WhatsApp/Email.</p>
              </div>
            </div>

            <div className="space-y-4">
              {MOCK_NOTIFICATIONS.map((notif) => (
                <div key={notif.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <div>
                    <h4 className="font-medium text-sm text-white mb-1">{notif.label}</h4>
                    <p className="text-xs text-gray-400">{notif.description}</p>
                  </div>
                  <Toggle enabled={notif.enabled} />
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* TAB: USUARIOS */}
        {activeTab === 'users' && (
          <GlassCard className="animate-in slide-up max-w-4xl p-0 overflow-hidden">
             <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <div>
                   <h3 className="text-lg font-semibold">Usuarios y Permisos</h3>
                   <p className="text-sm text-gray-400">Administra el acceso al sistema.</p>
                </div>
                <button className="btn-secondary flex items-center gap-2 text-sm">
                  <Plus size={16} /> Agregar Usuario
                </button>
             </div>

             <table className="w-full text-sm text-left">
                <thead className="bg-white/5 text-gray-400 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4">Usuario</th>
                    <th className="px-6 py-4">Rol</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {MOCK_USERS.map((user) => (
                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-white">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] border ${
                          user.role === 'Admin' ? 'border-purple-500/30 text-purple-400' : 
                          user.role === 'Técnico' ? 'border-blue-500/30 text-blue-400' :
                          'border-yellow-500/30 text-yellow-400'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                         <span className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 w-fit ${
                           user.status === 'Activo' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                         }`}>
                           <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Activo' ? 'bg-green-500' : 'bg-red-500'}`} />
                           {user.status}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                           <button className="p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors">
                             <Edit size={16} />
                           </button>
                           <button className="p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-red-400 transition-colors">
                             <Trash2 size={16} />
                           </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </GlassCard>
        )}

      </div>
    </div>
  );
};
