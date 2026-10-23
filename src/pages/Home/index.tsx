import { NewAppScreen } from '@react-native/new-app-screen';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from './styles';

const Home = () => {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen templateFileName="App.tsx" safeAreaInsets={safeAreaInsets} />
    </View>
  );
};

export default Home;
