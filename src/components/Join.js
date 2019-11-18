import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { baseURL } from "../config";

export default function Join() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isEmailChecked, setIsEmailChecked] = useState("yet");
  const [isPasswordSame, setIsPasswordSame] = useState(false);
  const [joinResult, setJoinResult] = useState(false);
  const checkEmail = async () => {
    const { data } = await axios.get(`${baseURL}/auth/email?emai=${email}`);
    setIsEmailChecked(data.result);
  };
  return (
    <>
      <form>
        <div class="form-group">
          <label>Alias</label>
          <input
            type="email"
            class="form-control"
            placeholder="Blog username"
          />
        </div>
        <div class="form-group">
          <label>Email Address</label>
          <input
            type="email"
            class="form-control"
            placeholder="Enter Email"
            value={email}
            onChange={e => {
              setIsEmailChecked("yet");
              setEmail(e.target.value);
            }}
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={checkEmail}
          >
            Email Check
          </button>
          <small>
            {isEmailChecked === "yet"
              ? "please check duplicate"
              : isEmailChecked
              ? "This Email is available"
              : "This Email is not available"}
          </small>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setIsPasswordSame(e.target.value === password2);
            }}
          />
        </div>
        <div class="form-group">
          <label>Password check</label>
          <input
            type="password"
            class="form-control"
            placeholder="Password Check"
            value={password2}
            onChange={e => {
              setPassword2(e.target.value);
              setIsPasswordSame(e.target.value === password);
            }}
          />
        </div>
        <small>{isPasswordSame ? "password same" : "password not same"}</small>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
