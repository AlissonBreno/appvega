import { View } from 'react-native';

import { Card } from '~/components/ui/Card';

import { styles } from './styles';

const InfoCards = () => {
  return (
    <View style={styles.row}>
      <Card.Root style={styles.card}>{null}</Card.Root>
      <Card.Root style={styles.card}>{null}</Card.Root>
      <Card.Root style={styles.card}>{null}</Card.Root>
    </View>
  );
};

export default InfoCards;
