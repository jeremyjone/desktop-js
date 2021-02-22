const titleBarHeight = 30;

const SIZES = [
  {
    name: "普通",
    key: "normal"
  },
  {
    name: "最大化",
    key: "max"
  },
  {
    name: "全屏",
    key: "full"
  }
];

class Explorer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      size: "normal",
      top: 150,
      left: 150
    };
  }

  changeSize = size => {
    if (SIZES.map(x => x.key).includes(size)) {
      this.setState({ size: size });
    }
  };

  changeLeft = left => {
    this.setState({ left: left });
  };

  changeTop = top => {
    this.setState({ top: top });
  };

  onClose = e => {
    e.stopPropagation();
    const { close } = this.props;
    close && close();
  };

  onMouseDown = e => {
    if (this.state.size !== "normal") return;

    const srcX = e.pageX - this.state.left;
    const srcY = e.pageY - this.state.top;
    const el = document.querySelector("#explorer-screen");
    el.style.cursor = "grab";
    removeClass(el, "transition");

    let changeGrab = false;

    document.onmousemove = e => {
      if (!changeGrab) {
        el.style.cursor = "grabbing";
        changeGrab = true;
      }

      let targetX = e.pageX;
      let targetY = e.pageY;

      this.changeLeft(targetX - srcX);
      this.changeTop(targetY - srcY);
    };

    document.onmouseup = () => {
      document.onmousemove = document.onmouseup = null;
      addClass(el, "transition");
      el.style.cursor = "";
    };
  };

  render() {
    return (
      <div
        id="explorer-screen"
        className={`explorer explorer-${this.state.size} transition`}
        style={{
          "--explorer-top": `${this.state.top}px`,
          "--explorer-left": `${this.state.left}px`
        }}
      >
        {/* 标题栏 */}
        <div
          className="explorer-title-bar"
          style={{
            width: "100%",
            "--explorer-title-bar-height": `${titleBarHeight}px`
          }}
          onMouseDown={this.onMouseDown}
        >
          <div className="explorer-title-bar-name">{this.props.title}</div>

          {SIZES.filter(x => x.key !== this.state.size).map(x => (
            <div
              className={`explorer-title-bar-btn explorer-${x.key}-btn tooltips`}
              onClick={e => {
                e.stopPropagation();
                this.changeSize(x.key);
              }}
            >
              <span className="bottom">{x.name}</span>
            </div>
          ))}

          <div
            className="explorer-title-bar-btn explorer-close-btn tooltips"
            onClick={this.onClose}
          >
            <span className="bottom">关闭</span>
          </div>
        </div>

        {/* 内容 */}
        <div className="explorer-content-container">{this.props.content}</div>
      </div>
    );
  }
}
