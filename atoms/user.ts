import {atom, selector} from 'recoil';
import ReactNativeRecoilPersist from "react-native-recoil-persist";
import {NewsResult} from 'data';

type UserInfo = {bookmarkList: NewsResult[]; searchList: string[]}

export const userState = atom<UserInfo>({
  key: 'userInfo',
  default: {
    bookmarkList: [],
    searchList: [],
  },
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom]
});
 
export const bookmarkListState = selector({
  key: 'bookmarkListSelector',
  get: ({get}) => {
    return get(userState).bookmarkList;
  },
  set: ({set, get}, newValue: any) => {

    const newBookmarkList = [...get(userState).bookmarkList];
    const isExist = newBookmarkList.some((bookmark: NewsResult) => bookmark._id === newValue._id);

    if (isExist) {
        const index = newBookmarkList.findIndex((bookmark: NewsResult) => bookmark._id === newValue._id);
        newBookmarkList.splice(index, 1);
    } else {
        newBookmarkList.push(newValue);
    }
    set(userState, (prevState) => ({
        ...prevState,
        bookmarkList: newBookmarkList
    }));
  }
});

export const searchListState = selector({
    key: 'searchListSelector',
    get: ({get}) => {
      return get(userState).searchList;
    },
    set: ({set, get}, newValue: any) => {
      
      const newSearchList = [...get(userState).searchList];
      const isExist = newSearchList.some((search: string) => search === newValue);
      if (!isExist && newValue !== "") {
        newSearchList.unshift(newValue);
      }
    
      set(userState, (prevState) => ({
          ...prevState,
          searchList: newSearchList
      }));
    }
  });
