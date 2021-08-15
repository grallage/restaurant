import styled from "styled-components";
import { VscLoading } from "react-icons/vsc";

export const BasicInput = styled(({ isInvalid, ...props }) => (
  <input
    //   isInvalid={!!errors["student_limit"]}
    {...props}
    className={`${props.className} ${isInvalid ? "is-invalid" : ""}`}
  />
))`
  display: flex;
  align-items: center;

  &::placeholder {
    opacity: 0.4;
  }
  &.is-invalid,
  &:focus.is-invalid {
    border-color: #dc3545;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  }
  &:focus.is-invalid {
    box-shadow: 0 0 4px rgba(220, 53, 69, 0.2);
  }
`;

export const BasicTextarea = styled(({ isInvalid, ...props }) => (
  <textarea
    {...props}
    className={`${props.className} ${isInvalid ? "is-invalid" : ""}`}
  />
))`
  display: flex;
  align-items: center;

  &::placeholder {
    opacity: 0.4;
  }
  &.is-invalid,
  &:focus.is-invalid {
    border-color: #dc3545;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  }
  &:focus.is-invalid {
    box-shadow: 0 0 4px rgba(220, 53, 69, 0.2);
  }
`;

//   export const BasicInput = styled(({ children, ...props }) => (
export const BasicValidFeedback = styled.span`
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #198754;
`;
export const BasicInValidFeedback = styled(BasicValidFeedback)`
  color: #dc3545;
`;

export const BasicBtn = styled.button`
  cursor: pointer;
  &.disabled,
  &:disabled,
  fieldset:disabled & {
    pointer-events: none;
    opacity: 0.65;
  }
`;

// loading
export const Loading = styled(VscLoading)`
  animation: loading 2s infinite;
  font-size: 2.5rem;
  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingContainer = styled(({ ...props }) => (
  <div {...props} className={`${props.className}`}>
    <Loading />
  </div>
))`
  margin-top: auto;
  margin-bottom: auto;
  height: 500px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
