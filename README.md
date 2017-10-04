# React Name Changer Tutorial 
This simple react tutorial will help you create two components. One container component that manages the state(name) and another component that takes user input and allows the user to change the state of the container. You will learn basic React functionality and how to pass props and change state. 

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
* Remove references to deleted files 

## Creating the app

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

```
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
```
import Child from './Child' //new
```
* Update the Parent render method to include child component, passing nameSetter as action props
```
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
```
 //set initial state of name pros.name
        this.state = { name: props.name}
```
* Edit handleSubmit function to include props.action function 
```
//When form is submitted, prevent default to stop page from refreshing, trigger the nameSetter function passed to Child component as props.action
handleSubmit(event) {
    event.preventDefault();
    this.props.action(this.state.name)       
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
