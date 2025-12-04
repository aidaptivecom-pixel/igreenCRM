
import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { MOCK_PRODUCTS } from '../constants';
import { Product, ProductType } from '../types';
import { 
  Package, Search, Filter, AlertTriangle, Plus, Tag, 
  BarChart2, MoreVertical, X, Settings, DollarSign, 
  ShoppingCart, Wrench, ArrowRight
} from 'lucide-react';

export const Inventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTab, setFilterTab] = useState<'Todos' | 'Repuestos' | 'Venta' | 'Stock Bajo'>('Todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [showNewProductModal, setShowNewProductModal] = useState(false);

  // Filter Logic
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesTab = true;
    if (filterTab === 'Repuestos') matchesTab = product.type === 'Repuesto' || product.type === 'Ambos';
    if (filterTab === 'Venta') matchesTab = product.type === 'Venta' || product.type === 'Ambos';
    if (filterTab === 'Stock Bajo') matchesTab = product.stockAvailable <= product.alertMin;

    return matchesSearch && matchesTab;
  });

  const lowStockCount = MOCK_PRODUCTS.filter(p => p.stockAvailable <= p.alertMin).length;

  const getProductTypeBadge = (type: ProductType) => {
    switch(type) {
      case 'Repuesto': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Venta': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Ambos': return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-6">
      
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Package className="text-green-400" /> Inventario
        </h2>
        <button 
          onClick={() => setShowNewProductModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} /> Nuevo Producto
        </button>
      </div>

      {/* 2. Alert Banner */}
      {lowStockCount > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-yellow-500">
            <AlertTriangle size={20} />
            <span className="font-medium">⚠️ ALERTA: {lowStockCount} productos con stock bajo</span>
          </div>
          <button 
            onClick={() => setFilterTab('Stock Bajo')}
            className="text-sm font-medium text-yellow-500 hover:text-yellow-400 underline"
          >
            Ver productos
          </button>
        </div>
      )}

      {/* 3. Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex bg-white/5 rounded-xl p-1 border border-white/10 overflow-x-auto">
          {['Todos', 'Repuestos', 'Venta', 'Stock Bajo'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                filterTab === tab ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Buscar producto por nombre o SKU..." 
            className="glass-input w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 4. Products Table */}
      <GlassCard className="flex-1 p-0 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-gray-400 uppercase text-xs sticky top-0 backdrop-blur-xl z-10">
              <tr>
                <th className="px-6 py-4">Producto</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4 text-center">Stock</th>
                <th className="px-6 py-4 text-center">Disp.</th>
                <th className="px-6 py-4 text-right">Costo</th>
                <th className="px-6 py-4 text-right">Precio</th>
                <th className="px-6 py-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((product) => (
                <tr 
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500">
                        <Package size={20} />
                      </div>
                      <span className="font-medium text-white">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-gray-400">{product.sku}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] border ${getProductTypeBadge(product.type)}`}>
                      {product.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                       {product.stock}
                       {product.stockAvailable <= product.alertMin && (
                         <AlertTriangle size={14} className="text-yellow-500" />
                       )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-bold ${product.stockAvailable <= 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {product.stockAvailable}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-gray-400">
                    ${product.costARS.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-white">
                    ${product.priceARS.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-white/10 rounded-full text-gray-500 hover:text-white transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <Package size={48} className="mb-4 opacity-20" />
              <p>No se encontraron productos</p>
            </div>
          )}
        </div>
      </GlassCard>

      {/* 5. Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-4xl bg-[#141414] border-white/20 animate-in slide-up max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6 pb-6 border-b border-white/10">
              <div className="flex gap-6">
                <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 shrink-0">
                  <Package size={48} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                    <span className={`px-2 py-0.5 rounded text-xs border ${getProductTypeBadge(selectedProduct.type)}`}>
                      {selectedProduct.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                    <span className="font-mono bg-white/5 px-2 py-0.5 rounded">{selectedProduct.sku}</span>
                    <span>{selectedProduct.category}</span>
                  </div>
                  <p className="text-sm text-gray-500 max-w-lg">{selectedProduct.description}</p>
                </div>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              
              {/* Prices Column */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <DollarSign size={16} /> Precios
                </h3>
                <div className="p-4 rounded-xl bg-white/5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Costo USD</span>
                    <span>{selectedProduct.costUSD ? `USD ${selectedProduct.costUSD}` : '-'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Costo ARS</span>
                    <span>${selectedProduct.costARS.toLocaleString()}</span>
                  </div>
                  <div className="h-px bg-white/10 my-2" />
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-300">Precio Venta</span>
                    <span className="text-green-400 text-lg">${selectedProduct.priceARS.toLocaleString()}</span>
                  </div>
                  {selectedProduct.priceWithInstall && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Con Colocación</span>
                      <span>${selectedProduct.priceWithInstall.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Stock Column */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <Package size={16} /> Stock
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                    <span className="text-2xl font-bold block">{selectedProduct.stock}</span>
                    <span className="text-xs text-gray-400 uppercase">Físico</span>
                  </div>
                  <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                    <span className="text-2xl font-bold block text-green-400">{selectedProduct.stockAvailable}</span>
                    <span className="text-xs text-green-500/70 uppercase">Disponible</span>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                    <span className="text-2xl font-bold block text-blue-400">{selectedProduct.stockCommitted}</span>
                    <span className="text-xs text-blue-500/70 uppercase">Reservado</span>
                  </div>
                  <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center">
                    <span className="text-2xl font-bold block text-yellow-400">{selectedProduct.alertMin}</span>
                    <span className="text-xs text-yellow-500/70 uppercase">Mínimo</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAddStockModal(true)}
                  className="w-full btn-secondary text-sm flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Agregar Stock
                </button>
              </div>

              {/* Info Column */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <Tag size={16} /> Información
                </h3>
                <div className="p-4 rounded-xl bg-white/5 space-y-4 text-sm">
                  <div>
                    <span className="block text-gray-500 text-xs uppercase mb-1">Proveedor</span>
                    <span className="text-white">{selectedProduct.supplier || '-'}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 text-xs uppercase mb-1">Garantía</span>
                    <span className="text-white">{selectedProduct.warrantyDays ? `${selectedProduct.warrantyDays} días` : 'Sin garantía'}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 text-xs uppercase mb-1">Dispositivos</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedProduct.compatibleDevices?.map((dev, i) => (
                        <span key={i} className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-300">{dev}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-gray-400">Visible en Web</span>
                    <div className={`w-8 h-4 rounded-full relative ${selectedProduct.visibleWeb ? 'bg-green-500' : 'bg-gray-600'}`}>
                      <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${selectedProduct.visibleWeb ? 'left-4.5' : 'left-0.5'}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Movements History */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <BarChart2 size={16} /> Últimos Movimientos
              </h3>
              <div className="border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-white/5 text-gray-400 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3">Fecha</th>
                      <th className="px-4 py-3">Tipo</th>
                      <th className="px-4 py-3">Referencia</th>
                      <th className="px-4 py-3 text-right">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {selectedProduct.movements?.map((mov) => (
                      <tr key={mov.id}>
                        <td className="px-4 py-3 text-gray-400">{mov.date}</td>
                        <td className="px-4 py-3">{mov.type}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs font-mono">{mov.reference || mov.notes || '-'}</td>
                        <td className={`px-4 py-3 text-right font-medium ${mov.quantity > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {mov.quantity > 0 ? '+' : ''}{mov.quantity}
                        </td>
                      </tr>
                    ))}
                    {!selectedProduct.movements?.length && (
                      <tr>
                        <td colSpan={4} className="px-4 py-3 text-center text-gray-500">Sin movimientos recientes</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </GlassCard>
        </div>
      )}

      {/* 6. Add Stock Modal */}
      {showAddStockModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-md bg-[#141414] border-white/20 animate-in slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Agregar Stock</h3>
              <button onClick={() => setShowAddStockModal(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1 ml-1">Producto</label>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-sm text-gray-300">
                  {selectedProduct?.name}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-xs text-gray-400 mb-1 ml-1">Cantidad</label>
                   <input type="number" className="glass-input w-full" placeholder="0" autoFocus />
                </div>
                <div>
                   <label className="block text-xs text-gray-400 mb-1 ml-1">Tipo Movimiento</label>
                   <select className="glass-input w-full">
                     <option>Compra</option>
                     <option>Ajuste (+)</option>
                     <option>Devolución</option>
                   </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1 ml-1">Proveedor / Origen</label>
                <input type="text" className="glass-input w-full" placeholder="Ej: TechParts China" defaultValue={selectedProduct?.supplier} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs text-gray-400 mb-1 ml-1">Costo Unitario (ARS)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
                      <input type="number" className="glass-input w-full pl-6" defaultValue={selectedProduct?.costARS} />
                    </div>
                 </div>
                 <div>
                    <label className="block text-xs text-gray-400 mb-1 ml-1">Costo Total</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
                      <input type="number" className="glass-input w-full pl-6" disabled placeholder="Calculado..." />
                    </div>
                 </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1 ml-1">Notas</label>
                <textarea rows={2} className="glass-input w-full py-2" placeholder="Detalle opcional..."></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddStockModal(false)} className="btn-secondary text-sm">Cancelar</button>
                <button type="button" onClick={() => setShowAddStockModal(false)} className="btn-primary text-sm">Confirmar Ingreso</button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}

      {/* 7. New Product Modal (Placeholder) */}
      {showNewProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-lg bg-[#141414] border-white/20 animate-in slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Nuevo Producto</h3>
              <button onClick={() => setShowNewProductModal(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
               <Package size={48} className="mb-4 opacity-50" />
               <p>Formulario de creación de producto pendiente.</p>
               <button onClick={() => setShowNewProductModal(false)} className="mt-6 btn-secondary">Cerrar</button>
            </div>
          </GlassCard>
        </div>
      )}

    </div>
  );
};
