// Normalize state -> byId:{}



// let state = {byId: {}, allData: []};
let state = {allData: []}; // <- initial state

// reducer

let newState = {...state}; // {allData: [1]}

const payLoad = [1];

newState.allData.push(1)


// rerender has to return true to rerender if memory address has changed, false if it hasn't changed
function rerender(newState){

    for(let key in state){
        let val =  state[key];
        if(!(val === newState.allData)){
            return true
        }
    }
    return false
}

console.log(rerender(newState))

// console.log(state.allData === newState.allData);
// console.log(state.allData)
