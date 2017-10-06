import React, { Component } from 'react';
import Child from './Child'
import { createStore, combineReducers} from 'redux'
import {Provider, connect} from 'react-redux'

//setName action creator 
const setName = (name) =>{
    return {
        type: 'SET_NAME',
        name
    }
}

//name reducer
const name = (state, action) => {
    switch (action.type){
        case 'SET_NAME':
            return {
                name: action.name
            }
        default:
            return state
    }
}

class Parent extends Component {
    constructor(props){
        super(props)
        //bind the this context to the nameSetter function
        this.nameSetter = this.nameSetter.bind(this)
        //Initial state where
        this.state = {
            name: "Stormi"
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
            <Child name={this.state.name} action={this.nameSetter}/>
        </div>
    }
}
export default Parent