'use strict';
import * as React from "react";
import ReactDOM from "react-dom";

interface IClickableProps {
  onClick: Function;
  children: React.ReactElement[];
}

export class CustomToggle extends React.Component {
  props: IClickableProps;
  constructor(props: IClickableProps, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(e);
  }

  render() {
    return (
      <a href="" onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}

export class CustomMenu extends React.Component {
  onChange: Function;
  onBlur: Function;
  input: React.ReactInstance;
  constructor(props, context) {
    super(props, context);

    this.onChange = e => this.setState({value: e.target.value});
    this.onBlur = () => this.setState({value: ''});
    this.state = {value: ''};
  }

  focusNext() {
    const input: HTMLElement = ReactDOM.findDOMNode<HTMLElement>(this.input);
    if (input) {
      input.focus();
    }
  }

  render() {
    const {children} = this.props;
    const {value} = this.state;

    return (
      <div className="dropdown-menu">
        <ul>
          {React.Children.toArray(children)}
        </ul>
      </div>
    )
  }
}