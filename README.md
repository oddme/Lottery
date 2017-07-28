# Lottery
a simple Lottery package 

使用方法
首先要使用这个简单的抽奖器只需要两个文件，‘css/style.css’和‘js/lottery.js’，将这两个文件引入到你的文件中就可以开始使用了。在你的js代码中插入以下代码

    let lottery = new Lottery(arr,round,dom);
    lottery.start();
    
参数arr：按顺序传入的抽奖项目图片url和奖品描述对象组成的数组，其中第1个应为开始按钮图片，例如
    
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


参数round，确定基础转动圈数，该参数不影响最终结果，只是用以确定转动效果的圈数，例如，round为2，则快速转动两圈后开始减速并定位到结果。
参数dom，是生成lottery的目标位置父节点的dom对象
例如：

    <div id="foo">
    </div>
    <script>
    let foo = document.getElementById('foo');
    let lottery = new Lottery(arr,round,foo);
    </script>
     
这段代码会在foo下创建一个Lottery，然后可以通过调用setLuckyNum()方法来设定中奖条目，你可以自己编写一个概率函数来确定下次的中奖号码，然后使用这个函数将中奖号码作为参数调用（我才不会说是我懒得写概率处理函数了才没提供用来确定概率的接口的，所以还是自己动手生成中奖号码交给我吧），也提供停止方法stop()在实例化出lottery对象后调用即可.

Loteery对象说明：_开头的方法和字段为内部资源，不允许调用。
Lottery对象有以下字段

    _items = [];
    _nowNum = 1;
    _round = 3;
    _stepto = 0;
    _dom = null;
    _timer1 = null;
    _timer2 = null;

其中_items字段为数组类型，用以存放在实例化时传进的数组参数，_nowNum记录当前奖项位置，位置为1~8顺时针顺序排列，_round存放基础转动圈数，_stepto是下轮中奖位置默认为0，为0时在抽奖开始时会随机分配一个数，可调用方法指定其值，_dom为转盘插入位置的父节点，_timer1和_timer2是存放两个定时器的字段，用以防止用户多次点击而创建多个定时器。
Lottery对象中的方法

    _removeHighLight()
    _step()
    _runStep()
    _btnRun()
    _createLottery()
    setLuckyNum(step)
    start()
    stop()

stop()方法，用以中途强制停止。
start()方法，用以生成抽奖器。
setLuckyNum(step)方法，参数为目标编号1~8，指定下次抽奖的获奖编号。
\_createLottery()方法，为内部方法，用以动态创建一个抽奖器的html结构。
\_btnRun()方法，内部方法，用于给抽奖按钮绑定点击事件。
\_runStep()方法，内部方法,点击事件的回调函数，设定定时器，实现抽奖效果。
\_step()方法，内部方法，为每一步抽奖图片动态添加mask，实现抽奖效果。
\_removeHighLight()方法，内部方法，在每一步抽奖图片闪烁后去除前一张图的高亮mask。
