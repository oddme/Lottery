/**
 * Created by admin on 2017/7/25.
 */

class Lottery {
    _items = [];
    _nowNum = 1;
    _round = 3;
    _stepto = 0;
    _dom = null;
    _timer1 = null;
    _timer2 = null;
    _maxStep = 8;
    _initialStep = 1;

    constructor(arr, round, dom) {
        this._items = arr;
        this._nowNum = 1;
        this._round = round;
        this._dom = dom;
        // this.dataSource = null;
        // this.dataSourceTime = 5 * 1000;
        //
        // Promise.then(toStep => {
        //     setLucy...
        // });
    }

    _removeHighLight(className) {
        // if (className === 1) {
        //     let highLightItem = document.getElementsByName('8')[0];
        //     highLightItem.removeAttribute('class');
        // } else {
        //     let highLightItem = document.getElementsByName((className - 1).toString())[0];
        //     highLightItem.removeAttribute('class');
        // }
        let idx = className <= this._initialStep ? this._maxStep : className--;
        let highLightItem = document.getElementsByName((idx).toString())[0];
        highLightItem.removeAttribute('class');
    }

    _step(){
        if (this._nowNum >= this._maxStep) {
            this._nowNum = this._initialStep;
            this._removeHighLight(this._nowNum);
            let nowItem = document.getElementsByName(this._nowNum.toString())[0];
            nowItem.setAttribute('class', 'mask');
        } else {
            this._nowNum++;
            this._removeHighLight(this._nowNum);
            let nowItem = document.getElementsByName(this._nowNum.toString())[0];
            nowItem.setAttribute('class', 'mask');
        }
    }

    _runStep() {
        let num = 1;
        let num2 = 1;
        let self = this;

        function interval(callback, interval) {
            setTimeout(callback, interval);
        }

        function tick2(self) {
            if(num2 >= self._stepto + 8 ){
                alert(self._items[self._nowNum]['text']);
                self._stepto = 0;
                return 0;
            } else {
                self._step();
                num2++;
                interval(tick2, 300);
            }
        }

        function tick(self) {
            self._step();
            num++;
            if(num > self._round*8){
                interval(tick2(self), 300);
            } else {
                interval(tick, 100);
            }
        }
        interval(tick(self), 100);

        // self._timer1 = setInterval(function () {
        //     self._step();
        //     num++;
        //     if(num > self._round*8){
        //         clearInterval(self._timer1);
        //         num = 1;
        //         let deep = self;
        //         deep._timer2 = setInterval(function () {
        //             if(num >= deep._stepto + 8 ){
        //                 clearInterval(deep._timer2);
        //                 alert(deep._items[deep._nowNum]['text']);
        //                 deep._stepto = 0;
        //                 deep._timer1 = null;
        //                 deep._timer2 = null;
        //             } else {
        //                 deep._step();
        //                 num++;
        //             }
        //         }, 300);
        //     }
        // }, 100);
    }


    _btnRun(){
        if(this._stepto === 0){
            this._stepto = Math.floor(Math.random() * 8 + 1);
        }
        if(!this._timer1 && !this._timer2) {
            this._runStep();

        }

    }

    _createLottery() {

        let div = document.createElement('div');
        div.setAttribute("id", 'lottery');
        div.innerHTML = '<div class="row"><div class="box"><img src="' + this._items[1]['url'] + '"><div class="mask" name="1"></div></div>'
            + '<div class="box"><img src="' + this._items[2]['url'] + '"><div name="2"></div></div>'
            + '<div class="box"><img src="' + this._items[3]['url'] + '"><div name="3"></div></div><div class="clear"></div></div>'
            + '<div class="row"><div class="box"><img src="' + this._items[4]['url'] + '"><div name="8"></div></div>'
            + '<div name="start-btn" class="box"><img src="' + this._items[0]['url'] + '"></div>'
            + '<div class="box"><img src="' + this._items[5]['url'] + '"><div name="4"></div></div><div class="clear"></div></div>'
            + '<div class="row"><div class="box"><img src="' + this._items[6]['url'] + '"><div name="7"></div></div>'
            + '<div class="box"><img src="' + this._items[7]['url'] + '"><div name="6"></div></div>'
            + '<div class="box"><img src="' + this._items[8]['url'] + '"><div name="5"></div></div><div class="clear"></div></div>';
        this._dom.appendChild(div);

    }

    setLuckyNum(ste){
        if(ste >= this._nowNum){
            this._stepto = (ste + 1) - this._nowNum;
        } else {
            this._stepto = (ste + 9)- this._nowNum;
        }
    }

    start() {
        this._createLottery();
        let start = document.getElementsByName('start-btn')[0];
        start.addEventListener('click', () => {
            this._btnRun();
        });
    }

    stop() {
        clearInterval(this._timer1);
        clearInterval(this._timer2);
        this._stepto = 0;
        this._timer1 = null;
        this._timer2 = null;
        alert(this._items[this._nowNum]['text']);
    }
}

