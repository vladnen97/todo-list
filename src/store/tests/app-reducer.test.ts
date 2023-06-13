import {appReducer, setAppError, setAppStatus, setIsInitialized, StatusType} from '../app-reducer';

let startState: {
    status: StatusType
    error: string | null
    isInitialized: boolean
}

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false
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

test('app should be initialized', () => {

    const endState = appReducer(startState, setIsInitialized(true))

    expect(endState.isInitialized).toBeTruthy()
})