import React, { useEffect, useState } from "react";
import { useAxios } from "constants/AxiosConfig";
import { useAuth } from "constants/Hooks";
import jwt from "jsonwebtoken";
import { LoadingContainer } from "components/BasicElements";
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
  const { session } = useAuth();
  const { axios } = useAxios();
  const [loading, setLoading] = useState(true);
  const {
    formValues,
    setFormValues,
    errors,
    handleInputValue,
    handleFormSubmit,
    formIsValid,
  } = useFormControls();

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const token = session.accessToken;
    if (token) {
      const { user_id } = jwt.decode(token);

      axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_HOST}/user/${user_id}/`,
      }).then((data) => {
        setFormValues({
          ...formValues,
          username: data.data.username,
          email: data.data.email,
        });
        setLoading(false);
      });
    }
  }, [session.accessToken]);
  return (
    <>
      {loading && <LoadingContainer />}
      {!loading && (
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
      )}
    </>
  );
};

export default UserSection;
