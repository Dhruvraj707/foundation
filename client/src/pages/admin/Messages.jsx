import { useEffect, useState } from 'react';
import { Bookmark, Trash2, MailOpen } from 'lucide-react';
import api from '../../services/api';
import Spinner from '../../components/Spinner';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get('/contacts');
        setMessages(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const response = await api.put(`/contacts/${id}`, { status });
      setMessages((current) => current.map((message) => (message._id === id ? response.data.data : message)));
      if (active?._id === id) setActive(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update message');
    }
  };

  const removeMessage = async (id) => {
    try {
      await api.delete(`/contacts/${id}`);
      setMessages((current) => current.filter((message) => message._id !== id));
      if (active?._id === id) setActive(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete message');
    }
  };

  const filtered = messages.filter((message) => filter === 'all' || message.status === filter);

  return (
    <section className="space-y-8 py-8">
      <div className="glass-card rounded-[2rem] border border-white/10 p-10 shadow-glass">
        <h1 className="text-4xl font-semibold text-white">Message manager</h1>
        <p className="mt-3 text-slate-300">Review incoming inquiries and mark them as read or remove them securely from the dashboard.</p>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-glass">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-brand-gold">Filter</p>
                <h2 className="text-2xl font-semibold text-white">Messages</h2>
              </div>
              <div className="flex gap-2">
                {['all', 'unread', 'read'].map((statusOption) => (
                  <button
                    key={statusOption}
                    onClick={() => setFilter(statusOption)}
                    className={`rounded-full px-4 py-2 text-sm transition ${filter === statusOption ? 'bg-brand-purple text-white' : 'bg-slate-900/70 text-slate-300 hover:bg-slate-900'}`}
                  >
                    {statusOption}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {filtered.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-slate-300">No messages found.</div>
              ) : (
                filtered.map((message) => (
                  <button
                    key={message._id}
                    type="button"
                    onClick={() => setActive(message)}
                    className={`w-full rounded-3xl border border-white/10 px-5 py-4 text-left transition ${active?._id === message._id ? 'bg-brand-purple/10' : 'bg-slate-950/80 hover:bg-slate-900/80'}`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-white">{message.subject}</p>
                        <p className="mt-1 text-sm text-slate-400">{message.name} • {message.email}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs ${message.status === 'unread' ? 'bg-brand-rose/15 text-brand-rose' : 'bg-slate-800 text-slate-300'}`}>
                        {message.status}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-glass">
            {active ? (
              <>
                <div className="flex items-center gap-3 text-brand-gold">
                  <MailOpen size={28} />
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em]">Selected message</p>
                    <p className="text-2xl font-semibold text-white">{active.subject}</p>
                  </div>
                </div>
                <div className="mt-6 space-y-4 rounded-3xl bg-slate-900/70 p-6">
                  <p className="text-sm text-slate-400">From</p>
                  <p className="font-semibold text-white">{active.name} • {active.email}</p>
                  <p className="text-sm text-slate-400">Sent</p>
                  <p className="text-slate-300">{new Date(active.createdAt).toLocaleString()}</p>
                </div>
                <div className="mt-6 rounded-3xl bg-slate-950/80 p-6 text-slate-200">
                  <p>{active.message}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => updateStatus(active._id, active.status === 'unread' ? 'read' : 'unread')}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]"
                  >
                    <Bookmark size={16} />
                    Mark as {active.status === 'unread' ? 'read' : 'unread'}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeMessage(active._id)}
                    className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-5 py-3 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </>
            ) : (
              <div className="rounded-3xl border border-dashed border-white/10 bg-slate-900/70 p-10 text-center text-slate-400">
                <p className="text-lg text-white">Select a message to view details</p>
                <p className="mt-3">Use the list on the left to manage contact inquiries quickly.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Messages;
