import history from '../history';
import api from '../api/PersonalBlogAPI';
import authApi from '../api/PersonalBlogAuthAPI';

export const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED';
export const ERROR = 'ERROR';
export const GOOGLE_AUTH_AUTHENTICATED = 'GOOGLE_AUTH_AUTHENTICATED';

export const login = (valores) => {
    return async dispatch => {
        try {
            const { data } = await api.post('/api/auth/login', valores);
            await localStorage.setItem('accessToken', data.token);
            dispatch({ type: IS_AUTHENTICATED, payload: data.user });
            history.push('/');
        } catch (error) {
            dispatch({ type: ERROR });
        }
    }
}

export const logout = () => {
    return async dispatch => {
        await authApi.post('/api/auth/logout');
        await localStorage.clear();
        dispatch({ type: NOT_AUTHENTICATED });
    }
}

export const isAuthenticated = () => {
    return async dispatch => {
        try {
            const { data } = await authApi.get('/api/auth/user');
            dispatch({ type: IS_AUTHENTICATED, payload: data })
        } catch (error) {
            dispatch({ type: NOT_AUTHENTICATED })
        }
    }
}

export const googleAuthAuthenticated = (payload) => {
    return async dispatch => {
        dispatch({ type: GOOGLE_AUTH_AUTHENTICATED, payload });
    }

}



