import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { baseURL } from "../common/config";

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

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isEmailChecked || isEmailChecked === "yet") {
      alert("Please dupliacte email check!");
      return;
    }
    if (!isPasswordSame) {
      alert("Check password");
      return;
    }
    if (!e.target.name.value || !email || !password) {
      alert("All field is required!");
      return;
    }
    const { data } = await axios.post(`${baseURL}/auth/join`, {
      name: e.target.name.value,
      email,
      password
    });
    if (data.result) {
      setJoinResult(true);
    } else {
      alert("Join failed please call admin");
    }
  };

  return (
    <>
      {joinResult && <Redirect to="/login" />}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="username"
          />
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
            Email Duplicate Address
          </button>
          <small>
            {isEmailChecked === "yet"
              ? "please duplicate check"
              : isEmailChecked
              ? "It is available"
              : "It is not available"}
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
        <small>
          {isPasswordSame ? "Password Correct!" : "Password Not Correct"}
        </small>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
