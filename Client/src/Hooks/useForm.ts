import { useState } from "react";
import { setLoader } from "../Redux/Reducers/authReducer";
import { useAppDispatch } from "../Redux/Store/hooks";

// some helper functions to handle forms throught my app
function useForm(state, event) {
  const dispatch = useAppDispatch();
  const [values, setValues] = useState(state);

  function handleFocus(e) {
    setValues({
      ...values,
      focus: e.target.name,
    });
  }

  //cloudinary image upload widget, no backend nedded
  function handleOpenWidget() {
    //@ts-ignore
    const myWidget: any = window.cloudinary.createUploadWidget(
      {
        cloudName: "avivglaser",
        uploadPreset: "vacation_site",
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          setValues({ ...values, image: result.info.url });
          dispatch(setLoader(false));
        } else {
          dispatch(setLoader(false));
        }
      }
    );
    myWidget.open();
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }
  function handleDates(e, name) {
    setValues({
      ...values,
      [name]: e,
    });
  }
  function handleCheckBox(e) {
    const { name } = e.target;
    setValues({
      ...values,
      [name]: e.target.checked,
    });
  }
  function fastLogin(role: string) {
    if (role === "user") {
      setValues({
        ...values,
        ["userName"]: "user@user.com",
        ["password"]: "user",
      });
    } else
      setValues({
        ...values,
        ["userName"]: "admin@admin.com",
        ["password"]: "admin",
      });
  }
  function handleSubmit(e) {
    e.preventDefault();
    event(values);
  }

  return {
    handleChange,
    handleFocus,
    handleSubmit,
    values,
    fastLogin,
    handleDates,
    handleCheckBox,
    handleOpenWidget,
  };
}

export default useForm;
