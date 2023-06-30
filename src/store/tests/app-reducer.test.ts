import {appActions, appReducer, appThunks, RequestStatusType} from '../app-reducer';

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

test("error should be set", () => {
    const endState = appReducer(startState, appActions.setAppError({error: "some error"}));

    expect(endState.error).toBe("some error");
});

test("status should be set", () => {
    const endState = appReducer(startState, appActions.setAppStatus({status: "succeeded"}));

    expect(endState.status).toBe("succeeded");
    expect(endState.error).toBe(null);
});

test("app should be initialized", () => {
    const endState = appReducer(startState, appThunks.initializeApp.fulfilled({isInitialized: true}, 'requestId'));

    expect(endState.isInitialized).toBeTruthy();
});
