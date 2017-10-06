import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Parent from './components/Parent'
import { createStore} from 'redux'
import nameChangerApp from './reducers/name_reducer'

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