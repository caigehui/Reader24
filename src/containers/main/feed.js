'use strict';
import Carousel from '../../components/carousel';
import { showHUD } from '../../components/HUD'
import Menu from './menu.js';
import Story from './story.js';
import * as Networking from '../../networking'
const styles = {
    container: {
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: 'rgb(0,0,0)'
    },
    feedContainer: {
        width: WIDTH,
        height: HEIGHT * 2,
        position: 'absolute',
        backgroundColor: COLOR.DARK_BLUE

    },
    carousel: {
        height: HEIGHT,
        width: WIDTH,
        backgroundColor: COLOR.DARK_BLUE
    },
    menuButton: {
        resizeMode: 'contain',
        width: 12 * I6RATIO,
        height: 12 * I6RATIO
    },
    menuButtonView: {
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
    refreshButton: {
        resizeMode: 'contain',
        width: 15 * I6RATIO,
        height: 15 * I6RATIO
    },
    refreshButtonView: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: 30 * I6RATIO,
        height: 30 * I6RATIO,
        left: 50 * I6RATIO,
        top: 20 + 8 * I6RATIO,
        borderRadius: 15 * I6RATIO,
        borderWidth: ONE_PIXEL,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
}

const feedMargin = 60 * I6RATIO;

export default class feed extends Component {

    state = {
        top: new Animated.Value(0),
        loading: true,
        articles: []
    }
    menuShowing = false;
    menuType = 'Home';
    _showMenu = (trigger) => {
        this.menuShowing = true;
        if(trigger) {
            Animated.delay(100)
        }
        Animated.spring(
            this.state.top,
            {
                toValue: (this.state.top._offset === 0 ? HEIGHT - feedMargin : 0),
                tension: -2,
                friction: 4,
            }
        ).start(() => {

        });
        setTimeout(() => {
            this.menuShowing = true;
        }, 100)
    }

    _hideMenu = (trigger) => {
        if(trigger) {
            Animated.delay(100)
        }
        Animated.spring(
            this.state.top,
            {
                toValue: (this.state.top._offset === 0 ? 0 : -HEIGHT + feedMargin),
                tension: -2,
                friction: 4,
            }
        ).start();
        setTimeout(() => {
            this.menuShowing = false;
        }, 100)
    }

    _verticalFlag = false;
    _horizontalFlag = false;
    _upFlag = false;

    componentWillMount() {
        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                if (this._verticalFlag === true) return true;
                if (this._horizontalFlag === true || this._upFlag === true) return false;
                let criticalValue = 20 * I6RATIO;
                if (this.menuShowing) {
                    if (gestureState.dx > criticalValue) {
                        this._horizontalFlag = true;
                        return false;
                    } else if (gestureState.dy < -criticalValue) {
                        this._verticalFlag = true;
                        return true;
                    } else if (gestureState.dy > criticalValue) {
                        this._upFlag = true;
                        return false;
                    } else {
                        return false;
                    }
                } else {
                    if (gestureState.dx < -criticalValue) {
                        this._horizontalFlag = true;
                        return false
                    } else if (gestureState.dy > criticalValue) {
                        this._verticalFlag = true;
                        return true;
                    } else {
                        return false
                    }
                }
            },
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                return false;
            },
            onPanResponderGrant: (evt, gestureState) => {
                if (this.menuShowing) {
                    this.state.top.setOffset(HEIGHT - feedMargin);
                    this.state.top.setValue(0);
                } else {
                    this.state.top.setOffset(0);
                    this.state.top.setValue(0);
                }
            },
            onPanResponderMove: Animated.event([null, {
                dy: this.state.top,
            }]),
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                if (this.menuShowing) {
                    if (-gestureState.dy > HEIGHT / 2 || gestureState.vy < -0.5) {
                        this._hideMenu();
                    } else {
                        this._showMenu();
                    }
                } else {
                    if (gestureState.dy >= HEIGHT / 2 || gestureState.vy > 0.5) {
                        this._showMenu();
                    } else {
                        this._hideMenu();
                    }
                }
                this._resetFlag();
            },
            onPanResponderTerminate: (evt, gestureState) => {
                if (this.menuShowing) {
                    if (-gestureState.dy > HEIGHT / 2 || gestureState.vy < -0.5) {
                        this._hideMenu();
                    } else {
                        this._showMenu();
                    }
                } else {
                    if (gestureState.dy >= HEIGHT / 2 || gestureState.vy > 0.5) {
                        this._showMenu();
                    } else {
                        this._hideMenu();
                    }
                }
                this._resetFlag();
            }
        });
        this._requestArticles();
    }

    _resetFlag = () => {
        this._horizontalFlag = false;
        this._verticalFlag = false;
        this._upFlag = false;
    }

    _requestArticles = () => {
        if (this.menuType === 'Home') {
            Networking.getHomeArticles().then((object) => {
                this.setState({ loading: false, articles: object });
            })
        } else if (this.menuType === 'Business') {
            Networking.getBusinessArticles().then((arr) => {
                this.setState({ loading: false, articles: arr });
            })
        } else if (this.menuType === 'General') {
            Networking.getGeneralArticles().then((arr) => {
                this.setState({ loading: false, articles: arr });
            })
        } else if (this.menuType === 'Music') {
            Networking.getMusicArticles().then((arr) => {
                this.setState({ loading: false, articles: arr });
            })
        }
        else if (this.menuType === 'Entertainment') {
            Networking.getEntertainmentArticles().then((arr) => {
                this.setState({ loading: false, articles: arr });
            })
        }
        else if (this.menuType === 'Sport') {
            Networking.getSportArticles().then((arr) => {
                this.setState({ loading: false, articles: arr });
            })
        }
        else if (this.menuType === 'Science') {
            Networking.getScienceArticles().then((arr) => {
                this.setState({ loading: false, articles: arr });
            })
        }
        else if (this.menuType === 'Gaming') {
            Networking.getGamingArticles().then((arr) => {
                this.setState({ loading: false, articles: arr });
            })
        } else if (this.menuType === 'Technology') {
            Networking.getTechnologyArticles().then((arr) => {
                this.setState({ loading: false, articles: arr });
            })
        }
    }

    _renderStories = () => {
        if (this.menuType === 'Home') {
            let { articles } = this.state;
            let homeArticles = [];
            for (var i = 0; i < 4; i++) {
                homeArticles.push({...articles.general[i], category: 'General'});
                homeArticles.push({...articles.technology[i], category: 'Technology'});
                homeArticles.push({...articles.gaming[i], category: 'Gaming'});
                homeArticles.push({...articles.business[i], category: 'Business'});
                homeArticles.push({...articles.entertainment[i], category:'Entertainment'});
                homeArticles.push({...articles.music[i], category: 'Music'});
                homeArticles.push({...articles.sport[i], category: 'Sport'});
                homeArticles.push({...articles.science[i], category: 'Science'});
            }
            let pageNum = parseInt(homeArticles.length / 5);
            let leftNum = homeArticles.length % 5;
            if (pageNum % 2 == 0) {
                pageNum = leftNum <= 2 ? pageNum * 2 + 1 : pageNum * 2 + 2
            } else {
                pageNum = leftNum <= 3 ? pageNum * 2 + 1 : pageNum * 2 + 2
            }
            let storyPages = [];
            let count = 0;
            for (var i = 0; i < pageNum; i++) {

                let articlesToBePass = i % 2 == 0 ? [homeArticles[count++], homeArticles[count++]] : [homeArticles[count++], homeArticles[count++], homeArticles[count++]];
                storyPages.push(<Story key={i} page={i} articles={articlesToBePass} />)
            }
            return storyPages;
        }else if(this.menuType === 'General') {
            return null;
        } 
        else {
            let { articles } = this.state;
            for(var i = 0; i< articles.length ;i++) {
                articles[i] = { ...articles[i], category: this.menuType }
            }
            let pageNum = parseInt(articles.length / 5);
            let leftNum = articles.length % 5;
            if (pageNum % 2 == 0) {
                pageNum = leftNum <= 2 ? pageNum + 1 : pageNum + 2
            } else {
                pageNum = leftNum <= 3 ? pageNum + 1 : pageNum + 2
            }
            let storyPages = [];
            let count = 0;
            for (var i = 0; i < pageNum; i++) {
                let articlesToBePass = i % 2 == 0 ? [articles[count++], articles[count++]] : [articles[count++], articles[count++], articles[count++]];
                storyPages.push(<Story key={i} page={i} articles={articlesToBePass} />)
            }
            return storyPages;
        }
    }
    componentDidMount() {
        showHUD(null, 'Home', 1000)
    }
    render() {

        let feedContainerStyle = {
            ...styles.feedContainer,
            top: this.state.top
        }


        let animatedContainerStyle = {
            position: 'absolute',
            width: WIDTH,
            height: HEIGHT,
            backgroundColor: COLOR.VERY_DARK_BLUE,
            opacity: this.state.top.interpolate({
                inputRange: [0, HEIGHT - feedMargin],
                outputRange: [0.4, 1]
            }),
            transform: [
                {
                    scale: this.state.top.interpolate({
                        inputRange: [0, HEIGHT - feedMargin],
                        outputRange: [0.9, 1]
                    }),
                }
            ]
        }

        let storyPages = this.state.loading
            ?
            [<Story key={1} page={0} loading={true} />]
            :
            this._renderStories();


        return (
            <View {...this._panResponder.panHandlers} style={styles.container}>
                <Menu onPageChange={(index) => {
                    this._resetFlag();
                } } animatedContainerStyle={animatedContainerStyle} onSavedPress={() => {
                    this._hideMenu(true);
                    this.menuType = 'saved';
                    this.setState({loading: false})
                } } onMenuPress={(type) => {
                    showHUD(null, type, 1000)
                    this._hideMenu(true);
                    this.setState({ loading: true});
                    this.menuType = type; 
                    this._requestArticles();
                } } />
                <Animated.View style={feedContainerStyle}>
                    <Carousel
                        pageWidth={WIDTH}
                        style={styles.carousel}
                        initialPage={0}
                        onPageChange={(index) => {
                            this._resetFlag();
                        } }>
                        {storyPages}
                    </Carousel>
                    <TouchableOpacity style={styles.menuButtonView} onPress={() => {
                        if (this.menuShowing) return;
                        this._showMenu(true);
                    } }>
                        <View >
                            <Image style={styles.menuButton} source={require('../../assets/menu.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.refreshButtonView} onPress={() => {
                        this.setState({ loading: true });
                        this._requestArticles();
                    } }>
                        <View>
                            <Image style={styles.refreshButton} source={require('../../assets/refresh-arrow.png')} />
                        </View>
                    </TouchableOpacity>
                </Animated.View>

            </View >
        );
    }
}
