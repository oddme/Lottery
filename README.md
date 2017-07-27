# Lottery
a simple Lottery package 

使用方法
首先要使用这个简单的抽奖器只需要两个文件，‘css/style.css’和‘js/lottery.js’，将这两个文件引入到你的文件中就可以开始使用了，在你的js代码中插入以下代码

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
     
这段代码会在foo下创建一个Lottery
