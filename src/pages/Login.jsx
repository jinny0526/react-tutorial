import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const signInFunc = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("이메일과 비밀번호 둘다 입력해주세요");
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      //const user = userCredential.user;
      // //유저의 정보를 추가하는 법 근데 안쓰더라...
      // dispatch(
      //   addCurrentUser({
      //     currentUser: {
      //       name: "nickname",
      //     },
      //     isLogin: true,
      //   })
      // );

      navigate("/");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/user-not-found") {
        alert("해당 이메일에 대한 계정이 없습니다.");
      } else if (error.code === "auth/wrong-password") {
        alert("비밀번호가 일치하지 않습니다.");
      } else {
        alert("무엇이 문제인지 파악되지않았으니 기다려주세요.");
        //파이어베이스가 잘못된 경우도 있을 수 있음 ,공식문서보고 더 찾아서 넣기
      }
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "600px",
            alignItems: "center",
          }}
        >
          <form>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                placeholder="이메일"
                value={email}
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                placeholder="비밀번호"
                value={password}
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <button
                style={{
                  width: "100%",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#78C1F3",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={signInFunc}
              >
                로그인하기
              </button>
            </div>
            <div
              style={{
                width: "360px",
              }}
            >
              <button
                style={{
                  width: "100%",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#FF6969",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/Signup");
                }}
              >
                회원가입하러 가기
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
