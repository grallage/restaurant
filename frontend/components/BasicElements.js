import styled from "styled-components";

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
