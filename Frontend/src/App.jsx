// App.jsx
import { useState } from 'react'
import Editor from "react-simple-code-editor"
import "prismjs/themes/prism-tomorrow.css"
import Prism from "prismjs"
import "prismjs/components/prism-javascript"
import axios from 'axios'
import Markdown from "react-markdown"
import './App.css'

function App() {
  const [code, setCode] = useState(`// Write your code here
function example() {
  // Add your implementation
  const message = "Hello, World!";
  console.log(message);
  return message;
}`)
  const [review, setReview] = useState('')
  const [loading, setLoading] = useState(false)

  const highlightWithLineNumbers = (input) => {
    return Prism.highlight(input, Prism.languages.javascript, 'javascript')
  }

  async function handleReview() {
    try {
      setLoading(true)
      const response = await axios.post('http://localhost:3000/ai/get-review', { code })
      setReview(response.data.response)
    } catch (error) {
      console.error('Error getting review:', error)
      setReview('Error getting review. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="editor-container">
            <div className="editor-header">
              <span>Code Editor</span>
            </div>
            <div className="code">
              <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={highlightWithLineNumbers}
                padding={15}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  backgroundColor: '#1e1e1e',
                  color: '#fff',
                  minHeight: '300px',
                  height: '100%',
                  borderRadius: '0 0 8px 8px'
                }}
              />
            </div>
          </div>
          <button 
            className="review-button"
            onClick={handleReview}
            disabled={loading}
          >
            {loading ? 'Analyzing Code...' : 'Review Code'}
          </button>
        </div>
        <div className="right">
          <div className="review-header">
            <span>Code Review Results</span>
          </div>
          <div className="review-content">
            {review ? (
              <Markdown className="markdown-content">
                {review}
              </Markdown>
            ) : (
              <div className="placeholder-text">
                Your code review results will appear here after analysis
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default App