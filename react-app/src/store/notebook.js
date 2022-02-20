const SET_ALL_NOTEBOOKS = "notebooks/GET_ALL_NOTEBOOKS";
const SET_ONE_NOTEBOOK = "notebooks/SET_ONE_NOTEBOOK";
const REMOVE_ALL_NOTEBOOKS = "notebooks/REMOVE_NOTEBOOK";
const SET_ALL_NOTES = "notebooks/SET_ALL_NOTES";
const SET_ONE_NOTE = "notebooks/SET_ONE_NOTE";
 
const setAllNotebooks = (notebooks) => ({
    type: SET_ALL_NOTEBOOKS,
    payload: notebooks
});

const setOneNotebook = (notebook) =>({
    type: SET_ONE_NOTEBOOK,
    payload: notebook
})

const removeAllNotebook = () => ({
    type: REMOVE_ALL_NOTEBOOKS
})

const setAllNotes = (notes) => ({
    type: SET_ALL_NOTES,
    payload: notes
})

const setOneNote = (note) => ({
    type: SET_ONE_NOTE,
    payload: note
})

// NOTEBOOK

export const resetNotebooks = () => async (dispatch) => {
    dispatch(removeAllNotebook())
}

export const getAllNotebooks = (userid) => async(dispatch) => {
     const response = await fetch(`/api/users/${userid}/notebooks`)

     if (response.ok) {
         const notebooks = await response.json();
         if (notebooks.errors) {
            //  console.log(notebooks.errors)
             let errors = Object.values(notebooks.errors)
             return errors
         } else {
             dispatch(setAllNotebooks(notebooks.notebooks))
         }
         return null;
     } else {
         return "Response errors!"
     }
}

export const getOneNotebook = (userid, notebookid) => async(dispatch) => {
    const response = await fetch(`/api/users/${userid}/notebooks/${notebookid}`)
    if (response.ok) {
        const notebook = await response.json()
        if (notebook.errors) {
            let errors = Object.values(notebook.errors)
            return errors
        } else {
            dispatch(setOneNotebook(notebook.notebook))
            dispatch(setAllNotes(notebook.notes))
        }
        return notebook
    } else {
        return "Response error!"
    }
}

export const createOneNotebook = (userid, title) => async(dispatch) =>{
    const response = await fetch(`/api/users/${userid}/notebooks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({userid, title})
    })
    if (response.ok){
        const notebooks = await response.json();
        if(notebooks.errors) {
            let errors = Object.values(notebooks.errors)
            return errors
        } else {
            dispatch(setAllNotebooks(notebooks.notebooks))
        }
        return notebooks.notebook
    } else {
        return "Response errors!"
    }
}

export const editOneNotebook = (userid, notebookid, title) => async (dispatch) => {
    const response = await fetch(`/api/users/${userid}/notebooks/${notebookid}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({userid,notebookid, title})
    })
    if(response.ok) {
        const notebooks = await response.json();
        if (notebooks.errors) {
            let errors = Object.values(notebooks.errors)
            return errors
        } else {
            dispatch(setAllNotebooks(notebooks.notebooks))
        }
        return null;
    } else {
        return "Response errors"
    }
}

export const removeOneNotebook = (userid, notebookid) => async (dispatch) => {
    const response = await fetch(`/api/users/${userid}/notebooks/${notebookid}`, {
        method: "DELETE",
    })
    if (response.ok) {
        const notebooks = await response.json();
        if (notebooks.errors) {
            let errors = Object.values(notebooks.error)
            return errors
        } else {
            dispatch(setAllNotebooks(notebooks.notebooks))
        } 
        return null;
    } else {
        return "Response errors!"
    }
}

//Note
export const getAllNotes = (userid, notebookid) => async (dispatch) => {
    const response = await fetch(`/api/users/${userid}/notebooks/${notebookid}/notes`)
    // console.log(response, "from store")
    if (response.ok) {
        const notes = await response.json();
        // console.log(notes, "from the store")
        if (notes.errors) {
            let errors = Object.values(notes.errors)
            return errors
        } else {
            dispatch(setAllNotes(notes.notes))
        }
        return null;
    } else {
        return "Response errors!"
    }
}

export const getOneNote = (userid, notebookid, noteid) => async (dispatch) => {
    const response = await fetch(`/api/users/${userid}/notebooks/${notebookid}/notes/${noteid}`)
    if (response.ok) {
        const note = await response.json();
        if (note.errors) {
            let errors = Object.values(note.errors)
            return errors
        } else {
            dispatch(setOneNote(note))
        }
        return note;
    } else {
        return "Response errors"
    }
}

export const createOneNote = (userid, notebookid, noteVal) => async (dispatch) => {
    const response = await fetch(`/api/users/${userid}/notebooks/${notebookid}/notes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(noteVal)
    })
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            let errors = Object.values(data.errors)
            return {errors: errors}
        } else {
            dispatch(setOneNote(data.note))
            dispatch(setAllNotes(data.notes))
            dispatch(setAllNotebooks(data.notebooks))
            return data.note
        }
    } else {
        return "Response errors!"
    }
}

export const editOneNote =(userid, notebookid, noteid, noteVal) => async(dispatch) => {
    const response = await fetch(`/api/users/${userid}/notebooks/${notebookid}/notes/${noteid}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userid, notebookid, noteid, noteVal)
    })
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            let errors = Object.values(data.errors)
            return errors
        } else {
            dispatch(setOneNote(data.note))
            dispatch(setAllNotes(data.notes))
            dispatch(setAllNotebooks(data.notebooks))
            return data.note
        }
    } else {
        return "Response Errors!"
    }
}

const removeOneNote = (userid, notebookid, noteid) => async (dispatch) => {
    const response = await fetch(`/api/users/${userid}/notebooks/${notebookid}/notes/${noteid}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            let errors = Object.values(data.errors)
            return  errors
        } else {
           dispatch(setAllNotebooks(data.notebooks))
           dispatch(setAllNotes(data.notes))
           return null
        }
    } else {
        return "Response Errors!"
    }
}

const initialState = {
    notebooks: null,
    currNotebook: null,
    notes: null,
    currNote: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_ALL_NOTEBOOKS:
            return {...state, notebooks: action.payload}
        case SET_ONE_NOTEBOOK:
            return {...state, currNotebook: action.payload}
        case REMOVE_ALL_NOTEBOOKS:
            return {notebooks: null, currNotebook:null, notes: null, currNote: null}
        case SET_ALL_NOTES:
            return  {...state, notes: action.payload}
        case SET_ONE_NOTE:
            return {...state, currentNote: action.payload}
        default:
            return state;
    }
}