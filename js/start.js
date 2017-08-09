require(['lottery'], function (_lottery) {
    'use strict';

    var start = function start() {
        console.log('now start');
    }; /**
        * Created by admin on 2017/8/4.
        */

    var end = function end(event) {
        console.log('now end' + event);
    };
    var app = document.getElementById('app');
    var obj = {
        items: [{ 'url': 'images/btn.png', 'text': '开始按钮', isStartBtn: true }, { 'url': 'images/01.png', 'text': '恭喜你抽中1元现金红包' }, { 'url': 'images/02.png', 'text': '恭喜你抽中2元现金红包' }, { 'url': 'images/03.png', 'text': '恭喜你抽中3元现金红包' }, { 'url': 'images/04.png', 'text': '恭喜你抽中4元现金红包' }, { 'url': 'images/05.png', 'text': '恭喜你抽中5元现金红包' }, { 'url': 'images/06.png', 'text': '恭喜你抽中6元现金红包' }, { 'url': 'images/07.png', 'text': '恭喜你抽中7元现金红包' }, { 'url': 'images/08.png', 'text': '恭喜你抽中8元现金红包' }],
        round: 3,
        dom: app,
        timeout: 10000,
        startFun: start,
        endFun: end
    };
    var lottery = new _lottery.Lottery(obj);
    lottery.start();
});