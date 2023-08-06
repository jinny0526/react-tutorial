import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "react-query";
import api from "../axios/api";

export default function Create() {
  const queryClient = new useQueryClient();

  const user = useSelector((state) => state.user);
  //메인하고 같은 방식을 사용해서  전체값을 들고오고 해오기 근데 방식이 비슷해서 굳이 설명안적어도 될 것 같음.

  const mutation = useMutation(
    async (newTodo) => {
      await api.post("/todos", newTodo);
      //axios.post(url[, data[, config]])   // POST
      //post는 보통 서버에 데이터를 추가할 때 사용
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  const [ctinputs, setCtInputs] = useState({
    title: "",
    content: "",
  });

  //이부분은 그냥 합쳐서 만듬
  const navigate = useNavigate();
  const 추가새고방지 = (e) => {
    const { value, name } = e.target;
    setCtInputs({
      ...ctinputs,
      [name]: value,
    });
  };

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
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate({
              id: nanoid(),
              author: user.email,
              ...ctinputs,
            });
            navigate("/");
          }}
        >
          <div>
            <input
              placeholder="제목"
              value={ctinputs.title}
              onChange={추가새고방지}
              name="title"
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
              value={ctinputs.content}
              onChange={추가새고방지}
              name="content"
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
          >
            추가하기
          </button>
        </form>
      </Container>
    </>
  );
}
