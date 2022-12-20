import styled, { css } from 'styled-components'

import { FormLabel } from '@mui/material'

interface DropContainerProps {
  isDragActive: boolean
  isDragReject: boolean
  erro?: string
}

interface FieldLabelProps {
  variant?: string
  erro?: string
}

interface PreviewProps {
  src?: string
  size?: string
  loading?: boolean
}

export const DropContainer = styled.div<DropContainerProps>`
  border: 1px dashed #2d2d31;
  border-radius: 8px;
  cursor: pointer;
  transition: height 0.2s ease;

  text-align: center;

  padding: 1.75rem 2rem;

  & p {
    margin: 0;
    color: ${({ theme }) => theme.palette.text.primary};
  }

  ${({ isDragActive }) =>
    isDragActive &&
    css`
      border-color: ${({ theme }) => theme.palette.success.main};
    `}

  ${({ isDragReject, erro }) =>
    (isDragReject || !!erro) &&
    css`
      border-color: ${({ theme }) => theme.palette.primary.main};
    `}
`

export const FieldLabel = styled(FormLabel)<FieldLabelProps>`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 1rem;
  font-weight: 500;

  ${({ erro }) =>
    !!erro &&
    css`
      color: ${({ theme }) => theme.palette.primary.main};
    `}
`

// <FileList />

export const Container = styled.div`
  margin: 1.25rem 0;
  width: 100%;

  display: grid;
  grid-template-columns: 1f 42px;

  li {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.palette.text.primary};

    background: ${({ theme }) => theme.palette.secondary.dark};
    padding: 6px;
    margin-top: 6px;
    border-radius: 4px;

    button {
      border: 0;
      background: transparent;
      color: ${({ theme }) => theme.palette.primary.main};
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  div {
    display: flex;
    flex-direction: column;
    word-break: break-all;

    strong {
      font-size: 0.875rem;
    }

    span {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.palette.text.secondary};
      margin-top: 0.25rem;
    }
  }
`

export const Preview = styled.div<PreviewProps>`
  width: ${({ size }) => size || '42px'};
  height: ${({ size }) => size || '42px'};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ loading }) =>
    loading &&
    css`
      &::before {
        content: ' ';

        position: absolute;
        left: 0;
        top: 0;

        width: 100%;
        height: 100%;
        border-radius: 4px;
        opacity: 0.6;

        background: #000000;
        z-index: 1;

        transition: 0.2s;
      }
    `}
`
