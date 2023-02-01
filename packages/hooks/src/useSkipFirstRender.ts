import React from 'react'

export const useSkipFirstRender = (
  callback: React.EffectCallback,
  dependencies: React.DependencyList
) => {
  const firstRenderRef = React.useRef(true)

  React.useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
    } else {
      callback()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, ...dependencies])
}
