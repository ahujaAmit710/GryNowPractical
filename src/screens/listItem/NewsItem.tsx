import React, { useEffect, useState } from 'react';
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RouteType } from '../../routes/RouteType';
import { isBookmarked, toggleBookmark } from '../../utils/bookmarkService';
import { localAssets } from '../../resources/assets';

const NewsItem = ({ item }) => {
    const nav = useNavigation();
    const [expanded, setExpanded] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    useEffect(() => {
        isBookmarked(item.article_id).then(setBookmarked);
    }, []);

    const onToggleBookmark = async (e) => {
        e.stopPropagation();
        const updated = await toggleBookmark(item);
        const exists = updated.some((i) => i.article_id === item.article_id);
        setBookmarked(exists);
    };

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

            <View style={styles.titleRow}>
                <Text style={styles.title}>{item.title}</Text>
                <Pressable onPress={onToggleBookmark}>
                    <Image
                        source={
                            bookmarked
                                ? localAssets.bookmark_filled
                                : localAssets.bookmark
                        }
                        style={styles.icon}
                    />
                </Pressable>
            </View>

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

export default NewsItem;
