'use strict';
import FadeNetworkImage from '../../../components/fadeNetworkImage';

const margin = 20;
const space = 10;
const range = 15;


let itemWidth = (WIDTH - margin * 2 - space) / 2;
let itemHeight = (HEIGHT - (isIOS ? 25 : 0) - 44 - 120 - 3 * space) / 4;
let homeWidth = WIDTH - margin * 2;
const styles = {
    homeItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeText: {
        fontSize: 20,
        color: COLOR.PURE_WHITE,
        backgroundColor: 'rgba(0,0,0,0)',
        position: 'absolute',
        top: itemHeight / 2 - itemHeight / 8,
        left: 0,
        width: homeWidth,
        height: itemHeight / 4,
        textAlign: 'center'
    },
    item: {
        width: itemWidth,
        height: itemHeight,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: space,
    },
    itemText: {
        fontSize: 16,
        color: COLOR.PURE_WHITE,
        backgroundColor: 'rgba(0,0,0,0)',
        position: 'absolute',
        top: itemHeight / 2 - itemHeight / 8,
        left: 0,
        width: itemWidth,
        height: itemHeight / 4,
        textAlign: 'center'
    },
    addImage: {
        width: itemWidth / 5,
        height: itemWidth / 5,
        marginBottom: 25,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: itemWidth / 10
    },
    addText: {
        fontSize: 14,
        color: COLOR.PURE_WHITE,
        backgroundColor: 'rgba(0,0,0,0)',
        position: 'absolute',
        top: itemHeight / 2 + itemWidth / 10,
        left: 0,
        width: itemWidth,
        height: itemHeight / 5,
        textAlign: 'center'
    }

}

export default class menuItem extends Component {

    static propTypes = {
        itemType: PropTypes.oneOf(['home', 'add', 'topic']),
        source: PropTypes.object,
        title: PropTypes.string
    }

    static defaultProps = {
        itemType: 'topic',
        source: {}
    }

    state = {
        hw: WIDTH - margin * 2,
        w: (WIDTH - margin * 2 - space) / 2,
        h: (HEIGHT - (isIOS ? 25 : 0) - 44 - 120 - 3 * space) / 4,
        ml: 0,
        mt: 0,
        mr: 0,
        mb: space
    }

    _configAnimation = () => {
        LayoutAnimation.configureNext({
            duration: 700,   //持续时间
            create: {
                type: 'easeInEaseOut',
                property: 'opacity'
            },
            update: {
                type: 'spring',
                springDamping: 0.5
            }
        });
    }

    renderHomeItem = () => {

        let style = {
            ...styles.homeItem,
            width: this.state.hw,
            height: this.state.h,
            marginLeft: this.state.ml,
            marginTop: this.state.mt,
            marginBottom: this.state.mb
        }
        return (
            <TouchableOpacity
                onPressIn={() => {
                    this._configAnimation();
                    this.setState({
                        hw: this.state.hw - range,
                        h: this.state.h - range,
                        ml: range / 2,
                        mt: range / 2,
                        mb: this.state.mb + range / 2
                    })
                } }
                onPressOut={() => {
                    this._configAnimation();
                    this.setState({
                        hw: this.state.hw + range,
                        h: this.state.h + range,
                        ml: 0,
                        mt: 0,
                        mb: this.state.mb - range / 2
                    })

                } }
                onPress={() => {
                    this.props.onPress && this.props.onPress();
                } }
                activeOpacity={1}>
                <FadeNetworkImage style={style} source={this.props.source} />
                <Text style={styles.homeText}>Home</Text>
            </TouchableOpacity>
        );
    }

    renderAddItem = () => {
        let style = {
            ...styles.item,
            width: this.state.w,
            height: this.state.h,
            marginLeft: this.state.ml,
            marginTop: this.state.mt,
            marginRight: this.state.mr
        }
        return (
            <TouchableOpacity
                onPressIn={() => {
                    this._configAnimation();
                    this.setState({
                        w: this.state.w - range,
                        h: this.state.h - range,
                        ml: range / 2,
                        mt: range / 2,
                        mr: range / 2
                    })
                } }
                onPressOut={() => {
                    this._configAnimation();
                    this.setState({
                        w: this.state.w + range,
                        h: this.state.h + range,
                        ml: 0,
                        mt: 0,
                        mr: 0
                    })
                } }
                activeOpacity={1}>
                <View style={[style, { backgroundColor: COLOR.LIGHT_BLUE }]}>
                    <Image source={require('../../../assets/add.png')} style={styles.addImage} resizeMode="contain" />
                </View>
                <Text style={styles.addText}>添加兴趣话题</Text>
            </TouchableOpacity>
        )
    }

    renderTopicItem = () => {
        let style = {
            ...styles.item,
            width: this.state.w,
            height: this.state.h,
            marginLeft: this.state.ml,
            marginTop: this.state.mt,
            marginRight: this.state.mr
        }
        return (
            <TouchableOpacity
                onPressIn={() => {
                    this._configAnimation();
                    this.setState({
                        w: this.state.w - range,
                        h: this.state.h - range,
                        ml: range / 2,
                        mt: range / 2,
                        mr: range / 2
                    })
                } }
                onPressOut={() => {
                    this._configAnimation();
                    this.setState({
                        w: this.state.w + range,
                        h: this.state.h + range,
                        ml: 0,
                        mt: 0,
                        mr: 0
                    })
                } }
                onPress={() => {
                    this.props.onPress && this.props.onPress();
                } }
                activeOpacity={1}>
                <FadeNetworkImage style={style} source={this.props.source} />
                <Text style={styles.itemText}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const { itemType } = this.props;

        if (itemType === 'home')
            return this.renderHomeItem();
        else if (itemType === 'add')
            return this.renderAddItem();
        else
            return this.renderTopicItem();
    }

}