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
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar - Glass Claro */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 
          bg-white/20 backdrop-blur-2xl border-r border-white/30 
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-20' : 'w-64'}
          hidden md:flex flex-col
        `}
      >
        <div className="h-16 flex items-center justify-center border-b border-white/30 relative">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span className="text-3xl">🍏</span>
            {!collapsed && <span className="text-green-600">iGreen</span>}
          </div>
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-6 bg-white/40 backdrop-blur-xl border border-white/50 rounded-full p-1.5 text-xs text-gray-600 hover:text-green-600 transition-colors shadow-lg"
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
                  flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
                  ${active 
                    ? 'bg-white/40 text-green-600 font-medium shadow-sm' 
                    : 'text-gray-600 hover:bg-white/20 hover:text-gray-800'}
                  ${collapsed ? 'justify-center' : ''}
                `}
              >
                <div className="relative">
                  <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                      {item.badge}
                    </span>
                  )}
                </div>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/30">
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              MP
            </div>
            {!collapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-gray-800 truncate">Matías</p>
                <p className="text-xs text-gray-500 truncate">Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/20 backdrop-blur-2xl border-t border-white/30 z-50 flex justify-around p-4">
        <Link to="/" className="text-gray-600 hover:text-green-600"><LayoutDashboard /></Link>
        <Link to="/inbox" className="text-gray-600 hover:text-green-600 relative">
          <MessageSquare />
          <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
        </Link>
        <Link to="/service" className="text-gray-600 hover:text-green-600"><Wrench /></Link>
        <Link to="/settings" className="text-gray-600 hover:text-green-600"><Menu /></Link>
      </div>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${collapsed ? 'md:ml-20' : 'md:ml-64'} pb-20 md:pb-0`}>
        {/* Header - Glass Claro */}
        <header className="h-16 sticky top-0 z-40 px-6 flex items-center justify-between bg-white/15 backdrop-blur-2xl border-b border-white/30">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
              {MENU_ITEMS.find(i => i.path === location.pathname)?.label || 'iGreen'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-green-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar cliente, orden, IMEI..." 
                className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-full pl-10 pr-4 py-2 text-sm w-64 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all"
              />
            </div>
            
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/20 text-gray-600 hover:text-gray-800 transition-colors">
              {darkMode ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <button className="relative p-2 rounded-full hover:bg-white/20 text-gray-600 hover:text-gray-800 transition-colors">
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
