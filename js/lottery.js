 /**
 * Created by admin on 2017/7/25.
 */
'use strict'

class Lottery{
    _items = [];
    _nowNum = 1;
    _round = 3;
    _dom = null;

    constructor(arr,round,dom){
        this._items = arr;
        this._nowNum = 1;
        this._round = round
        this._dom = dom;
    }

    createLottery(){
        let div = document.createElement(div)
        div.innerHTML ='<div id="1"><img src="'+this._items[0]['url']+'"></div>'
                        +'<div id="2"><img src="'+this._items[1]['url']+'"></div>'
                        +'<div id="3"><img src="'+this._items[2]['url']+'"></div>'
                        +'<div id="8"><img src="'+this._items[3]['url']+'"></div>'
                        +'<div id="start-btn"><img src="'+this._items[4]['url']+'"></div>'
                        +'<div id="4"><img src="'+this._items[5]['url']+'"></div>'
                        +'<div id="7"><img src="'+this._items[6]['url']+'"></div>'
                        +'<div id="6"><img src="'+this._items[7]['url']+'"></div>'
                        +'<div id="5"><img src="'+this._items[8]['url']+'"></div>';

    }

    point(){


    }

    runRound() {
        for(let i = 0;i < this._round;i++){
            this.runStep(8,250);
        }
    }

    runStep(step,time) {
        for (let i = 0; i < step; i++) {
            if (this._nowNum > 7) {
                setTimeout("this._nowNum = 1;", time);

            } else {
                setTimeout("this._nowNum++;", time);
            }
        }
    }



    start() {
        let step = Math.random() * 8 + 1;
        this.runRound();
        this.runStep(step-1,500);
        this.runStep(1,750);
    }

    stop(){
        alert(this._items[this._nowNum]);
    }
}

    


export default new Lottery();