import React, { Fragment, useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit({ todos, setTodos }) {
  //아 맨날 props 개떡같이 써 왜 똑같이 쓰질 못하니...
  const { id } = useParams();
  const navigate = useNavigate();
  const todo = todos.find((todo) => todo?.id === id);

  const [newtitle, setNewtitle] = useState(todo.title);
  const [newcontent, setNewcontent] = useState(todo.content);

  const EditTodo = () => {
    //새로운 todo값은 기존의 todo의 값을 새로운 배열인데
    //아이디가 같으면 일단 수정이 되도록 한다.
    //그 수정된 값은 일단 기존값에서 수정된 값을 대체하는 방식으로 사용된다.
    //아니면 일단 리턴해야되니까 조건문을 써야되나?
    //끝나면새로운 값이 나오게 한다.
    //값을 다가져오고... 이걸 어떻게 하지?

    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title: newtitle, content: newcontent };
        // 튜터님 이 마지막 부분은 도움 좀 받았습니다..... 이걸 대체하는 방법을 모르겠어서 다시 공부할께요
      } else return todo;
    });
    setTodos(newTodos);
    navigate("/");
  };

  //일단 수정할 부분들 값을 하나하나 가져와서 올렸고
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
        >
          <div>
            <input
              placeholder="제목"
              value={newtitle}
              onChange={(e) => {
                setNewtitle(e.target.value);
              }}
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
              value={newcontent}
              onChange={(e) => {
                setNewcontent(e.target.value);
              }}
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
            onClick={EditTodo}
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
