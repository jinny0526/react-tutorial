import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Detail({ todos }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  // url의 id값이 달라지면 각자 다른 걸 보이게 하기 위해선 써야된다는데
  const todo = todos.find((todo) => todo.id === id);
  // id값이 일치하면 보여주고 아니면 안보여주는 것 find자체가 만족하는 하나를 찾는거니까 아이디값이 일치할때마다 그 일치하는 값을 보여주기. 근데 이게 맞겠지?

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
              navigate("/edit");
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
            onClick={() => {
              dispatch({
                type: "DELETE_TODO",
                payload: todo.id,
              });
              navigate("/");
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
