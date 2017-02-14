'use strict';
import ContentItem from './contentItem'; 
export default class content extends Component {
    render() {
        return (<ContentItem url={this.props.url}/>)
    }
}