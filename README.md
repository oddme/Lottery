# Lottery
a simple Lottery package 演示地址http://119.29.173.52/

### 使用方法
首先要使用这个简单的抽奖器只需要两个文件，‘css/style.css’和‘js/lottery.js’，将这两个文件引入到你的项目中就可以开始使用了。在你的js代码中插入以下代码

    let lottery = new Lottery(obj);
    lottery.start();
    
传入参数obj是配置对象，包含基本配置信息。

    obj{
        items: [],
        round: Num,
        dom: DomObject,
        timeout: Num,
        startFun: Function,
        endFun: Function
    }

obj.items按顺序传入的抽奖项目图片url和奖品描述对象组成的数组，其中第1个应为开始按钮图片，例如
    
    [{
        'url': 'images/btn.png',
        'text': '开始按钮'},
    {
        'url': 'images/01.png',
        'text': '恭喜你抽中1元现金红包'},
    {
        'url': 'images/02.png',
        'text': '恭喜你抽中2元现金红包'},
    {
        'url': 'images/03.png',
        'text': '恭喜你抽中3元现金红包'},
    {
        'url': 'images/04.png',
        'text': '恭喜你抽中4元现金红包'},
    {
        'url': 'images/05.png',
        'text': '恭喜你抽中5元现金红包'},
    {
        'url': 'images/06.png',
        'text': '恭喜你抽中6元现金红包'},
    {
        'url': 'images/07.png',
        'text': '恭喜你抽中7元现金红包'},
    {
        'url': 'images/08.png',
        'text': '恭喜你抽中8元现金红包'
    }]


obj.round，确定基础转动圈数，该参数不影响最终结果，只是用以确定转动效果的圈数，例如，round为2，则快速转动两圈后开始减速并定位到结果。

obj.dom，是生成lottery的目标位置父节点的dom对象

obj.timeout，是给定的超时设定，单位为ms，在超过timeout时间内还没有传入抽奖结果的话，此次抽奖会失败并提醒超时

obj.startFun和obj.endFun，是系统在抽奖开始和结束时会调用的两个回调函数，start没有参数，end有结束状态参数event，event有三种可能取值，‘timeout’，‘compelete’和‘break’，分别代表超时结束，完成抽奖结束和中断结束。

例如：

    <div id="foo">
    </div>
    <script>
    let foo = document.getElementById('foo');
    let start = function(){
        console.log('now lottery start');
    }
    let end = function(event){
        console.log('now lottery'+event);
    }
    obj.items = [...];
    ...
    obj.startFun = start;
    obj.endFun = end;
    let lottery = new Lottery(obj);
    </script>
     
这段代码会在foo下创建一个Lottery，然后可以通过调用setLuckyNum()方法来设定中奖条目，你可以自己编写一个概率函数来确定下次的中奖号码或者从服务器获取数据，然后使用这个函数将中奖号码作为参数调用，这里也提供停止方法stop(),在实例化出lottery对象后调用即可停止.

### Loteery对象说明：

Lottery对象中提供的外部方法

    setLuckyNum(step)
    getResult()
    start()
    stop()

stop()方法，用以中途强制停止，调用后轮转立即停止，并且end返回的参数为‘break’。

start()方法，用以生成抽奖器，初始化时调用一次即可。

setLuckyNum(step)方法，参数为目标编号1~8，指定下次抽奖的获奖编号，只有调用过该方法给定结果后才能成功抽奖，结束后end返回参数为‘complete’。

getResult()方法，获取抽奖轮盘当前结果，在停止时调用才有效，返回结果为一个对象{num:nowNum,text:itemText}，num为当前item编号1~8，text为item对应的文本描述。


