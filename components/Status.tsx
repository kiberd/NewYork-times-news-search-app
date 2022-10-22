import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';


interface StatusProps {
  renderItem?: any;
  msg?: string;
}

const Status: React.FC<StatusProps> = ({ renderItem, msg}) => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
      {renderItem}
      <Text>{msg}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default Status;
