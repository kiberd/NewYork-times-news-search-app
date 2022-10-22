import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {RecoilRoot} from 'recoil';
import ReactNativeRecoilPersist, {
  ReactNativeRecoilPersistGate,
} from 'react-native-recoil-persist';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Search from './screens/Search';
import Clip from './screens/Clip';
import Article from './screens/Article';

import {RootTabParamList, RootStackParamList} from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Search">
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Clip" component={Clip} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <RecoilRoot>
      <ReactNativeRecoilPersistGate store={ReactNativeRecoilPersist}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={TabNavigator}
                options={{headerShown: false}}
              />
              <Stack.Screen name="Article" component={Article} />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </ReactNativeRecoilPersistGate>
    </RecoilRoot>
  );
}
