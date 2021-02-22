let size = 70;

const ICONS = [
  {
    name: "文件夹",
    icon: "./resource/folder.png",
    content: (
      <ol>
        <li
          style={{ margin: "10px auto", fontSize: "2rem", fontWeight: "bold" }}
        >
          图片文件
        </li>
        {[
          "https://jeremyjone.github.io/toolbox/test/images/pic1(1440x949).jpg",
          "https://jeremyjone.github.io/toolbox/test/images/pic2(640x640).jpg",
          "https://jeremyjone.github.io/toolbox/test/images/pic3(240x240).jpeg",
          "https://jeremyjone.github.io/toolbox/test/images/pic4(614x596).jpg",
          "https://jeremyjone.github.io/toolbox/test/images/pic5.gif",
          "https://desktop.jeremyjone.com/my-test/banner/01.jpg",
          "https://desktop.jeremyjone.com/my-test/banner/02.jpg",
          "https://desktop.jeremyjone.com/my-test/banner/03.jpg",
          "https://desktop.jeremyjone.com/my-test/icon/00.png",
          "https://desktop.jeremyjone.com/my-test/icon/29.png"
        ].map(x => (
          <li
            style={{
              margin: "10px auto"
            }}
            className="tooltips"
          >
            <a target="_blank" href={x}>
              {x}
            </a>
            <span className="top">
              <img
                style={{ maxWidth: "200px", position: "absolute", bottom: 0 }}
                src={x}
              />
            </span>
          </li>
        ))}
      </ol>
    )
  },
  {
    name: "项目样例",
    icon: "./resource/demo.png",
    content: (
      <ol>
        {[
          { name: "画板（canvas）", link: "./example/paint.html" },
          { name: "读取 Excel（含图片）", link: "./example/jz-excel.html" }
        ].map(x => (
          <li style={{ margin: "10px auto" }}>
            <a target="_blank" href={x.link}>
              {x.name}
            </a>
          </li>
        ))}
      </ol>
    )
  },
  {
    name: "CSS 样例",
    icon: "./resource/css_folder.png",
    content: (
      <ol>
        {[
          {
            name: "随鼠标移动",
            link: "./example/move-with-mouse/index.html"
          },
          {
            name: "跳动的心",
            link: "./example/jump-heart.html"
          },
          {
            name: "悬停展开按钮",
            link: "./example/hover-btn.html"
          },
          {
            name: "旋转卡片",
            link: "./example/rotate-card.html"
          },
          {
            name: "3D 立方体",
            link: "./example/3d-cube.html"
          }
        ].map(x => (
          <li style={{ margin: "10px auto" }}>
            <a target="_blank" href={x.link}>
              {x.name}
            </a>
          </li>
        ))}
      </ol>
    )
  },
  {
    name: "小游戏",
    icon: "./resource/games.png",
    content: (
      <ol>
        {[
          { name: "贪吃蛇", link: "./games/snake/index.html" },
          { name: "迷宫", link: "./games/maze/index.html" },
          { name: "蚊子大作战", link: "./games/mosquitoWar/index.html" },
          { name: "俄罗斯方块", link: "./games/tetris/index.html" }
        ].map(x => (
          <li style={{ margin: "10px auto", fontWeight: "bold" }}>
            <a target="_blank" href={x.link}>
              {x.name}
            </a>
          </li>
        ))}
      </ol>
    )
  },
  {
    name: "我的文档",
    icon: "./resource/document.png",
    link: "https://jeremyjone.github.io/docs/"
  },
  {
    name: "我的博客",
    icon: "./resource/blog.png",
    link: "https://www.jeremyjone.com"
  },
  {
    name: "搜索",
    icon: "./resource/google.png",
    link: "https://www.google.com"
  },
  {
    name: "必应",
    icon: "./resource/bing.png",
    link: "https://www.bing.com"
  },
  {
    name: "垃圾百度",
    icon: "./resource/recycle.png",
    link: "https://www.baidu.com"
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "",
      explorer: undefined
    };
  }

  handleChangeSelected = value => {
    this.setState({ selected: value });
  };

  handleChangeExplorer = async dom => {
    await this.setState({ explorer: dom });

    if (dom) {
      ReactDOM.render(dom, document.getElementById("explorer-container"));
    } else {
      ReactDOM.render(undefined, document.getElementById("explorer-container"));
    }
  };

  setDblClick(content) {
    if (content.link) {
      window.open(content.link);
      return;
    }

    if (content.content) {
      this.handleChangeExplorer(
        <Explorer
          title={content.name}
          content={content.content}
          close={() => this.handleChangeExplorer(undefined)}
        />
      );
      return;
    }
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexFlow: "column wrap",
          width: "inherit",
          height: "inherit",
          alignContent: "flex-start"
        }}
        onClick={() => this.handleChangeSelected("")}
      >
        <div
          id="explorer-container"
          className={this.state.explorer ? "explorer-container" : ""}
        />
        {ICONS.map(icon => (
          <Icon
            className={this.state.selected === icon.name ? "icon-selected" : ""}
            name={icon.name}
            icon={icon.icon}
            size={size}
            link={icon.link}
            click={this.handleChangeSelected}
            dblClick={() => this.setDblClick(icon)}
          />
        ))}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("desktop"));
