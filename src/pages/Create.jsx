import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { addTodo } from "../redux/modules/todos";

export default function Create() {
  const user = useSelector((state) => state.user);
  const [ctinputs, setCtInputs] = useState({
    title: "",
    content: "",
  });
  //밑의 두개를 합쳐서 사용할 수 있는 것을 기억하자!!
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const 추가새고방지 = (e) => {
    const { value, name } = e.target;
    setCtInputs({
      ...ctinputs,
      [name]: value,
    });
  };

  //이렇게 두개를 합쳐서 사용하는건 사실 생각안해봤는데 공부 다시 해봐야겠다.
  //onChange={(e) => {setTitle(e.target.value);}}
  //항상 이런 방식으로 그냥 하나하나 만들어서 사용했는데 앞으론 위로 다 빼서 써봐야겠다.

  // const 현재이메일 = auth.currentUser.email;
  // //파이어베이스에 저장된 사용자의 이메일이 있는지 확인하고 있는 경우 인증된 사용자의 이메일을 띄운다.

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
            dispatch(
              addTodo({
                id: nanoid(),
                author: user.email,
                ...ctinputs,
              })
            );
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
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                addTodo({
                  id: nanoid(),
                  author: user.email,
                  ...ctinputs,
                })
              );

              navigate("/");
            }}
          >
            추가하기
          </button>
        </form>
      </Container>
    </>
  );
}
