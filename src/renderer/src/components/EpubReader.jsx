import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import ePub from 'epubjs'

const EpubReader = ({ file }) => {
  const viewerRef = useRef(null)

  useEffect(() => {
    if (file && viewerRef.current) {
      const book = ePub(file)
      console.log('Book instance:', book)
      const rendition = book.renderTo(viewerRef.current, {
        width: '100%',
        height: '100%'
      })
      console.log('Rendition instance:', rendition)

      rendition
        .display()
        .then(() => {
          console.log('Rendition displayed')
        })
        .catch((error) => {
          console.error('Error displaying rendition:', error)
        })
    }
  }, [file])

  return <div ref={viewerRef} style={{ width: '100%', height: '100vh', background: 'white' }} />
}

EpubReader.propTypes = {
  file: PropTypes.string.isRequired
}

export default EpubReader
