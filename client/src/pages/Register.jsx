import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register, error, setError } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await register(formData);
    setLoading(false);

    if (response.success) {
      navigate('/');
    }
  };

  return (
    <section className="mx-auto max-w-2xl space-y-8 py-8">
      <div className="glass-card rounded-[2rem] border border-white/10 p-10 shadow-glass">
        <h1 className="text-4xl font-semibold text-white">Join our community</h1>
        <p className="mt-3 text-slate-300">Create an account and stay connected with She Can Foundation’s programs, updates, and opportunities.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card rounded-[2rem] border border-white/10 p-10 shadow-glass">
        <div className="space-y-6">
          <label className="block text-sm text-slate-200">
            Full name
            <input
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                setError(null);
              }}
              required
              className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-brand-gold"
              placeholder="Jane Doe"
            />
          </label>
          <label className="block text-sm text-slate-200">
            Email
            <input
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setError(null);
              }}
              required
              className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-brand-gold"
              placeholder="you@example.com"
            />
          </label>
          <label className="block text-sm text-slate-200">
            Password
            <input
              type="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setError(null);
              }}
              required
              minLength={6}
              className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-brand-gold"
              placeholder="Create a strong password"
            />
          </label>
        </div>

        {error && <p className="mt-4 rounded-3xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-brand-purple to-brand-rose px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>

        <p className="mt-6 text-center text-slate-400">
          Already registered?{' '}
          <Link className="text-brand-gold hover:text-white" to="/login">
            Log in
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
