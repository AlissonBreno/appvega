import { Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { useNavigationTheme } from '~/hooks/useNavigationTheme';

import { macroArcFractions } from '../macroArcFractions';
import { circularMacroChartStyles } from './styles';

type CircularMacroChartProps = {
  size: number;
  carb: number;
  protein: number;
  fat: number;
  carbColor: string;
  proteinColor: string;
  fatColor: string;
  trackColor: string;
  calories: number;
};

// Fração do lado do gráfico. 0.066 acompanha a barra da referência
// (cerca de 14px em 212px de diâmetro). Suba ou desça este número para
// engrossar ou afinar o anel.
const STROKE_RATIO = 0.066;
const MIN_STROKE = 4;

const formatThousands = (value: number) =>
  Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

type MacroArc = {
  key: string;
  color: string;
  fraction: number;
};

type DrawnMacroArc = {
  key: string;
  color: string;
  dashLength: number;
  rotation: number;
};

const layoutMacroArcs = (
  segments: MacroArc[],
  circumference: number,
  strokeWidth: number,
  startDegrees: number,
): DrawnMacroArc[] => {
  if (circumference <= 0) {
    return [];
  }

  const jointGap = strokeWidth;
  const spans = segments.map((segment, index) => {
    const covered = segments
      .slice(0, index)
      .reduce((total, item) => total + item.fraction, 0);

    return {
      ...segment,
      start: covered * circumference,
      length: Math.max(0, segment.fraction) * circumference,
    };
  });
  const lead = spans.map(() => 0);
  const trail = spans.map(() => 0);
  const positiveIndexes = spans.flatMap((span, index) =>
    span.length > 0 ? [index] : [],
  );

  positiveIndexes.forEach((current, cursor) => {
    const next = positiveIndexes[(cursor + 1) % positiveIndexes.length];
    const currentSpan = spans[current];
    const nextSpan = spans[next];
    const currentEnd = currentSpan.start + currentSpan.length;
    const rawGap =
      cursor === positiveIndexes.length - 1
        ? circumference - currentEnd + nextSpan.start
        : nextSpan.start - currentEnd;
    const needed = Math.max(0, jointGap - Math.max(0, rawGap));
    const share = needed / 2;

    trail[current] += share;
    lead[next] += share;
  });

  return spans.flatMap((span, index) => {
    if (span.length <= 0) {
      return [];
    }

    let startInset = lead[index];
    let endInset = trail[index];
    const minDash = Math.min(span.length, strokeWidth * 0.35);
    const maxInset = Math.max(0, span.length - minDash);

    if (startInset + endInset > maxInset && startInset + endInset > 0) {
      const scale = maxInset / (startInset + endInset);
      startInset *= scale;
      endInset *= scale;
    }

    const dashLength = span.length - startInset - endInset;

    if (dashLength <= 0) {
      return [];
    }

    return [
      {
        key: span.key,
        color: span.color,
        dashLength,
        rotation:
          startDegrees + ((span.start + startInset) / circumference) * 360,
      },
    ];
  });
};

const CircularMacroChart = ({
  size,
  carb,
  protein,
  fat,
  carbColor,
  proteinColor,
  fatColor,
  trackColor,
  calories,
}: CircularMacroChartProps) => {
  const { isDark } = useNavigationTheme();
  const styles = circularMacroChartStyles[isDark ? 'dark' : 'light'];
  const strokeWidth = Math.max(MIN_STROKE, size * STROKE_RATIO);
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [carbFraction, proteinFraction, fatFraction] = macroArcFractions(
    carb,
    protein,
    fat,
  );
  const sum = carbFraction + proteinFraction + fatFraction;
  const gap = Math.max(0, 1 - sum);
  const startDegrees = 90 + (gap / 2) * 360;
  const arcs = layoutMacroArcs(
    [
      { key: 'carb', fraction: carbFraction, color: carbColor },
      { key: 'protein', fraction: proteinFraction, color: proteinColor },
      { key: 'fat', fraction: fatFraction, color: fatColor },
    ],
    circumference,
    strokeWidth,
    startDegrees,
  );

  return (
    <View style={[styles.root, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {arcs.map(arc => (
          <Circle
            key={arc.key}
            cx={center}
            cy={center}
            r={radius}
            stroke={arc.color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={[arc.dashLength, circumference]}
            strokeLinecap="round"
            transform={`rotate(${arc.rotation} ${center} ${center})`}
          />
        ))}
      </Svg>
      <View style={[styles.center, { paddingHorizontal: strokeWidth }]}>
        <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
          {formatThousands(calories)}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1} adjustsFontSizeToFit>
          kcal
        </Text>
      </View>
    </View>
  );
};

export default CircularMacroChart;
