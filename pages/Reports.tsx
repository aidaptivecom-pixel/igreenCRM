import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  BarChart3, Download, TrendingUp, TrendingDown, 
  DollarSign, Percent
} from 'lucide-react';

const revenueByDay = [
  { name: 'Lun', ventas: 145000, reparaciones: 89000 },
  { name: 'Mar', ventas: 98000, reparaciones: 124000 },
  { name: 'Mié', ventas: 187000, reparaciones: 156000 },
  { name: 'Jue', ventas: 134000, reparaciones: 98000 },
  { name: 'Vie', ventas: 245000, reparaciones: 187000 },
  { name: 'Sáb', ventas: 178000, reparaciones: 145000 },
  { name: 'Dom', ventas: 45000, reparaciones: 23000 },
];

const repairsByDevice = [
  { name: 'iPhone', value: 45, color: '#10B981' },
  { name: 'iPad', value: 28, color: '#3B82F6' },
  { name: 'MacBook', value: 20, color: '#8B5CF6' },
  { name: 'Otros', value: 7, color: '#6B7280' },
];

const topProducts = [
  { name: 'Batería iPhone 13', ventas: 45, revenue: 2475000 },
  { name: 'Funda AirPods Pro', ventas: 38, revenue: 836000 },
  { name: 'Cable USB-C 2m', ventas: 28, revenue: 336000 },
  { name: 'Film Like Paper', ventas: 21, revenue: 525000 },
  { name: 'Cargador MagSafe', ventas: 18, revenue: 1530000 },
];

const clientOrigins = [
  { name: 'WhatsApp', value: 40, color: '#25D366' },
  { name: 'Instagram', value: 25, color: '#E4405F' },
  { name: 'Google', value: 20, color: '#4285F4' },
  { name: 'Local', value: 15, color: '#F59E0B' },
];

const kpiData = {
  avgTicketSale: 42300,
  avgTicketRepair: 85200,
  avgRepairTime: 2.3,
  conversionRate: 68,
  warrantyRate: 4.2,
};

export const Reports: React.FC = () => {
  const [period, setPeriod] = useState('Mes');

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BarChart3 className="text-green-400" /> Reportes
        </h2>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            {['Hoy', 'Semana', 'Mes', 'Año'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  period === p ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          
          <button className="btn-secondary flex items-center gap-2 text-sm">
            <Download size={16} /> Exportar
          </button>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3">
             <div className="bg-green-500/10 p-2 rounded-full text-green-400">
               <DollarSign size={20} />
             </div>
          </div>
          <p className="text-gray-400 text-sm font-medium uppercase mb-1">Ingresos</p>
          <h3 className="text-2xl font-bold text-white mb-2">$1.245.000</h3>
          <div className="flex items-center gap-1 text-xs font-medium text-green-400 bg-green-500/10 w-fit px-2 py-1 rounded-full">
            <TrendingUp size={12} /> +23%
          </div>
        </GlassCard>

        <GlassCard className="p-4 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-3">
             <div className="bg-red-500/10 p-2 rounded-full text-red-400">
               <TrendingDown size={20} />
             </div>
          </div>
          <p className="text-gray-400 text-sm font-medium uppercase mb-1">Gastos</p>
          <h3 className="text-2xl font-bold text-white mb-2">$312.000</h3>
          <div className="flex items-center gap-1 text-xs font-medium text-red-400 bg-red-500/10 w-fit px-2 py-1 rounded-full">
            <TrendingUp size={12} /> +8%
          </div>
        </GlassCard>

        <GlassCard className="p-4 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-3">
             <div className="bg-blue-500/10 p-2 rounded-full text-blue-400">
               <DollarSign size={20} />
             </div>
          </div>
          <p className="text-gray-400 text-sm font-medium uppercase mb-1">Ganancia</p>
          <h3 className="text-2xl font-bold text-white mb-2">$933.000</h3>
          <div className="flex items-center gap-1 text-xs font-medium text-blue-400 bg-blue-500/10 w-fit px-2 py-1 rounded-full">
            <TrendingUp size={12} /> +31%
          </div>
        </GlassCard>

        <GlassCard className="p-4 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-3">
             <div className="bg-purple-500/10 p-2 rounded-full text-purple-400">
               <Percent size={20} />
             </div>
          </div>
          <p className="text-gray-400 text-sm font-medium uppercase mb-1">Margen</p>
          <h3 className="text-2xl font-bold text-white mb-2">75%</h3>
          <div className="flex items-center gap-1 text-xs font-medium text-purple-400 bg-purple-500/10 w-fit px-2 py-1 rounded-full">
            <TrendingUp size={12} /> +5pp
          </div>
        </GlassCard>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 min-h-[400px]">
          <h3 className="text-lg font-semibold mb-6">Ingresos por Día</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141414', border: '1px solid #333', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar name="Ventas" dataKey="ventas" fill="#10B981" radius={[4, 4, 0, 0]} stackId="a" />
                <Bar name="Reparaciones" dataKey="reparaciones" fill="#3B82F6" radius={[4, 4, 0, 0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="min-h-[400px]">
          <h3 className="text-lg font-semibold mb-6">Reparaciones por Tipo</h3>
          <div className="h-[300px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={repairsByDevice}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {repairsByDevice.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#141414', border: '1px solid #333', borderRadius: '12px' }}
                   itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
             {/* Center Text */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none pr-[80px]"> {/* pr-80 to offset legend if needed, but legend is right aligned */}
                <span className="text-3xl font-bold text-white">142</span>
                <span className="block text-xs text-gray-500">Total</span>
             </div>
          </div>
        </GlassCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 min-h-[400px]">
          <h3 className="text-lg font-semibold mb-6">Top 5 Productos Vendidos</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={150} axisLine={false} tickLine={false} tick={{fill: '#ccc', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141414', border: '1px solid #333', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                />
                <Bar dataKey="ventas" fill="#8B5CF6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="min-h-[400px]">
          <h3 className="text-lg font-semibold mb-6">Origen de Clientes</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={clientOrigins}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {clientOrigins.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#141414', border: '1px solid #333', borderRadius: '12px' }}
                   itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Detailed KPIs */}
      <h3 className="text-lg font-semibold mt-2">KPIs Detallados</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <GlassCard className="p-4 text-center">
          <p className="text-xs text-gray-400 uppercase mb-1">Ticket Promedio Venta</p>
          <p className="text-xl font-bold text-white">${kpiData.avgTicketSale.toLocaleString()}</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-xs text-gray-400 uppercase mb-1">Ticket Promedio Reparación</p>
          <p className="text-xl font-bold text-white">${kpiData.avgTicketRepair.toLocaleString()}</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-xs text-gray-400 uppercase mb-1">Tiempo Promedio</p>
          <p className="text-xl font-bold text-white">{kpiData.avgRepairTime} días</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-xs text-gray-400 uppercase mb-1">Tasa Conversión</p>
          <p className="text-xl font-bold text-green-400">{kpiData.conversionRate}%</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-xs text-gray-400 uppercase mb-1">Tasa Garantía</p>
          <p className="text-xl font-bold text-yellow-400">{kpiData.warrantyRate}%</p>
        </GlassCard>
      </div>
    </div>
  );
};