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
    const { data } = await axios.get(`${baseURL}/auth/email?email=${email}`);
    setIsEmailChecked(data.result);
  };

  return (
    <>
      <form>
        <div className="form-group">
          <label>Alias</label>
          <input type="text" className="form-control" placeholder="username" />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
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
            Email Duplicate Check
          </button>
          <small>
            {isEmailChecked === "yet"
              ? "duplicate check"
              : isEmailChecked
              ? "Email Address Available"
              : "Email Address Not Available"}
          </small>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setIsPasswordSame(e.target.value === password2);
            }}
          />
        </div>
        <div className="form-group">
          <label>Password Check</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password Check"
            value={password2}
            onChange={e => {
              setPassword2(e.target.value);
              setIsPasswordSame(e.target.value === password);
            }}
          />
        </div>
        <small>{isPasswordSame ? "Password Same" : "Password Not Same"}</small>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
