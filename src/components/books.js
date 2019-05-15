import React, { Component } from "react";

class Books extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: []
    };
  }

  // Update state info
  updateState = (key, value) => {
    let sobj = {};
    sobj[key] = value;
    this.setState(sobj);
  };

  // Fetch results from props
  componentWillReceiveProps = newProps => {
    var newResults = newProps.results;
    if (newResults) {
      this.updateState("results", newResults);
    }
  };

  // Escape Spacial strings
  escapeHtml = unsafe => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  // Render books results
  renderBooksResults = () => {
    var results = this.state.results;
    if (results && results.length > 0) {
      return results.map(workObj => {
        workObj.title = "<img src='x' onerror='alert(\"hello\")'  />";
        return (
          <div className="Books-header" key={workObj.id}>
            <div className="Books-left">
              <img className="Books-img fleft" alt="" src={workObj.siu} />
            </div>
            <div className="Books-right">
              <div
                className="Books-title w100 text-overflow fleft"
                id={this.escapeHtml(workObj.id)}
              >
                {workObj.bn}
              </div>
              <div className="Books-author w100 fleft">
                by {this.escapeHtml(workObj.an)}
              </div>
              <div className="Books-footer fleft">
                <div className="Books-rating fleft">
                  {workObj.ar} avg rating - {workObj.rc} ratings
                </div>
                <div className="Books-published fleft">
                  - published {workObj.opy}
                </div>
                <div className="Books-editions fleft">
                  - {workObj.bc} editions
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  // Default render function
  render() {
    var results = this.state.results;
    var length = results ? results.length || 0 : 0;

    return (
      <React.Fragment>
        {length > 0 ? (
          <div className="Books-Parent w100 fleft" id="booksContainer">
            <div className="Books-child w100 fleft">
              {this.renderBooksResults()}
            </div>
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default Books;
