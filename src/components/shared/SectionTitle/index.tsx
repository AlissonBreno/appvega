import { Text } from 'react-native';

import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { sectionTitleStyles } from './styles';

type SectionTitleProps = {
  title: string;
};

const SectionTitle = ({ title }: SectionTitleProps) => {
  const { isDark } = useNavigationTheme();
  const styles = sectionTitleStyles[isDark ? 'dark' : 'light'];

  return <Text style={styles.title}>{title}</Text>;
};

export default SectionTitle;
