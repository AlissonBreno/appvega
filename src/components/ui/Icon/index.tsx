import { Text, type StyleProp, type TextStyle } from 'react-native';

import { styles } from './styles';

const GLYPHS = {
  home: '\uF015',
  'heart-rate': '\uF5F8',
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
  'grip-lines-vertical': '\uF7A5',
  pencil: '\uF040',
  trash: '\uF1F8',
  cog: '\uF013',
  lightbulb: '\uF0EB',
  'lightbulb-on': '\uF672',
  'sign-out-alt': '\uF2F5',
  envelope: '\uF0E0',
  lock: '\uF023',
  'arrow-right': '\uF061',
  google: '\uF1A0',
  check: '\uF00C',
  'exclamation-circle': '\uF06A',
  'exclamation-triangle': '\uF071',
} as const;

export type IconName = keyof typeof GLYPHS;

const REGULAR_ICONS = new Set<IconName>(['heart-rate']);
const BRAND_ICONS = new Set<IconName>(['google']);

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
      style={[
        styles.glyph,
        REGULAR_ICONS.has(name) ? styles.regularGlyph : null,
        BRAND_ICONS.has(name) ? styles.brandGlyph : null,
        { color, fontSize: size, lineHeight: size },
        style,
      ]}
    >
      {GLYPHS[name]}
    </Text>
  );
};

export default Icon;
