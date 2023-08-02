import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo } from "../redux/modules/todosSlice";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../firebase";

export default function Main() {
  const todos = useSelector((state) => state.todos);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);
  //user의 현 상태를 확인해서 로그인 유무를 확인하는 기능인데 이부분을 이해해서 썼다기본단 그냥 있어서 갖다 붙인것같음 피드백때 혼날께요
  return (
    <>
      <Header />
      <button
        onClick={() => {
          if (currentUser) {
            navigate("/create");
          } else {
            alert("로그인이 되어있지 않습니다.");
          }
          //만약 현재 로그인이 되어있다면 추가 페이지로 로그인이 되어있지 않다면 알람이 뜨도록 만들기
        }}
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
                navigate(`/detail/${todo.id}`);
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
                    navigate(`/edit/${todo.id}`);
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
                    alert("삭제할까?");
                    e.preventDefault();
                    dispatch(deleteTodo(todo.id));

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
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}
