const functions = require('firebase-functions');
// Expressの読み込み
const express = require('express');
const requestPromise = require('request-promise-native');

const app = express();

// APIにリクエストを送る関数
const getDataFromAPI = async keyword => {
    // cloud functionsから実行する場合には地域の設定が必要になるため'country=JP'を追加している
    const requestUrl = 'https://www.googleapis.com/books/v1/volumes?country=JP&q=intitle:';
    const result = await requestPromise(`${requestUrl}${keyword}`);
    return result;
}

const getSpeingWater = async query => {
    const SptingWaterUrl = 'https://livlog.xyz/springwater/springWater?q=';
    const resultForSpringWater = await requestPromise(`${SptingWaterUrl}${query}`);
    return resultForSpringWater;
}

// エンドポイント
app.get('/hello',(req, res) => {
    res.send('hello, Express');
});

app.get('/user/:userId', (req, res) => {
    const users = [
        { id: 1, name: 'ジョナサン' },
        { id: 2, name: 'ジョセフ' },
        { id: 3, name: '承太郎' },
        { id: 4, name: '仗助' },
        { id: 5, name: 'ジョルノ' },
    ];
    const targetUser = users.find(user => user.id === Number(req.params.userId));
    res.send(targetUser);
});

app.get('/gbooks/:keyword', async (req, res) => {
    // APIリクエストの関数を実行
    const response = await getDataFromAPI(req.params.keyword);
    res.send(response);
});

app.get('/springwater/:keyword', async (req, res) => {
    const response = await getSpeingWater(req.params.keyword);
    res.send(response);
})

const api = functions.https.onRequest(app);
module.exports = { api };
