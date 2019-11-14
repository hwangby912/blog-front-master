import React from "react";
import { Link } from "react-router-dom";

export default function Main({ posts }) {
  return (
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          {posts &&
            posts.map(post => (
              <div className="post-preview">
                <Link to={`/post/${post._id}`}>
                  <h2 className="post-title">{post.title}</h2>
                </Link>
                <p className="post-meta">{post.date}</p>
              </div>
            ))}
          <div class="clearfix">
            <a class="btn btn-primary float-right" href="#">
              Older Posts &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
