/**
 * @description: 坐标类
 * @param x {Number} 横坐标
 * @param y {Number} 纵坐标
 */
function Point(x, y) {
  this.x = x;
  this.y = y;
}

/**
 * @description: 节点类
 */
function Node() {
  this.passable = true;
  this.isVisited = false;
  this.x = 0;
  this.y = 0;
  this.prePoint = null;
}

/**
 * @description: 队列类
 */
function Queue() {
  this._q = [];
}

Queue.prototype.first = function () {
  if (this._q.length > 0) {
    return this._q[0];
  } else {
    return null;
  }
};

Queue.prototype.size = function () {
  return this._q.length;
};

Queue.prototype.push = function (node) {
  this._q.push(node);
};

Queue.prototype.pop = function () {
  return this._q.shift();
};

/**
 * @description: 迷宫类
 * @param row {Number} 行
 * @param col {Number} 列
 * @param start {Point} 起始坐标
 * @param end {Point} 结束坐标
 * @param speed {Number} 动画速度
 */
function Maze(row, col, speed = 10) {
  this.row = row % 2 === 0 ? row + 1 : row;
  this.col = col % 2 === 0 ? col + 1 : col;
  this.speed = speed;

  this.start = new Point(0, 0);
  this.end = new Point(0, 0);
}

/**
 * @description: 返回随机数
 */
Maze.prototype.random = function (k) {
  return Math.floor(Math.random() * k);
};

/**
 * @description: 生成迷宫
 */
Maze.prototype.generate = function (row, col, speed) {
  clearInterval(this.animate);

  row && (this.row = row % 2 === 0 ? row + 1 : row);
  col && (this.col = col % 2 === 0 ? col + 1 : col);
  speed && (this.speed = speed);

  // 生成起点和终点
  let isTop = this.random(2) === 0;
  if (isTop) {
    let _y = this.random(this.row - 2);
    this.start.x = 0;
    this.start.y = _y % 2 === 0 ? _y + 1 : _y;
  } else {
    let _x = this.random(this.col - 2);
    this.start.x = _x % 2 === 0 ? _x + 1 : _x;
    this.start.y = 0;
  }

  let isBottom = this.random(2) === 0;
  if (isBottom) {
    let _y = this.random(this.col - 2);
    this.end.x = this.row - 1;
    this.end.y = _y % 2 === 0 ? _y + 1 : _y;
  } else {
    let _x = this.random(this.row - 2);
    this.end.x = _x % 2 === 0 ? _x + 1 : _x;
    this.end.y = this.col - 1;
  }

  // 生成 2R+1 行 2R+1 列 的数组
  this.mazeNodeArray = [];
  for (let i = 0; i < this.row; i++) {
    this.mazeNodeArray[i] = [];
    for (let j = 0; j < this.col; j++) {
      // 砌墙
      let node = new Node();
      if (i % 2 === 0 || j % 2 === 0) {
        node.passable = false;
        node.x = i;
        node.y = j;
      } else {
        node.x = i;
        node.y = j;
      }
      this.mazeNodeArray[i].push(node);
    }
  }

  // 随机选择一点作为当前节点，不能找一个墙作为起始节点
  let currentNode;
  do {
    currentNode = this.mazeNodeArray[this.random(this.row)][
      this.random(this.col)
    ];
  } while (!currentNode.passable);
  currentNode.isVisited = true;

  // 访问过的节点数组
  let visitedArray = [];
  visitedArray.push(currentNode);

  // 寻访访问所有节点
  while (currentNode.isVisited) {
    // 得到当前节点的四周节点
    let topNode = this.mazeNodeArray[currentNode.x - 2]
      ? this.mazeNodeArray[currentNode.x - 2][currentNode.y]
      : { isVisited: true };
    let rightNode = this.mazeNodeArray[currentNode.x][currentNode.y + 2]
      ? this.mazeNodeArray[currentNode.x][currentNode.y + 2]
      : { isVisited: true };
    let bottomNode = this.mazeNodeArray[currentNode.x + 2]
      ? this.mazeNodeArray[currentNode.x + 2][currentNode.y]
      : { isVisited: true };
    let leftNode = this.mazeNodeArray[currentNode.x][currentNode.y - 2]
      ? this.mazeNodeArray[currentNode.x][currentNode.y - 2]
      : { isVisited: true };

    let neighbourArray = [];
    if (topNode && !topNode.isVisited) {
      neighbourArray.push(topNode);
    }
    if (rightNode && !rightNode.isVisited) {
      neighbourArray.push(rightNode);
    }
    if (bottomNode && !bottomNode.isVisited) {
      neighbourArray.push(bottomNode);
    }
    if (leftNode && !leftNode.isVisited) {
      neighbourArray.push(leftNode);
    }

    // 随机选择一个没有访问过的节点，如果有，将中间的墙打通
    if (neighbourArray.length > 0) {
      let neighbourNode = neighbourArray[this.random(neighbourArray.length)];
      this.mazeNodeArray[(neighbourNode.x + currentNode.x) / 2][
        (neighbourNode.y + currentNode.y) / 2
      ].passable = true;
      neighbourNode.isVisited = true;
      visitedArray.push(neighbourNode);
      currentNode = neighbourNode;
    } else {
      // 将当前节点放入已访问数组，如果周围都访问过，则随机从已访问数组中取出一个节点作为当前节点
      let p = this.random(visitedArray.length);
      currentNode = visitedArray[p];
      if (!currentNode) {
        // 已经空
        break;
      }

      currentNode.isVisited = true;
      // 从已访问数组中删除当前节点
      visitedArray.splice(p, 1);
    }
  }

  let startNode = new Node();
  startNode.x = this.start.x;
  startNode.y = this.start.y;
  this.mazeNodeArray[this.start.x][this.start.y] = startNode;

  let endNode = new Node();
  endNode.x = this.end.x;
  endNode.y = this.end.y;
  this.mazeNodeArray[this.end.x][this.end.y] = endNode;
};

Maze.prototype.drawDom = function (dom) {
  for (let i = 0; i < this.mazeNodeArray.length; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < this.mazeNodeArray[i].length; j++) {
      let td = document.createElement("td");

      if (i === this.start.x && j === this.start.y) {
        td.setAttribute("class", "start-node");
        td.innerHTML = "S";
      }

      if (i === this.end.x && j === this.end.y) {
        td.setAttribute("class", "end-node");
        td.innerHTML = "E";
      }

      if (this.mazeNodeArray[i][j] && !this.mazeNodeArray[i][j].passable) {
        td.setAttribute("class", "wall");
      }

      tr.appendChild(td);
    }

    dom.appendChild(tr);
  }
};

Maze.prototype.findPath = function () {
  this.resultPath = [];

  // 重置节点的isVisited属性
  for (let i = 0; i < this.mazeNodeArray.length; i++) {
    for (let j = 0; j < this.mazeNodeArray[i].length; j++) {
      this.mazeNodeArray[i][j].isVisited = false;
    }
  }

  // 初始化一个用于临时存放节点的队列
  let q = new Queue();

  // 设置起始节点
  let startNode = this.mazeNodeArray[this.start.x][this.start.y];
  startNode.isVisited = true;
  q.push(startNode);

  let endNode = null;
  // 只要队列非空，就循环遍历
  while (q.size() > 0) {
    let firstNode = q.pop();
    let neighbourArray = [];

    // 上
    if (
      this.mazeNodeArray[startNode.x - 1] &&
      this.mazeNodeArray[startNode.x - 1][startNode.y].passable
    ) {
      if (!this.mazeNodeArray[startNode.x - 1][startNode.y].isVisited) {
        let node = this.mazeNodeArray[startNode.x - 1][startNode.y];
        node.prePoint = new Point(firstNode.x, firstNode.y);
        neighbourArray.push(node);
      }
    }

    // 右
    if (
      this.mazeNodeArray[startNode.x][startNode.y + 1] &&
      this.mazeNodeArray[startNode.x][startNode.y + 1].passable
    ) {
      if (!this.mazeNodeArray[startNode.x][startNode.y + 1].isVisited) {
        let node = this.mazeNodeArray[startNode.x][startNode.y + 1];
        node.prePoint = new Point(firstNode.x, firstNode.y);
        neighbourArray.push(node);
      }
    }

    // 下
    if (
      this.mazeNodeArray[startNode.x + 1] &&
      this.mazeNodeArray[startNode.x + 1][startNode.y].passable
    ) {
      if (!this.mazeNodeArray[startNode.x + 1][startNode.y].isVisited) {
        let node = this.mazeNodeArray[startNode.x + 1][startNode.y];
        node.prePoint = new Point(firstNode.x, firstNode.y);
        neighbourArray.push(node);
      }
    }

    // 左
    if (
      this.mazeNodeArray[startNode.x][startNode.y - 1] &&
      this.mazeNodeArray[startNode.x][startNode.y - 1].passable
    ) {
      if (!this.mazeNodeArray[startNode.x][startNode.y - 1].isVisited) {
        let node = this.mazeNodeArray[startNode.x][startNode.y - 1];
        node.prePoint = new Point(firstNode.x, firstNode.y);
        neighbourArray.push(node);
      }
    }

    // 遍历邻居节点
    for (const n of neighbourArray) {
      if (!n.isVisited) {
        n.isVisited = true;
        q.push(n);
      }
    }

    startNode = q.first();
    if (startNode && startNode.x === this.end.x && startNode.y === this.end.y) {
      endNode = startNode;
      break;
    }
  }

  // 写入路径
  while (endNode && endNode.prePoint) {
    this.resultPath.unshift(endNode);
    endNode = this.mazeNodeArray[endNode.prePoint.x][endNode.prePoint.y];
  }
};

Maze.prototype.animation = function (doc) {
  let count = 0;
  let _document = doc || document;

  this.animate = setInterval(() => {
    if (count < this.resultPath.length) {
      let trs = _document.getElementsByTagName("tr");
      let tds = trs[this.resultPath[count].x].getElementsByTagName("td");
      let cell = tds[this.resultPath[count].y];
      cell.setAttribute("class", "path");
      count++;
    } else {
      clearInterval(this.animate);
      console.log("Finished!");
    }
  }, this.speed);
};

Maze.prototype.init = function (dom) {
  this.generate();
  this.drawDom(dom);
};
