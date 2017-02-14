'use strict';
import './constants';
import { Router, Scene, Reducer } from 'react-native-router-flux';
import { Main, Content } from './containers'
import {  hideHUD } from './components/HUD';
import * as Networking from './networking';
const reducerCreate = params => {
    const defaultReducer = Reducer(params);
    return (state, action) => {
        if(action && action.scene && action.scene.sceneKey && action.scene.sceneKey === 'main') {
            hideHUD();
        }
        return defaultReducer(state, action);
    }
};
export default class App extends Component {

    state = {};

    componentWillMount() {
        isIOS && StatusBar.setBarStyle('light-content', false);
    }

    render() {
        return (
            <Router createReducer={reducerCreate}>
                <Scene key="root">
                    <Scene key="main" component={Main} hideNavBar={true} />
                    <Scene key="content" component={Content} />
                </Scene>
            </Router>
        );
    }

}