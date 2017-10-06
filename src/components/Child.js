import React, { Component } from 'react';

//setName action creator takes in a name string and  
const setName = (name) =>{
    return {
        type: 'SET_NAME',
        name
    }
}

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

    //When form is submitted, dispatch action creator
    handleSubmit() {
        this.props.store.dispatch(setName(this.state.name))     
    }

    //Render the form 
    render() {
        return (
            <div>
                <label>
                    Name:
                <input 
                    type="text" 
                    value={this.state.name} 
                    onChange={this.handleChange} />
                </label>
                <button value="Submit" 
                    onClick={this.handleSubmit}>
                    Submit
                </button>
            </div>
        );
    }
}
export default Child