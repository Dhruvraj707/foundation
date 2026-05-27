import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Home, MessageCircle, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 font-semibold text-white">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-purple to-brand-rose text-lg shadow-glass">
            SC
          </span>
          <div>
            <p className="text-sm text-slate-300">She Can Foundation</p>
            <p className="text-xs uppercase tracking-[0.24em] text-brand-gold">Empower. Elevate. Lead.</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-brand-gold' : 'text-slate-300 hover:text-white'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              {user.role === 'admin' && (
                <button
                  type="button"
                  onClick={() => navigate('/admin/dashboard')}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-purple px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-darkpurple focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                  <ShieldCheck size={16} /> Admin
                </button>
              )}
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-brand-gold hover:text-brand-gold"
              >
                Sign out
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <Link className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-brand-gold hover:text-brand-gold" to="/login">
                Login
              </Link>
              <Link className="rounded-full bg-brand-purple px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-darkpurple" to="/register">
                Register
              </Link>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80 text-white md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 py-4 md:hidden">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-brand-purple/20 text-brand-gold' : 'text-slate-300 hover:bg-slate-900/80 hover:text-white'}`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {user ? (
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                  navigate('/');
                }}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white transition hover:border-brand-gold hover:text-brand-gold"
              >
                Sign out
              </button>
            ) : (
              <div className="grid gap-2">
                <Link
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-brand-gold hover:text-brand-gold"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl bg-brand-purple px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-darkpurple"
                  to="/register"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
