import * as React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import Row from './components/Row';
import items from './assets/items.json';

class App extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        {items.map(item => <Row {...item} />)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});

export default createStackNavigator({
  Home: {
    screen: App,
  },
});
