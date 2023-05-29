import {appReducer, setAppError, setAppStatus, StatusType} from '../app-reducer';

let startState: {
    status: StatusType
    error: string | null
}

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null
    }
})

test('error should be set', () => {

    const endState = appReducer(startState, setAppError('some error'))

    expect(endState.error).toBe('some error')
})

test('status should be set', () => {

    const endState = appReducer(startState, setAppStatus('succeeded'))

    expect(endState.status).toBe('succeeded')
    expect(endState.error).toBe(null)
})