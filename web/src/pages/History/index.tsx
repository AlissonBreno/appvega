import { ScreenHeader } from '~/components/shared/ScreenHeader';
import DailyCalories from './DailyCalories';
import GamifiedGoals from './GamifiedGoals';
import MacroAverage from './MacroAverage';
import WeeklyPerformance from './WeeklyPerformance';

const History = () => (
  <main>
    <ScreenHeader.Root>
      <ScreenHeader.Row>
        <ScreenHeader.Icon name="chart-bar" />
        <ScreenHeader.TextColumn>
          <ScreenHeader.Title>Histórico</ScreenHeader.Title>
          <ScreenHeader.Subtitle>Últimos 7 dias</ScreenHeader.Subtitle>
        </ScreenHeader.TextColumn>
      </ScreenHeader.Row>
    </ScreenHeader.Root>
    <div className="screen-body">
      <GamifiedGoals />
      <div className="history-grid">
        <DailyCalories />
        <div className="history-side">
          <WeeklyPerformance />
          <MacroAverage />
        </div>
      </div>
    </div>
  </main>
);

export default History;
