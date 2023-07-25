import React, { Fragment, useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Edit(todos) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todo = todos.find((todo) => todo.id === id);
  // 이부분 진짜 모르겠어서 포기 전혀 왜 이러는지 모르겠음
  //여기를 아예 확인할 수가 없어서 일단은 각자 값을 하나하나 넣으주고 이게 맞는지도 모르겠고.. 일단 아는 한에있어서는 다 풀었습니다.. 뒤는 몰라요...
  const [title, setTitle] = useState(todo.title);
  const [content, setContent] = useState(todo.content);

  const EditResult = (e) => {
    e.preventDefault();
    dispatch({
      type: "EDIT_TODO",
      payload: {
        id: todo.id,
        changes: {
          title,
          content,
        },
      },
    });
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
            onSubmit={EditResult} // 밑에 하나 넣어줐어요
          >
            <div>
              <input
                placeholder="제목"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
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
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
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
  };
}
