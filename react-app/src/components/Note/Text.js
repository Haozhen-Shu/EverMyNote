const {Editor, EditorState} = Draft;

      class PlainTextEditorExample extends React.Component {
        constructor(props) {
          super(props);
          this.state = {editorState: EditorState.createEmpty()};
          this.onChange = (editorState) => this.setState({editorState});
          this.logState = () => console.log(this.state.editorState.toJS());
          this.setDomEditorRef = ref => this.domEditor = ref;
          this.focus = () => this.domEditor.focus();
        }
                
        componentDidMount(){
          this.domEditor.focus()
        }
        
        render() {
          return (
            <div style={styles.root}>
              <div style={styles.editor} onClick={this.focus}>
                <Editor
                  editorState={this.state.editorState}
                  onChange={this.onChange}
                  placeholder="Enter some text..."
                  ref={this.setDomEditorRef}
                />
              </div>
              <input
                onClick={this.logState}
                style={styles.button}
                type="button"
                value="Log State"
              />
            </div>
          );
        }
      }

      const styles = {
        root: {
          fontFamily: '\'Helvetica\', sans-serif',
          padding: 20,
          width: 600,
        },
        editor: {
          border: '1px solid #ccc',
          cursor: 'text',
          minHeight: 80,
          padding: 10,
        },
        button: {
          marginTop: 10,
          textAlign: 'center',
        },
      };
