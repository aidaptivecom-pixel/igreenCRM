import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { KPIS } from '../constants';
import { TrendingUp, TrendingDown, DollarSign, PenTool, Calendar, MessageCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const chartData = [
  { name: 'Lun', ventas: 40000, reparaciones: 24000 },
  { name: 'Mar', ventas: 30000, reparaciones: 13980 },
  { name: 'Mie', ventas: 20000, reparaciones: 98000 },
  { name: 'Jue', ventas: 27800, reparaciones: 39080 },
  { name: 'Vie', ventas: 18900, reparaciones: 48000 },
  { name: 'Sab', ventas: 23900, reparaciones: 38000 },
  { name: 'Dom', ventas: 34900, reparaciones: 43000 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPIS.map((kpi, idx) => (
          <GlassCard key={idx} className="relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-32 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/15 transition-all" />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-3 bg-white/30 rounded-2xl border border-white/20">
                {kpi.icon === 'dollar' && <DollarSign size={24} className="text-green-600" />}
                {kpi.icon === 'tool' && <PenTool size={24} className="text-blue-600" />}
                {kpi.icon === 'calendar' && <Calendar size={24} className="text-purple-600" />}
                {kpi.icon === 'message' && <MessageCircle size={24} className="text-orange-500" />}
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${kpi.trendUp ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-600'}`}>
                {kpi.trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {kpi.trend}%
              </div>
            </div>
            <div className="relative z-10">
              <h3 className="text-gray-500 text-sm font-medium mb-1">{kpi.label}</h3>
              <p className="text-3xl font-bold tracking-tight text-gray-900">{kpi.value}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 h-full">
          <GlassCard className="h-full min-h-[400px]">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-800">
              <BarChart3Icon /> Ingresos Semanales (ARS)
            </h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: '#374151' }}
                    labelStyle={{ color: '#1F2937', fontWeight: 600 }}
                    cursor={{fill: 'rgba(0,0,0,0.05)'}}
                  />
                  <Bar dataKey="ventas" fill="#10B981" radius={[4, 4, 0, 0]} stackId="a" name="Ventas" />
                  <Bar dataKey="reparaciones" fill="#3B82F6" radius={[4, 4, 0, 0]} stackId="a" name="Reparaciones" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Alerts & Tasks */}
        <div className="space-y-6">
          <GlassCard>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
              <AlertTriangle className="text-amber-500" size={20} /> Alertas
            </h2>
            <div className="space-y-3">
              {[
                { msg: 'Stock bajo: Bat iPhone 13', type: 'warning' },
                { msg: '2 turnos sin confirmar', type: 'warning' },
                { msg: 'Factura vencida: #883', type: 'danger' }
              ].map((alert, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/30 hover:bg-white/40 transition-colors cursor-pointer border border-white/20 hover:border-white/30">
                  <div className={`w-2 h-2 rounded-full ${alert.type === 'warning' ? 'bg-amber-500' : 'bg-rose-500'}`} />
                  <span className="text-sm text-gray-700">{alert.msg}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
              <CheckCircle2 className="text-green-500" size={20} /> Tareas
            </h2>
             <div className="space-y-3">
              {[
                { msg: 'Preparar 3 pedidos web', done: false },
                { msg: 'Entregar reparación #52', done: false },
                { msg: 'Responder DM Instagram', done: true }
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-3 p-2 group">
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${task.done ? 'bg-green-500 border-green-500' : 'border-gray-400 group-hover:border-green-500'}`}>
                    {task.done && <CheckCircle2 size={14} className="text-white" />}
                  </div>
                  <span className={`text-sm ${task.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{task.msg}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

const BarChart3Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart-3 text-gray-600"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
)
