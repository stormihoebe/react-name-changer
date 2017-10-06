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