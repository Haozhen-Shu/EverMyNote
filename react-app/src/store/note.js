const GET_ALL_NOTES = "notes/GET_ALL_NOTES";
const GET_ONE_NOTE ="notes/GET_ONE_NOTE";

const getNotes = (notes)=> ({
    type: GET_ALL_NOTES,
    payload: notes
});

const getNote =(note) => ({
    type: GET_ONE_NOTE,
    payload: note
})

export const getUserNotes = (userid) => async(dispatch) => {
    const response = await fetch(`/api/users/${userid}/notes`)
    if (response.ok) {
        const notes = await response.json();
        if (notes.errors){
            let errors = Object.values(notes.errors)
            return errors
        } else {
            dispatch(getNotes(notes.notes))
        }      
        return null
    } else {
        return ["Response errors!"]
    }
}

export const getUserOneNote = (userid, noteid) => async(dispatch) => {
    const response = await fetch(`/api/users/${userid}/notes/${noteid}`)
    if (response.ok){
        const note = await response.json();
        if (note.errors){
            let errors = Object.values(note.errors)
            return errors
        } else {
            dispatch(getNote(note))
        }
        return note
    } else {
        return ["Response errors"]
    }
}

export const createUserOneNote = (userid, noteVal) => async(dispatch) => {
    const response = await fetch(`/api/users/${userid}/notes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(noteVal)
    })
    if (response.ok) {
        const data = await response.json();
        console.log(data)
        if (data.errors) {
            let errors = Object.values(data.errors)
            return {errors: errors}
        } else {
            dispatch(getNote(data.note))
            dispatch(getNotes(data.notes))
            return data.note
        } 
    } else {
        return ["Response errors!"]
    }
}

export const editUserOneNote = (userid, noteid, noteVal) => async(dispatch) => {
    const response = await fetch(`/api/users/${userid}/notes/${noteid}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(noteVal)
    })
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            let errors = Object.values(data.errors)
            return errors
        } else {
            dispatch(getNote(data.note))
            dispatch(getNotes(data.notes))
            return data.note
        }
    } else {
        return ["Response Errors!"]
    }
}

export const removeUserOneNote = (userid, noteid) => async(dispatch) => {
    const response = await fetch(`/api/users/${userid}/notes/${noteid}`, {
        method: "DELETE"
    })
    if (response.ok){
        const data = await response.json()
        if (data.errors) {
            let errors = Object.values(data.errors)
            return errors
        } else {
            dispatch(getNotes(data.notes))
        }
    } else {
        return ["Response Errors!"]
    }
}


const initialState = {
    notes: null,
    currNote: null
}

export default function NoteReducer(state=initialState,action){
    switch (action.type) {
        case GET_ALL_NOTES:
            return {...state, notes: action.payload}
        case GET_ONE_NOTE:
            return {...state, currNote: action.payload}
        default:
            return state;
    }
}