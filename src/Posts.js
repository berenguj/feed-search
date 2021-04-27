import React, { useState } from "react";
import "./App.css";

const Posts = ({ postData }) => {
  console.log("posts: " + postData);
  if (postData.length > 0) {
    return (
      <div>
        {postData.map((post) => (
          <img
            key={post.id}
            className="post"
            src={post.media_url}
            alt="description"
          />
        ))}
      </div>
    );
  } else {
    return <p>no posts :(</p>;
  }
};

export default Posts;
