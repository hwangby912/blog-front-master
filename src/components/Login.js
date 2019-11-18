import React, { useState } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { baseURL } from "../config";

export default function Login({ setIsLoggedIn, setIsAdmin, history }) {
  const [loginState, setLoginState] = useState("init");
  const handleSubmit = async e => {
    e.preventDefault();
    const { data } = await Axios.post(`${baseURL}/auth/login`, {
      email: e.target.email.value,
      password: e.target.password.value
    });
    if (!data.result) {
      setLoginState("failed");
    } else {
      const { exp } = JSON.parse(
        atob(data.token.split(".")[1]) // base64 decoding
      );
      const expires = new Date(exp * 1000).toUTCString();
      document.cookie = `Authorization=JWT ${data.token};expires=${expires}`;
      setIsAdmin(data.admin);
      setIsLoggedIn(true);
      setLoginState("success");
    }
  };
  return (
    <>
      {loginState === "success" ? <Redirect to="/" /> : null}
      <form onSubmit={handleSubmit}>
        <small>
          {loginState === "failed" && "please check email or password"}
        </small>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => history.push("/join")}
        >
          Sign Up
        </button>
      </form>
    </>
  );
}
