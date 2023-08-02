import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { addTodo } from "../redux/modules/todosSlice";
import { auth } from "../firebase";

export default function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const 현재이메일 = auth.currentUser.email;
  //파이어베이스에 저장된 사용자의 이메일이 있는지 확인하고 있는 경우 인증된 사용자의 이메일을 띄운다.

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
                  author: 현재이메일,
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
