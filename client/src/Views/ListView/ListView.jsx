import React from 'react';
import View from '../View.jsx'

export default class ListView extends View {
  constructor(props) {
    super(props);
    this.handlePaginationDropdownChange = this.handlePaginationDropdownChange.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePrevPage = this.handlePrevPage.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);

  }

  onSearchSubmit(event) {
    event.preventDefault();
    this.getList();
  }

  getList() {
    let dynamicData = {
      "user": {
        "userId": "1",
        "teamId": "1"
    },
      "pagination": {
        "pageNumber": this.state.currentPage,
        "recordPerPage": this.state.value,
        "orderByColumn": "template_id",
        "searchBy": [{}]
      }
    };

    const {templateNameValue, templateIdValue, teamNameValue, userIdValue} = this.state;
    if (templateNameValue.length) {
      dynamicData.pagination.searchBy[0].template_name = this.state.templateNameValue;
    } if (templateIdValue.length) {
      dynamicData.pagination.searchBy[0].template_id = this.state.templateIdValue;
    } if (teamNameValue.length) {
      dynamicData.pagination.searchBy[0].team_name = this.state.teamNameValue;
    } if (userIdValue.length) {
      dynamicData.pagination.searchBy[0].user_id = this.state.userIdValue;
    }

    fetch('/api/templates/templatelist', {
      method: "POST",
      body: JSON.stringify(dynamicData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(({templateList}) => this.setState({ "list": templateList }))
  }

  handleNextPage() {
    let newPage = this.state.currentPage + 1;
    this.setState({ currentPage: newPage }, () => {
      this.getList();
    });
  }

  handlePrevPage() {
    if (this.state.currentPage > 1) {
      let newPage = this.state.currentPage - 1;
      this.setState({ currentPage: newPage }, () => {
        this.getList();
      });
    }
  }

  handlePaginationDropdownChange(event) {
    this.setState({ value: event.target.value }, () => {
      this.getList();
    });
  }

}

module.export = ListView