import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import { RouteType } from '../../routes/RouteType';

const BookmarkItem = ({ item, onToggle }) => {
  const nav = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = (e) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  };

  const view = () => {
    nav.navigate(RouteType.VIEW_DETAILS, { item });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={view}>
      <Image source={{ uri: item.image_url }} style={styles.image} />

      
        <Text style={styles.title}>{item.title}</Text>

      <Text numberOfLines={expanded ? undefined : 2} style={styles.description}>
        {item.description}
      </Text>

      <Pressable onPress={toggleExpanded}>
        <Text style={styles.readMore}>{expanded ? 'Read Less' : 'Read More'}</Text>
      </Pressable>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { padding: 12, borderBottomWidth: 1, borderColor: '#ddd' },
  image: { width: '100%', height: 200, marginBottom: 8 },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: { fontWeight: 'bold', fontSize: 16, flex: 1, marginRight: 8 },
  icon: { width: 36, height: 36, resizeMode: 'contain' },
  description: { fontSize: 14, color: '#555' },
  readMore: { color: 'blue', marginTop: 4 },
});

export default BookmarkItem;
