import { useEffect } from 'react'
import { IntersectionOptions, useInView } from 'react-intersection-observer'

// interface
interface IProps {
  onIntersect: () => void
  options?: IntersectionOptions
}

// hook
export const useIntersection = (props: Readonly<IProps>) => {
  const { onIntersect, options = { threshold: 0.1, rootMargin: '100px' } } = props

  const { ref, inView } = useInView(options)

  useEffect(() => {
    if (inView) {
      onIntersect()
    }
  }, [inView])

  // return
  return { ref }
}
