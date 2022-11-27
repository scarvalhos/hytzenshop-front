import styled from 'styled-components'

export const TextArea = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  background: none;
  color: ${({ theme, disabled }) =>
    disabled ? theme.palette.text.disabled : theme.palette.text.primary};
  font-size: 0.875rem;
  font-weight: 300;
  resize: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'default')};
`
