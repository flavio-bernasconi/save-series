import { auth } from "firebase";
import React, { useEffect, useState } from "react";

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
    <>
      <label className="block">{labelText}</label>
      <input
        type={type}
        className={classOptional}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => f(e)}
      />
    </>
  );
};

export const Authentication = () => {
  const [isSignInOrRegister, setIsSignInOrRegister] = useState("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const logUser = (email, password) => {
    if (isSignInOrRegister === "in") {
      auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function (error) {
          console.log(error);
          setError(error);
        });
    }

    if (isSignInOrRegister === "register") {
      auth()
        .createUserWithEmailAndPassword(email, password)
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

  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign</h1>
      <button
        className={isSignInOrRegister === "in" ? "btn-active" : ""}
        onClick={() => setIsSignInOrRegister("in")}
      >
        sing in
      </button>
      <button
        className={isSignInOrRegister === "register" ? "btn-active" : ""}
        onClick={() => setIsSignInOrRegister("register")}
      >
        register
      </button>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
        <form className="">
          <InputField
            type="email"
            className="my-1 p-1 w-full"
            name="userEmail"
            value={email}
            placeholder="E.g: faruq123@gmail.com"
            f={onChangeHandler}
            labelText="email"
          />
          <InputField
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            f={onChangeHandler}
            labelText="password"
          />
          <button
            className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
            onClick={(event) => {
              event.preventDefault();
              logUser(email, password);
            }}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};
