import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useMoreImages(pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [images, setImages] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setImages([])
  }, [])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: 'GET',
      url: `https://picsum.photos/v2/list?page=${pageNumber}&limit=20&q=10&w=500`,
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setImages(prevBooks => {
        return [...prevBooks, ...res.data]
      })
      setHasMore(true)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [pageNumber])

  return { loading, error, images, hasMore }
}