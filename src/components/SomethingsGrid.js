import React, {Component} from "react";
import InsertSomethingModal from './InsertSomethingModal';

// Import React Table
import {BootstrapTable, TableHeaderColumn, InsertButton, ClearSearchButton} from 'react-bootstrap-table';

export default class SomethingsGrid extends Component {
  constructor() {
    super();
    this.state = {
      data: [{
        something: 'Road Runner',
        description: 'A fast bird'
      }, {
        something: 'Wile E Coyote',
        description: 'He hunts road runners'
      }]
    };

    this.handleSave = this.handleSave.bind(this);
    this.createInsertModal = this.createInsertModal.bind(this);
    this.handleDeleteRecord = this.handleDeleteRecord.bind(this);
    this.buttonFormatter = this.buttonFormatter.bind(this);
    this.handleEditRecord = this.handleEditRecord.bind(this);
  }

  //this gets triggered from the add record modal when saving
  handleSave(newRecord) {
    let newData = [...this.state.data, newRecord];
    this.setState({
      data: newData
    })
  }

  createCustomInsertButton() {
    return (
      <InsertButton
        btnText='Add a Something'
      />
    )
  }

  //this is for the modal component when adding additional rows
  createInsertModal(onModalClose, onSave, columns, validateState, ignoreEditable) {
    const attr = {
      onModalClose, onSave, columns, validateState, ignoreEditable
    }
    return (
      <InsertSomethingModal {...attr} handleSave={this.handleSave} />
    )
  }

  //this button is for the cancel button on the search bar
  createSearchClearButton() {
    return (
      <ClearSearchButton
        btnText='x'
      />
    )
  }

  //buttons for the 
  buttonFormatter() {
    return (<React.Fragment>
      <button onClick={this.handleEditRecord}>edit</button>
      <button onClick={this.handleDeleteRecord}>delete</button>
      </React.Fragment>)
  }

  handleEditRecord() {
    //didn't have time to finish this, this would grab the row that's being edited
    //and send that data to a similar modal as the add row and populating the input fields
  }

  handleDeleteRecord(event) {
    //could be done easier through jQuery
    //only works assuming no duplicates, this could be fixed in the future with unique id
    let somethingData = event.target.parentElement.parentElement.childNodes[0].textContent;
    let newData = this.state.data.filter((record) => record.something !== somethingData)
    this.setState({
      data: newData
    })
  }

  render() {

    const options = {
      insertBtn: this.createCustomInsertButton,
      insertModal: this.createInsertModal,
      clearSearch: true,
      clearSearchBtn: this.createSearchClearButton,
    };

    return (
      <div>
        <h4>You have {this.state.data.length} somethings</h4>
        <BootstrapTable data={this.state.data} options={options} insertRow search>
          <TableHeaderColumn dataField='something' isKey={true} dataSort={true}>Something</TableHeaderColumn>
          <TableHeaderColumn dataField='description' dataSort={true}>Description</TableHeaderColumn>
          <TableHeaderColumn dataFormat={this.buttonFormatter}></TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
