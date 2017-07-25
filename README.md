# Lottery
a simple Lottery package 

调用方法

    let lottery = new Lottery(arr,round,dom);
    lottery.start();
    
参数arr：按顺序传入的抽奖项目图片url和奖品描述对象组成的数组，其中第五个应为开始按钮图片，例如
    
     [{
     url:"..."
     text:"xxx"
     },
     {
      ...
     },
     ...
     ]

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
