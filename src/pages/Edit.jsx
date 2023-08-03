import React, { Fragment, useEffect, useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editTodo } from "../redux/modules/todos";

export default function Edit() {
  const todos = useSelector((state) => state.todos);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todo = todos.find((todo) => todo?.id === id);

  //or 연산자 알아보기 근데 이부분은 여전히 잘 모르겠음...

  // const [newtitle, setNewtitle] = useState(todo?.title);
  // const [newcontent, setNewcontent] = useState(todo?.content);
  //밑을 아래로 바꾸고 합쳐보기인데 or 연산자를 어떻게 사용하는지 이제야 이해함
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

  const EditBt = () => {
    const newTodo = {
      ...todo,
      title: newInputs.newtitle,
      content: newInputs.newcontent,
    };
    dispatch(editTodo(newTodo));
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
