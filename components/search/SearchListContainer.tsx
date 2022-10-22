import React from 'react';
import { SearchArticlesParams } from 'params';
import useSearchArticles from '../../hooks/useSearchArticles';
import Status from '../Status';
import SearchList from './SearchList';
import { Text, View } from 'react-native';

interface SearchListContainerProps {
  params: SearchArticlesParams;
}

const SearchListContainer: React.FC<SearchListContainerProps> = ({params}) => {
  const {
    data: articleList,
    isLoading,
    isFetching,
    isError,
  } = useSearchArticles(params);

  console.log(articleList);

  if (isError) return <Status msg={"Error!!"} />;
  if (isLoading && isFetching) return <Status msg={"Loading!!"} />;
  // if (articleList?.length === 0) return <Status msg={"No data!!"} />;

  return <SearchList articleList={articleList?.pages[0].data}/>

  // return <View><Text>df</Text></View>
  
};

export default SearchListContainer;
