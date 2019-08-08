import React from 'react';

/* a basic component, no unique styles for this component */
export default class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props);
  }
  render() {
    return (<div id="mock-id">Hi {this.props.name ? this.props.name : 'mom' }</div>)
  }
}