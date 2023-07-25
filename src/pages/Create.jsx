import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <Header />
      <Container>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("제출!");
            dispatch({
              type: "NEW_TODO",
              payload: {
                id: nanoid(),
                title: title,
                content: content,
              },
            });
          }}
          //특정동작을 선택해야되기에 onsumbit 사용
          //dipatch로 모듈스에 액션값을 불러올 수 있어서 가져온 후 필요한 값을 모두 적어준뒤 적용시킴
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
            type="submit"
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              color: "white",
              borderRadius: "12px",
              backgroundColor: "skyblue",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
              //홈화면으로 가는거 같이 넣기
              //type="submit" 전송 기능을 담당한다는 거 배웠음 처음에 왜 홈화면 이동만 하면 추가하기 기능이 되지 않아서 뭐지뭐지했는데 type 지정을 안해서... 자랑스럽게 모름
            }}
          >
            추가하기
          </button>
        </form>
      </Container>
    </>
  );
}
