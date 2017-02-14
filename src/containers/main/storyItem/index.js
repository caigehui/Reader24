'use strict';
import * as Animatable from 'react-native-animatable';
import FadeNetworkImage from '../../../components/fadeNetworkImage';
import ImageButton from '../../../components/imageButton';
import LinearGradient from 'react-native-linear-gradient';
import { showHUD } from '../../../components/HUD';
import { Share } from 'react-native';
const styles = StyleSheet.create({
    loadingView: {
        height: 80,
        left: 0,
        right: 0,
        justifyContent: 'space-around',
        marginBottom: 10
    },
    loadingBar: {
        height: 12 * I6RATIO,
        backgroundColor: COLOR.VERY_LIGHT_BLUE,
        marginLeft: 15 * I6RATIO,
    },
    container: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    gradient: {
        opacity: 0.8,
        width: WIDTH,
        height: 100 * I6RATIO,
        bottom: 0,
        position: 'absolute'
    },
    time: {
        backgroundColor: 'transparent',
        color: COLOR.TEXT_GRAY,
        fontSize: 10,
        marginLeft: 10 * I6RATIO,
        marginBottom: 10 * I6RATIO
    },
    author: {
        color: COLOR.TEXT_BLUE,
        marginLeft: 0,
        marginBottom: 10 * I6RATIO
    },
    title: {
        color: 'white',
        fontSize: 20,
        marginLeft: 10 * I6RATIO,
        width: WIDTH - 30 * I6RATIO,
        marginBottom: 5 * I6RATIO,
        backgroundColor: 'transparent',
        fontWeight: '600',
    },
    classification: {
        color: 'white',
        fontSize: 12,

        backgroundColor: 'transparent',
    },
    classificationShadow: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 4,
        height: 20 * I6RATIO,
        marginLeft: 10 * I6RATIO,
        alignItems: 'center',
        paddingLeft: 8 * I6RATIO,
        paddingRight: 8 * I6RATIO,
        justifyContent: 'center',
        marginBottom: 5 * I6RATIO
    },
    line: {
        width: ONE_PIXEL,
        height: 70 * I6RATIO,
        backgroundColor: COLOR.DARK_BLUE
    }
});

export default class StoryItem extends Component {
    static propTypes = {
        mode: PropTypes.oneOf([2, 3]),
        loading: PropTypes.bool,
        source: PropTypes.object,
        classification: PropTypes.string,
        title: PropTypes.string,
        author: PropTypes.string,
        url: PropTypes.string,
    }

    state = {
        storyContainerBottom: new Animated.Value(0),

        liked: false,
        dislike: false,
        likeRebound: '',
        dislikeRebound: '',
        saved: false
    }

    dragable = false;
    buttonsShowing = false;
    componentWillMount() {
        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return true;
            },
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                return false;
            },
            onPanResponderMove: Animated.event([null, {
                dy: this.state.storyContainerBottom,
            }]),
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                if (this.buttonsShowing) {
                    this._hideButtons();
                } else {
                    if (gestureState.dy < -20 * I6RATIO) {
                        this._showButtons();
                    } else if (gestureState.dy < -3 * I6RATIO && gestureState.dy >= -20 * I6RATIO) {
                        this._hideButtons();
                    } else {
                        Actions.content({url: this.props.url});
                    }
                }
                this.dragable = false;
            },
            onPanResponderTerminate: (evt, gestureState) => {
                if (this.buttonsShowing) {
                    this._hideButtons();
                } else {
                    if (gestureState.dy < -30 * I6RATIO) {
                        this._showButtons();
                    } else {
                        this._hideButtons();
                    }
                }
            }
        });
    }
    _showButtons = (duration, springDamping) => {
        Animated.spring(
            this.state.storyContainerBottom,
            {
                toValue: -70 * I6RATIO,
                tension: -2,
                friction: 4,
            }
        ).start();
        setTimeout(() => {
            this.buttonsShowing = true;
        }, 100)
    }

    _hideButtons = (duration, springDamping) => {
        Animated.spring(
            this.state.storyContainerBottom,
            {
                toValue: 0,
                tension: -2,
                friction: 4,
            }
        ).start();
        setTimeout(() => {
            this.buttonsShowing = false;
        }, 100)
    }



    render() {
        let { mode } = this.props;
        let height = (HEIGHT - (mode - 1) * 5) / mode;
        let itemStyle = {
            left: 0,
            right: 0,
            height: height,
            backgroundColor: COLOR.LIGHT_BLUE,
            flexDirection: 'column-reverse',
            overflow: 'hidden'
        }
        let buttonsContainerStyle = {
            position: 'absolute',
            bottom: this.state.storyContainerBottom.interpolate({
                inputRange: [-76 * I6RATIO, -75 * I6RATIO, -70 * I6RATIO, 0, 1],
                outputRange: [5 * I6RATIO, 5 * I6RATIO, 0, 70 * I6RATIO, 70 * I6RATIO]
            }),
            left: 0,
            right: 0,
            height: 70 * I6RATIO,
            backgroundColor: COLOR.VERY_DARK_BLUE,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            opacity: this.state.storyContainerBottom.interpolate({
                inputRange: [-75 * I6RATIO, -70 * I6RATIO, 0, 1],
                outputRange: [1, 1, 0.2, 0.2]
            }),
            transform: [
                {
                    scale: this.state.storyContainerBottom.interpolate({
                        inputRange: [-75 * I6RATIO, -70 * I6RATIO, 0, 70 * I6RATIO],
                        outputRange: [1, 1, 0.8, 0.8]
                    })
                }
            ]
        }
        let buttonStyle = {
            width: 40 * I6RATIO,
            height: 40 * I6RATIO
        }
        let storyContainer = {
            left: 0,
            bottom: this.state.storyContainerBottom.interpolate({
                inputRange: [-76 * I6RATIO, -75 * I6RATIO,-6*I6RATIO, -5*I6RATIO, 0, 1 * I6RATIO],
                outputRange: [75 * I6RATIO, 75 * I6RATIO,6*I6RATIO,0, 0, 0 * I6RATIO]
            }),
            width: WIDTH,
            height: height
        }
        return (
            <View style={itemStyle} removeClippedSubviews={true}>
                {
                    this.props.loading ?
                        (<Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.loadingView} >
                            <View style={[styles.loadingBar, { width: WIDTH - 40 * I6RATIO }]} />
                            <View style={[styles.loadingBar, { width: WIDTH - 80 * I6RATIO }]} />
                            <View style={[styles.loadingBar, { width: WIDTH - 60 * I6RATIO }]} />
                        </Animatable.View>)
                        :
                        <View style={styles.container} >
                            <Animated.View style={buttonsContainerStyle} >
                                <View style={styles.line} />
                                <ImageButton tintColor={COLOR.PURPLE} circle={true} img1Source={require('../../../assets/upload-2.png')} img2Source={require('../../../assets/upload.png')} style={buttonStyle}
                                    onPress={(rebound) => {
                                        rebound();
                                        this._share();
                                    } } />
                                <View style={styles.line} />
                                <ImageButton tintColor={COLOR.YELLOW} circle={true} img1Source={require('../../../assets/bookmark-2.png')} img2Source={require('../../../assets/bookmark.png')} style={buttonStyle}
                                    onPress={() => {
                                        if (this.state.saved) {
                                            this.setState({ saved: false });
                                        } else {
                                            showHUD(require('../../../assets/bookmark.png'), 'saved', 1000).then(() => {
                                                this._hideButtons();

                                            })
                                            this.setState({ saved: true })
                                        }
                                    } } />
                                <View style={styles.line} />
                                <ImageButton tintColor={COLOR.GREEN}  circle={true} img1Source={require('../../../assets/like-2.png')} img2Source={require('../../../assets/like.png')} style={buttonStyle}
                                    onPress={(rebound) => {
                                        this.setState({ likeRebound: rebound });
                                        if (!this.state.like) {
                                            showHUD(require('../../../assets/like.png'), 'liked', 1000).then(() => {
                                                this._hideButtons();

                                            })
                                            this.setState({ like: true });
                                            if (this.state.dislike) {
                                                this.setState({ dislike: false });
                                                this.state.dislikeRebound();
                                            }
                                        } else {
                                            this.setState({ like: false });
                                        }

                                    } } />
                                <View style={styles.line} />
                                <ImageButton tintColor={COLOR.RED} circle={true} img1Source={require('../../../assets/dislike-2.png')} img2Source={require('../../../assets/dislike.png')} style={buttonStyle}
                                    onPress={(rebound) => {
                                        this.setState({ dislikeRebound: rebound });
                                        if (!this.state.dislike) {
                                            showHUD(require('../../../assets/dislike.png'), 'disliked',1000).then(() => {
                                                this._hideButtons();

                                            })
                                            this.setState({ dislike: true });
                                            if (this.state.like) {
                                                this.setState({ like: false });
                                                this.state.likeRebound();
                                            }
                                        } else {
                                            this.setState({ dislike: false });
                                        }

                                    } } />
                                <View style={styles.line} />
                            </Animated.View>
                            <Animated.View style={storyContainer} {...this._panResponder.panHandlers}>
                                <FadeNetworkImage style={{
                                    width: WIDTH,
                                    height: height,
                                    flexDirection: 'column-reverse',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start'
                                }} source={this.props.source}>
                                    <LinearGradient colors={['transparent', '#000000']} style={styles.gradient} />
                                    <Text style={styles.time}>{this.props.time} | <Text style={styles.author}>{this.props.author}</Text></Text>
                                    <Text style={styles.title} numberOfLines={3}>{this.props.title}</Text>
                                    <View style={styles.classificationShadow}>
                                        <Text style={styles.classification}>{this.props.classification}</Text>
                                    </View>
                                </FadeNetworkImage>
                            </Animated.View>
                        </View>
                }
            </View>
        )
    }

    _share = () => {
        Share.share({
            message: 'A framework for building native apps using React',
            url: 'http://facebook.github.io/react-native/',
            title: 'React Native'
        }, {
                dialogTitle: 'Share React Native website',
                excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToTwitter'
                ],
                tintColor: 'green'
            }).then((result) => {
                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                        //console.warn('shared with an activityType: ' + result.activityType)
                    } else {
                        //console.warn('shared')
                    }
                } else if (result.action === Share.dismissedAction) {
                    //console.warn('dismissed')
                }
            })
    }
}
