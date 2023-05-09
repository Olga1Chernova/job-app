import {useState} from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router';

import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants';

import useFetch from '../../../hook/useFetch';

const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoading, error} = useFetch('search', {
    query: 'React Developer',
    num_pages: 1,
  },3000)

  const [selectedJob, setSelectedJob] = useState();
  const handleCardPress = (item)=>{}

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>An error occured</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
}

export default Popularjobs;