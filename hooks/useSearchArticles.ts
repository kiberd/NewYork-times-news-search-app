import {useInfiniteQuery} from 'react-query';
import axios from 'axios';

const useSearchArticles = (debouncedKeyword: string | undefined) => {
  const getArticles = async ({queryKey, pageParam = 1}: any) => {
    const keyword = queryKey[1];

    const {data} = await axios.get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&page=${pageParam}&api-key=lB7Awd3yYuahES75oHmhgzaJHPZejBmb`,
    );

    return {
      data: data.response.docs,
      currentPage: pageParam,
    };
  };

  const {
    data,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    status,
    fetchNextPage,
  } = useInfiniteQuery(['getArticles', debouncedKeyword], getArticles, {
    getNextPageParam: lastPage => {
      return lastPage.currentPage + 1;
    },
  });

  return {
    data,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    status,
    fetchNextPage,
  };
};

export default useSearchArticles;