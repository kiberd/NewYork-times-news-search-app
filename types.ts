import {StackScreenProps} from '@react-navigation/stack';

export type RootTabParamList = {
  Home: undefined;
  Article: {uri: string};
  Search: undefined;
  Clip: undefined;
};

export type RootStackParamList = {
  Home: undefined;
  Article: undefined;
};

export type SearchProps = StackScreenProps<RootTabParamList, 'Search'>;
export type ClipProps = StackScreenProps<RootTabParamList, 'Clip'>;
export type ArticleProps = StackScreenProps<RootStackParamList, 'Article'>;
