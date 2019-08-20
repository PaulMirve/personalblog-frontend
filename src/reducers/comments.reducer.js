import { FETCH_COMMENTS, SAVE_COMMENT } from "../actions/comments.actions";

const initialState = {

}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case FETCH_COMMENTS:
            let comments = {};
            payload.forEach(comment => {
                comments[comment.comment_id] = comment;
            });
            return { ...state, ...comments }

        case SAVE_COMMENT:
            return { ...state, [payload.comment_id]: payload }

        default:
            return state
    }
}
