import React from 'react';

import {NewsResult} from 'data';
import SearchItem from './SearchItem';

interface SearchListProps {
  articleList: NewsResult[] | undefined;
}

const SearchList: React.FC<SearchListProps> = ({articleList}) => {
  return (
    <>
      {/* {articleList?.map((article, index) => (
        <SearchItem key={article._id + index} article={article} />
      ))} */}
    </>
  );
};

export default SearchList;
