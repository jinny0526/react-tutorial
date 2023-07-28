import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo } from "../redux/modules/todos";

export default function Main() {
  const todos = useSelector((state) => state.todos);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const deleteTodo = (id) => {
  //   const newTodos = todos.filter((todo) => todo?.id !== id);
  //   setTodos(newTodos);
  // };

  return (
    <>
      <Header />
      <Container>
        {todos.map((todo) => (
          // map 쓰는 방법 다시 공부하기
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
