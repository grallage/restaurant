import { useState } from "react";
import { useAxios } from "constants/AxiosConfig";
// import axios from "axios";
import { notify } from "constants/Notifications";
import { signIn } from "next-auth/client";

const initialFormValues = {
  // form fields
  phone: "",
  deliveryAddress: "",
  remark: "",
  carts: [],

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
  let url = `${process.env.NEXT_PUBLIC_HOST}/create-checkout-session/`;
  let form = new FormData();
  form.append("phone", values.phone);
  form.append("deliveryAddress", values.deliveryAddress);
  form.append("remark", values.remark);
  form.append("carts", JSON.stringify(values.carts));
  console.log("##axios carts", JSON.stringify(values.carts));

  return await axios({
    method: "post",
    url: url,
    data: form,
  })
    .then((response) => {
      console.log("## response", response);
      console.log("## response.status", response.status);

      // console.log("## response.data", response.data);
      console.log("## response.data.url", response.data.url);
      console.log("## response.data.id", response.data.sid);
      window.location.href = response.data.url;
      // successCallback();
    })

    .catch((error) => {
      console.log("## error", error);
      console.log("## error.status", error.status);
      console.log("## error.response", error?.response);
      // console.log("## error.response.data", error?.response?.data);
      console.log(
        "## error.response.data.location",
        error?.response?.data?.location
      );
      //   error.response.data
      errorCallback(error.response);
      return false;
    });
};

export const useFormControls = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});

  const validate = (fieldValues = formValues) => {
    let tempErrors = { ...errors };
    if ("phone" in fieldValues) {
      tempErrors.phone = fieldValues.phone ? "" : "请填写该字段。";
    }
    if ("deliveryAddress" in fieldValues) {
      tempErrors.deliveryAddress = fieldValues.deliveryAddress
        ? ""
        : "请填写该字段。";
    }
    // if ("remark" in fieldValues) {
    //   tempErrors.remark = fieldValues.remark ? "" : "请填写该字段。";
    // }

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
      ...initialFormValues,
      formSubmitted: true,
      success: true,
    });
    notify.success("订餐成功，请留意派送电话。");
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
      fieldValues.phone &&
      //   fieldValues.remark &&
      fieldValues.deliveryAddress &&
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
