import React, { useState, useEffect } from "react";
import { 
  Terminal, 
  Search, 
  RefreshCcw, 
  Star, 
  Trash2,
  Mail,
  MailOpen,
  Calendar,
  Filter
} from "lucide-react";
import { toast } from 'react-toastify';
import messageService from '../services/message.service';

const ManageMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    read: 0,
    replied: 0,
    archived: 0,
    starred: 0
  });

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    filterMessages();
  }, [messages, searchTerm, statusFilter]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await messageService.getAll();
      
      if (response.success) {
        setMessages(response.data);
        setStats(response.stats);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const filterMessages = () => {
    let filtered = messages;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(msg => msg.status === statusFilter);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(msg =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMessages(filtered);
  };

  const handleToggleStar = async (id) => {
    try {
      await messageService.toggleStar(id);
      setMessages(messages.map(msg =>
        msg._id === id ? { ...msg, isStarred: !msg.isStarred } : msg
      ));
      toast.success('Message updated');
    } catch (error) {
      toast.error('Failed to update message');
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await messageService.updateStatus(id, status);
      setMessages(messages.map(msg =>
        msg._id === id ? { ...msg, status } : msg
      ));
      toast.success(`Marked as ${status}`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      await messageService.delete(id);
      setMessages(messages.filter(msg => msg._id !== id));
      setSelectedMessage(null);
      toast.success('Message deleted');
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'unread': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'read': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'replied': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'archived': return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-[#00ff41] font-mono animate-pulse text-lg">
          Loading messages...
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 text-white">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="w-5 h-5 text-[#00ff41]" />
            <span className="text-sm text-[#00ff41] uppercase tracking-widest font-mono">
              Messages Management
            </span>
          </div>
          <h2 className="text-3xl font-bold text-[#e8e8e8]">
            Contact Messages
          </h2>
          <p className="text-[#8b8b8b] mt-1">
            Manage inquiries from your contact form
          </p>
        </div>

        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 px-4 py-2 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41]/10 rounded-md transition"
        >
          <RefreshCcw size={16} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-[#151515] border border-[#2a2a2a] rounded-lg p-4">
          <p className="text-xs text-[#8b8b8b] mb-1">Total</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-[#151515] border border-yellow-400/30 rounded-lg p-4">
          <p className="text-xs text-yellow-400 mb-1">Unread</p>
          <p className="text-2xl font-bold text-yellow-400">{stats.unread}</p>
        </div>
        <div className="bg-[#151515] border border-blue-400/30 rounded-lg p-4">
          <p className="text-xs text-blue-400 mb-1">Read</p>
          <p className="text-2xl font-bold text-blue-400">{stats.read}</p>
        </div>
        <div className="bg-[#151515] border border-green-400/30 rounded-lg p-4">
          <p className="text-xs text-green-400 mb-1">Replied</p>
          <p className="text-2xl font-bold text-green-400">{stats.replied}</p>
        </div>
        <div className="bg-[#151515] border border-gray-400/30 rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-1">Archived</p>
          <p className="text-2xl font-bold text-gray-400">{stats.archived}</p>
        </div>
        <div className="bg-[#151515] border border-[#00ff41]/30 rounded-lg p-4">
          <p className="text-xs text-[#00ff41] mb-1">Starred</p>
          <p className="text-2xl font-bold text-[#00ff41]">{stats.starred}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#151515] border border-[#2a2a2a] rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search */}
          <div className="md:col-span-8 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b8b8b]" />
            <input
              type="text"
              placeholder="Search by name, email, subject, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 bg-[#0a0a0a] border border-[#2a2a2a] text-[#e8e8e8] rounded-md px-3 py-2 focus:border-[#00ff41] outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="md:col-span-4 relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b8b8b]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-9 bg-[#0a0a0a] border border-[#2a2a2a] text-[#e8e8e8] rounded-md px-3 py-2 focus:border-[#00ff41] outline-none"
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-[#151515] border border-[#2a2a2a] rounded-lg overflow-hidden">
        {filteredMessages.length === 0 ? (
          <div className="p-12 text-center">
            <Mail className="w-16 h-16 mx-auto mb-4 text-[#8b8b8b]" />
            <h3 className="text-xl font-semibold mb-2 text-[#8b8b8b]">
              No messages found
            </h3>
            <p className="text-[#6b6b6b]">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your filters' 
                : 'Messages will appear here when visitors contact you'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#2a2a2a]">
            {filteredMessages.map((message) => (
              <div
                key={message._id}
                className={`p-4 hover:bg-[#1a1a1a] transition cursor-pointer ${
                  message.status === 'unread' ? 'bg-yellow-400/5' : ''
                }`}
                onClick={() => {
                  setSelectedMessage(message);
                  if (message.status === 'unread') {
                    handleUpdateStatus(message._id, 'read');
                  }
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Star Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleStar(message._id);
                    }}
                    className="mt-1"
                  >
                    <Star
                      size={18}
                      className={message.isStarred ? 'fill-[#00ff41] text-[#00ff41]' : 'text-[#8b8b8b]'}
                    />
                  </button>

                  {/* Message Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-white truncate">
                        {message.name}
                      </h4>
                      <span className={`px-2 py-0.5 text-xs rounded border font-mono uppercase ${getStatusColor(message.status)}`}>
                        {message.status}
                      </span>
                      {message.status === 'unread' && (
                        <MailOpen size={14} className="text-yellow-400" />
                      )}
                    </div>
                    
                    <p className="text-sm text-[#8b8b8b] mb-1">{message.email}</p>
                    <p className="text-sm font-medium text-[#e8e8e8] mb-2">
                      {message.subject}
                    </p>
                    <p className="text-sm text-[#8b8b8b] line-clamp-2">
                      {message.message}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-2 text-xs text-[#6b6b6b]">
                      <Calendar size={12} />
                      {new Date(message.createdAt).toLocaleDateString()} at{' '}
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(message._id);
                      }}
                      className="p-2 hover:bg-red-500/10 text-red-500 rounded transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="bg-[#151515] border-2 border-[#2a2a2a] rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#2a2a2a] px-6 py-4 border-b border-[#2a2a2a] flex items-center justify-between">
              <h3 className="text-lg font-bold">Message Details</h3>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-[#8b8b8b] hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* From */}
              <div>
                <label className="text-xs text-[#8b8b8b] mb-1 block">FROM</label>
                <p className="text-white font-semibold">{selectedMessage.name}</p>
                <p className="text-sm text-[#00ff41]">{selectedMessage.email}</p>
              </div>

              {/* Subject */}
              <div>
                <label className="text-xs text-[#8b8b8b] mb-1 block">SUBJECT</label>
                <p className="text-white font-semibold">{selectedMessage.subject}</p>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs text-[#8b8b8b] mb-1 block">MESSAGE</label>
                <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded p-4">
                  <p className="text-white whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="text-xs text-[#8b8b8b] mb-1 block">RECEIVED</label>
                <p className="text-white">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-[#2a2a2a]">
                <button
                  onClick={() => handleUpdateStatus(selectedMessage._id, 'replied')}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-black rounded font-semibold transition"
                >
                  Mark as Replied
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedMessage._id, 'archived')}
                  className="px-4 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white rounded transition"
                >
                  Archive
                </button>
                <button
                  onClick={() => {
                    handleDelete(selectedMessage._id);
                    setSelectedMessage(null);
                  }}
                  className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500 text-red-500 rounded transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMessagesPage;