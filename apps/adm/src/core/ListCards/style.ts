import styled, { css } from 'styled-components'

interface CustomImageProps {
  size?: number
  rounded?: boolean
}

export const ImageWrapper = styled.div<CustomImageProps>`
  ${({ size, theme, rounded }) => css`
    width: ${size}px;
    height: ${(size || 120) / 1.5}px;

    background-color: ${theme.palette.primary.dark};
    border-radius: ${rounded ? '50%' : '4px'};
    border: ${rounded ? `1px solid ${theme.palette.success.main}` : ''};

    margin: ${rounded ? '1rem' : '0'};
  `}
`

export const CustomImage = styled.img<CustomImageProps>`
  ${({ rounded }) => css`
    width: 100%;
    height: 100%;

    object-fit: cover;
    object-position: center;
    touch-action: manipulation;

    border-radius: ${rounded ? '50%' : '4px'};
  `}
`
