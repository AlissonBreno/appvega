import { Text, type StyleProp, type TextStyle } from 'react-native';

import { styles } from './styles';

const GLYPHS = {
  home: '\uF015',
  heartbeat: '\uF21E',
  'chart-bar': '\uF080',
  'user-cog': '\uF4FE',
  fire: '\uF06D',
  'bread-slice': '\uF7EC',
  egg: '\uF7FB',
  cheese: '\uF7EF',
  minus: '\uF068',
  plus: '\uF067',
  save: '\uF0C7',
  sparkles: '\uF890',
  award: '\uF559',
  analytics: '\uF643',
  'chevron-down': '\uF078',
  'ellipsis-v': '\uF142',
} as const;

export type IconName = keyof typeof GLYPHS;

type IconProps = {
  name: IconName;
  color: string;
  size?: number;
  style?: StyleProp<TextStyle>;
};

const Icon = ({ name, color, size = 24, style }: IconProps) => {
  return (
    <Text
      accessible={false}
      allowFontScaling={false}
      importantForAccessibility="no"
      style={[styles.glyph, { color, fontSize: size, lineHeight: size }, style]}
    >
      {GLYPHS[name]}
    </Text>
  );
};

export default Icon;
