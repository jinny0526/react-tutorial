import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo } from "../redux/modules/todos";

export default function Main() {
  const todos = useSelector((state) => state.todos);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const 로그인확인 = () => {
    if (!user.email) return false;
    return true;
  };

  const 작성자확인 = (author) => {
    if (user.email !== author) return false;
    return true;
  };

  return (
    <>
      <Header />
      <button
        onClick={() => {
          if (!로그인확인()) {
            return alert("로그인 후 사용할 수 있습니다.");
          }
          navigate("/create");
        }}
        //만약 현재 로그인이 되어있다면 추가 페이지로 로그인이 되어있지 않다면 알람이 뜨도록 만들기
        style={{
          display: "flex",
          width: "40px",
          border: "none",
          padding: "12px",
          borderRadius: "6px",
          backgroundColor: "#78C1F3",
          color: "white",
          cursor: "pointer",
          justifyContent: "flex-end",
        }}
      >
        추가
      </button>
      <Container>
        {todos.map((todo) => (
          <div
            key={todo.id}
            style={{
              backgroundColor: "#EEEEEE",
              height: "100px",
              borderRadius: "24px",
              marginBottom: "12px",
              display: "flex",
              padding: "12px 16px 12px 16px",
              cursor: "pointer",
            }}
          >
            <div
              onClick={() => {
                if (!로그인확인()) {
                  return alert("로그인 후 사용할 수 있습니다.");
                }

                if (!작성자확인(todo.author)) {
                  return alert("작성자가 일치하지 않습니다.");
                }
                navigate(`/edit/`, {
                  state: todo,
                });
              }}
              style={{
                flex: 4,
                borderRight: "1px solid lightgrey",
              }}
            >
              <h2>{todo.title}</h2>
              {/* 각자 미리 적어놓은 값 하나하나씩 들고오기 */}
              <p
                style={{
                  width: "300px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {todo.content}
              </p>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                justifyContent: "space-around",
                gap: "12px",
              }}
            >
              <div>{todo.author}</div>
              <div>
                <button
                  onClick={() => {
                    if (!로그인확인()) {
                      return alert("로그인 후 사용할 수 있습니다.");
                    }
                    if (!작성자확인(todo.author)) {
                      return alert("작성자가 일치하지 않습니다.");
                    }
                    navigate(`/edit/${todo.id}`, {
                      state: {
                        todo,
                      },
                    });
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
                    if (!로그인확인()) {
                      return alert("로그인이 필요합니다.");
                    }
                    if (!작성자확인(todo.author)) {
                      return alert("작성자가 아닙니다.");
                    }
                    const result = window.confirm("정말로 삭제하시겠습니까?");
                    //이부분 공부해보기
                    if (result) {
                      dispatch(deleteTodo(todo.id));
                    }
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
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}
