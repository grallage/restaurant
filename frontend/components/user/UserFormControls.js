import { useState } from "react";
import { useAxios } from "constants/AxiosConfig";
import { notify } from "constants/Notifications";
import jwt from "jsonwebtoken";

const initialFormValues = {
  // form fields
  username: "",
  email: "",

  // form status
  formSubmitted: false,
  success: false,
};

const Form = async (
  values,
  successCallback,
  errorCallback,
  errors,
  setErrors
) => {
  const { axios } = useAxios();
  const { user_id } = jwt.decode(localStorage.getItem("token"));
  let url = `${process.env.HOST}/user/${user_id}/`;
  let form = new FormData();
  form.append("username", values.username);
  form.append("email", values.email);

  return await axios({
    method: "put",
    url: url,
    data: form,
  })
    .then((response) => {
      successCallback();
    })

    .catch((error) => {
      const errorMsg = error?.response?.data?.detail;
      errorCallback(errorMsg);
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
    if ("email" in fieldValues) {
      tempErrors.email = fieldValues.email ? "" : "请填写该字段。";
    }

    setErrors({
      ...tempErrors,
    });
  };

  const handleInputValue = (e) => {
    const { name, value, checked } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
    validate({ [name]: value });
  };

  const handleSuccess = () => {
    setFormValues({
      ...formValues,
      formSubmitted: true,
      success: true,
    });
    notify.success("更新成功");
  };
  const handleError = (response) => {
    setFormValues({
      ...formValues,
      formSubmitted: true,
      success: false,
    });
    const msg = response ? response[0] : "操作失败";
    notify.error(msg);
  };

  const formIsValid = (fieldValues = formValues) => {
    const isValid =
      fieldValues.username &&
      fieldValues.email &&
      Object.values(errors).every((x) => x === "");
    return isValid;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (formIsValid()) {
      return Form(formValues, handleSuccess, handleError, errors, setErrors);
    }
  };

  return {
    formValues,
    setFormValues,
    errors,
    handleInputValue,
    handleFormSubmit,
    formIsValid,
  };
};
