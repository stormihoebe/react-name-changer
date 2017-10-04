import React, { Component } from 'react';

class Child extends Component {
    constructor(props){
        super(props)
        //set initial state equal to the name passe
        this.state = { name: props.name}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({name: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        this.props.action(this.state.name)       
      }

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