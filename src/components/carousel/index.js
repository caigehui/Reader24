"use strict";

import React, { Component, PropTypes } from "react";
import {
    Dimensions,
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableWithoutFeedback
} from "react-native";


let { width } = Dimensions.get("window");

export default class Carousel extends Component {



    componentWillMount() {
        this.calculateGap(this.props);
    }

    componentDidMount() {
        if (this.props.children && this.props.initialPage > 0 && this.props.initialPage < this.props.children.length) {
            setTimeout(() => {
                this.goToPage(this.props.initialPage);
            }, 200);

        }
    }

    componentWillReceiveProps(props) {
        this.calculateGap(props);
    }

    calculateGap(props) {
        let { sneak, pageWidth } = props;
        if (pageWidth > width) {
            throw new Error("invalid pageWith");
        }
        /*
         ------------
        |            |
        |-   ----   -|
        | | |    | | |
        | | |    | | |
        | | |    | | |
        |-   ----   -|
        |^-- sneak   |
        |         ^--- gap
         ------------
        */
        let gap = (width - (2 * sneak) - pageWidth) / 2;
        this.setState({ gap: gap });
    }

    goToPage(position) {
        let { pageWidth } = this.props;
        let { gap } = this.state;
        let pagePosition = position * (pageWidth + gap);
        // in android, you can't scroll directly in componentDidMount
        // (http://stackoverflow.com/questions/33208477/react-native-android-scrollview-scrollto-not-working)
        // however this doesn't work in android for some reason:
        // InteractionManager.runAfterInteractions(() => {
        //     this.scrollView.scrollTo({ y: 0, x: pagePosition}, true);
        //     console.log('scrollView.scrollTo x:', pagePosition);
        // });
        // So I was left with an arbitrary timeout.

        this.scrollView.scrollTo({ y: 0, x: pagePosition }, true);
        this._onPageChange(position);
    }

    scrollEnded(event) {
        let { pageWidth } = this.props;
        const position = event.nativeEvent.contentOffset.x;
        const currentPage = position / pageWidth;
        this._onPageChange(currentPage);
    }

    _onPageChange(position) {
        if (this.props.onPageChange && this.props.children) {
            let currentElement = this.props.children[position];
            this.props.onPageChange(position, currentElement);
        }
    }

    render() {
        let { sneak, pageWidth } = this.props;
        let { gap } = this.state;
        let computedStyles = StyleSheet.create({
            scrollView: {
                paddingLeft: sneak + gap / 2,
                paddingRight: sneak + gap / 2
            },
            page: {
                width: pageWidth,
                justifyContent: "center",
                marginLeft: gap / 2,
                marginRight: gap / 2
            }
        });

        // if no children render a no items dummy page without callbacks
        let body = null;
        if (!this.props.children) {
            body = (
                <TouchableWithoutFeedback>
                    <View style={[styles.page, computedStyles.page, this.props.pageStyle, {alignItems: 'center', justifyContent: 'center'}]}>
                        <Text style={styles.noItemsText}>
                            {this.props.noItemsText}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        }
        else {
            body = React.Children.map(this.props.children, (c, index) => {
                return (
                    <TouchableWithoutFeedback
                        key={index}
                        onPress={() => this.goToPage(index)}
                        >
                        <View
                            style={[styles.page, computedStyles.page, this.props.pageStyle]}
                            >
                            {c}
                        </View>
                    </TouchableWithoutFeedback>
                );
            });
        }

        return (
            <View style={this.props.style ? this.props.style : styles.container}>
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    bounces={true}
                    contentContainerStyle={[computedStyles.scrollView]}
                    pagingEnabled
                    horizontal
                    onMomentumScrollEnd={(event) => this.scrollEnded(event)}
                    ref={c => this.scrollView = c}
                    showsHorizontalScrollIndicator={false}
                    >
                    {body}
                </ScrollView>
            </View>
        );
    }
}

Carousel.propTypes = {
    pageStyle: PropTypes.object,
    pageWidth: PropTypes.number,
    children: PropTypes.array,
    initialPage: PropTypes.number,
    noItemsText: PropTypes.string,
    onPageChange: PropTypes.func,
    sneak: PropTypes.number
};

Carousel.defaultProps = {
    initialPage: 0,
    pageStyle: null,
    pageWidth: width,
    sneak: 0,
    noItemsText: "No Stories Have Been Saved Now"
};

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignSelf: "stretch"
    },
    page: {
        flex: 1
    },
    noItemsText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        width: 200*I6RATIO
    }
});