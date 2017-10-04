import React, { Component } from 'react';

class Child extends Component {
    constructor(props){
        super(props)
        //set initial state of name to empty string
        this.state = { name: props.name}
        // bind the this context for child component functions
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    //every change/key stroke into the input field will set child component state equal current value of input 
    handleChange(event) {
        this.setState({name: event.target.value});
    }
    //When form is submitted, prevent default to stop page from refreshing, trigger the nameSetter function passed to Child component as props.action
    handleSubmit(event) {
        event.preventDefault();
        this.props.action(this.state.name)       
    }
    //Render the form 
    render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.name} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
}
export default Child