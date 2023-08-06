import React, { Fragment, useEffect, useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../axios/api";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  // const [newInputs, setNewInputs] = useState({
  //   newtitle: todo?.title || "",
  //   newcontent: todo?.content || "",
  // });
  const [newInputs, setNewInputs] = useState({
    newtitle: "",
    newcontent: "",
  });
  //Cannot access 'todo' before initialization 오류메세지 이지경으로 떠서 그냥 이걸 지워버렸다...

  const 편집새로고침방지 = (e) => {
    const { value, name } = e.target;
    setNewInputs({
      ...newInputs,
      [name]: value,
    });
  };

  const queryClient = new useQueryClient();

  const { data, isLoading, isError, error } = useQuery("todos", async () => {
    const response = await api.get("/todos");
    return response.data;
  });

  //맞는 아이디값 찾아오기
  const todo = data.find((todo) => {
    return todo.id === id;
  });

  const mutation = useMutation(
    async (editedValue) => {
      await api.put(`/todos/${todo.id}`, editedValue);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );
  //편집버튼에 새함수에 모든 값을 다 넣고 mutation.mutate(editTodo)값을 넣고 추가해줌
  const EditBt = () => {
    const editTodo = {
      ...todo,
      title: newInputs.newtitle,
      content: newInputs.newcontent,
    };
    mutation.mutate(editTodo);
    navigate("/");
  };
  if (isLoading) {
    return <div>데이터 가져오는 중...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <Fragment>
      <Header />
      <Container>
        <form
          style={{
            height: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            console.log("제출!");
          }}
        >
          <div>
            <input
              placeholder="제목"
              value={newInputs.newtitle}
              name="newtitle"
              onChange={편집새로고침방지}
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
              value={newInputs.newcontent}
              onChange={편집새로고침방지}
              name="newcontent"
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
            onClick={EditBt}
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              color: "white",
              borderRadius: "12px",
              backgroundColor: "orange",
              cursor: "pointer",
            }}
          >
            수정하기
          </button>
        </form>
      </Container>
    </Fragment>
  );
}

