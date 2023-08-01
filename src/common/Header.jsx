import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { auth } from "../firebase";

export default function Header() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  //로그아웃 만들어보기
  const 로그아웃 = async () => {
    try {
      await signOut(auth);
      //Firebase 인증에서 제공하는 로그아웃 기능을 빌려왔습니다.
      setCurrentUser(null);
      // setCurrentUser의 상태를 null로 설정합
      navigate("/login");
    } catch (error) {
      console.error("로그아웃이 실패했습니다:", error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      //onAuthStateChanged는 로그인을 했을 때, 로그아웃 했을 때를 알아차리는 역할을 한다.
      setCurrentUser(user?.email);
    });
  }, []);

  return (
    <header
      style={{
        height: "100px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px 0 24px",
      }}
    >
      <h1
        style={{
          color: "gray",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        <FaHome />
      </h1>
      <div
        style={{
          display: "flex",
          gap: "12px",
        }}
      >
        {currentUser ? (
          // {currentUser ? currentUser보여주고, 로그아웃 버튼 보여주기 / : input창과 회원가입, 로그인 버튼 보여주기  }

          <>
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
              onClick={로그아웃}
            >
              로그아웃
            </button>
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
            >
              {currentUser}
            </button>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </>
        )}
      </div>
    </header>
  );
}
