import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { addTodo } from "../redux/modules/todosSlice";

export default function Create() {
  // const todos = useSelector((state) => state.todos);
  // 안쓰는거 문제 없는지 확인해보기
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <Header />
      <Container>
        <form
          style={{
            height: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <div>
            <input
              placeholder="제목"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              style={{
                width: "100%",
                height: "60px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "8px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div
            style={{
              height: "400px",
            }}
          >
            <textarea
              placeholder="내용"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              style={{
                resize: "none",
                height: "100%",
                width: "100%",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "12px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              color: "white",
              borderRadius: "12px",
              backgroundColor: "skyblue",
              cursor: "pointer",
            }}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                addTodo({
                  id: nanoid(),
                  title: title,
                  content: content,
                  author: "",
                })
              );

              navigate("/");
            }}
          >
            추가하기
          </button>
        </form>
      </Container>
    </>
  );
}
