import { StyleSheet } from "react-native";

export const serchItemStyles = StyleSheet.create({
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
    },
    bookmark: {
      width: 10,
      height: 10,
      color: 'gray',
    },
  });
  