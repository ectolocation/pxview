import React, { useCallback } from 'react';
import { View, StyleSheet, FlatList, Keyboard, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme, Text } from 'react-native-paper';
import { useLocalization } from './Localization';
import PXTouchable from './PXTouchable';
import Separator from './Separator';
import { globalStyles, globalStyleVariables } from '../styles';

const styles = StyleSheet.create({
  listItemContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchHistoryContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchHistoryTitle: {
    fontWeight: 'bold',
  },
  searchHistoryText: {
    width: globalStyleVariables.WINDOW_WIDTH - 45,
  },
});

const SearchHistory = ({
  items,
  onPressItem,
  onPressRemoveSearchHistoryItem,
  onPressClearSearchHistory,
}) => {
  const theme = useTheme();
  const { i18n } = useLocalization();

  const handleOnPressClearSearchHistory = useCallback(() => {
    Alert.alert(
      i18n.searchHistoryClearConfirmation,
      null,
      [
        { text: i18n.cancel, style: 'cancel' },
        {
          text: i18n.ok,
          onPress: onPressClearSearchHistory,
        },
      ],
      { cancelable: false },
    );
  }, [
    onPressClearSearchHistory,
    i18n.searchHistoryClearConfirmation,
    i18n.cancel,
    i18n.ok,
  ]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.listItemContainer} key={item}>
        <PXTouchable
          hitSlop={{ top: 20, left: 20, bottom: 20, right: 0 }}
          onPress={() => onPressItem(item)}
          style={styles.searchHistoryText}
        >
          <Text>{item}</Text>
        </PXTouchable>
        <PXTouchable
          hitSlop={{ top: 0, left: 20, bottom: 20, right: 20 }}
          onPress={() => onPressRemoveSearchHistoryItem(item)}
        >
          <Icon name="times" size={16} color={theme.colors.text} />
        </PXTouchable>
      </View>
    );
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.searchHistoryContainer}>
        <Text style={styles.searchHistoryTitle}>{i18n.searchHistory}</Text>
        <PXTouchable
          hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
          onPress={handleOnPressClearSearchHistory}
        >
          <Text style={styles.searchHistoryTitle}>
            {i18n.searchHistoryClear}
          </Text>
        </PXTouchable>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        keyboardShouldPersistTaps="always"
        removeClippedSubviews={false} // to prevent flatlist hidden after switch language
        onScroll={Keyboard.dismiss}
      />
    </View>
  );
};

export default SearchHistory;
