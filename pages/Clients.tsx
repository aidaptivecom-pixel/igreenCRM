import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { MOCK_CLIENTS } from '../constants';
import { Client } from '../types';
import { 
  Users, UserPlus, Search, Filter, Phone, Mail, 
  History, ShoppingBag, Wrench, Calendar, X, 
  MoreVertical, Star, AlertTriangle
} from 'lucide-react';

export const Clients: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(MOCK_CLIENTS[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Todos');

  const filteredClients = MOCK_CLIENTS.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          client.phone.includes(searchTerm) ||
                          client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'Todos' || client.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalClients = MOCK_CLIENTS.length;
  const newClients = MOCK_CLIENTS.filter(c => c.createdAt?.startsWith('2025-12')).length + 2;
  const vipClients = MOCK_CLIENTS.filter(c => c.tags.includes('VIP')).length;
  const morososClients = MOCK_CLIENTS.filter(c => c.tags.includes('Moroso')).length;

  return (
    <div className="h-full flex flex-col space-y-6">
      
      {/* 1. Header & Stats */}
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
          <Users className="text-green-500" /> Clientes
        </h2>
        <button className="btn-primary flex items-center gap-2">
          <UserPlus size={18} /> Nuevo Cliente
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', val: totalClients, icon: <Users size={20} className="text-blue-500" /> },
          { label: 'Nuevos (30d)', val: newClients, icon: <Star size={20} className="text-yellow-500" /> },
          { label: 'VIP', val: vipClients, icon: <ShoppingBag size={20} className="text-purple-500" /> },
          { label: 'Morosos', val: morososClients, icon: <AlertTriangle size={20} className="text-red-500" /> }
        ].map((stat, i) => (
          <GlassCard key={i} className="p-4 flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.val}</p>
              <p className="text-xs text-gray-500 uppercase font-medium">{stat.label}</p>
            </div>
            <div className="p-3 bg-white/30 rounded-full">{stat.icon}</div>
          </GlassCard>
        ))}
      </div>

      {/* 2. Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Buscar por nombre, teléfono, email..." 
            className="glass-input w-full pl-10 py-2.5 rounded-2xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative w-48">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select 
            className="glass-input w-full pl-10 py-2.5 rounded-2xl appearance-none cursor-pointer"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="Todos">Todos los tipos</option>
            <option value="Particular">Particular</option>
            <option value="Empresa">Empresa</option>
          </select>
        </div>
      </div>

      {/* 3. Main Content: Table + Detail */}
      <div className="flex-1 min-h-[500px] flex gap-6 overflow-hidden">
        
        {/* Left: Table */}
        <div className="flex-1 overflow-y-auto custom-scrollbar rounded-2xl border border-white/30 bg-white/20 backdrop-blur-2xl">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/30 text-gray-600 uppercase text-xs sticky top-0 backdrop-blur-xl z-10">
              <tr>
                <th className="px-6 py-4">Nombre</th>
                <th className="px-6 py-4 hidden md:table-cell">Teléfono</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4 text-right">Total</th>
                <th className="px-6 py-4 hidden lg:table-cell">Tags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20">
              {filteredClients.map((client) => (
                <tr 
                  key={client.id} 
                  onClick={() => setSelectedClient(client)}
                  className={`
                    cursor-pointer transition-colors hover:bg-white/20
                    ${selectedClient?.id === client.id ? 'bg-white/30 border-l-2 border-l-green-500' : 'border-l-2 border-l-transparent'}
                  `}
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{client.name}</p>
                      <p className="text-xs text-gray-500 md:hidden">{client.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell text-gray-600">{client.phone}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] border ${client.type === 'Empresa' ? 'border-blue-500/30 text-blue-600' : 'border-gray-400/30 text-gray-600'}`}>
                      {client.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-green-600">
                    ${(client.totalSpent / 1000).toFixed(0)}k
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <div className="flex gap-1 flex-wrap">
                      {client.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className={`text-[10px] px-1.5 py-0.5 rounded border ${tag === 'Moroso' ? 'border-red-500/30 text-red-600' : 'border-yellow-500/30 text-yellow-600'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: Detail Panel */}
        {selectedClient ? (
          <GlassCard className="w-[350px] lg:w-[400px] flex flex-col p-0 overflow-hidden shrink-0 animate-in slide-in-right">
            {/* Detail Header */}
            <div className="p-6 border-b border-white/30 bg-gradient-to-b from-white/20 to-transparent relative">
              <div className="absolute top-4 right-4">
                 <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                   <MoreVertical size={16} className="text-gray-500" />
                 </button>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-xl">
                  {selectedClient.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold mb-1 text-gray-800">{selectedClient.name}</h3>
                <span className="text-sm text-gray-500 mb-4">{selectedClient.type} • {selectedClient.origin}</span>
                
                <div className="flex gap-2 w-full justify-center mb-6">
                  <button className="p-2 rounded-xl bg-green-500/20 text-green-600 hover:bg-green-500/30 transition-colors">
                    <Phone size={18} />
                  </button>
                  <button className="p-2 rounded-xl bg-blue-500/20 text-blue-600 hover:bg-blue-500/30 transition-colors">
                    <Mail size={18} />
                  </button>
                  <button className="p-2 rounded-xl bg-purple-500/20 text-purple-600 hover:bg-purple-500/30 transition-colors">
                    <History size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full">
                  <div className="bg-white/30 p-3 rounded-xl">
                    <p className="text-xs text-gray-500 uppercase">Total Gastado</p>
                    <p className="font-bold text-green-600">${selectedClient.totalSpent.toLocaleString()}</p>
                  </div>
                  <div className="bg-white/30 p-3 rounded-xl">
                    <p className="text-xs text-gray-500 uppercase">Visitas</p>
                    <p className="font-bold text-gray-800">{selectedClient.repairsCount! + selectedClient.purchasesCount!} op.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="px-6 py-4 border-b border-white/30">
              <p className="text-xs text-gray-500 mb-2 uppercase font-medium">Etiquetas</p>
              <div className="flex flex-wrap gap-2">
                {selectedClient.tags.map((tag, i) => (
                  <span key={i} className="flex items-center gap-1 px-2 py-1 bg-white/30 rounded-lg text-xs text-gray-700 hover:bg-white/40 cursor-pointer">
                    {tag} <X size={10} className="hover:text-red-500" />
                  </span>
                ))}
                <button className="px-2 py-1 border border-dashed border-gray-400 rounded-lg text-xs text-gray-500 hover:border-gray-500 hover:text-gray-600">
                  + Tag
                </button>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="flex-1 overflow-y-auto p-6 bg-white/10">
              <p className="text-xs text-gray-500 mb-4 uppercase font-medium">Actividad Reciente</p>
              <div className="space-y-6 relative pl-2">
                <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-gray-300"></div>
                
                {selectedClient.activity?.map((act, i) => (
                  <div key={i} className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white bg-gray-400 z-10"></div>
                    <p className="text-xs text-gray-500 mb-0.5">{act.date}</p>
                    <p className="text-sm font-medium text-gray-800">{act.action}</p>
                    <p className="text-xs text-gray-500">{act.detail}</p>
                  </div>
                ))}

                <div className="relative pl-6 opacity-50">
                  <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white bg-green-500 z-10"></div>
                  <p className="text-xs text-gray-500 mb-0.5">{selectedClient.createdAt}</p>
                  <p className="text-sm font-medium text-gray-800">Cliente registrado</p>
                  <p className="text-xs text-gray-500">Origen: {selectedClient.origin}</p>
                </div>
              </div>
            </div>

          </GlassCard>
        ) : (
          <GlassCard className="w-[350px] lg:w-[400px] flex items-center justify-center text-gray-500">
            Selecciona un cliente para ver detalles
          </GlassCard>
        )}

      </div>
    </div>
  );
};
