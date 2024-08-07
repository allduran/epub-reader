import PropTypes from 'prop-types'

const FileSelector = ({ onFileSelect }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const filePath = URL.createObjectURL(file)
      onFileSelect(filePath)
    }
  }

  return (
    <div>
      <input type="file" accept=".epub" onChange={handleFileChange} />
    </div>
  )
}

FileSelector.propTypes = {
  onFileSelect: PropTypes.func.isRequired
}

export default FileSelector
