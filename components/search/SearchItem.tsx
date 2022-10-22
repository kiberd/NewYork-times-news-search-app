import { NewsResult } from 'data';
import React from 'react';

import { Text, View, StyleSheet } from 'react-native';

import { PaperClipIcon } from 'react-native-heroicons/solid';

interface SearchItemProps {
  article: NewsResult;
}

const SearchItem: React.FC<SearchItemProps> = ({ article }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <Text style={styles.headline}>{article.headline.main}</Text>
        <Text style={styles.date}>{article.pub_date.toLocaleString()}</Text>
      </View>
      <View style={styles.setting}>
        <PaperClipIcon style={styles.bookmark} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    // backgroundColor: 'blue',
  },
  bookmark: {
    width: 10,
    height: 10,
    color: 'gray',
  },
});

export default SearchItem;
