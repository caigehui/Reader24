'use strict';
import { WebView } from 'react-native'
import ImageButton from '../../../components/imageButton'
import { Share } from 'react-native';
import { showHUD, hideHUD, showWebViewLoading } from '../../../components/HUD';
const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: COLOR.DARK_BLUE
    },
    backButton: {
        resizeMode: 'contain',
        width: 18 * I6RATIO,
        height: 18 * I6RATIO
    },
    backButtonView: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: 30 * I6RATIO,
        height: 30 * I6RATIO,
        left: 10 * I6RATIO,
        top: 20 + 8 * I6RATIO,
        borderRadius: 15 * I6RATIO,
        borderWidth: ONE_PIXEL,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    webView: {
        width: WIDTH,
        top: 20,
        height: HEIGHT - 64 * I6RATIO,
        backgroundColor: 'transparent'
    },
    toolBar: {
        height: 44 * I6RATIO,
        width: WIDTH,
        backgroundColor: COLOR.VERY_DARK_BLUE,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    statusBarShade: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.4)',
        height: 20,
        width: WIDTH
    },
})

export default class contentItem extends Component {

    state = {
        liked: false,
        dislike: false,
        likeRebound: '',
        dislikeRebound: '',
        saved: false
    }

    render() {

        let imgButtonStyle = {
            width: 40 * I6RATIO,
            height: 40 * I6RATIO
        }
        return (
            <View style={styles.container}>
                <WebView ref={(o) => {
                    this.webView = o;
                } } style={styles.webView} onLoadStart={() => {
                    showWebViewLoading();
                }} onLoadEnd={() => {
                    hideHUD();
                }} source={{ uri: this.props.url }} />
                <View style={styles.toolBar}>
                    <ImageButton style={imgButtonStyle} img1Source={require('../../../assets/goback.png')} onPress={() => {
                        this.webView.goBack();
                    } } />
                    <ImageButton style={imgButtonStyle} img1Source={require('../../../assets/forward.png')} onPress={() => {
                        this.webView.goForward();
                    } } />
                    <ImageButton style={imgButtonStyle} img1Source={require('../../../assets/upload.png')} onPress={(rebound) => {
                        rebound();
                        this._share();
                    } } />
                    <ImageButton style={imgButtonStyle} img1Source={require('../../../assets/bookmark.png')} img2Source={require('../../../assets/bookmark-3.png')} onPress={() => {
                        if (this.state.saved) {
                            this.setState({ saved: false });
                        } else {
                            showHUD(require('../../../assets/bookmark.png'), 'saved');
                            this.setState({ saved: true })
                        }
                    } } />
                    <ImageButton style={imgButtonStyle} img1Source={require('../../../assets/like.png')} img2Source={require('../../../assets/like-3.png')} onPress={(rebound) => {
                        this.setState({ likeRebound: rebound });
                        if (!this.state.like) {
                            showHUD(require('../../../assets/like.png'), 'liked')
                            this.setState({ like: true });
                            if (this.state.dislike) {
                                this.setState({ dislike: false });
                                this.state.dislikeRebound();
                            }
                        } else {
                            this.setState({ like: false });
                        }

                    } } />
                    <ImageButton style={imgButtonStyle} img1Source={require('../../../assets/dislike.png')} img2Source={require('../../../assets/dislike-3.png')} onPress={(rebound) => {
                        this.setState({ dislikeRebound: rebound });
                        if (!this.state.dislike) {
                            showHUD(require('../../../assets/dislike.png'), 'disliked');
                            this.setState({ dislike: true });
                            if (this.state.like) {
                                this.setState({ like: false });
                                this.state.likeRebound();
                            }
                        } else {
                            this.setState({ dislike: false });
                        }

                    } } />
                </View>
                <TouchableOpacity style={styles.backButtonView} onPress={() => {
                    Actions.pop();
                } }>
                    <View >
                        <Image style={styles.backButton} source={require('../../../assets/back.png')} />
                    </View>
                </TouchableOpacity>
                <View style={styles.statusBarShade} />
            </View>
        );
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