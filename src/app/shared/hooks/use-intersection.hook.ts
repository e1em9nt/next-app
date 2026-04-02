import { useEffect } from 'react'
import { IntersectionOptions, useInView } from 'react-intersection-observer'

// interface
interface IProps {
  onIntersect: () => void
  options?: IntersectionOptions
}

// hook
export const useIntersection = ({ onIntersect, options = { threshold: 0.1, rootMargin: '100px' } }: IProps) => {
  const { ref, inView } = useInView(options)

  useEffect(() => {
    if (inView) {
      onIntersect()
    }
  }, [inView, onIntersect])

  // return
  return { ref }
}
