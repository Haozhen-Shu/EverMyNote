const GET_QUERY = 'search/GET_QUERY';

const getQuery = (query) => ({
   type: GET_QUERY,
   payload: query
})

export const searchResults = (userid) => async(dispatch) => {
    const response = await fetch(`/api/users/${userid}/search`);
    if(response.ok){
        const data = await response.json();
        if (data.errors) {
            let  errors = Object.values(data.errors)
            return errors
        } else {
            dispatch(getQuery(data));
            return data
        }
    } else {
        return ["Response errors!"]
    }
}

const initialState = {noteTitles: null, notebookTitles: null }
export default function searchReducer(state=initialState, action) {
    let newState = {...state};
    switch (action.type) {
        case GET_QUERY:
            newState.noteTitles = action.payload.notes
            newState.notebookTitles = action.payload.notebooks
            return newState
        default:
            return state
    }
}