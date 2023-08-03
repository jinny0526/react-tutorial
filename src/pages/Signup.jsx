import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Signup() {
  const navigate = useNavigate();
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const 가입새고방지 = (e) => {
    const { value, name } = e.target;
    setUserInputs((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //이메일 형식의 유효성을 확인하는 함수 그냥 외우기
  // const isEmailValid = (email) => {
  //   const regemail =
  //     /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  //   return regemail.test(email);
  // };
  //회원가입 버튼 만들기

  const signUp = async (event) => {
    event.preventDefault();
    if (!userInputs.email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!userInputs.password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (!userInputs.passwordConfirm) {
      alert("비밀번호 확인을 입력해주세요.");
      return;
    }
    try {
      //이메일과 비밀번호이 등록되지 않는다면 회원가입 진행을 막기
      await createUserWithEmailAndPassword(
        auth,
        userInputs.email,
        userInputs.password
      );
      //회원가입 성공시 모든걸 다시 돌아가게 하기
      setUserInputs({
        email: "",
        password: "",
        passwordConfirm: "",
      });

      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        return alert("이미 존재하는 이메일입니다.");
      }

      if (error.code === "auth/invalid-email") {
        return alert("이메일 형식이 적절하지 않습니다.");
      }

      if (error.code === "auth/weak-password") {
        return alert("비밀번호는 최소 6자리 이상이어야 합니다.");
      }

      if (error.code === "auth/operation-not-allowed") {
        return alert("휴면 계정입니다. 관리자에게 문의하세요.");
      }

      return alert("알 수 없는 에러입니다. 나중에 다시 시도해보세요.");
    }
  };
  // alert("Signup Error: " + error.message); 메시지 정리

  // console.log("user", userCredential.user);
  // //회원 가입이 성공한다면 로그인 상태로 나타난다.

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
                name="email"
                value={userInputs.email}
                onChange={가입새고방지}
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
                name="password"
                value={userInputs.password}
                onChange={가입새고방지}
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
                name="passwordConfirm"
                placeholder="비밀번호 확인"
                typne="password"
                value={userInputs.passwordConfirm}
                onChange={가입새고방지}
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
                onClick={signUp}
                style={{
                  width: "100%",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#FF6969",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                회원가입하기
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
                  backgroundColor: "#78C1F3",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/Login");
                }}
              >
                로그인하러 가기
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
