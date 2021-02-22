class Icon extends React.Component {
  doubleClick = e => {
    const { dblClick } = this.props;
    e.stopPropagation();
    dblClick && dblClick();
  };

  click = e => {
    const { click } = this.props;
    e.stopPropagation();
    click && click(this.props.name);
  };

  render() {
    return (
      <div
        className={"icon tooltips " + this.props.className}
        style={{
          width: `${this.props.size}px`,
          height: `${this.props.size}px`
        }}
        onDoubleClick={this.doubleClick}
        onClick={this.click}
      >
        <div className="icon-pic-container">
          <img className="icon-pic" src={this.props.icon} />
          {this.props.link && (
            <img className="icon-link" src="./resource/link.png" />
          )}
        </div>
        <div style={{ textAlign: "center" }}>{this.props.name}</div>

        <span>{this.props.name}</span>
      </div>
    );
  }
}
