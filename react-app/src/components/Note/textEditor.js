import React, { useState, useEffect } from "react";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = ({ setContent, content }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    const newState = EditorState.push(editorState, ContentState.createFromText(''))
    setEditorState(newState)
    setConvertedContent(null)
  }, [])

  const handleEditorChange = (state) => {
    console.log(state, "'sssssssss")
    console.log(editorState, "state")
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML)
    setContent(currentContentAsHTML.substring(3, currentContentAsHTML.length - 4));
  };
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html)
    };
  };
  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapperClass"
        editorClassName="editorClass"
        toolbarClassName="toolbarClass"
      />
      {/* <div
        className="preview"
        dangerouslySetInnerHTML={createMarkup(convertedContent)}
      ></div> */}
    </div>
  );
};
export default TextEditor;
