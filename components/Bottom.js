import * as React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ROW_HEIGHT } from '../utils/constants';

export default class Bottom extends React.PureComponent {
  static propTypes = {
    height: PropTypes.number,
    scrollTo: PropTypes.func,
  };
  static defaultProps = {
    height: 0,
  };
  onPress = () => {
    this.props.scrollTo(0);
  };
  render() {
    return (
      <View style={[styles.bottom, { height: this.props.height - ROW_HEIGHT }]}>
        <TouchableOpacity
          style={[styles.bottom__button, { borderRadius: 50 }]}
          onPress={this.onPress}>
          <Text style={styles.bottom__text}>TOP</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottom__button: {
    marginTop: -140,

    alignItems: 'center',
    justifyContent: 'center',

    width: 60,
    height: 60,

    backgroundColor: '#ffffff',
  },

  bottom__text: {
    fontFamily: 'AvenirNextCondensed-Medium',
    fontSize: 17,
    color: '#888888',
  },
});
