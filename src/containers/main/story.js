'use strict';
import StoryItem from './storyItem';

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: HEIGHT,
        justifyContent: 'space-between'
    },

})

export default class Story extends Component {

    static propTypes = {
        page: PropTypes.number,
        articles: PropTypes.array,
        loading: PropTypes.bool
    }
    render() {
        let { articles } = this.props;
        if (!articles) articles = ['', ''];
        return (
            <View style={styles.container}>
                {

                    articles.map((article, i) => {
                        let publishedAt = new Date(article.publishedAt);
                        var now = new Date();
                        var difference = now.getTime() - publishedAt.getTime()
                        var leave1 = difference % (24 * 3600 * 1000)
                        var hours = Math.floor(leave1 / (3600 * 1000))
                        
                        return <StoryItem key={i} mode={this.props.page % 2 === 1 ? 3 : 2} source={{ uri: articles[i].urlToImage }} author={articles[i].author || 'anonymous'} title={articles[i].title} url={articles[i].url} loading={this.props.loading} time={hours+'h'} classification={articles[i].category}/>
                    })
                }
            </View>
        );
    }

}