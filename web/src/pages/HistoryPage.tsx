import { DAILY_BARS, WEEKLY_ROWS, barColorForKcal } from '../app/history';

const toneColor = {
  above: 'var(--state-above)',
  near: 'var(--state-near)',
  within: 'var(--brand-green)',
};

const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

export const HistoryPage = () => (
  <main>
    <header className="screen-header">
      <div className="screen-header-row">
        <h1 className="screen-title">Histórico</h1>
      </div>
      <p className="screen-subtitle">Últimos 7 dias</p>
    </header>
    <div className="screen-body">
      <div className="stat-row">
        <article className="card stat-card">
          <strong>1.822</strong>
          <span>Média diária</span>
        </article>
        <article className="card stat-card">
          <strong>5/7</strong>
          <span>Dias cumpridos</span>
        </article>
        <article className="card stat-card">
          <strong>5</strong>
          <span>dias 🔥</span>
          <span>Sequência</span>
        </article>
      </div>
      <div className="history-grid">
        <section className="card">
          <div className="split">
            <h2 className="section-title">Calorias por dia</h2>
            <span>2.000 kcal</span>
          </div>
          <div className="bars" aria-label="Calorias por dia">
            {DAILY_BARS.map((kcal, index) => (
              <div key={days[index]} className="bar-col">
                <i
                  style={{
                    height: `${(kcal / 2500) * 160}px`,
                    background: toneColor[barColorForKcal(kcal)],
                  }}
                />
                <span>{days[index]}</span>
              </div>
            ))}
          </div>
        </section>
        <div className="history-side">
          <section className="card">
            <h2 className="section-title">Desempenho semanal</h2>
            {WEEKLY_ROWS.map(row => (
              <p key={row.day} className="week-row">
                <span>{row.day}</span>
                <span style={{ color: toneColor[row.tone] }}>{row.kcal.toLocaleString('pt-BR')}</span>
                <span className="muted">kcal / 2200</span>
              </p>
            ))}
            <p className="muted">Dentro · Próximo · Acima</p>
          </section>
          <section className="card">
            <h2 className="section-title">Média de macros (7 dias)</h2>
            <p>🍞 222g / 250g</p>
            <p>🥚 131g / 150g</p>
            <p>🥑 58g / 65g</p>
          </section>
        </div>
      </div>
    </div>
  </main>
);
