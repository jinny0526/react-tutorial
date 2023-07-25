import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { useDispatch } from "react-redux";

export default function Main({ todos }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <Header />
      <Container>
        {todos.map((todo) => (
          //  {todos.map((todo) => { return <div>{todo}</div>;})} 이부분 좀 응용했습니다... 죄송합니다
          // todos라는 배열을 각각 반복하고 그것들에 대한 것을 사용하여 새로운 배열을 만든다고 하는데 그냥 형태를 외우고 있는 것 같지 이해해서 쓰는지 잘 모르겠음
          // 다시 공부할께요
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
                //각자의 아이디값에 맞게 디테일로 넘어가게 하기 근데 왜 안넘어갈까?
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
                    //추가하기처럼 삭제기능을 가져와서 삭제하기
                    navigate("/");
                    // //메인페이지로 이동하게 만들기
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
