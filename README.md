# React Name Changer Tutorial 
This simple react tutorial will help you create two components. One parent component renders both a name and another component, the child component, which takes user input and triggers updates to the state of the parent component. You will learn basic React functionality, how to pass actions as props, and how to change state with a child component. 


## Running this application 
* clone repo `git clone https://github.com/stormihoebe/react-name-changer`
* open repo `cd react-name-changer`
* install yarn `yarn install`
* start yarn `yarn start`
* view in browser [localhost:3000](http://localhost:3000/)

# Recreating this Application 

## Getting started

Create a new react application by entering the following command into the terminal

```sh
npm install -g create-react-app

create-react-app react-name-changer
cd react-name-changer/
npm start
```
Get the files ready to begin coding 
* Open react-name-changer in Visual Studio Code 
* Delete unnecessary files from src folder (serviceworker, logo, etc)
* Remove references to deleted files (sorry, this isn't very detailed)

## Creating the React app

Create a new component 
* Create a new folder in src folder called components 
* Create a new file inside of src/components called Parent.js
* Open src/components/Parent.js
* Add the following Code: 
```sh 
import React, { Component } from 'react';

class Parent extends React.Component {
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

        </div>
    }
}
export default Parent
```
Create the child component 
* Create a new file inside of src/components called Child.js
* Open src/components/Child.js
* Add the following Code:

```sh
import React, { Component } from 'react';

class Child extends Component {
    constructor(props){
        super(props)
        //set initial state of name to empty string
        this.state = { name: ''}
        // bind the this context for child component functions
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    //every change/key stroke into the input field will set child component state equal current value of input 
    handleChange(event) {
        this.setState({name: event.target.value});
    }
    //When form is submitted, prevent default to stop page from refreshing
    handleSubmit(event) {
        event.preventDefault();
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
```

Adding Child component to Parent Component 
* Import child component at the top of Parent component by adding this code to the top of the page, just below `import React...`: 
```sh
import Child from './Child' //new
```
* Update the Parent render method to include child component, passing nameSetter as action props
```sh
    //Render the name stored in the current state, render child component passing it name and action props. 
    render() {
        return <div>
            <h1>{this.state.name}</h1>
            <Child name={this.state.name} action={this.nameSetter}/>
        </div>
    }
```
* Save Parent.js

Adding props to Child Component 
* Change initial state from being an empty string to props.name passed to child component from parent 
```sh
 //set initial state of name pros.name
        this.state = { name: props.name}
```
* Edit handleSubmit function to include props.action function 
```sh
//When form is submitted, prevent default to stop page from refreshing, trigger the nameSetter function passed to Child component as props.action
handleSubmit(event) {
    event.preventDefault();
    this.props.action(this.state.name)       
}

```

At this point, your app should work. You should be able to enter a name, hit submit, and see the name change at the top of the page. 

## Implementing Redux
Now that the app is working, let's add Redux to clean up state management. 

### Install Redux and React-Redux and import them into your project
* Install Redux `yarn add redux`
* Install React-Redux  `yarn add react-redux`

### Add A reducer

* create a new folder for the reducers `src/reducers`
* create a reducer file `src/reducers/name_reducer.js`
* Add a name reducer that takes in current state and an action and returns a new state to .reducers/name_reducer.js. 

```sh
//name reducer takes in a state (with initial assignment state.name = "Stormi" and an action and returns a new state)
const nameChangerApp = (
    state ={
        name:"Stormi"
    }, 
    action) => {
    switch (action.type){
        case 'SET_NAME':
            return {
                name: action.name
            }
        default:
            return state
    }
}
export default nameChangerApp
```

### Refactor index.js

* import redux, Parent component, and reducer in src/index.js (Also, remove import for App)
```sh
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Parent from './components/Parent'
import { createStore} from 'redux'
import nameChangerApp from './reducers/name_reducer'
```

* create your redux store using createStore(nameChangerApp)
* refactor render into a new function that renders Parent component with store passed as props
* call the new render function
* subscribe

```sh
//create store using reducer
const store = createStore(nameChangerApp)

//render Parent component to DOM
const render = ()=>{
    ReactDOM.render(
        <Parent store={store}/>
        , document.getElementById('root')
    )
}
render();
//subscribe to listen to changes to store and run render function when changes are made.  
store.subscribe(render)
``` 

### Refactor Parent Component (src/components/Parent.js)

* remove state from component, it is no longer needed since data is in redux store
* remove name setter function because child component will handle changes
* read application state from props as passed into Parent component (state = this.props.store.getState())
* refactor ender method and pass store to Child component as props
```sh
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
```

### Refactor Child Component (src/components/Child.js)

* Create a SetName action creator
```sh 
//setName action creator takes in a name string and  
const setName = (name) =>{
    return {
        type: 'SET_NAME',
        name
    }
}
```
* refactor handleSubmit function to dispatch reducer rather than nameSetter
```sh
    //When form is submitted, dispatch action creator
    handleSubmit() {
        this.props.store.dispatch(setName(this.state.name))     
    }
```
* small refactoring to render function 
```
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
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


## Something Missing?

If you have ideas for more “How To” recipes that should be on this page, [let us know](https://github.com/facebookincubator/create-react-app/issues) or [contribute some!](https://github.com/facebookincubator/create-react-app/edit/master/packages/react-scripts/template/README.md)
