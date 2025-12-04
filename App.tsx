
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Inbox } from './pages/Inbox';
import { Service } from './pages/Service';
import { Billing } from './pages/Billing';
import { Clients } from './pages/Clients';
import { Schedule } from './pages/Schedule';
import { Sales } from './pages/Sales';
import { Inventory } from './pages/Inventory';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { GlassCard } from './components/GlassCard';

// Placeholder pages for routes not yet implemented in detail
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <GlassCard className="h-[50vh] flex items-center justify-center flex-col gap-4 text-center">
    <div className="text-6xl opacity-20">🚧</div>
    <div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-400">Módulo en construcción.</p>
    </div>
  </GlassCard>
);

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/service" element={<Service />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
