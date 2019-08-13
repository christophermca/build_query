import React from "react";
import Dropdown from "./dropdown.jsx";
import Button from "./button.jsx";
import TemplateBody from './templatebody.jsx';
import "./style.css";
import * as stubData from "./stubData.json";

export default class TemplateCreation extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props, stubData);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    // Handle showing template details
    window.addEventListener('displayTemplateDetails', (data) => {
      this.setTemplateData(data)
    });

  }

  handleChange(evt) {
    if (evt.target.value) {
      this.setState({"showTemplateBuilder": true})
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log('[CALLS to save template]');
    fetch('api/templates/createtemplate', {method: 'POST'})
    .then(data => {
      const event = new Event('getTempalteData', data)
      window.dispatchEvent(event)
    })


  }

  render() {
    return (
      <form>
        <section id="template-header">
          <input placeholder="Template Name *Required" required />
          <input placeholder="Template Description *Required" required />
        </section>
        <section id="template-config">
          <Dropdown name="service" data={stubData.service} />
          <Dropdown name="environment" data={stubData.environment} />
          <Dropdown name="configuration" data={stubData.configuration} />
          <Dropdown name="configAPI" onChange={this.handleChange} data={stubData.api} />
        </section>

        <section>
          <TemplateBody />
        </section>

        {this.state.showTemplateBuilder ?
        (<section id="template-builderHeader">
          <input disabled placeholder="GET" />
          <input placeholder="url" className="template-url" />
        </section>
        ) : ''
        }
        <section id="template-button">
          <button onClick={this.handleSubmit} type="submit">Send</button>
        </section>
      </form>
    );
  }
}
