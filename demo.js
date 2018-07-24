/**
 * Created by Administrator on 2018/7/18.
 */
//点击开始游戏，动态生成100个小格

var startBtn=document.getElementById('btn');
var box=document.getElementById('box');
var flagBox=document.getElementById('flagBox');
var alertBox=document.getElementById('alertBox');
var alertImg=document.getElementById('alertImg');
var closeBtn=document.getElementById('closeBtn');
var score=document.getElementById('score');

var minesNum;/*雷数*/
var mineOver;/*剩余的雷数*/
var block;
var mineMap=[];
var startGameBool=true;

bindEvent();
function bindEvent(){
    startBtn.onclick=function(){
        if(startGameBool==true) {
            box.style.display = 'block';
            flagBox.style.display = 'block';
            init();
            startGameBool=false;
        }
    }
    /*取消鼠标默认时间*/
    box.oncontextmenu=function(){
        return false;
    }
    /*用源事件来判断鼠标点击事件*/
    box.onmousedown=function(e){
        var event= e.target;
        if(e.which==1){
            leftClick(event);
        }else  if(e.which==3){
            rightClick(event);
        }
    }
    closeBtn.onclick=function(){
      alertBox.style.display='none';
        flagBox.style.display='none';
        box.style.display='none';
        box.innerHTML='';
        startGameBool=true;
    }
}
function  init(){/*生成100个小格和随机的10个雷*/
    mineOver=10;
    minesNum=10;
    score.innerHTML=mineOver;
    for(var i=0;i<10;i++){
        for(var j=0;j<10;j++){
            var con=document.createElement('div');
            con.classList.add('block');/*设置小格样式*/
            con.setAttribute('id',i+'-'+j);/*记录行和列*/
            box.appendChild(con);
            mineMap.push({mine:0});
        }
    }
    block=document.getElementsByClassName('block');
   while(minesNum){
       var mineIndex= Math.floor(Math.random()*100);
      if(mineMap[mineIndex].mine===0){
          /*如果当前格子雷的状态等于0，加一个雷*/
          mineMap[mineIndex].mine===1;
          block[mineIndex].classList.add('isLei');
          minesNum--;
      }

   }

}

function  leftClick(dom){
    /*插完旗，不能再次被点击*/
    if(dom.classList.contains('flag')){
        return;
    }
    var isLei=document.getElementsByClassName('isLei');
    if(dom && dom.classList.contains('isLei')){
        console.log('game Over');
        for(var i=0;i<isLei.length;i++){
            isLei[i].classList.add('show');
        }
        setTimeout(function(){
            alertBox.style.display='block';
            alertImg.style.backgroundImage='url("img/over.jpg)';
        },800)
    }else {
        var n = 0;
        /*雷计数*/
        //点出来是数字的情况
        var posArr = dom && dom.getAttribute('id').split('-');
        var posX = posArr && +posArr[0];
        var posY = posArr && +posArr[1];
        dom && dom.classList.add('num');

             for(var i=posX-1;i<=posX+1;i++){
                 for(var j=posY-1;j<posY+1;j++){
                    var aroundBox= document.getElementById(i+'-'+j);
                    if(aroundBox &&aroundBox.classList.contains('isLei')){
                        n++;
                    }
                 }
             }
        dom &&(dom.innerHTML=n);
        if(n==0){
            for(var i=posX-1;i<=posX+1;i++){
                for(var j=posY-1;j<posY+1;j++) {
                    var nearBox=document.getElementById(i+'-'+j);
                    if(nearBox &&nearBox.length !=0) {
                        if (!nearBox.classList.contains('check')) {
                            /*标记已经被点过的*/
                            nearBox.classList.add('check');
                            leftClick(nearBox);
                        }
                    }
                }
                }
        }
    }
}

function rightClick(dom){
    if(dom.classList.contains('num')){
        return;
    }
    dom.classList.toggle('flag');
    if(dom.classList.contains('isLei')&& dom.classList.contains('flag')){
        mineOver--;
    }
    if(dom.classList.contains('isLei')&&!dom.classList.contains('flag')){
        mineOver++;
    }
    score.innerHTML=mineOver;
    if (mineOver==0){/*雷数为0。成功*/
        alertBox.style.display='block';
        alertImg.style.backgroundImage='url("img/success.png")';
    }
}