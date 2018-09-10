import * as React from 'react';
import { Text, View, ScrollView, Animated, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import Row from './components/Row';
import Bottom from './components/Bottom';
import items from './assets/items.json';
import { PREVIEW_HEIGHT, ROW_HEIGHT } from './utils/constants';

class App extends React.Component {
  scrollRef = React.createRef();
  scrollY = new Animated.Value(0);

  state = {
    height: 0,
  };

  scrollTo = y => {
    this.scrollRef.current._component.scrollTo({ y, animated: true });
  };

  renderRow = (item, index) => (
    <Row
      key={item.id}
      index={index}
      scrollTo={this.scrollTo}
      scrollY={this.scrollY}
      {...item}
    />
  );

  onLayout = e => {
    this.setState({
      height: e.nativeEvent.layout.height,
    });
  };

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
        <Bottom scrollTo={this.scrollTo} height={this.state.height} />
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
