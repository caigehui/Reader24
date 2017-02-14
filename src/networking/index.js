'use strict';
const api = 'https://newsapi.org/v1/articles?apiKey=836ba8b9054e4c4682740f8b2f28020a';

function getImage(source) {
    return new Promise((resolve, reject) => {
        let url = api + source;
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                let articles = responseJson.articles;
                if (articles && articles[0] && articles[0].urlToImage) {
                    resolve(articles[0].urlToImage);
                } else {
                    console.warn(source + ' not found')
                    resolve('not found');
                }
            })
            .done();
    })
}

export function getHomeImage() {
    return new Promise((resolve, reject) => {
        let url = api + '&source=bbc-news';
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                let articles = responseJson.articles;
                resolve(articles[1].urlToImage);
            })
            .done();
    })
}

export function getGeneralImage() {

    return new Promise((resolve, reject) => {
        getImage('&source=bbc-news').then((uri) => resolve(uri)).done();
    })
}

export function getBusinessImage() {
    return new Promise((resolve, reject) => {
        getImage('&source=fortune').then((uri) => resolve(uri)).done();
    })
}


export function getEntertainmentImage() {
    return new Promise((resolve, reject) => {
        getImage('&source=buzzfeed').then((uri) => resolve(uri)).done();
    })
}

export function getGamingImage() {
    return new Promise((resolve, reject) => {
        getImage('&source=ign').then((uri) => resolve(uri)).done();
    })
}

export function getMusicImage() {
    return new Promise((resolve, reject) => {
        getImage('&source=mtv-news').then((uri) => resolve(uri)).done();
    })
}

export function getScienceImage() {
    return new Promise((resolve, reject) => {
        getImage('&source=new-scientist').then((uri) => resolve(uri)).done();
    })
}

export function getSportImage() {
    return new Promise((resolve, reject) => {
        getImage('&source=espn').then((uri) => resolve(uri)).done();
    })
}

export function getTechnologyImage() {
    return new Promise((resolve, reject) => {
        getImage('&source=techradar').then((uri) => resolve(uri)).done();
    })
}

function getArticles(source) {
    return new Promise((resolve, reject) => {
        let url = api + source;
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                let articles = responseJson.articles;
                if (articles) {
                    resolve(articles);
                } else {
                    console.warn(source + ' not found')
                    resolve('not found');
                }
            })
            .done();
    })
}

export function getHomeArticles() {
    return new Promise((resolve, reject) => {
        let articlesArray = {};
        getArticles('&source=bbc-news').then((articles) => {
            articlesArray.general = articles ;
            if(Object.keys(articlesArray).length == 8) {
                resolve(articlesArray);
            }
        }).done();
        getArticles('&source=fortune').then((articles) => {
            articlesArray.business = articles ;
            if(Object.keys(articlesArray).length == 8) {
                resolve(articlesArray);
            }
        }).done();
        getArticles('&source=ign').then((articles) => {
            articlesArray.gaming = articles ;
            if(Object.keys(articlesArray).length === 8) {
                resolve(articlesArray);
            }
        }).done();
        getArticles('&source=mtv-news').then((articles) => {
            articlesArray.music = articles ;
            if(Object.keys(articlesArray).length === 8) {
                resolve(articlesArray);
            }
        }).done();
        getArticles('&source=buzzfeed').then((articles) => {
            articlesArray.entertainment = articles ;
            if(Object.keys(articlesArray).length === 8) {
                resolve(articlesArray);
            }
        }).done();
        getArticles('&source=new-scientist').then((articles) => {
            articlesArray.science = articles ;
            if(Object.keys(articlesArray).length === 8) {
                resolve(articlesArray);
            }
        }).done();
        getArticles('&source=espn').then((articles) => {
            articlesArray.sport = articles ;
            if(Object.keys(articlesArray).length === 8) {
                resolve(articlesArray);
            }
        }).done();
        getArticles('&source=techradar').then((articles) => {
            articlesArray.technology = articles ;
            if(Object.keys(articlesArray).length === 8) {
                resolve(articlesArray);
            }
        }).done();
    })
}

export function getGeneralArticles() {
    return new Promise((resolve, reject) => {
        getArticles('&source=bbc-news').then((articles) => resolve(articles)).done();
    })
}

export function getBusinessArticles() {
    return new Promise((resolve, reject) => {
        getArticles('&source=fortune').then((articles) => resolve(articles)).done();
    })
}

export function getGamingArticles() {
    return new Promise((resolve, reject) => {
        getArticles('&source=ign').then((articles) => resolve(articles)).done();
    })
}
export function getMusicArticles() {
    return new Promise((resolve, reject) => {
        getArticles('&source=mtv-news').then((articles) => resolve(articles)).done();
    })
}
export function getEntertainmentArticles() {
    return new Promise((resolve, reject) => {
        getArticles('&source=buzzfeed').then((articles) => resolve(articles)).done();
    })
}
export function getScienceArticles() {
    return new Promise((resolve, reject) => {
        getArticles('&source=new-scientist').then((articles) => resolve(articles)).done();
    })
}
export function getSportArticles() {
    return new Promise((resolve, reject) => {
        getArticles('&source=espn').then((articles) => resolve(articles)).done();
    })
}
export function getTechnologyArticles() {
    return new Promise((resolve, reject) => {
        getArticles('&source=techradar').then((articles) => resolve(articles)).done();
    })
}
