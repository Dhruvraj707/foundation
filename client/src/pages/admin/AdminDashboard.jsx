import { useEffect, useState } from 'react';
import { ShieldCheck, Users, MessageSquare, Star } from 'lucide-react';
import api from '../../services/api';
import Spinner from '../../components/Spinner';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [counts, setCounts] = useState({ totalUsers: 0, adminCount: 0, unreadMessages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const [usersRes, contactsRes] = await Promise.all([
          api.get('/admin/users'),
          api.get('/contacts'),
        ]);

        const fetchedUsers = usersRes.data.data || [];
        const fetchedContacts = contactsRes.data.data || [];

        setUsers(fetchedUsers);
        setCounts({
          totalUsers: fetchedUsers.length,
          adminCount: fetchedUsers.filter((user) => user.role === 'admin').length,
          unreadMessages: fetchedContacts.filter((message) => message.status === 'unread').length,
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load admin dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadAdminData();
  }, []);

  return (
    <section className="space-y-8 py-8">
      <div className="glass-card rounded-[2rem] border border-white/10 p-10 shadow-glass">
        <h1 className="text-4xl font-semibold text-white">Admin dashboard</h1>
        <p className="mt-3 text-slate-300">Monitor users, understand message volume, and manage roles for She Can Foundation operations.</p>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <>
          {error && <p className="rounded-3xl bg-rose-500/10 p-4 text-sm text-rose-200">{error}</p>}

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { label: 'Total users', value: counts.totalUsers, icon: Users },
              { label: 'Admin accounts', value: counts.adminCount, icon: ShieldCheck },
              { label: 'Unread messages', value: counts.unreadMessages, icon: MessageSquare },
            ].map((item) => (
              <div key={item.label} className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-glass">
                <div className="flex items-center gap-4 text-brand-gold">
                  <item.icon size={28} />
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
                </div>
                <p className="mt-6 text-4xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-glass">
            <h2 className="text-2xl font-semibold text-white">User management</h2>
            <p className="mt-3 text-slate-300">Review registered users and elevate trusted members to admin access.</p>

            <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70">
              <div className="grid grid-cols-[2fr_2fr_1fr_1fr] gap-4 border-b border-white/10 bg-slate-900/80 px-6 py-4 text-slate-400 text-sm uppercase tracking-[0.24em]">
                <span>Name</span>
                <span>Email</span>
                <span>Role</span>
                <span className="text-right">Status</span>
              </div>
              <div className="divide-y divide-white/5">
                {users.map((user) => (
                  <div key={user._id} className="grid grid-cols-[2fr_2fr_1fr_1fr] gap-4 px-6 py-5 text-sm text-slate-200">
                    <span>{user.name}</span>
                    <span>{user.email}</span>
                    <span className="capitalize text-brand-gold">{user.role}</span>
                    <span className="text-right">{user.role === 'admin' ? 'Admin' : 'User'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default AdminDashboard;
