/**
 * Created by admin on 2017/7/28.
 */
let app = document.getElementById('app');
let lottery = new Lottery([{'url': 'images/btn.png', 'text': '开始按钮', isStartBtn: true},
    {'url': 'images/01.png', 'text': '恭喜你抽中1元现金红包'},
    {'url': 'images/02.png', 'text': '恭喜你抽中2元现金红包'},
    {'url': 'images/03.png', 'text': '恭喜你抽中3元现金红包'},
    {'url': 'images/04.png', 'text': '恭喜你抽中4元现金红包'},
    {'url': 'images/05.png', 'text': '恭喜你抽中5元现金红包'},
    {'url': 'images/06.png', 'text': '恭喜你抽中6元现金红包'},
    {'url': 'images/07.png', 'text': '恭喜你抽中7元现金红包'},
    {'url': 'images/08.png', 'text': '恭喜你抽中8元现金红包'}], 3, app);
lottery.start();
