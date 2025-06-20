import React from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import NewsItem from '../listItem/NewsItem';
import { useNewsData } from '../../hooks/useNewsData';

const HomeTab = () => {
  const { data, isLoading, isError } = useNewsData();

  if (isLoading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  if (isError)
    return <Text style={styles.error}>Something went wrong. Please try again.</Text>;

  if (data.length === 0)
    return <Text style={styles.noArticles}>No articles found.</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Top News</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.link}
        renderItem={({ item }) => (
          <NewsItem item ={item} />
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  list: { paddingBottom: 16 },
  error: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
  noArticles: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
});
