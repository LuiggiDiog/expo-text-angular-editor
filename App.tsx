import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { doc, getFirestore, getDoc } from 'firebase/firestore';

import './firebase';
import RenderHTML from 'react-native-render-html';

const firestore = getFirestore();

export default function App() {
  const { width } = useWindowDimensions();

  const [journey, setJourney]: any = useState({});

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    handleGetJourney('DGO8YBRn4FASVwoC4GF4');
  }, []);

  const handleGetJourney = async (id: string) => {
    const journeyRef = doc(firestore, `journeys/${id}`);
    const journey = await getDoc(journeyRef);
    setJourney(journey.data());
  };

  const handleRefresh = () => {
    setRefreshing(true);
    handleGetJourney('DGO8YBRn4FASVwoC4GF4');
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      {journey?.text && (
        <RenderHTML
          contentWidth={width}
          source={{
            html: journey.text,
          }}
        />
      )}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '20%',
    paddingHorizontal: 20,
  },
});
