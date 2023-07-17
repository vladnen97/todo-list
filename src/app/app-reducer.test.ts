import {appReducer, appThunks, RequestStatusType} from './app-reducer';

let startState: {
    status: RequestStatusType;
    error: string | null;
    isInitialized: boolean;
};

beforeEach(() => {
    startState = {
        status: "idle",
        error: null,
        isInitialized: false,
    };
});

test("status should be set", () => {
    const endState = appReducer(startState, appThunks.initializeApp.fulfilled({isInitialized: true}, 'requestId'));

    expect(endState.status).toBe("succeeded");
    expect(endState.error).toBe(null);
});

test("app should be initialized", () => {
    const endState = appReducer(startState, appThunks.initializeApp.fulfilled({isInitialized: true}, 'requestId'));

    expect(endState.isInitialized).toBeTruthy();
});
