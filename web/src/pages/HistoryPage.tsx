import { DAILY_BARS, WEEKLY_ROWS, barColorForKcal } from '../app/history';
import { ScreenHeader } from '../components/shared/ScreenHeader';
import { Card } from '../components/ui/Card';

const toneColor = {
  above: 'var(--state-above)',
  near: 'var(--state-near)',
  within: 'var(--brand-green)',
};

const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

export const HistoryPage = () => (
  <main>
    <ScreenHeader.Root>
      <ScreenHeader.Row>
        <ScreenHeader.TextColumn>
          <ScreenHeader.Title>Histórico</ScreenHeader.Title>
          <ScreenHeader.Subtitle>Últimos 7 dias</ScreenHeader.Subtitle>
        </ScreenHeader.TextColumn>
      </ScreenHeader.Row>
    </ScreenHeader.Root>
    <div className="screen-body">
      <div className="stat-row">
        <Card.Root className="stat-card">
          <strong>1.822</strong>
          <span>Média diária</span>
        </Card.Root>
        <Card.Root className="stat-card">
          <strong>5/7</strong>
          <span>Dias cumpridos</span>
        </Card.Root>
        <Card.Root className="stat-card">
          <strong>5</strong>
          <span>dias 🔥</span>
          <span>Sequência</span>
        </Card.Root>
      </div>
      <div className="history-grid">
        <Card.Root>
          <div className="split">
            <Card.SectionTitle title="Calorias por dia" />
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
        </Card.Root>
        <div className="history-side">
          <Card.Root>
            <Card.SectionTitle title="Desempenho semanal" />
            {WEEKLY_ROWS.map(row => (
              <p key={row.day} className="week-row">
                <span>{row.day}</span>
                <span style={{ color: toneColor[row.tone] }}>{row.kcal.toLocaleString('pt-BR')}</span>
                <span className="muted">kcal / 2200</span>
              </p>
            ))}
            <p className="muted">Dentro · Próximo · Acima</p>
          </Card.Root>
          <Card.Root>
            <Card.SectionTitle title="Média de macros (7 dias)" />
            <p>🍞 222g / 250g</p>
            <p>🥚 131g / 150g</p>
            <p>🥑 58g / 65g</p>
          </Card.Root>
        </div>
      </div>
    </div>
  </main>
);
