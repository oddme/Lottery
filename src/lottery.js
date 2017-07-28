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

    constructor(arr, round, dom) {
        this._items = arr;
        this._nowNum = 1;
        this._round = round;
        this._dom = dom;
    }

    _removeHighLight(className) {
        if (className === 1) {
            let highLightItem = document.getElementsByName('8')[0];
            highLightItem.removeAttribute('class');
        } else {
            let highLightItem = document.getElementsByName((className - 1).toString())[0];
            highLightItem.removeAttribute('class');
        }
    }

    _step(){
        if (this._nowNum > 7) {
            this._nowNum = 1;
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
        let self = this;
        self._timer1 = setInterval(function () {
            self._step();
            num++;
            if(num > self._round*8){
                clearInterval(self._timer1);
                num = 1;
                let deep = self;
                deep._timer2 = setInterval(function () {
                    if(num >= deep._stepto + 8 ){
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

let app = document.getElementById('app');
let lottery = new Lottery([{'url': 'images/btn.png', 'text': '开始按钮'},
    {'url': 'images/01.png', 'text': '恭喜你抽中1元现金红包'},
    {'url': 'images/02.png', 'text': '恭喜你抽中2元现金红包'},
    {'url': 'images/03.png', 'text': '恭喜你抽中3元现金红包'},
    {'url': 'images/04.png', 'text': '恭喜你抽中4元现金红包'},
    {'url': 'images/05.png', 'text': '恭喜你抽中5元现金红包'},
    {'url': 'images/06.png', 'text': '恭喜你抽中6元现金红包'},
    {'url': 'images/07.png', 'text': '恭喜你抽中7元现金红包'},
    {'url': 'images/08.png', 'text': '恭喜你抽中8元现金红包'}], 3, app);

lottery.start();

