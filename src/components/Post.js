import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { baseURL } from "../common/config";

export default function Post({ match }) {
  const [post, setPost] = useState(null);
  const getPost = async () => {
    const url = `${baseURL}/api/post/${match.params.id}`;
    const { data } = await axios.get(url);
    setPost(data);
  };
  useEffect(() => {
    getPost();
  }, []);
  return (
    <>
      <h1>{post && post.title}</h1>
      {post && <ReactMarkdown source={post.contents} />}
    </>
  );
}
