import { Text, type StyleProp, type TextStyle } from 'react-native';

import { styles } from './styles';

const GLYPHS = {
  home: '\uF015',
  'user-cog': '\uF4FE',
} as const;

export type IconName = keyof typeof GLYPHS;

type IconProps = {
  name: IconName;
  color: string;
  size?: number;
  style?: StyleProp<TextStyle>;
};

function Icon({ name, color, size = 24, style }: IconProps) {
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
}

export default Icon;
