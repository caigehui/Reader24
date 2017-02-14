'use strict';
let styles = StyleSheet.create({
    shade: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgb(0,0,0)'
    },
    content: {

    }
})
export default class fadeNetworkImage extends Component {

    state = {
        fadeAnim: new Animated.Value(0), // init opacity 0
    };

    static propTypes = {
        style: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),
        shadeAlpha: PropTypes.number
    }

    static defaultProps = {
        style: {
            width: 50,
            height: 50
        },
        shadeAlpha: 0.4,
        showImage: false
    }

    render() {


        let { style } = this.props;

        let container = {
            backgroundColor: COLOR.LIGHT_BLUE,
            width: style.width,
            height: style.height,
            ...style
        }

        let imageStyle = {
            width: style.width,
            height: style.height,
            opacity: this.state.fadeAnim
        }

        let contentStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: style.justifyContent ? style.justifyContent : 'center',
            alignItems: style.alignItems ? style.alignItems : 'center',
            flexDirection: style.flexDirection ? style.flexDirection : 'column'
        }

        return (
            <View style={container}>

                <Animated.Image resizeMode="cover" source={this.props.source} style={imageStyle} onLoadEnd={() => {
                    Animated.timing(
                        this.state.fadeAnim,
                        { toValue: 1 }
                    ).start();
                    this.setState({ showImage: true })
                } } />
                {this.state.showImage ? <View style={[styles.shade, { opacity: this.props.shadeAlpha }]} /> : null}
                <View style={contentStyle} >
                    {this.props.children}
                </View>
            </View>
        );
    }
}