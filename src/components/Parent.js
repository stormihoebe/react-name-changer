import React, { Component } from 'react';
import Child from './Child'

class Parent extends Component {
    render() {
        const name = this.props.store.getState().name

        return <div>
            <h1>{name}</h1>
            <Child name={name} store={this.props.store}/>
        </div>
    }
}
export default Parent