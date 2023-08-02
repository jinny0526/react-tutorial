import React, { Fragment, useEffect, useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editTodo } from "../redux/modules/todosSlice";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../firebase";

export default function Edit() {
  const todos = useSelector((state) => state.todos);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todo = todos.find((todo) => todo.id === id);
  //or 연산자 알아보기 근데 이부분은 여전히 잘 모르겠음...
  const [newtitle, setNewtitle] = useState(todo?.title);
  const [newcontent, setNewcontent] = useState(todo?.content);

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail("");
      }
    });
    //로그인이 되면 현재이메일을 표시하게 아니면 그냥 아무것도 뜨지않게 하기
  }, []);
  //useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     setCurrentUser(user);
  //   });
  // }, []); 이부분 그대로 가져와서 좀 바꿈
  const EditTodo = (e) => {
    e.preventDefault();
    if (userEmail === todo.author) {
      //게시물의 author가 로그인한 이메일과 일치할 경우
      dispatch(
        editTodo({
          id: todo.id,
          changes: {
            title: newtitle,
            content: newcontent,
          },
        })
      );
      navigate("/");
    } else {
      //아닐 경우
      alert("게시물 작성자만 수정할 수 있습니다.");
    }
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
