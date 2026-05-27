import { ArrowRight, Sparkles, Users, MessageSquare } from 'lucide-react';

const metrics = [
  { label: 'Young leaders mentored', value: '1,200+', icon: Users },
  { label: 'Community scholarships', value: '58', icon: Sparkles },
  { label: 'Inquiries answered', value: '3,400+', icon: MessageSquare },
];

const Home = () => {
  return (
    <section className="space-y-12 pb-16">
      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-brand-purple/10 px-3 py-1 text-xs uppercase tracking-[0.32em] text-brand-gold">
            Empowerment for every girl
          </span>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
            She Can Foundation: inspiring courage, leadership and radiant futures.
          </h1>
          <p className="max-w-xl text-slate-300 sm:text-lg">
            We build warm, modern communities where girls and young women unlock new confidence, leadership skills, and opportunity through mentorship, learning, and transformative programs.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#impact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-rose px-6 py-3 text-sm font-semibold text-white shadow-glass transition hover:scale-[1.01]">
              Explore impact <ArrowRight size={16} />
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-brand-gold hover:text-brand-gold">
              Contact us
            </a>
          </div>
        </div>
        <div className="glass-card relative overflow-hidden rounded-[2rem] border border-white/10 p-8 shadow-glass">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(236,72,153,0.18),transparent_30%)]" />
          <div className="relative space-y-4">
            <p className="text-sm uppercase tracking-[0.34em] text-brand-gold">Our mission</p>
            <h2 className="text-3xl font-semibold text-white">Leadership, advocacy, and heartfelt community programs.</h2>
            <p className="text-slate-300">
              Our team blends mentorship, STEAM learning, and social wellness support for young women who are ready to lead with confidence.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {['Mentorship circles', 'Scholarship support', 'Career readiness', 'Community events'].map((item) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-sm text-slate-400">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section id="impact" className="grid gap-6 lg:grid-cols-3">
        {metrics.map(({ label, value, icon: Icon }) => (
          <div key={label} className="glass-card rounded-[2rem] border border-white/10 p-8 text-center shadow-glass">
            <Icon className="mx-auto mb-4 h-10 w-10 text-brand-gold" />
            <p className="text-4xl font-semibold text-white">{value}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.24em] text-slate-400">{label}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-glass">
          <span className="inline-flex rounded-full bg-brand-rose/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-brand-rose">
            Leadership pillars
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-white">Three pillars of lasting empowerment</h2>
          <div className="mt-8 space-y-5">
            {[
              { title: 'Education', detail: 'Workshops, scholarships, and tools that empower a new generation.' },
              { title: 'Mentorship', detail: 'Individual coaching, alumni support, and safe peer spaces.' },
              { title: 'Leadership', detail: 'Career pathways, public speaking, and civic engagement training.' },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-slate-300">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-glass">
          <div className="flex items-center gap-4 text-brand-gold">
            <Sparkles size={28} />
            <div>
              <p className="text-sm uppercase tracking-[0.28em]">Featured story</p>
              <p className="text-xl font-semibold text-white">Innovation through empathy.</p>
            </div>
          </div>
          <p className="mt-6 text-slate-300">
            Each student story is a reminder that leadership is made, not born. Our programs celebrate authenticity, ambition and compassionate growth.
          </p>
          <div className="mt-8 rounded-[2rem] bg-slate-900/60 p-6 text-slate-200">
            <p className="font-semibold text-white">We believe every girl can change her world.</p>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Join our mission to unleash potential through safe, supportive, and skill-building experiences.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Home;
