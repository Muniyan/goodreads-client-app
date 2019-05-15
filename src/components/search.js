import React, { Component } from "react";
import queryString from "query-string";
import Books from "./books";
import Navigation from "./navigation";

class Search extends Component {
  constructor(props) {
    super(props);

    var page = 1;
    var query = "";
    let urlparams = queryString.parse(this.props.location.search);
    if (urlparams) {
      query = urlparams.q ? urlparams.q : query;
      page = urlparams.p ? parseInt(urlparams.p) : page;
    }

    this.state = {
      q: query,
      p: page,
      meta: {},
      results: []
    };

    this.handleChildNavClick = this.handleChildNavClick.bind(this);
    this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this);
    this.handleSearchBoxKeyDown = this.handleSearchBoxKeyDown.bind(this);
  }

  // Update url query in search box
  componentDidMount = () => {
    var query = this.state.q;
    if (query && query.trim().length > 0) {
      document.getElementById("searchbox").value = this.state.q;
      this.searchBooks(this.state.p);
    }
  };

  // Update state info
  updateState = (key, value) => {
    let sobj = {};
    sobj[key] = value;
    this.setState(sobj);
  };

  // Update query in state
  handleSearchBoxChange = event => {
    this.updateState("q", event.target.value);
  };

  // Handle Enter action for search box
  handleSearchBoxKeyDown = event => {
    if (event.which === 13) {
      var query = this.state.q;
      if (query && query.trim().length > 0) {
        this.searchBooks(this.state.p);
      }
    }
  };

  // Handle pagination click action from child component
  handleChildNavClick = event => {
    var page = event.target.getAttribute("data-page");
    if (!isNaN(page)) {
      this.searchBooks(page);
    }
  };

  // Search call to the server
  searchBooks = page => {
    this.updateState("p", page);
    this.updateState("meta", {});
    this.updateState("results", []);
    document.getElementById("loaderIcon").style.display = "block";

    var params = "?q=" + this.state.q + "&p=" + page;
    window.history.pushState({}, "", params);

    fetch("http://localhost:3003/search" + params)
      .then(res => res.text())
      .then(res => {
        try {
          if (res) {
            const json = JSON.parse(res);
            this.updateState("meta", json.meta);
            this.updateState("results", json.results || []);
            document.getElementById("loaderIcon").style.display = "none";
          }
        } catch (ex) {}
      });
  };

  // Default render function
  render() {
    return (
      <React.Fragment>
        <div className="Books-main">
          <h1 className="Books-h1">Search</h1>
          <div className="Books-form">
            <input
              type="text"
              name="q"
              id="searchbox"
              className="Books-searchbox"
              placeholder="Search books name"
              onChange={this.handleSearchBoxChange}
              onKeyDown={this.handleSearchBoxKeyDown}
              autoComplete="off"
              autoFocus
            />
            <div id="loaderIcon" className="loaderIcon fright" />
          </div>
          {this.state.meta.tr > 0 ? (
            <div className="metdaData">
              <h3>
                PAGE {this.state.p} of ABOUT {this.state.meta.tr} RESULTS (
                {this.state.meta.qts} seconds)
              </h3>
            </div>
          ) : (
            ""
          )}
          {this.state.meta.tr === "0" ? (
            <div className="metdaData">
              <h3>NO RESULTS.</h3>
            </div>
          ) : (
            ""
          )}
          <Books meta={this.state.meta} results={this.state.results} />
          <Navigation
            tcount={this.state.meta.tr}
            page={this.state.p}
            onClick={this.handleChildNavClick}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Search;
