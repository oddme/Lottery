'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by admin on 2017/7/25.
 */

var Lottery = function () {
    function Lottery(arr, round, dom) {
        _classCallCheck(this, Lottery);

        this._items = [];
        this._nowNum = 1;
        this._round = 3;
        this._dom = null;
        this._timer1 = null;
        this._timer2 = null;

        this._items = arr;
        this._nowNum = 1;
        this._round = round;
        this._dom = dom;
    }

    _createClass(Lottery, [{
        key: 'removeHighLight',
        value: function removeHighLight(className) {
            if (className === 1) {
                var highLightItem = document.getElementsByName('8')[0];
                highLightItem.removeAttribute('class');
            } else {
                var _highLightItem = document.getElementsByName((className - 1).toString())[0];
                _highLightItem.removeAttribute('class');
            }
        }
    }, {
        key: 'step',
        value: function step() {
            if (this._nowNum > 7) {
                this._nowNum = 1;
                this.removeHighLight(this._nowNum);
                var nowItem = document.getElementsByName(this._nowNum.toString())[0];
                nowItem.setAttribute('class', 'mask');
            } else {
                this._nowNum++;
                this.removeHighLight(this._nowNum);
                var _nowItem = document.getElementsByName(this._nowNum.toString())[0];
                _nowItem.setAttribute('class', 'mask');
            }
        }
    }, {
        key: 'runStep',
        value: function runStep(ste) {
            var num = 1;
            var self = this;
            self._timer1 = setInterval(function () {
                self.step();
                num++;
                if (num > self._round * 8) {
                    clearInterval(self._timer1);
                    num = 1;
                    var deep = self;
                    deep._timer2 = setInterval(function () {
                        if (num > ste + 8) {
                            clearInterval(deep._timer2);
                            deep.stop();
                            deep._timer1 = null;
                            deep._timer2 = null;
                        } else {
                            deep.step();
                            num++;
                        }
                    }, 300);
                }
            }, 100);
        }
    }, {
        key: 'btnRun',
        value: function btnRun() {
            var ste = Math.random() * 8 + 1;
            if (!this._timer1 && !this._timer2) {
                this.runStep(ste);
            }
        }
    }, {
        key: 'createLottery',
        value: function createLottery() {

            var div = document.createElement('div');
            div.setAttribute("id", 'lottery');
            div.innerHTML = '<div class="row"><div class="box"><img src="' + this._items[1]['url'] + '"><div class="mask" name="1"></div></div>' + '<div class="box"><img src="' + this._items[2]['url'] + '"><div name="2"></div></div>' + '<div class="box"><img src="' + this._items[3]['url'] + '"><div name="3"></div></div><div class="clear"></div></div>' + '<div class="row"><div class="box"><img src="' + this._items[4]['url'] + '"><div name="8"></div></div>' + '<div name="start-btn" class="box"><img src="' + this._items[0]['url'] + '"></div>' + '<div class="box"><img src="' + this._items[5]['url'] + '"><div name="4"></div></div><div class="clear"></div></div>' + '<div class="row"><div class="box"><img src="' + this._items[6]['url'] + '"><div name="7"></div></div>' + '<div class="box"><img src="' + this._items[7]['url'] + '"><div name="6"></div></div>' + '<div class="box"><img src="' + this._items[8]['url'] + '"><div name="5"></div></div><div class="clear"></div></div>';
            this._dom.appendChild(div);
        }
    }, {
        key: 'start',
        value: function start() {
            var _this = this;

            this.createLottery();
            var start = document.getElementsByName('start-btn')[0];
            start.addEventListener('click', function () {
                _this.btnRun();
            });
        }
    }, {
        key: 'stop',
        value: function stop() {
            alert(this._items[this._nowNum]['text']);
        }
    }]);

    return Lottery;
}();

var app = document.getElementById('app');
var lottery = new Lottery([{ 'url': 'images/btn.png', 'text': '开始按钮' }, { 'url': 'images/01.png', 'text': '恭喜你抽中1元现金红包' }, { 'url': 'images/02.png', 'text': '恭喜你抽中2元现金红包' }, { 'url': 'images/03.png', 'text': '恭喜你抽中3元现金红包' }, { 'url': 'images/04.png', 'text': '恭喜你抽中4元现金红包' }, { 'url': 'images/05.png', 'text': '恭喜你抽中5元现金红包' }, { 'url': 'images/06.png', 'text': '恭喜你抽中6元现金红包' }, { 'url': 'images/07.png', 'text': '恭喜你抽中7元现金红包' }, { 'url': 'images/08.png', 'text': '恭喜你抽中8元现金红包' }], 3, app);
// let style = document.createElement('link');
// style.setAttribute('src','css/style.css');
// style.setAttribute('type','text/css');
// style.setAttribute('rel','stylesheet');
// document.getElementsByTagName('head')[0].appendChild(style);

lottery.start();