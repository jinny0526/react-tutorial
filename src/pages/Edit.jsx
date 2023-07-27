import React, { Fragment, useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EDIT_TODO } from "../redux/modules/todos";

export default function Edit() {
  const todos = useSelector((state) => state.todos);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todo = todos.find((todo) => todo?.id === id);

  const [newtitle, setNewtitle] = useState(todo.title);
  const [newcontent, setNewcontent] = useState(todo.content);

  const EditTodo = (e) => {
    e.preventDefault();
    dispatch(
      EDIT_TODO({
        id: todo.id,
        changes: {
          title: newtitle,
          content: newcontent,
        },
      })
    );
    navigate("/");
  };
  //근데 이거 밑에 뒀더니 e.preventDefault()랑 navigate("/"); 안넣어져서 따로 뺏는데 이부분 잘 모르겠어요..
  //나머진 아이디값 넣고 바뀌는 부분 넣고 기능 가져와서 해결!

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
