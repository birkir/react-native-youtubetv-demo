import * as React from 'react';
import { Text, View, ScrollView, Animated, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import Row from './components/Row';
import items from './assets/items.json';

const ROW_HEIGHT = 80;
const PREVIEW_HEIGHT = 200;

class App extends React.Component {
  scrollRef = React.createRef();
  scrollY = new Animated.Value(0);

  renderRow = (item, index) => (
    <Row key={item.id} index={index} scrollY={this.scrollY} {...item} />
  );

  render() {
    return (
      <Animated.ScrollView
        ref={this.scrollRef}
        style={styles.container}
        onLayout={this.onLayout}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: this.scrollY },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        snapToInterval={ROW_HEIGHT}
        decelerationRate="fast"
        scrollEventThrottle={16}>
        {items.map(this.renderRow)}
      </Animated.ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: PREVIEW_HEIGHT - ROW_HEIGHT,
  },
});

export default createStackNavigator({
  Home: {
    screen: App,
  },
});
