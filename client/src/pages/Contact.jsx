import { useState } from 'react';
import api from '../services/api';
import Spinner from '../components/Spinner';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: '', error: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, success: '', error: '' });

    try {
      const response = await api.post('/contacts', formData);
      if (response.data.success) {
        setStatus({ loading: false, success: response.data.message, error: '' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      setStatus({
        loading: false,
        success: '',
        error: err.response?.data?.message || 'Unable to submit your inquiry. Please try again.',
      });
    }
  };

  return (
    <section className="space-y-10 py-8">
      <div className="glass-card rounded-[2rem] border border-white/10 p-10 shadow-glass">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">Reach out</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">We would love to hear from you.</h1>
        <p className="mt-4 max-w-3xl text-slate-300 sm:text-lg">
          Have a question about our programs, collaboration opportunities, or how to support the foundation? Send us a message and we’ll connect shortly.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="glass-card rounded-[2rem] border border-white/10 p-10 shadow-glass">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-200">
              Name
              <input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-brand-gold"
                placeholder="Your full name"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-200">
              Email
              <input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                type="email"
                required
                className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-brand-gold"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="mt-6 block space-y-2 text-sm text-slate-200">
            Subject
            <input
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
              className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-brand-gold"
              placeholder="What can we help you with?"
            />
          </label>

          <label className="mt-6 block space-y-2 text-sm text-slate-200">
            Message
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows="6"
              className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-brand-gold"
              placeholder="Tell us more about your inquiry."
            />
          </label>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={status.loading}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-purple to-brand-rose px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status.loading ? 'Sending...' : 'Send message'}
            </button>
            {status.success && <p className="text-sm text-emerald-300">{status.success}</p>}
            {status.error && <p className="text-sm text-rose-300">{status.error}</p>}
          </div>

          {status.loading && <Spinner />}
        </form>

        <div className="glass-card rounded-[2rem] border border-white/10 p-10 shadow-glass">
          <h2 className="text-3xl font-semibold text-white">Contact details</h2>
          <p className="mt-4 max-w-xl text-slate-300">
            Prefer to connect directly? Use the form or email our team. We are here to help you learn how to collaborate, donate, or join our next leadership cohort.
          </p>
          <div className="mt-8 space-y-4 text-slate-200">
            <div className="rounded-3xl bg-slate-900/70 p-5">
              <p className="text-sm text-slate-400">Email</p>
              <p className="mt-1 font-medium text-white">hello@shecan.foundation</p>
            </div>
            <div className="rounded-3xl bg-slate-900/70 p-5">
              <p className="text-sm text-slate-400">Phone</p>
              <p className="mt-1 font-medium text-white">+1 (555) 012-3456</p>
            </div>
            <div className="rounded-3xl bg-slate-900/70 p-5">
              <p className="text-sm text-slate-400">Office</p>
              <p className="mt-1 font-medium text-white">Virtual HQ / Global Impact</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
