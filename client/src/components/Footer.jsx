const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950/90 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} She Can Foundation. All rights reserved.</p>
        <p className="text-sm text-slate-500">Built with empathy, purpose, and a vision for inclusive leadership.</p>
      </div>
    </footer>
  );
};

export default Footer;
