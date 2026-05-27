const About = () => {
  return (
    <section className="space-y-10 py-8">
      <div className="glass-card rounded-[2rem] border border-white/10 p-10 shadow-glass">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">About the foundation</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">A modern empowerment movement with heart.</h1>
        <p className="mt-6 max-w-3xl text-slate-300 sm:text-lg">
          She Can Foundation brings together mentorship, education, and leadership training to help young women step into their purpose. Our programs blend practical skill-building with supportive community care.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {[
          { title: 'Our Vision', description: 'A future where every young woman is empowered to lead with confidence and compassion.' },
          { title: 'Our Mission', description: 'Create safe, inclusive spaces for learning, mentorship, and leadership development.' },
          { title: 'Our Values', description: 'Respect, resilience, excellence, access, and the belief that every voice matters.' },
        ].map((card) => (
          <div key={card.title} className="glass-card rounded-[2rem] border border-white/10 p-8 shadow-glass">
            <h2 className="text-2xl font-semibold text-white">{card.title}</h2>
            <p className="mt-3 text-slate-300">{card.description}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-card rounded-[2rem] border border-white/10 p-10 shadow-glass">
          <h2 className="text-3xl font-semibold text-white">What we do</h2>
          <p className="mt-4 text-slate-300">
            From leadership workshops to mentorship circles, our work is designed to elevate futures. We support academic success, career readiness, and emotional wellbeing for girls in underserved communities.
          </p>
          <ul className="mt-8 space-y-4 text-slate-300">
            <li className="rounded-3xl bg-slate-900/60 p-5">Mentorship programs with trusted role models</li>
            <li className="rounded-3xl bg-slate-900/60 p-5">Scholarship guidance and academic resources</li>
            <li className="rounded-3xl bg-slate-900/60 p-5">Leadership labs, public speaking, and civic engagement</li>
          </ul>
        </div>
        <div className="glass-card rounded-[2rem] border border-white/10 p-10 shadow-glass">
          <h2 className="text-3xl font-semibold text-white">Milestones</h2>
          <div className="mt-6 space-y-5">
            {[
              { label: '10K+', value: 'hours volunteered' },
              { label: '250+', value: 'events hosted' },
              { label: '300+', value: 'young women served' },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-brand-rose">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
