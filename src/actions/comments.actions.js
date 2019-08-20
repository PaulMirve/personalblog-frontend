import api from "../api/PersonalBlogAPI";

export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const SAVE_COMMENT = 'SAVE_COMMENT';

export const fetchComments = () => {
    return async dispatch => {
        const { data } = await api.get('/comment/');
        dispatch({ type: FETCH_COMMENTS, payload: data });
    }
}

export const saveComment = (text) => {
    return async dispatch => {
        const { data } = await api.post(`/comment/`, text);
        dispatch({ type: SAVE_COMMENT, payload: data });
    }
}

