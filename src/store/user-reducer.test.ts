import {StateType, userReducer} from './user-reducer';


test('user reducer should increment only age', () => {
    const startState: StateType = {name: 'Dimych', age: 20, childrenCount: 2}

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState).not.toBe(startState)
    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})


test('user reducer should increment only children count', () => {
    const startState: StateType = {name: 'Dimych', age: 20, childrenCount: 2}

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState).not.toBe(startState)
    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(3)
})

test('user reducer should change name of user', () => {
    const startState = {name: 'Dimych', age: 20, childrenCount: 2}
    const newName = 'Viktor'
    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})

    expect(endState).not.toBe(startState)
    expect(endState.name).toBe(newName)
})