/**
 * 全局配置，除了Components文件下的组件，其他文件都可以直接使用
 * 只需要在index.js配置一次，全局使用
 */
import React, {
    Component,
    PropTypes
} from 'react';

import {
    Animated,
    Dimensions,
    PixelRatio,
    Platform,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    ScrollView,
    ListView,
    Alert,
    TextInput,
    StyleSheet,
    StatusBar,
    LayoutAnimation,
    PanResponder
} from 'react-native';
global.React = React;
global.Component = Component;
global.PropTypes = PropTypes;
global.TouchableHighlight = TouchableHighlight;
global.TouchableNativeFeedback = TouchableNativeFeedback;
global.TouchableOpacity = TouchableOpacity;
global.TouchableWithoutFeedback = TouchableWithoutFeedback; 
global.Platform = Platform;
global.Text = Text;
global.View = View;
global.Image = Image;
global.ScrollView = ScrollView;
global.ListView = ListView;
global.Alert = Alert;
global.TextInput = TextInput;
global.StyleSheet = StyleSheet;
global.Animated = Animated;
global.StatusBar = StatusBar;
global.LayoutAnimation = LayoutAnimation;
global.PanResponder = PanResponder;

/**
 * 平台校验
 */
global.isIOS = Platform.OS === 'ios';


/**
 * 屏幕宽高 像素密度
 */
global.WIDTH = Dimensions.get('window').width;
global.HEIGHT = Platform.OS === 'ios'?Dimensions.get('window').height:Dimensions.get('window').height-20;
global.SCALE = PixelRatio.get();
global.ONE_PIXEL = 1 / SCALE;
global.I6RATIO = Dimensions.get('window').width/350;
/**
 * 颜色
 */
import COLOR from './colors.js';
global.COLOR = COLOR;

/**
 * 配置
 */
import * as CONFIG from './configuration.js';
global.CONFIG = CONFIG;

/**
 * 路由
 */
import { Actions } from 'react-native-router-flux';
global.Actions = Actions;

import { storage } from '../storage';
global.storage = storage;