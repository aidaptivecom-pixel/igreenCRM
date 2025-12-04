import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { MOCK_CONVERSATIONS } from '../constants';
import { MessageCircle, Instagram, Mail, Globe, Phone, MoreHorizontal, Send, Paperclip } from 'lucide-react';
import { Message } from '../types';

export const Inbox: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(MOCK_CONVERSATIONS[0].id);
  const selectedConv = MOCK_CONVERSATIONS.find(c => c.id === selectedId);

  const getChannelIcon = (channel: string) => {
    switch(channel) {
      case 'whatsapp': return <MessageCircle size={16} className="text-green-400" />;
      case 'instagram': return <Instagram size={16} className="text-pink-500" />;
      case 'email': return <Mail size={16} className="text-blue-400" />;
      default: return <Globe size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="h-[calc(100vh-180px)] grid grid-cols-12 gap-6">
      {/* Sidebar List */}
      <GlassCard className="col-span-4 flex flex-col p-0 overflow-hidden">
        <div className="p-4 border-b border-white/10 space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['Todos', 'WhatsApp', 'Instagram', 'Email'].map((tab, i) => (
              <button key={i} className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                {tab}
              </button>
            ))}
          </div>
          <input 
            type="text" 
            placeholder="Buscar mensaje..." 
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-green-500/50"
          />
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {MOCK_CONVERSATIONS.map((conv) => (
            <div 
              key={conv.id}
              onClick={() => setSelectedId(conv.id)}
              className={`p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors ${selectedId === conv.id ? 'bg-white/5 border-l-2 border-l-green-500' : ''}`}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  {conv.status === 'urgent' && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
                  <span className="font-semibold text-sm">{conv.clientName}</span>
                </div>
                <span className="text-xs text-gray-500">{conv.timestamp}</span>
              </div>
              <p className="text-sm text-gray-400 line-clamp-2 mb-2">{conv.lastMessage}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                {getChannelIcon(conv.channel)}
                <span className="capitalize">{conv.channel}</span>
                {conv.unreadCount > 0 && (
                  <span className="ml-auto bg-green-500 text-black font-bold px-2 py-0.5 rounded-full text-[10px]">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Chat Area */}
      <GlassCard className="col-span-8 flex flex-col p-0 overflow-hidden relative">
        {selectedConv ? (
          <>
            {/* Header */}
            <div className="h-16 px-6 flex items-center justify-between border-b border-white/10 bg-white/5 backdrop-blur-xl z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-sm font-bold border border-white/10">
                  {selectedConv.clientName.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold">{selectedConv.clientName}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                     {getChannelIcon(selectedConv.channel)} +54 9 11 5678-9012
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white/10 rounded-full text-gray-400"><Phone size={18} /></button>
                <button className="p-2 hover:bg-white/10 rounded-full text-gray-400"><MoreHorizontal size={18} /></button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-black/20">
              {selectedConv.messages.map((msg: Message) => (
                <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] p-4 rounded-2xl ${msg.isMe ? 'bg-green-600 text-white rounded-br-none' : 'bg-[#1F1F1F] text-gray-200 rounded-bl-none'}`}>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    <span className="text-[10px] opacity-50 mt-1 block text-right">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white/5 border-t border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Paperclip size={20} />
                </button>
                <input 
                  type="text" 
                  placeholder="Escribir mensaje..." 
                  className="flex-1 bg-black/30 border border-white/10 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-green-500/50 transition-colors"
                />
                <button className="p-3 bg-green-500 hover:bg-green-400 text-black rounded-full transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">Selecciona una conversación</div>
        )}
      </GlassCard>
    </div>
  );
};
