import { useState } from "react";
import { useAxios } from "constants/AxiosConfig";
// import axios from "axios";
import { notify } from "constants/Notifications";
import { signIn } from "next-auth/client";

const initialFormValues = {
  // form fields
  username: "",
  password: "",
  email: "",

  // form status
  formSubmitted: false,
  success: false,
};

const SigninForm = async (values, successCallback, errorCallback) => {
  const response = await signIn("credentials", {
    redirect: false,
    username: values.username,
    password: values.password,
    email: values.email,
  });
  console.log("登录结果:", response);
  if (response?.error) {
    errorCallback("登录信息错误");
    return false;
  } else {
    successCallback({ formType: "signin" });
    return true;
  }
};

const SignupForm = async (
  values,
  successCallback,
  errorCallback,
  errors,
  setErrors
) => {
  const { axios } = useAxios();
  let url = `${process.env.NEXT_PUBLIC_HOST}/dj-rest-auth/registration/`;
  let form = new FormData();
  form.append("username", values.username);
  form.append("password1", values.password);
  form.append("password2", values.password);
  form.append("email", values.email);

  return await axios({
    method: "post",
    url: url,
    data: form,
  })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .then((json) => {
      //   successCallback({ formType: "signup" });
      return SigninForm(values, successCallback, errorCallback);
    })
    .catch((error) => {
      const errorsMsg = {};
      for (const [key, value] of Object.entries(error.response.data)) {
        console.log(`${key}: ${value}`);
        if (key === "username") {
          errorsMsg[key] = "用户名重复";
        }
        if (key === "email") {
          errorsMsg.email = value;
        }
      }
      if (errorsMsg) {
        setErrors({
          ...errors,
          ...errorsMsg,
        });
      }

      //   errorCallback(error.response);
      return false;
    });
};

export const useFormControls = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});

  const validate = (fieldValues = formValues) => {
    let tempErrors = { ...errors };
    if ("username" in fieldValues) {
      tempErrors.username = fieldValues.username ? "" : "请填写该字段。";
    }
    if ("password" in fieldValues) {
      tempErrors.password = fieldValues.password ? "" : "请填写该字段。";
    }
    if ("email" in fieldValues) {
      tempErrors.email = fieldValues.email ? "" : "请填写该字段。";
    }

    setErrors({
      ...tempErrors,
    });
  };

  const handleInputValue = (e) => {
    const { name, value, checked } = e.target;
    const nameValue = name === "is_active" ? checked : value;
    setFormValues({
      ...formValues,
      [name]: nameValue,
    });
    validate({ [name]: nameValue });
  };

  const handleSuccess = ({ formType }) => {
    if (formType === "signup") {
      setFormValues({
        ...initialFormValues,
        formSubmitted: true,
        success: true,
      });
      notify.success("欢迎！");
    } else {
      setFormValues({
        formSubmitted: true,
        success: true,
      });
      notify.success("欢迎！");
    }
  };
  const handleError = (response) => {
    setFormValues({
      ...formValues,
      formSubmitted: true,
      success: false,
    });
    const msg = response ? response : "操作失败";
    notify.error(msg);
  };

  const formIsValid = (fieldValues = formValues) => {
    const isValid =
      fieldValues.username &&
      fieldValues.email &&
      fieldValues.password &&
      Object.values(errors).every((x) => x === "");
    return isValid;
  };

  const handleSigninFormSubmit = async (e) => {
    e.preventDefault();
    if (formIsValid()) {
      return SigninForm(formValues, handleSuccess, handleError);
    }
  };
  const handleSignupFormSubmit = async (e) => {
    e.preventDefault();
    if (formIsValid()) {
      return SignupForm(
        formValues,
        handleSuccess,
        handleError,
        errors,
        setErrors
      );
    }
  };

  return {
    formValues,
    setFormValues,
    errors,
    handleInputValue,
    handleSigninFormSubmit,
    handleSignupFormSubmit,
    formIsValid,
  };
};
