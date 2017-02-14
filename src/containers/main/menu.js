'use strict';
import SearchBar from '../../components/searchBar';
import Carousel from '../../components/carousel';
import MenuItem from './menuItem';
import * as Networking from '../../networking'

const PLACEHOLDER = 'Search Articles';
const margin = 20;//page距离左边的距离

let styles = StyleSheet.create({

    statusBar: {
        height: 20,
        backgroundColor: COLOR.TRANSPARENT_COLOR,
    },
    searchInputContainerView: {
        flexDirection: 'row',
        height: 44,
        left: 0,
        right: 0,
        backgroundColor: COLOR.NAV_BAR_BACKGROUND_COLOR
    },
    searchButton: {
        fontSize: 14,
        color: COLOR.TINT_COLOR,
        textAlign: 'center',
        width: WIDTH / 5 - 15,
        right: 0,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    carousel: {
        height: HEIGHT - (isIOS ? 25 : 0) - 44 - 120 * I6RATIO,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignSelf: "stretch",
    },
    menuPage: {
        left: 0,
        right: 0,
        height: HEIGHT - (isIOS ? 25 : 0) - 44 - 120 * I6RATIO,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    homeItem: {
        left: 0,
        right: 0,
        height: 100
    },
    buttonView: {
        height: 90 * I6RATIO,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: COLOR.SUPER_DARK_BLUE,
        marginTop: 25
    },
    button: {
        width: WIDTH / 5,
        textAlign: 'center',
        fontSize: 15,
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white',
        marginTop: 15
    }
});


export default class Menu extends Component {

    static propTypes = {
        onSavedPress: PropTypes.func,
        onSettingsPress: PropTypes.func,
        animatedContainerStyle: PropTypes.object,
        onMenuPress: PropTypes.func
    }

    static defaultTypes = {
        onSavedPress: () => { },
        onMenuPress: (item) => { },
        onSettingsPress: () => { },
        animatedContainerStyle: {}
    }

    state = {
        searchContent: '',
        home: {},
        general: {},
        business: {},
        entertainment: {},
        gaming: {},
        music: {},
        science: {},
        sport: {},
        technology: {}
    }

    componentWillMount() {
        Networking.getHomeImage().then((uri) => {
            this.setState({ home: { uri: uri } })
        })
        Networking.getGeneralImage().then((uri) => {
            this.setState({ general: { uri: uri } })
        })
        Networking.getBusinessImage().then((uri) => {
            this.setState({ business: { uri: uri } })
        })
        Networking.getEntertainmentImage().then((uri) => {
            this.setState({ entertainment: { uri: uri } })
        })
        Networking.getGamingImage().then((uri) => {
            this.setState({ gaming: { uri: uri } })
        })
        Networking.getMusicImage().then((uri) => {
            this.setState({ music: { uri: uri } })
        })
        Networking.getScienceImage().then((uri) => {
            this.setState({ science: { uri: uri } })
        })
        Networking.getSportImage().then((uri) => {
            this.setState({ sport: { uri: uri } })
        })
        Networking.getTechnologyImage().then((uri) => {
            this.setState({ technology: { uri: uri } })
        })
    }

    _onSearchContentChange = (event) => {
        if (this.state.text === event.nativeEvent.text) return;
        this.setState({ searchContent: event.nativeEvent.text });
    }

    _onSearchButtonPress = (event) => {

    }


    render() {

        let menuPages = []
        menuPages.push(
            <View key="1" style={styles.menuPage}>
                <MenuItem itemType="home" source={this.state.home} onPress={() => {
                    this.props.onMenuPress('Home');
                } } />
                <MenuItem itemType="topic" title="General" source={this.state.general} onPress={() => {
                    this.props.onMenuPress('General');
                } } />
                <MenuItem itemType="topic" title="Business" source={this.state.business} onPress={() => {
                    this.props.onMenuPress('Business');
                } } />
                <MenuItem itemType="topic" title="Entertainment" source={this.state.entertainment} onPress={() => {
                    this.props.onMenuPress('Entertainment');
                } } />
                <MenuItem itemType="topic" title="Gaming" source={this.state.gaming} onPress={() => {
                    this.props.onMenuPress('Gaming');
                } } />
                <MenuItem itemType="topic" title="Music" source={this.state.music} onPress={() => {
                    this.props.onMenuPress('Music');
                } } />
                <MenuItem itemType="topic" title="Science" source={this.state.science} onPress={() => {
                    this.props.onMenuPress('Science');
                } } />
            </View>
        );
        menuPages.push(
            <View key="2" style={styles.menuPage}>
                <MenuItem itemType="topic" title="Sport" source={this.state.sport} onPress={() => {
                    this.props.onMenuPress('Sport');
                } } />
                <MenuItem itemType="topic" title="Technology" source={this.state.technology} onPress={() => {
                    this.props.onMenuPress('Technology');
                } } />
            </View>
        );
        return (
            <Animated.View style={this.props.animatedContainerStyle}>
                {
                    isIOS ?
                        <View style={styles.statusBar} />
                        : null
                }
                <View style={styles.searchInputContainerView}>
                    <SearchBar placeholder={PLACEHOLDER} value={this.state.searchContent} onChange={this._onSearchContentChange} editable={false} />
                    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={this._onSearchButtonPress}>
                        <Text style={styles.searchButton} >Edit</Text>
                    </TouchableOpacity>
                </View>
                <Carousel
                    sneak={10}
                    pageWidth={WIDTH - 40}
                    style={styles.carousel}
                    initialPage={0}
                    onPageChange={(index) => {
                        this.props.onPageChange && this.props.onPageChange(index);
                    } }>
                    {menuPages}
                </Carousel>
                <View style={styles.buttonView}>
                    <TouchableOpacity onPress={this.props.onSavedPress}>
                        <Text style={styles.button} >Saved</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.onSettingsPress}>
                        <Text style={styles.button}>Settings</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    }
}