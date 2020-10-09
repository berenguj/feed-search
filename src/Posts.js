import React, { useState } from "react";
import "./App.css";

const Posts = ({ postData }) => {
  if (postData.length > 0) {
    return <img src={postData[0].media_url} alt="description" />;
  } else {
    return <p>no posts :(</p>;
  }
};

export default Posts;
