'use strict';

const styles = StyleSheet.create({
    container: {

    }
})
export default class ImageButton extends Component {

    static propTypes = {
        img1Source: PropTypes.any,
        img2Source: PropTypes.any,
        tintColor: PropTypes.string,
        style: PropTypes.object,
        circle: PropTypes.bool
    }

    state = {
        toggle: false,
        anim: new Animated.Value(1)
    }

    render() {
        let { style, tintColor, circle } = this.props;
        let {toggle} = this.state;
        let containerStyle = {
            width: style.width,
            height: style.height,
            borderRadius: style.height / 2,
            borderWidth: circle ? ONE_PIXEL : 0,
            borderColor:  tintColor ,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: circle ? (toggle ? tintColor : 'transparent') : 'transparent',
            transform: [{
                scale: this.state.anim
            }]
        }
        let imgStyle = {
            width: style.width - 20 * I6RATIO,
            height: style.width - 20 * I6RATIO
        }
        return (
            <TouchableOpacity onPressIn={() => {
                this.setState({
                    toggle: !this.state.toggle
                })
                Animated.spring(this.state.anim, {
                    toValue: 0.8
                }).start();
            } } onPressOut={() => {
                this.props.onPress && this.props.onPress(() => {
                    this.setState({
                        toggle: !this.state.toggle
                    })
                })
                Animated.spring(this.state.anim, {
                    toValue: 1
                }).start();
            } } activeOpacity={1}>
                <Animated.View style={containerStyle}>
                    <Image source={toggle ? (this.props.img2Source ? this.props.img2Source: this.props.img1Source) : this.props.img1Source} style={imgStyle} />
                </Animated.View>
            </TouchableOpacity>
        );
    }
}