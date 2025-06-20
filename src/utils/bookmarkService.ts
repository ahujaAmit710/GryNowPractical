import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARK_KEY = 'BOOKMARKED_ITEMS';

export const getBookmarks = async () => {
  try {
    const saved = await AsyncStorage.getItem(BOOKMARK_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to get bookmarks:', error);
    return [];
  }
};

export const isBookmarked = async (article_id) => {
  const items = await getBookmarks();
  return items.some((item) => item.article_id === article_id);
};

export const toggleBookmark = async (item) => {
  const items = await getBookmarks();
  const exists = items.find((i) => i.article_id === item.article_id);

  let updated;
  if (exists) {
    updated = items.filter((i) => i.article_id !== item.article_id);
  } else {
    updated = [...items, item];
  }

  await AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(updated));
  return updated;
};
