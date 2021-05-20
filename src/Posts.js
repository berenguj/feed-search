import React, { useState } from "react";
import "./App.css";

const Posts = ({ postData }) => {
  if (postData.length > 0) {
    return (
      <div>
        {postData.map((post) => (
          <a href={post.permalink}>
            <img
              key={post.id}
              className="post"
              src={post.media_url}
              alt="description"
            />
          </a>
        ))}
      </div>
    );
  } else {
    return <p>no posts :(</p>;
  }
};

export default Posts;
