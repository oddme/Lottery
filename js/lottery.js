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
        this._stepto = 0;
        this._dom = null;
        this._timer1 = null;
        this._timer2 = null;

        this._items = arr;
        this._nowNum = 1;
        this._round = round;
        this._dom = dom;
    }

    _createClass(Lottery, [{
        key: '_removeHighLight',
        value: function _removeHighLight(className) {
            if (className === 1) {
                var highLightItem = document.getElementsByName('8')[0];
                highLightItem.removeAttribute('class');
            } else {
                var _highLightItem = document.getElementsByName((className - 1).toString())[0];
                _highLightItem.removeAttribute('class');
            }
        }
    }, {
        key: '_step',
        value: function _step() {
            if (this._nowNum > 7) {
                this._nowNum = 1;
                this._removeHighLight(this._nowNum);
                var nowItem = document.getElementsByName(this._nowNum.toString())[0];
                nowItem.setAttribute('class', 'mask');
            } else {
                this._nowNum++;
                this._removeHighLight(this._nowNum);
                var _nowItem = document.getElementsByName(this._nowNum.toString())[0];
                _nowItem.setAttribute('class', 'mask');
            }
        }
    }, {
        key: '_runStep',
        value: function _runStep() {
            var num = 1;
            var self = this;
            self._timer1 = setInterval(function () {
                self._step();
                num++;
                if (num > self._round * 8) {
                    clearInterval(self._timer1);
                    num = 1;
                    var deep = self;
                    deep._timer2 = setInterval(function () {
                        if (num >= deep._stepto + 8) {
                            clearInterval(deep._timer2);
                            alert(deep._items[deep._nowNum]['text']);
                            deep._stepto = 0;
                            deep._timer1 = null;
                            deep._timer2 = null;
                        } else {
                            deep._step();
                            num++;
                        }
                    }, 300);
                }
            }, 100);
        }
    }, {
        key: '_btnRun',
        value: function _btnRun() {
            if (this._stepto === 0) {
                this._stepto = Math.floor(Math.random() * 8 + 1);
            }
            if (!this._timer1 && !this._timer2) {
                this._runStep();
            }
        }
    }, {
        key: '_createLottery',
        value: function _createLottery() {

            var div = document.createElement('div');
            div.setAttribute("id", 'lottery');
            div.innerHTML = '<div class="row"><div class="box"><img src="' + this._items[1]['url'] + '"><div class="mask" name="1"></div></div>' + '<div class="box"><img src="' + this._items[2]['url'] + '"><div name="2"></div></div>' + '<div class="box"><img src="' + this._items[3]['url'] + '"><div name="3"></div></div><div class="clear"></div></div>' + '<div class="row"><div class="box"><img src="' + this._items[4]['url'] + '"><div name="8"></div></div>' + '<div name="start-btn" class="box"><img src="' + this._items[0]['url'] + '"></div>' + '<div class="box"><img src="' + this._items[5]['url'] + '"><div name="4"></div></div><div class="clear"></div></div>' + '<div class="row"><div class="box"><img src="' + this._items[6]['url'] + '"><div name="7"></div></div>' + '<div class="box"><img src="' + this._items[7]['url'] + '"><div name="6"></div></div>' + '<div class="box"><img src="' + this._items[8]['url'] + '"><div name="5"></div></div><div class="clear"></div></div>';
            this._dom.appendChild(div);
        }
    }, {
        key: 'setLuckyNum',
        value: function setLuckyNum(ste) {
            if (ste >= this._nowNum) {
                this._stepto = ste + 1 - this._nowNum;
            } else {
                this._stepto = ste + 9 - this._nowNum;
            }
        }
    }, {
        key: 'start',
        value: function start() {
            var _this = this;

            this._createLottery();
            var start = document.getElementsByName('start-btn')[0];
            start.addEventListener('click', function () {
                _this._btnRun();
            });
        }
    }, {
        key: 'stop',
        value: function stop() {
            clearInterval(this._timer1);
            clearInterval(this._timer2);
            this._stepto = 0;
            this._timer1 = null;
            this._timer2 = null;
            alert(this._items[this._nowNum]['text']);
        }
    }]);

    return Lottery;
}();