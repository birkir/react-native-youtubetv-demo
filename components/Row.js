import * as React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Image } from 'react-native';

const ROW_HEIGHT = 80;

export default class Row extends React.PureComponent {

  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    backgroundImageUrl: PropTypes.string.isRequired,
    progress: PropTypes.number,
  };

  render() {
    const {
      title,
      subtitle,
      backgroundImageUrl,
      progress,
    } = this.props;

    return (
      <View style={styles.row}>
        <Text style={styles.row__text}>{title}</Text>
        <View style={styles.row__border} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    height: ROW_HEIGHT,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },

  row__text: {
    fontFamily: 'AvenirNextCondensed-Bold',
    fontSize: 20,
    color: 'black',
  },

  row__border: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#f8f8f8',
  },
});
