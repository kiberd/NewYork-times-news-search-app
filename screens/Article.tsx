import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import {ArticleProps} from '../types';

const Article = ({route}: ArticleProps) => {
  const {uri}: any = route.params;

  return uri ? <WebView originWhitelist={['*']} source={{uri: uri}} /> : null;
};

export default Article;
