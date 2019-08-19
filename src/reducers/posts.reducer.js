import { FETCH_POSTS, FETCH_POST, DELETE_POST, UPDATE_POST } from "../actions/posts.actions";

const initialState = {

}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case FETCH_POSTS:
            let posts = {};
            payload.forEach(post => {
                posts[post.post_id] = post;
            });
            return posts;

        case FETCH_POST:
            return { ...state, [payload.post_id]: payload }

        case DELETE_POST:
            let deletePost = Object.assign({}, state);
            delete deletePost[payload];
            return deletePost;

        case UPDATE_POST:
            return { ...state, [payload.post_id]: payload }

        default:
            return state
    }
}
