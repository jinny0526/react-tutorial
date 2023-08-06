import React, { Fragment, useEffect, useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import api from "../axios/api";

export default function Edit() {
  const todos = useSelector((state) => state.todos);
  const { id } = useParams();
  const navigate = useNavigate();

  const todo = todos.find((todo) => todo?.id === id);
  const [newInputs, setNewInputs] = useState({
    newtitle: todo?.title || "",
    newcontent: todo?.content || "",
  });

  const 편집새로고침방지 = (e) => {
    const { value, name } = e.target;
    setNewInputs({
      ...newInputs,
      [name]: value,
    });
  };

  const queryClient = new useQueryClient();

  const mutation = useMutation(
    async (editedValue) => {
      await api.put(`/todos/${state?.todo.id}`, editedValue);
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
