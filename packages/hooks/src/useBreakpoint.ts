import React from 'react'

type Breakpoint = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type BreakpointStore = Record<Breakpoint, boolean>
type BreakpointReducerAction = Partial<BreakpointStore>

const initialState: BreakpointStore = {
  xxs: false,
  xs: false,
  lg: false,
  md: false,
  sm: false,
  xl: false,
}

const reducer: React.Reducer<BreakpointStore, BreakpointReducerAction> = (
  state,
  action
) => {
  const equals = Object.entries(action)
    .map(([screen, matches]) => state[screen as Breakpoint] === matches)
    .reduce((a, b) => a && b, true)

  if (equals) return state

  return { ...state, ...action }
}

const screens = {
  xxs: '(min-width: 480px)',
  xs: '(min-width: 560px)',
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
}

export function useBreakpoint() {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useLayoutEffect(() => {
    const events: [MediaQueryList, (a: any) => void][] = Object.entries(
      screens
    ).map(([screen, query]) => {
      const media = window.matchMedia(query)
      dispatch({ [screen]: media.matches })

      const handler = ({ matches }: any) => dispatch({ [screen]: matches })

      media.addEventListener('change', handler)
      return [media, handler]
    })

    return () => {
      events.forEach(([media, handler]) =>
        media.removeEventListener('change', handler)
      )
    }
  }, [])

  return state
}
