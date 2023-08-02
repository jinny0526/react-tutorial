import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo } from "../redux/modules/todosSlice";

export default function Detail() {
  const todos = useSelector((state) => state.todos);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const todo = todos.find((todo) => todo.id === id);
  const userEmail = useSelector((state) => state.user.userEmail);
  return (
    <>
      <Header />
      <Container>
        <h1
          style={{
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {todo.title}
          {/* 여기가 없을 수도 있다. */}
        </h1>
        <div
          style={{
            height: "400px",
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {todo.content}
        </div>
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <button
            onClick={() => {
              if (userEmail === todo.author) {
                navigate(`/edit/${todo.id}`);
              } else {
                alert("작성자가 아니니 로그인해주세요.");
              }
            }}
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "orange",
              color: "white",
              cursor: "pointer",
              marginRight: "6px",
            }}
          >
            수정
          </button>
          <button
            onClick={(e) => {
              if (userEmail === todo.author) {
                alert("삭제할까?");
                e.preventDefault();
                dispatch(deleteTodo(todo.id));
              } else {
                alert("작성자가 아니니 로그인해주세요.");
              }
              //추가하기처럼 삭제기능을 가져와서 삭제하기
            }}
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "red",
              color: "white",
              cursor: "pointer",
            }}
          >
            삭제
          </button>
        </div>
      </Container>
    </>
  );
}
