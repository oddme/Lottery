'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by admin on 2017/7/25.
 */

var Lottery = function () {
    function Lottery(obj) {
        _classCallCheck(this, Lottery);

        this._items = [];
        this._nowNum = 1;
        this._stopNum = 1;
        this._round = 3;
        this._stepTo = 0;
        this._dom = null;
        this._timer1 = null;
        this._timer2 = null;
        this._requestTimeout = null;
        this._maxStep = 8;
        this._initialStep = 1;
        this._dataSourceTime = 5000;

        this._startHook = function () {
            return 0;
        };

        this._endHook = function () {
            return 0;
        };

        this._items = obj.items;
        this._nowNum = 1;
        this._round = obj.round;
        this._dom = obj.dom;
        this._stepTo = 0;
        this._startHook = obj.startFun;
        this._endHook = obj.endFun;
        // this.dataSource = null;
        this._dataSourceTime = obj.timeout;
        //
        // Promise.then(toStep => {
        //     setLucy...
        // });
    }

    _createClass(Lottery, [{
        key: '_removeHighLight',
        value: function _removeHighLight(className) {
            // if (className === 1) {
            //     let highLightItem = document.getElementsByName('8')[0];
            //     highLightItem.removeAttribute('class');
            // } else {
            //     let highLightItem = document.getElementsByName((className - 1).toString())[0];
            //     highLightItem.removeAttribute('class');
            // }
            var newName = className - 1;
            var idx = className <= this._initialStep ? this._maxStep : newName;
            var highLightItem = this._dom.querySelector('[name="' + idx.toString() + '"]');
            highLightItem.removeAttribute('class');
        }
    }, {
        key: '_step',
        value: function _step() {
            if (this._nowNum >= this._maxStep) {
                this._nowNum = this._initialStep;
                this._removeHighLight(this._nowNum);
                var nowItem = this._dom.querySelector('[name="' + this._nowNum.toString() + '"]');
                nowItem.setAttribute('class', 'mask');
            } else {
                this._nowNum++;
                this._removeHighLight(this._nowNum);
                var _nowItem = this._dom.querySelector('[name="' + this._nowNum.toString() + '"]');
                _nowItem.setAttribute('class', 'mask');
            }
        }
    }, {
        key: '_runStep',
        value: function _runStep() {
            var num = 1;
            var round = this._round;
            var self = this;
            this._requestTimeout = setTimeout(function () {
                self._endHook('timeout');
                clearInterval(self._timer1);
                clearInterval(self._timer2);
                self._stepTo = 0;
                self._timer1 = null;
                self._timer2 = null;
                self._stopNum = self._nowNum;
                alert('服务器请求超时');
                return '服务器请求超时';
            }, this._dataSourceTime);
            // function interval(callback, interval) {
            //     setTimeout(callback, interval);
            // }
            //
            // function tick2(self) {
            //     if(num2 >= self._stepTo + 8 ){
            //         alert(self._items[self._nowNum]['text']);
            //         self._stepTo = 0;
            //         return 0;
            //     } else {
            //         self._step();
            //         num2++;
            //         interval(tick2(self), 300);
            //     }
            // }
            //
            // function tick(self) {
            //     self._step();
            //     num++;
            //     if(num > self._round*8){
            //         interval(tick2(self), 300);
            //     } else {
            //         interval(tick(self), 100);
            //     }
            // }
            // interval(tick(self), 100);

            self._timer1 = setInterval(function () {
                self._step();
                num++;
                if (num === round * self._maxStep && self._stepTo === 0) {
                    round++;
                } else if (num === round * self._maxStep) {
                    clearTimeout(self._requestTimeout);
                    clearInterval(self._timer1);
                    num = 1;
                    var deep = self;
                    deep._timer2 = setInterval(function () {
                        if (num > deep._stepTo + deep._maxStep) {
                            deep._endHook('complete');
                            clearInterval(deep._timer2);
                            alert(deep._items[deep._nowNum]['text']);
                            deep.getResult();
                            deep._stepTo = 0;
                            deep._timer1 = null;
                            deep._timer2 = null;
                            deep._stopNum = deep._nowNum;
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
            if (!this._timer1 && !this._timer2) {
                this._startHook();
                this._runStep();
            }
        }
    }, {
        key: '_createLottery',
        value: function _createLottery() {

            var div = document.createElement('div');
            div.setAttribute("id", 'lottery');
            // for (let i =0;i < 3;i++){
            //     let row = document.createElement('div');
            //     row.setAttribute('class','row');
            //     for(let j = 0;j < 3;j++){
            //         let box = document.createElement('div');
            //         box.setAttribute('class','row');
            //         if(this._items[0]['isbtn']){
            //             let url =
            //         }
            //
            //     }
            //
            // }

            div.innerHTML = '<div class="row"><div class="box"><img src="' + this._items[1]['url'] + '"><div class="mask" name="1"></div></div>' + '<div class="box"><img src="' + this._items[2]['url'] + '"><div name="2"></div></div>' + '<div class="box"><img src="' + this._items[3]['url'] + '"><div name="3"></div></div></div>' + '<div class="row"><div class="box"><img src="' + this._items[4]['url'] + '"><div name="8"></div></div>' + '<div name="start-btn" class="box"><img src="' + this._items[0]['url'] + '"></div>' + '<div class="box"><img src="' + this._items[5]['url'] + '"><div name="4"></div></div></div>' + '<div class="row"><div class="box"><img src="' + this._items[6]['url'] + '"><div name="7"></div></div>' + '<div class="box"><img src="' + this._items[7]['url'] + '"><div name="6"></div></div>' + '<div class="box"><img src="' + this._items[8]['url'] + '"><div name="5"></div></div></div>';
            this._dom.appendChild(div);
        }
    }, {
        key: 'setLuckyNum',
        value: function setLuckyNum(ste) {
            if (ste >= this._nowNum) {
                this._stepTo = ste + 1 - this._stopNum;
            } else {
                this._stepTo = ste + 9 - this._stopNum;
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
        key: 'getResult',
        value: function getResult() {
            if (!this._timer1 && !this._timer2) {
                return {
                    num: this._stopNum,
                    text: this._items[this._nowNum]['text']
                };
            }
            return '错误请求';
        }
    }, {
        key: 'stop',
        value: function stop() {
            this._endHook('break');
            clearTimeout(this._requestTimeout);
            clearInterval(this._timer1);
            clearInterval(this._timer2);
            this._stepTo = 0;
            this._timer1 = null;
            this._timer2 = null;
            this._stopNum = this._nowNum;
            alert(this._items[this._nowNum]['text']);
        }
    }]);

    return Lottery;
}();