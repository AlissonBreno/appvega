type SectionPageProps = {
  icon: string;
  title: string;
  subtitle: string;
};

export const SectionPage = ({ icon, title, subtitle }: SectionPageProps) => (
  <main>
    <header className="screen-header">
      <div className="screen-header-row">
        <span aria-hidden>{icon}</span>
        <h1 className="screen-title">{title}</h1>
      </div>
      <p className="screen-subtitle">{subtitle}</p>
    </header>
  </main>
);
