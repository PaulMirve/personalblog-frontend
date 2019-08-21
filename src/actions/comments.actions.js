import api from "../api/PersonalBlogAPI";

export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const SAVE_COMMENT = 'SAVE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

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

export const deleteComment = (commentId) => {
    return async dispatch => {
        const { data } = await api.delete(`/comment/${commentId}/`);
        dispatch({ type: DELETE_COMMENT, payload: data });
    }
}

export const updateComment = (commentId, text) => {
    console.log(text);
    return async dispatch => {
        const { data } = await api.patch(`/comment/${commentId}/`, text);
        dispatch({ type: UPDATE_COMMENT, payload: data });
    }
}



