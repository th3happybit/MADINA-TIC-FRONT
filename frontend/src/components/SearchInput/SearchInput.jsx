import _ from "lodash";
import React, { Component } from "react";
import { Search, Grid } from "semantic-ui-react";
import "./SearchInput.css";

const initialState = { isLoading: false, results: [], value: "" };

const source = [];
export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = (result) => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            placeholder={"search"}
            input={{
              icon: "search",
              iconPosition: !this.props.right ? "left" : "right",
            }}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
            {...this.props}
            className="_search_input medium-text"
          />
        </Grid.Column>
      </Grid>
    );
  }
}
