'use strict';
import RootSiblings from 'react-native-root-siblings';
import HUD from './HUD.js';
import WebViewLoading from './webViewLoading';
let componentView = null;
let node = null;
export function showHUD(imgSource, text, duration) {
    return new Promise((resolve, reject) => {
        let hud = (
            <HUD imgSource={imgSource} onShow={() => {
                resolve();
            } } text={text} getNode={(n) => {
                node = n;
            } } />
        )
        if (componentView) {
            componentView.update(hud)
        } else {
            componentView = new RootSiblings(hud);
        }
        if (duration > 0) {
            setTimeout(() => {
                hideHUD();
            }, duration);
        }
    });

}


export function hideHUD() {
    if (!node) return;
    node.hide().then(() => {
        if (componentView) {
            componentView.destroy();
            componentView = null;
            node = null;
        }
    })
}

export function showWebViewLoading() {
    let hud = (
        <WebViewLoading getNode={(n) => {
            node = n;
        } } />
    )
    if (componentView) {
        componentView.update(hud)
    } else {
        componentView = new RootSiblings(hud);
    }
}