import styled from "styled-components";
import {
  BasicInput,
  BasicInValidFeedback,
  BasicBtn,
  BasicTextarea,
} from "components/BasicElements";

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.light};
`;

export const Wrapper = styled.div`
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  padding-top: ${({ theme }) => theme.navbar.height};
  padding-bottom: ${({ theme }) => theme.navbar.height};

  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

export const UserForm = styled.div`
  background: white;
  width: 70%;
  box-shadow: 0 3px 8px rgb(56 125 255 / 17%);
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 2rem 0 2rem;
  max-width: ${({ theme }) => theme.breakpoints.sm};
`;

export const FormTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.3rem;
  /* letter-spacing: 10px; */
`;

// export const FormBody = styled.ul`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   list-style: none;
// `;

export const InputGroup = styled.div`
  width: 70%;
  margin-top: 1.5rem;
`;

// export const Input = styled.input`
export const Input = styled(BasicInput)`
  font-size: 1.2rem;
  border-radius: 0.25rem;
  padding: 0.375rem 1.1rem;
  line-height: 1.5;
  background-color: #fff;
  border: 1px solid #ced4da;
  width: 100%;

  /* background: ${({ theme }) => theme.colors.light}; */
  background: white;
  color: ${({ theme }) => theme.colors.gray};

  height: 3.2rem;
`;
export const InValidFeedback = styled(BasicInValidFeedback)``;

export const BtnGroup = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
`;
export const Btn = styled(BasicBtn)`
  width: 100%;
  height: 3rem;
  border-radius: 8px;

  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: solid 1px ${({ theme }) => theme.colors.primary};
  font-size: 1.1rem;
  letter-spacing: 3px;

  &.opposite {
    color: ${({ theme }) => theme.colors.primary};
    background: white;
    border: solid 1px ${({ theme }) => theme.colors.primary};
  }
`;
