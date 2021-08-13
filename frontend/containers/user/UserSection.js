import React, { useEffect } from "react";
import { useAxios } from "constants/AxiosConfig";
import jwt from "jsonwebtoken";
import {
  Container,
  Wrapper,
  UserForm,
  FormTitle,
  BtnGroup,
  InputGroup,
  InValidFeedback,
  Input,
  Btn,
} from "components/user/UserElements";
import { useFormControls } from "components/user/UserFormControls";

const UserSection = () => {
  const { axios } = useAxios();
  const {
    formValues,
    setFormValues,
    errors,
    handleInputValue,
    handleFormSubmit,
    formIsValid,
  } = useFormControls();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { user_id } = jwt.decode(token);

      axios({
        method: "get",
        url: `${process.env.HOST}/user/${user_id}/`,
      }).then((data) => {
        setFormValues({
          ...formValues,
          username: data.data.username,
          email: data.data.email,
        });
      });
    }
  }, []);
  return (
    <Container>
      <Wrapper>
        <UserForm>
          <FormTitle>更新用户信息</FormTitle>

          <InputGroup>
            <Input
              name="username"
              type="text"
              placeholder="昵称"
              value={formValues.username}
              onChange={handleInputValue}
              onBlur={handleInputValue}
              isInvalid={!!errors["username"]}
            />
            <InValidFeedback>{errors["username"]}</InValidFeedback>
          </InputGroup>
          <InputGroup>
            <Input
              name="email"
              type="email"
              placeholder="邮箱"
              value={formValues.email}
              onChange={handleInputValue}
              onBlur={handleInputValue}
              isInvalid={!!errors["email"]}
            />
            <InValidFeedback>{errors["email"]}</InValidFeedback>
          </InputGroup>
          <BtnGroup>
            <Btn
              type="button"
              onClick={handleFormSubmit}
              disabled={!formIsValid()}
            >
              更新
            </Btn>
          </BtnGroup>
        </UserForm>
      </Wrapper>
    </Container>
  );
};

export default UserSection;
