import React, {useEffect, useState, useRef} from 'react';
import {NewsResult} from 'data';
import {BookmarkIcon as SolidBookmarkIcon} from 'react-native-heroicons/solid';
import {BookmarkIcon as OutlineBookmarkIcon} from 'react-native-heroicons/outline';
import moment from 'moment';

import {
  SafeAreaView,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  ScrollView
} from 'react-native';

import useSearchArticles from '../hooks/useSearchArticles';
import useQueryDebounce from '../hooks/useQueryDebounce';
import Status from '../components/Status';
import {SearchProps} from '../types';

import {bookmarkListState, searchListState} from '../atoms/user';
import {useRecoilState} from 'recoil';
// import {ScrollView} from 'react-native-gesture-handler';
import {serchItemStyles} from '../styles/styles';

const Search = ({navigation}: SearchProps) => {
  const scrollRef: any = useRef();
  const [keyword, setKeyword] = useState<string>();
  const [articleList, setArticleList] = useState<NewsResult[]>([]);

  const [bookmarkList, setBookmarkList] = useRecoilState(bookmarkListState);
  const [searchList, setSearchList] = useRecoilState(searchListState);

  const handleChangeKeyword = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ): void => {
    const value = e.nativeEvent.text;
    setKeyword(value);
  };

  const debouncedKeyword = useQueryDebounce(keyword, 500);

  const {
    data,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    status,
    fetchNextPage,
  } = useSearchArticles(debouncedKeyword);

  useEffect(() => {
    if (data?.pages.length === 1) {
      data?.pages.map(page => setArticleList([...page.data]));
    } else {
      data?.pages.map(page => setArticleList([...articleList, ...page.data]));
    }
  }, [data]);

  useEffect(() => {
    if (status === 'success') {
      if (debouncedKeyword) {
        setSearchList(debouncedKeyword);
      }
      scrollRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  }, [status]);

  const handleReached = () => {
    if (isFetching || isLoading) {
      return;
    } else {
      fetchNextPage();
    }
  };

  const handlePressKeyword = (e: any, text: string) => {
    setKeyword(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChange={handleChangeKeyword}
          value={keyword}
          placeholder={'Type keyword'}
          // ref={inputRef}
        />
      </View>

      <View style={styles.latestKeywordInputContainer}>
        <Text style={styles.latestKeywordInput}>최근 검색어</Text>
      </View>

      <View style={styles.latestKeywordContainer}>
        <ScrollView style={styles.latestKeywordScrollView}>
          <View style={styles.latestKeywordGrid}>
            {searchList.map((text: string, index: number) => (
              <Text
                key={text + index}
                style={styles.latestKeyword}
                onPress={e => handlePressKeyword(e, text)}>
                {text}
              </Text>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.contentsContainer}>
        {error ? (
          <Status msg={'Error!!'} />
        ) : isLoading ? (
          <Status renderItem={<ActivityIndicator />} />
        ) : articleList.length === 0 ? (
          <Status msg={'조건에 맞는 기사가 없습니다.'} />
        ) : (
          <FlatList
            ref={scrollRef}
            data={articleList}
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
                  {bookmarkList.some(
                    (bookmark: NewsResult) => bookmark._id === item._id,
                  ) ? (
                    <SolidBookmarkIcon
                      style={serchItemStyles.bookmark}
                      onPress={() => setBookmarkList(item)}
                    />
                  ) : (
                    <OutlineBookmarkIcon
                      style={serchItemStyles.bookmark}
                      onPress={() => setBookmarkList(item)}
                    />
                  )}
                </View>
              </View>
            )}
            keyExtractor={(item, index) => String(item._id + '_' + index)}
            onEndReached={handleReached}
            onEndReachedThreshold={0.7}
            ListFooterComponent={
              isLoading || isFetching || isFetchingNextPage ? (
                <ActivityIndicator />
              ) : null
            }
            disableVirtualization={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

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
  latestKeywordInputContainer: {
    marginLeft: 40,
    marginBottom: 5,
  },
  latestKeywordInput: {
    fontSize: 12,
    color: 'gray',
  },
  latestKeywordContainer: {
    height: '12%',
    maxHeight: 200,
    alignItems: 'center',
  },
  latestKeywordScrollView: {
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
    height: '70%',
    display: 'flex',
    alignItems: 'center',
  },
});

export default Search;
