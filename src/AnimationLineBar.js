import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform
} from 'react-native'

class AnimationLineBar extends Component {
  constructor (props) {
    super(props)
  }

  _renderTab (name, page, isTabActive, onPressHandler) {
    const { textStyle, activeColor = '#00AEFF', inactiveColor = '#000' } = this.props
    const textColor = isTabActive ? activeColor : inactiveColor
    const fontWeight = isTabActive ? 'bold' : 'normal'
    const Button = Platform.OS == 'ios' ? ButtonIos : ButtonAndroid
    return (<Button
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits="button"
      onPress={() => onPressHandler(page)}
    >
      <View style={[styles.tab, { width: this.props.containerWidth / this.props.tabs.length, height: '100%' }]}>
        <Text style={[{ color: textColor, fontWeight }, textStyle]}>
          {name}
        </Text>
      </View>
    </Button>)
  }

  _renderUnderline () {
    const {
      containerWidth,
      tabs,
      tabUnderlineDefaultWidth,
      activeColor = '#00AEFF',
      inactiveColor = '#dedede'
    } = this.props
    const numberOfTabs = tabs.length
    const underlineWidth = tabUnderlineDefaultWidth ? tabUnderlineDefaultWidth : containerWidth / (numberOfTabs * 2)
    const scale = 2
    const deLen = (containerWidth / numberOfTabs - underlineWidth) / 2
    const tabUnderlineStyle = {
      position: 'absolute',
      width: underlineWidth,
      height: 2,
      borderRadius: 2,
      backgroundColor: activeColor,
      bottom: 0,
      left: deLen
    }
    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, containerWidth / numberOfTabs],
    })
    const scaleValue = (defaultScale) => {
      let arr = new Array(numberOfTabs * 2)
      return arr.fill(0).reduce(function (pre, cur, idx) {
        idx == 0 ? pre.inputRange.push(cur) : pre.inputRange.push(pre.inputRange[idx - 1] + 0.5)
        idx % 2 ? pre.outputRange.push(defaultScale) : pre.outputRange.push(1)
        return pre
      }, { inputRange: [], outputRange: [] })
    }

    const scaleX = this.props.scrollValue.interpolate(scaleValue(scale))
    return (
      <Animated.View
        style={[
          tabUnderlineStyle,
          {
            transform: [
              { translateX },
              { scaleX }
            ],
          },
        ]}
      />
    )
  }

  render () {
    return (
      <View style={[styles.tabs, this.props.style]}>
        {
          this.props.tabs.map((name, page) => {
            const isTabActive = this.props.activeTab === page
            return this._renderTab(name, page, isTabActive, this.props.goToPage)
          })
        }
        {
          this._renderUnderline()
        }
      </View>
    )
  };
}

const ButtonAndroid = (props) => (
  <TouchableNativeFeedback
    delayPressIn={0}
    background={TouchableNativeFeedback.SelectableBackground()}
    {...props}
  >
    {props.children}
  </TouchableNativeFeedback>)

const ButtonIos = (props) => (<TouchableOpacity {...props}>
  {props.children}
</TouchableOpacity>)

const styles = StyleSheet.create({
  tab: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: 'rgba(0,0,0,0.1)',
  },
})

module.exports = AnimationLineBar;
