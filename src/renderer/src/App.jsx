import { useState } from 'react'
import FileSelector from './components/FileSelector'
import EpubReader from './components/EpubReader'

const App = () => {
  const [file, setFile] = useState(null)

  const handleFileSelect = (filePath) => {
    setFile(filePath)
  }

  return (
    <div>
      <FileSelector onFileSelect={handleFileSelect} />
      {file && <EpubReader file={file} />}
    </div>
  )
}

export default App
