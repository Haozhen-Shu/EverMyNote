import React, { useState, useEffect } from "react";
import { Editor, EditorState, convertFromRaw } from "draft-js";
const TextEditorEdit = (value) => {
    const [editorState, setEditorState] = useState(value);

    useEffect(() => {
        const state = value
            ? EditorState.createWithContent(convertFromRaw(JSON.parse(value)))
            : EditorState.createEmpty();
        setEditorState(state);
    }, [value]); // add 'value' to the dependency list to recalculate state when value changes.

    return <Editor editorState={editorState} onChange={setEditorState} />;
}

export default TextEditorEdit

