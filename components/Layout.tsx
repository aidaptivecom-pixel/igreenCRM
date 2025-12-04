
import React, { useState } from 'react';
import { 
  LayoutDashboard, MessageSquare, Users, ShoppingCart, Wrench, 
  Calendar, Package, FileText, BarChart3, Settings, Menu, Bell, Search, Sun, Moon 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: MessageSquare, label: 'Comunicaciones', path: '/inbox', badge: 5 },
  { icon: Users, label: 'Clientes', path: '/clients' },
  { icon: ShoppingCart, label: 'Ventas', path: '/sales' },
  { icon: Wrench, label: 'Servicio', path: '/service' },
  { icon: Calendar, label: 'Turnos', path: '/schedule' },
  { icon: Package, label: 'Inventario', path: '/inventory' },
  { icon: FileText, label: 'Facturación', path: '/billing' },
  { icon: BarChart3, label: 'Reportes', path: '/reports' },
  { icon: Settings, label: 'Config', path: '/settings' },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-300`}>
      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 
          bg-black/30 backdrop-blur-xl border-r border-white/10 
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-20' : 'w-64'}
          hidden md:flex flex-col
        `}
      >
        <div className="h-16 flex items-center justify-center border-b border-white/10 relative">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span className="text-3xl">🍏</span>
            {!collapsed && <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">iGreen</span>}
          </div>
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-6 bg-[#141414] border border-white/20 rounded-full p-1 text-xs hover:text-green-400 transition-colors"
          >
            {collapsed ? '▶' : '◀'}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {MENU_ITEMS.map((item) => {
            const active = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-200 group
                  ${active 
                    ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-400 font-medium' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                  ${collapsed ? 'justify-center' : ''}
                `}
              >
                <div className="relative">
                  <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border border-[#0A0A0A]">
                      {item.badge}
                    </span>
                  )}
                </div>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              MP
            </div>
            {!collapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">Matías</p>
                <p className="text-xs text-gray-400 truncate">Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Drawer (Simplified) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/40 border-t border-white/10 z-50 flex justify-around p-4 backdrop-blur-xl">
        <Link to="/" className="text-gray-400 hover:text-green-400"><LayoutDashboard /></Link>
        <Link to="/inbox" className="text-gray-400 hover:text-green-400 relative">
          <MessageSquare />
          <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
        </Link>
        <Link to="/service" className="text-gray-400 hover:text-green-400"><Wrench /></Link>
        <Link to="/settings" className="text-gray-400 hover:text-green-400"><Menu /></Link>
      </div>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${collapsed ? 'md:ml-20' : 'md:ml-64'} pb-20 md:pb-0`}>
        {/* Header */}
        <header className="h-16 sticky top-0 z-40 px-6 flex items-center justify-between bg-black/30 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              {MENU_ITEMS.find(i => i.path === location.pathname)?.label || 'iGreen'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 group-focus-within:text-green-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar cliente, orden, IMEI..." 
                className="bg-black/30 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm w-64 text-white focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all"
              />
            </div>
            
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button className="relative p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
          </div>
        </header>

        <div className="p-8 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
