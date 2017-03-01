import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import PXTouchable from './PXTouchable';
import SearchTags from './SearchTags';
import { SearchType } from '../common/actions/searchType';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: Platform.OS === 'ios' ? '#EFEFF2' : '#FFF',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
      height: StyleSheet.hairlineWidth,
    },
    elevation: 4,
    marginHorizontal: 5,
  },
  appBar: {
    height: APPBAR_HEIGHT,
    flex: 1,
  },
  searchBarInputGroup: {
    flex: 1,
    paddingHorizontal: 5,
    position: 'relative',
    justifyContent: 'space-between',
    //justifyContent: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        backgroundColor: '#D1EEFC',
        borderRadius: 5, // this.props.rounded ? 25 : 2,
        height: 30,
        borderColor: 'transparent',
      },
      android: {
        // backgroundColor: '#fff',
        // borderRadius: 2,
        // borderColor: 'transparent',
        // elevation: 2,
        backgroundColor: '#D1EEFC',
        borderRadius: 5, // this.props.rounded ? 25 : 2,
        borderColor: 'transparent',
        height: 37,
      },
    })
  },
  searchBarTextInput: {
    //height: 40,
    flex: 1,
    paddingLeft: 5,
    //alignSelf: 'center', 
    //width: 300
  },
  searchIcon: {
    alignSelf: 'center', 
    paddingLeft: 5
    //flex: 0.2
  },
  placeHolderTextContainer: {
    alignSelf: 'center', 
  },
  placeHolderText: {
    color: 'gray', 
  }
  // searchBarButton: {
  //   alignItems: 'center', 
  //   justifyContent: 'center', 
  //   flexDirection: 'row',
  //   marginRight: -14
  // }
});

class SearchBar extends Component {
  render() {
    const { searchType, isRenderPlaceHolder, enableBack, onFocus, onChangeText, onSubmitEditing, onPressRemoveTag, autoFocus, word } = this.props;
    return (
      <View style={[styles.container, isRenderPlaceHolder && {
        flex: 1,
        paddingTop: 0
      }]}>
        <View style={styles.appBar}>
          <View style={styles.searchBarInputGroup}>
            <Icon style={styles.searchIcon} name="search" size={15} color="#5cafec" />
            {
              (isRenderPlaceHolder && !word) ?
              <PXTouchable 
                onPress={() => onFocus(searchType)}
                style={[styles.searchBarTextInput, styles.placeHolderTextContainer]} 
              >
                <Text style={styles.placeHolderText}>{searchType === SearchType.USER ? "Enter nickname" : "Enter keyword"}</Text>
              </PXTouchable>
              :
              (isRenderPlaceHolder && word) ?
              <View style={[styles.searchBarTextInput, styles.placeHolderTextContainer]}>
                <PXTouchable 
                  onPress={() => onFocus(searchType)}
                >
                  <SearchTags 
                    tags={word.trim().split(' ')} 
                    onPressRemove={onPressRemoveTag}
                  />
                </PXTouchable>
              </View>
              :
              <TextInput 
                style={styles.searchBarTextInput} 
                placeholder={searchType === SearchType.USER ? "Enter nickname" : "Enter keyword"}
                autoFocus={autoFocus}
                onChangeText={(text) => onChangeText(text, searchType)}
                onSubmitEditing={(e) => onSubmitEditing(e.nativeEvent.text, searchType)}
                returnKeyType="search"
                defaultValue={word}
                underlineColorAndroid='transparent'
              />
            }
          </View>
        </View>
      </View>
    );
  }
}

export default connect((state, { searchType }) => {
  return {
    searchType: searchType || state.searchType.type
  }
})(SearchBar);
