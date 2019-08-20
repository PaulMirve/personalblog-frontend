import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';

import postsReducer from './posts.reducer';
import authReducer from './auth.reducer';
import commentsReducer from './comments.reducer';

export default combineReducers({
    posts: postsReducer,
    form,
    auth: authReducer,
    comments: commentsReducer,
});