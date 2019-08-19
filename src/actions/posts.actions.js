import api from '../api/PersonalBlogAPI';
import authAPI from '../api/PersonalBlogAuthAPI';
import history from '../history';

export const FETCH_POSTS = 'FETCH_POSTS';
export const SAVE_POST = 'SAVE_POST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';

export const fetchPosts = () => {
    return async dispatch => {
        const { data } = await api.get('post/');
        dispatch({ type: FETCH_POSTS, payload: data });
    }
}

export const savePost = (post) => {
    return async dispatch => {
        const { data } = await authAPI.post('post/', post);
        dispatch({ type: SAVE_POST, payload: data });
        history.push('/');
    }
}

export const fetchPost = (postId) => {
    return async dispatch => {
        const { data } = await api.get(`post/${postId}/`);
        dispatch({ type: FETCH_POST, payload: data });
    }
}

export const deletePost = (postId) => {
    return async dispatch => {
        const { data } = await authAPI.delete(`post/${postId}/`);
        dispatch({ type: DELETE_POST, payload: data });
        history.push('/blog');
    }
}

export const updatePost = (post, postId) => {
    return async dispatch =>{
        const {data} = await authAPI.patch(`post/${postId}/`, post);
        dispatch({type: UPDATE_POST, payload: data});
        history.push(`/post/${postId}`);
    }
}

