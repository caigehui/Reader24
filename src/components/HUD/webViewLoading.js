'use strict';
import * as Animatable from 'react-native-animatable';
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: 120 * I6RATIO,
        left: WIDTH / 2 - 60 * I6RATIO,
        height: 35 * I6RATIO,
        bottom: 60 * I6RATIO,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 4 * I6RATIO
    },
    text: {
        color: 'white',
        fontSize: 14
    }
})
export default class WebViewLoading extends Component {
    state = {
        componentAnimationType: 'bounceIn',
        inOrOut: 'in',
        text: 'Loading'
    }
    timing = () => {
        this.timer = setTimeout(() => {
            if (this.unmount) return;
            if (this.state.text.length <= 9) {
                this.setState({ text: this.state.text + '.' })
            } else {
                this.setState({ text: 'Loading' })
            }
            this.timing();
        }, 1000);
    }
    componentDidMount() {
        this.timing();
        this.props.getNode(this)
    }
    componentWillUnmount() {
        this.unmount = true;
        clearTimeout(this.timer);
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
        }
    }
    render() {
        let { componentAnimationType } = this.state;
        return <Animatable.View easing="ease-out" animation={componentAnimationType} duration={400} style={styles.container} onAnimationEnd={this.onFadeOut}>
            <Text style={styles.text}>{this.state.text}</Text>
        </Animatable.View>
    }

}