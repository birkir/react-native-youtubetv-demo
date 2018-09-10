import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';

const ROW_HEIGHT = 80;
const PREVIEW_HEIGHT = 200;

export default class Row extends React.PureComponent {
  static propTypes = {
    scrollY: PropTypes.any,
    index: PropTypes.number,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    backgroundImageUrl: PropTypes.string.isRequired,
    progress: PropTypes.number,
  };

  inputRange = [
    ROW_HEIGHT * (this.props.index - 1),
    ROW_HEIGHT * this.props.index,
  ];

  renderRow = () => {
    return (
      <Animated.View
        style={[
          styles.row,
          {
            transform: [
              {
                translateY: this.props.scrollY.interpolate({
                  inputRange: this.inputRange,
                  outputRange: [0, ROW_HEIGHT],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        <TouchableOpacity style={StyleSheet.absoluteFill}>
          <Animated.View
            style={[
              styles.row__inner,
              {
                transform: [
                  {
                    translateY: this.props.scrollY.interpolate({
                      inputRange: this.inputRange,
                      outputRange: [0, -ROW_HEIGHT],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}>
            <Text style={styles.row__title}>{this.props.title}</Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  renderPreview = () => {
    return (
      <Animated.View
        style={[
          styles.preview,
          {
            transform: [
              {
                translateY: this.props.scrollY.interpolate({
                  inputRange: this.inputRange,
                  outputRange: [0, -PREVIEW_HEIGHT + ROW_HEIGHT],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        <Animated.Image
          source={{ uri: this.props.backgroundImageUrl }}
          resizeMode="cover"
          style={[
            StyleSheet.absoluteFill,
            {
              transform: [
                {
                  translateY: this.props.scrollY.interpolate({
                    inputRange: this.inputRange,
                    outputRange: [-ROW_HEIGHT + 20, 0],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.preview__overlay,
            {
              opacity: this.props.scrollY.interpolate({
                inputRange: this.inputRange,
                outputRange: [0, 0.4],
                extrapolate: 'clamp',
              }),
            },
          ]}
        />
        <Animated.Text
          style={[
            styles.preview__title,
            {
              transform: [
                {
                  translateY: this.props.scrollY.interpolate({
                    inputRange: this.inputRange,
                    outputRange: [-ROW_HEIGHT + 20, 0],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}>
          {this.props.title}
        </Animated.Text>
      </Animated.View>
    );
  };

  render() {
    const { title, subtitle, backgroundImageUrl, progress } = this.props;

    return (
      <View style={styles.host}>
        {this.renderPreview()}
        {this.renderRow()}
        <View style={styles.border} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    height: ROW_HEIGHT,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },

  row: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },

  row__inner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    justifyContent: 'center',
  },

  preview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: PREVIEW_HEIGHT,

    overflow: 'hidden',
    padding: 16,

    justifyContent: 'flex-end',
  },

  preview__overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
  },

  preview__title: {
    fontFamily: 'AvenirNextCondensed-Bold',
    fontSize: 30,
    color: '#ffffff',
  },

  row__title: {
    fontFamily: 'AvenirNextCondensed-Bold',
    fontSize: 20,
    color: 'black',
  },

  border: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#f8f8f8',
  },
});
