import { useState } from "react";
import { getContract } from "../configureWarpClient";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";

export default function CreatePostComponent() {
  const [post, updatePost] = useState({
    id: "",
    title: "",
    content: "",
  });

  const router = useRouter();

  async function createPost() {
    if (!post.title || !post.content) return;
    post.id = uuid();
    const contract = await getContract();
    try {
      const result = await contract.writeInteraction({
        function: "createPost",
        post,
      });
      console.log("result: ", result);
      router.push(`/`);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div style={formContainerStyle}>
      <input
        value={post.title}
        onChange={(e) => updatePost({ ...post, title: e.target.value })}
        placeholder="Title"
        style={inputStyle}
      />

      <textarea
        value={post.content}
        onChange={(e) => updatePost({ ...post, content: e.target.value })}
        placeholder="Content"
        style={textAreaStyle}
      />
      <button style={buttonStyle} onClick={createPost}>
        Create Post
      </button>
    </div>
  );
}

const formContainerStyle = {
  width: "900px",
  margin: "0 auto",
  display: "flex",
  FlexDirection: "column",
  alignItems: "flex-start",
};

const inputStyle = {
  width: "300px",
  padding: "8px",
  fontSize: "18px",
  border: "none",
  outline: "none",
  marginBottom: "20px",
};

const textAreaStyle = {
  width: "100%",
  height: "300px",
  marginBottom: "20px",
  padding: "20px",
};

const buttonStyle = {
  width: "200px",
  padding: "10px 0px",
};
