import React, {Component} from 'react';

export default class InsertSomethingModal extends Component {

  constructor(props) {
    super(props);
    this.handleSaveBtnClick = this.handleSaveBtnClick.bind(this);
  }

  handleSaveBtnClick = () => {
    const { columns } = this.props;
    const newRow = {};
    columns.forEach((column, i) => {
      if (column.field) {
        newRow[column.field] = this.refs[column.field].value;    
      }
    }, this);
    this.props.handleSave(newRow);
    this.props.onModalClose();
  }

  render() {
    const {
      onModalClose,
      columns,
    } = this.props;

    return (
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">Add Something</h3>
            <button type="button" className="close" onClick={ onModalClose }>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {
              columns.map((column, i) => {
                const {
                  field,
                  name,
                } = column;

                if (field===undefined) {
                  //removes the empty fields that has the buttons
                  return null;
                }

                return (
                  <div className='form-group' key={ field }>
                    <div>
                      <label>{ name }</label>
                    </div>
                    <input ref={ field } type='text' defaultValue={ '' } />
                  </div>
                );
              })
            }
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={ onModalClose }>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={ this.handleSaveBtnClick }>Save</button>
          </div>
        </div>
    );
  }
}