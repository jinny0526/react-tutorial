import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "react-query";
import api from "../axios/api";

export default function Main() {
  const navigate = useNavigate();

  const queryClient = new useQueryClient();

  //중복되는 부분을 따로 빼서 가져와야 혼이 안날꺼같긴한데 일단 2군데만 써서 넘어갔어요
  const user = useSelector((state) => state.user);

  const 로그인확인 = () => {
    if (!user.email) return false;
    return true;
  };

  const 작성자확인 = (author) => {
    if (user.email !== author) return false;
    return true;
  };

  const {
    isLoading,
    data: todos,
    error,
    isError,
  } = useQuery("todos", async () => {
    const response = await api.get("/todos");
    //get은 서버의 데이터를 조회할 때 사용한다.

    return response.data;
  });
  //이게 표준방법이라고 해서 일단은 그렇구나 하고 넘어감
  //api로 긴 주소 따로 빼주기

  //삭제버튼 만들기
  const mutation = useMutation(
    //Mutation : 어떤 데이터를 변경하는 것
    async (id) => {
      if (user.email !== author) {
        alert("해당 글의 작성자가 아닙니다.");
      } else if (window.confirm("삭제할까??")) {
        // 데이터베이스에서 삭제
        api.delete(`/todos/${id}`);
        //DELETE는 저장되어 있는 데이터를 삭제하고자 요청을 보낼 때 사용한다.
      }
    },
    // 데이터 추가 후 화면 바로 변경
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
        //**invalidate의 과정]**
        //Input.jsx에서 값 입력으로 인해 서버 데이터가 변경됨
        //onSuccess가 일어나면 기존의 Query인 “todos”는 무효화
        //새로운 데이터를 가져와서 “todos”를 최신화시킴
        //TodoList.jsx를 갱신함
      },
    }
  );
  if (isLoading) {
    return <div>데이터 가져오는 중...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }
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
                    mutation.mutate({ id: todo.id, author: todo.author });
                    //mutation.mutate(인자) → 한개의 변수 또는 객체
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

