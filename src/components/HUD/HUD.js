'use strict';
import * as Animatable from 'react-native-animatable';
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: WIDTH / 2 - 60 * I6RATIO,
        top: HEIGHT / 2 - 60 * I6RATIO,
        width: 120 * I6RATIO,
        height: 120 * I6RATIO,
        borderRadius: 60 * I6RATIO,
        backgroundColor: 'rgba(0, 0 ,0 ,0.65)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 30 * I6RATIO,
        height: 30 * I6RATIO,
        marginBottom: 15 * I6RATIO
    },
    text: {
        color: 'white',
        fontSize: 14
    }
});

export default class HUD extends Component {

    static propTypes = {
        imgSource: PropTypes.any,
        text: PropTypes.string,
        componentDuration: PropTypes.number,

    }

    static defaultProps = {
        componentDuration: 400
    }

    state = {
        componentAnimationType: 'bounceIn',
        inOrOut: 'in'
    }
    componentDidMount() {
        this.props.getNode(this)
    }

    hide = () => {
        this.setState({
            componentAnimationType: 'bounceOut',
            inOrOut: 'out'
        })
        return new Promise((resolve, reject) => {
            this.resolve = resolve
        })
    }

    onFadeOut = () => {
        if (this.state.inOrOut === 'out') {
            this.resolve && this.resolve();
        } else {
            this.props.onShow && this.props.onShow();
        }
    }

    render() {

        let { imgSource, text, componentDuration } = this.props;
        let { componentAnimationType } = this.state;

        return (
            <Animatable.View easing="ease-out" animation={componentAnimationType} duration={componentDuration} style={styles.container} onAnimationEnd={this.onFadeOut}>
                {imgSource ? <Image source={imgSource} style={styles.img} />
                    : null}
                <Text style={styles.text}>{text}</Text>
            </Animatable.View>
        )
    }

}