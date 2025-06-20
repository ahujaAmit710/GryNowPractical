import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { getBookmarks } from '../../utils/bookmarkService';
import { useNavigation } from '@react-navigation/native';
import BookmarkItem from '../listItem/BookMarkedItem';

const BookmarksTab = () => {
    const [items, setItems] = useState([]);
    const navigation = useNavigation();

    const fetchBookmarks = async () => {
        const saved = await getBookmarks();
        setItems(saved);
    };

    useEffect(() => {
        fetchBookmarks();

        const unsubscribe = navigation.addListener('focus', fetchBookmarks);
        return unsubscribe;
    }, [navigation]);

    if (items.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No bookmarks saved yet.</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>My BookMarks</Text>
            <FlatList
                data={items}
                keyExtractor={(item) => item.article_id.toString()}
                renderItem={({ item }) => (
                    <BookmarkItem item={item} onToggle={fetchBookmarks} />
                )}
                contentContainerStyle={styles.listContent}/>

        </SafeAreaView>
    );
};

export default BookmarksTab;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    listContent: { padding: 12 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontSize: 18, color: '#888' },
});
