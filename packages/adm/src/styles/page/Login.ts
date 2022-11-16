import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Form = styled.form`
  width: 420px;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin-top: 2rem;
  margin-bottom: 3rem;
  border-radius: 4px;

  background: ${({ theme }) => theme.palette.secondary.dark};
`

export const Label = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.palette.primary.light};
  font-weight: 500;
`

export const Input = styled.input`
  padding: 1rem;
  border: none;
  outline: none;
  color: white;
  border-radius: 4px;
  margin: 10px 0;
  font-size: 0.875rem;
  font-weight: 300;

  background: linear-gradient(
    186.62deg,
    rgba(221, 218, 255, 0.06) 10%,
    rgba(217, 214, 252, 0.03) 30%
  );

  background-blend-mode: overlay;
  backdrop-filter: blur(10px);

  border: 2px solid rgba(200, 200, 200, 0.02);
  box-shadow: 0px 0px 79px 3px #0000000d;

  &::placeholder {
    color: ${({ theme }) => theme.palette.primary.contrastText};
  }
`

export const InputWrapper = styled.div`
  padding: 1rem;
  border: none;
  outline: none;
  color: white;
  border-radius: 4px;
  margin: 10px 0;
  font-size: 0.875rem;
  font-weight: 300;

  background: linear-gradient(
    186.62deg,
    rgba(221, 218, 255, 0.06) 10%,
    rgba(217, 214, 252, 0.03) 30%
  );

  background-blend-mode: overlay;
  backdrop-filter: blur(10px);

  border: 2px solid rgba(200, 200, 200, 0.02);
  box-shadow: 0px 0px 79px 3px #0000000d;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Register = styled.p`
  color: ${({ theme }) => theme.palette.success.main};
  font-weight: 400;
  font-size: 0.8rem;
  text-align: right;
  margin-left: 2rem;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`
