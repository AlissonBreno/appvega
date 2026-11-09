import { Text } from 'react-native';

import { Card } from '~/components/ui/Card';
import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { appAboutStyles } from './styles';

const AppAbout = () => {
  const { isDark } = useNavigationTheme();
  const styles = appAboutStyles[isDark ? 'dark' : 'light'];

  return (
    <Card.Root style={styles.card}>
      <Card.SectionTitle title="VEGA · Nutrição fácil" style={styles.sectionTitle}/>
      <Text style={styles.version}>v1.0.0 · by Alisson Goulart</Text>
      <Text style={styles.aboutBody}>
        Auxilia o monitoramento nutricional e não substitui acompanhamento clínico.
      </Text>
    </Card.Root>
  );
};

export default AppAbout;
