import { IS_AUTHENTICATED, NOT_AUTHENTICATED, ERROR } from "../actions/auth.actions";

const initialState = {}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case IS_AUTHENTICATED:
        return { ...state, isAuthenticated: true, ...payload}

    case NOT_AUTHENTICATED:
        return { ...state, isAuthenticated: false}

    case ERROR:
        return { ...state, isAuthenticated: 'error' }

    default:
        return state
    }
}
