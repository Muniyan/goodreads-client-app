import React, { Component } from "react";

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.handleNavClick = this.handleNavClick.bind(this);
  }

  // Bypass click event to parent component
  handleNavClick = event => {
    if (typeof this.props.onClick === "function") {
      this.props.onClick(event);
    }
  };

  // Default render function
  render() {
    var page = parseInt(this.props.page);
    var tcount = parseInt(this.props.tcount);
    var tpage = Math.floor(tcount / 20) + (tcount % 20 === 0 ? 0 : 1);

    var end = 0;
    var start = 0;
    if (page <= 5) {
      start = 1;
      end = tpage > 5 ? 5 : tpage;
    } else {
      var pdiff = tpage - page;
      end = pdiff > 1 ? page + 2 : pdiff === 1 ? page + 1 : page;
      start = end - 5 + 1;
    }

    const navs = [];
    for (let i = start; i > 0 && i <= end; i++) {
      navs.push(
        <React.Fragment key={i}>
          {i === page ? (
            <li className="Page-disabled">{i}</li>
          ) : (
            <li key={i} data-page={i} onClick={this.handleNavClick}>
              {i}
            </li>
          )}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {tpage > 1 ? (
          <div id="navContainer" className="Page-nav">
            {start > 1 ? (
              <button
                data-page={page - 1}
                className="Page-prev"
                onClick={this.handleNavClick}
              >
                Previous
              </button>
            ) : (
              ""
            )}
            <ul>{navs}</ul>
            {tpage > end ? (
              <button
                data-page={page + 1}
                className="Page-next"
                onClick={this.handleNavClick}
              >
                Next
              </button>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default Navigation;
