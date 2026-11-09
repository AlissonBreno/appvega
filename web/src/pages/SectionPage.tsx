import { ScreenHeader } from '../components/shared/ScreenHeader';

type SectionPageProps = {
  icon: string;
  title: string;
  subtitle: string;
};

export const SectionPage = ({ icon, title, subtitle }: SectionPageProps) => (
  <main>
    <ScreenHeader.Root>
      <ScreenHeader.Row>
        <span aria-hidden>{icon}</span>
        <ScreenHeader.TextColumn>
          <ScreenHeader.Title>{title}</ScreenHeader.Title>
          <ScreenHeader.Subtitle>{subtitle}</ScreenHeader.Subtitle>
        </ScreenHeader.TextColumn>
      </ScreenHeader.Row>
    </ScreenHeader.Root>
  </main>
);
