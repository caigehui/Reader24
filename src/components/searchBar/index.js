'use strict';
const styles = StyleSheet.create({
    searchInputView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: WIDTH - WIDTH / 5,
        height: 30,
        marginLeft: 20,
        alignSelf: 'center',
        backgroundColor: COLOR.SUPER_DARK_BLUE,
        borderRadius: 6
    },
    searchIcon: {
        marginLeft: 10,
        width: 12.5,
        height: 12.5
    },
    searchInput: {
        marginTop: 1,
        marginLeft: 5,
        width: WIDTH - (WIDTH / 5) - 28,
        height: 35,
        fontSize: 13,
        color: 'white',
        alignSelf: 'center'
    },
    fullSearchContainer: {
        width: WIDTH,
        height: 35,
        backgroundColor: COLOR.SUPER_DARK_BLUE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fullSearchInput: {
        width: WIDTH - 10,
        height: 25,
        backgroundColor: COLOR.SUPER_DARK_BLUE,
        borderRadius: 4,
        borderWidth: ONE_PIXEL,
        borderColor: 'rgba(230,230,230,0)',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    searchIconCenter: {
        width: 12,
        height: 12,
        marginRight: 7,
    },
    text: {
        fontSize: 13,
        color: 'rgb(170,170,170)',
        backgroundColor: 'rgba(0,0,0,0)'

    }
})

export default class SearchBar extends Component {

    static propTypes = {
        fullWidth: PropTypes.bool,
        autoFocus: PropTypes.bool,
        onPress: PropTypes.func,
        editable: PropTypes.bool,
        
    }

    static defaultProps = {
        fullWidth: false,
        autoFocus: false,
        editable: true
    }

    _onPress = () => {
        if (this.props.editable) {
            this.searchInput.focus();
        } else {
            this.props.onPress && this.props.onPress()
        }
    }

    componentDidMount() {

        this.props.autoFocus && setTimeout(() => {
            this.searchInput && this.searchInput.focus();
        }, 400)
    }

    componentWillUnmount() {
        this.searchInput && this.searchInput.blur();
    }

    render() {
        return this.props.fullWidth
            ?
            (
                <TouchableWithoutFeedback onPress={this.props.onPress}>
                    <View style={styles.fullSearchContainer}>
                        <View style={styles.fullSearchInput}>
                            <Image source={require('./search.png') } style={styles.searchIconCenter} resizeMode="contain"/>
                            <Text style={styles.text}>搜索</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )
            :
            (
                <TouchableWithoutFeedback onPress={this._onPress}>
                    <View style={[styles.searchInputView]}>
                        <Image resizeMode="contain"
                            source={require('./search.png') }
                            style={[styles.searchIcon]}/>
                        {this.props.editable
                            ? <TextInput ref={searchInput => this.searchInput = searchInput}
                                style={[styles.searchInput]}
                                clearButtonMode="always"
                                returnKeyType="search"
                                underlineColorAndroid="transparent"
                                placeholderTextColor={COLOR.VERY_LIGHT_BLUE}
                                {...this.props}
                                autoFocus={false}/>
                            : <Text style={{ color: COLOR.LIGHT_BLUE, fontSize: 13, marginLeft: 5 }} numberOfLines={1}>{this.props.placeholder}</Text>
                        }
                    </View>
                </TouchableWithoutFeedback>
            )

    }
}