import styled, { css } from 'styled-components'

interface ContainerProps {
  matches: boolean
}

export const Container = styled.div<ContainerProps>`
  width: 99vw;
  display: grid;

  ${({ matches }) =>
    matches
      ? css`
          grid-template-columns: 30vw 69vw;
        `
      : css`
    grid-template-rows: : 30vh 69vh;
  `}
`

export const Main = styled.main`
  color: var(--white);
`
