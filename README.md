
## @meategg/react-native-scroll-tab-view
[![npm version](https://badge.fury.io/js/react-native-scrollable-tab-view.svg)](https://badge.fury.io/js/react-native-scrollable-tab-view)
#!!! This is fork from [react-native-scrollable-tab-view](https://github.com/ptomasroos/react-native-scrollable-tab-view)

This is extions on react-native-scrollable-tab-view;

Follow this:

1、Upgrade **`@react-native-community/viewpager`** to **`react-native-pager-view`** implement of [react-native-scrollable-tab-view];
2、fix bug;
3、Implement new TabBar, **AnimationLineBar**;

## Getting started

$ npm install @meategg/react-native-scroll-tab-view --save

or $ yarn add @meategg/react-native-scroll-tab-view



## Injecting a AnimationLineBar

Suppose we had a custom tab bar called `AnimationLineBar`, we would inject
it into our `ScrollableTabView` like this:

```javascript
var ScrollableTabView = require('react-native-scrollable-tab-view');
var AnimationLineBar = require('./AnimationLineBar');

var App = React.createClass({
  render() {
    return (
      <ScrollableTabView 
              renderTabBar={() =>
                      <AnimationLineBar 
                              someProp={'here'}
                      />
              }
      >
        <ReactPage tabLabel="React" />
        <FlowPage tabLabel="Flow" />
        <JestPage tabLabel="Jest" />
      </ScrollableTabView>
    );
  }
});
```



**MIT Licensed**
