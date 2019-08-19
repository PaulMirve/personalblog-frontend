import api from '../api/Demonios';

export const ADD_IMAGE = 'ADD_IMAGE';

export const addImage = (image) => {
    return async dispatch =>{
        const {data} = await api.post('/image/', image);
        dispatch({type: ADD_IMAGE});
    }
}
