import React from 'react';
import moment from 'moment';

import {ClipProps} from '../types';
import {NewsResult} from 'data';
import {BookmarkIcon as SolidBookmarkIcon} from 'react-native-heroicons/solid';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';

import {bookmarkListState} from '../atoms/user';
import {useRecoilState} from 'recoil';

const Clip = ({navigation}: ClipProps) => {
  const [bookmarkList, setBookmarkList] = useRecoilState(bookmarkListState);

  const handlePressBookmarkIcon = (e: any, item: NewsResult) => {
    Alert.alert('즐겨찾기 삭제', '정말로 삭제하시겠습니까?', [
      {text: '취소', onPress: () => {}, style: 'cancel'},
      {
        text: '삭제',
        onPress: () => {
          setBookmarkList(item);
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentsContainer}>
        <FlatList
          data={bookmarkList}
          renderItem={({item}) => (
            <View style={serchItemStyles.container}>
              <View style={serchItemStyles.contents}>
                <Text
                  style={serchItemStyles.headline}
                  onPress={() =>
                    navigation.navigate('Article', {uri: item.web_url})
                  }>
                  {item.headline.main}
                </Text>
                <Text style={serchItemStyles.date}>
                  {moment(item.pub_date).format('LL')}
                </Text>
              </View>
              <View style={serchItemStyles.setting}>
                <SolidBookmarkIcon
                  style={serchItemStyles.bookmark}
                  onPress={e => handlePressBookmarkIcon(e, item)}
                />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => String(item._id + '_' + index)}
          onEndReachedThreshold={0.7}
          disableVirtualization={false}
        />
      </View>
    </SafeAreaView>
  );
};

const serchItemStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    width: 330,
  },
  contents: {
    width: '90%',
    padding: 10,
  },
  headline: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
  },
  date: {
    fontSize: 10,
    color: 'gray',
  },
  setting: {
    width: '10%',
    padding: 10,
  },
  bookmark: {
    width: 10,
    height: 10,
    color: 'gray',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    width: '100%',
    height: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  input: {
    width: 300,
    marginVertical: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 5,
  },
  latestKeywordContainer: {
    width: '85%',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  latestKeywordGrid: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  latestKeyword: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 4,
    margin: 3,
    backgroundColor: 'gray',
    color: 'white',
    overflow: 'hidden',
    fontSize: 12,
  },
  contentsContainer: {
    width: '100%',
    // height: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
});

export default Clip;
