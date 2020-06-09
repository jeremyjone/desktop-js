class Mosquito {
  constructor(dom, speed) {
    this.dom = dom;

    // 定义一些蚊子的变量
    var color = "grey";

    //创建一只蚊子
    var mosquito = document.createElement("div");
    mosquito.className = "mosquito";
    var mosquitoMouse = document.createElement("div");
    mosquitoMouse.className = "mosquito-mouse";
    mosquitoMouse.style.backgroundColor = color;
    var mosquitoHead = document.createElement("div");
    mosquitoHead.className = "mosquito-head";
    mosquitoHead.style.backgroundColor = color;
    var mosquitoBody1 = document.createElement("div");
    mosquitoBody1.className = "mosquito-body";
    mosquitoBody1.style.backgroundColor = color;
    var mosquitoWing1 = document.createElement("div");
    mosquitoWing1.className = "mosquito-wing";
    mosquitoWing1.style.backgroundColor = color;
    var mosquitoBody2 = document.createElement("div");
    mosquitoBody2.className = "mosquito-body";
    mosquitoBody2.style.backgroundColor = color;
    var mosquitoWing2 = document.createElement("div");
    mosquitoWing2.className = "mosquito-wing";
    mosquitoWing2.style.backgroundColor = color;
    var mosquitoNail = document.createElement("div");
    mosquitoNail.className = "mosquito-nail";
    mosquitoNail.style.backgroundColor = color;

    mosquito.appendChild(mosquitoMouse);
    mosquito.appendChild(mosquitoHead);
    mosquito.appendChild(mosquitoBody1);
    mosquito.appendChild(mosquitoWing1);
    mosquito.appendChild(mosquitoBody2);
    mosquito.appendChild(mosquitoWing2);
    mosquito.appendChild(mosquitoNail);
    //将mosquito作为dom的子集写入
    this.dom.appendChild(mosquito);

    //随机一个沿着x轴移动的初始值
    var speedX = parseInt(Math.random() * 10 + 1);
    //随机一个沿着y轴移动的初始值
    var speedY = parseInt(Math.random() * 10 + 1);

    //获得当前mosquito的left值
    var nowLeft = mosquito.offsetLeft;
    //获得当前mosquito的top值
    var nowTop = mosquito.offsetTop;
    //获得x轴最大的移动距离
    var maxWidth = this.dom.offsetWidth - mosquito.offsetWidth;
    //获得y轴最大的移动距离
    var maxHeight = this.dom.offsetHeight - mosquito.offsetHeight;

    //计时器进入循环
    setInterval(function () {
      // 做一个随机方向的运动
      if (Math.random() * 10 > 5) {
        if (Math.random() * 10 < 5) {
          speedX += 2;
        } else {
          speedX -= 2;
        }
      }

      if (Math.random() * 10 < 5) {
        if (Math.random() * 10 > 5) {
          speedY += 2;
        } else {
          speedY -= 2;
        }
      }

      //改变left值
      nowLeft += speedX;
      //当到达最右边时,获得的速度需要变为负值
      if (nowLeft >= maxWidth) {
        speedX = parseInt(Math.random() * 10 + 1);
        speedX = -speedX;
      }
      //当再次到达最左边的时候,获得的速度是正值
      if (nowLeft <= 0) {
        speedX = parseInt(Math.random() * 10 + 1);
      }
      //设置left值
      mosquito.style.left = nowLeft + "px";

      //改变top值
      nowTop += speedY;
      //当到达最底部的时候,速度变成负值
      if (nowTop >= maxHeight) {
        speedY = parseInt(Math.random() * 10 + 1);
        speedY = -speedY;
      }
      //当再次到达最顶部速度为正值
      if (nowTop <= 0) {
        speedY = parseInt(Math.random() * 10 + 1);
      }
      //设置top值
      mosquito.style.top = nowTop + "px";

      // 旋转头部
      const rotate = (speedX / speedY) * 90;
      mosquito.style.setProperty("transform", `rotate(${rotate}deg)`);
      mosquito.style.setProperty("-moz-transform", `rotate(${rotate}deg)`);
      mosquito.style.setProperty("-ms-transform", `rotate(${rotate}deg)`);
      mosquito.style.setProperty("-o-transform", `rotate(${rotate}deg)`);
      mosquito.style.setProperty("-webkit-transform", `rotate(${rotate}deg)`);
    }, speed * 10);

    this.element = mosquito;
    return this;
  }

  dead() {
    this.dom.removeChild(this.element);
  }
}
