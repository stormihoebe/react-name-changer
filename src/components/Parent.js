import React, { Component } from 'react';

class Parent extends React.Component {
    constructor(props){
        super(props)
        //bind the this context to the nameSetter function
        this.nameSetter = this.nameSetter.bind(this)
        //Initial state where
        this.state = {
            name: "Stormi Ann"
        }
    }
    //A function that takes in a name and sets this.state.name = name
    nameSetter(name) {
        this.setState({ name })
    }
    //Render the name stored in the current state
    render() {
        return <div>
            <h1>{this.state.name}</h1>

        </div>
    }
}
export default Parent