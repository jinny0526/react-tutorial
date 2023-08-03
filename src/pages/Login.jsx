import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
  });
  const 로그인새고방지 = (e) => {
    const { value, name } = e.target;
    setUserInputs({
      ...userInputs,
      [name]: value,
    });
  };

  const isValidForm = () => {
    if (!userInputs.email) {
      alert("이메일을 입력해주세요.");
      return false;
    }

    if (!userInputs.password) {
      alert("비밀번호를 입력해주세요.");
      return false;
    }

    return true;
  };

  const signInFunc = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        userInputs.email,
        userInputs.password
      );
      setUserInputs({
        email: "",
        password: "",
      });
      // 홈으로 이동
      navigate("/");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("해당 이메일에 대한 계정이 없습니다.");
      } else if (error.code === "auth/invalid-email") {
        return alert("이메일 주소가 유효하지 않습니다.");
      } else if (error.code === "auth/user-not-found") {
        return alert("일치하는 유저의 정보가 없습니다.");
      } else if (error.code === "auth/wrong-password") {
        alert("비밀번호가 일치하지 않습니다.");
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
                value={userInputs.email}
                //저렇게 묶어놨으면 저런식으로 value값도 수정해야된다.
                name="email"
                onChange={로그인새고방지}
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
                value={userInputs.password}
                onChange={로그인새고방지}
                name="password"
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
                type="button"
                onClick={async () => {
                  if (isValidForm()) {
                    await signInFunc();
                  }
                }}
                style={{
                  width: "100%",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#78C1F3",
                  color: "white",
                  cursor: "pointer",
                }}
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
