import { auth } from "firebase";
import React, { useState } from "react";

const InputField = ({
  type,
  labelText,
  name,
  classOptional,
  placeholder,
  value,
  f,
}) => {
  return (
    <div className={classOptional}>
      <label>{labelText}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => f(e)}
      />
    </div>
  );
};

export const Authentication = () => {
  const [isSignInOrRegister, setIsSignInOrRegister] = useState("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const logUser = (email, password) => {
    if (isSignInOrRegister === "signIn") {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((e) => (window.location.pathname = "/"))
        .catch(function (error) {
          console.log(error);
          setError(error);
        });
    }

    if (isSignInOrRegister === "register") {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((e) => (window.location.pathname = "/"))
        .catch(function (error) {
          console.log(error);
          setError(error);
        });
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  const LabelButtons = ({ label, sectionName }) => (
    <button
      className={isSignInOrRegister === sectionName ? "btn-active" : ""}
      onClick={() => setIsSignInOrRegister(sectionName)}
    >
      {label}
    </button>
  );

  return (
    <div className="form-container">
      <div>
        <div className="btns-group">
          <LabelButtons label={"sign in"} sectionName={"signIn"} />
          <LabelButtons label={"register"} sectionName={"register"} />
        </div>
        <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
          {error !== null && (
            <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
              {error}
            </div>
          )}
          <form className="form">
            <InputField
              type="email"
              classOptional="input-field"
              name="userEmail"
              value={email}
              placeholder="E.g: faruq123@gmail.com"
              f={onChangeHandler}
              labelText="email"
            />
            <InputField
              type="password"
              classOptional="input-field"
              name="userPassword"
              value={password}
              placeholder="Your Password"
              f={onChangeHandler}
              labelText="password"
            />
            <button
              className="btn-submit"
              onClick={(event) => {
                event.preventDefault();
                logUser(email, password);
              }}
            >
              {isSignInOrRegister === "signIn" ? "Sign in" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
