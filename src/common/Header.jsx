import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useSelector } from "react-redux";

export default function Header() {
  const user = useSelector((state) => state.user);
  //user에 저장된 값을 가져왔으니까 쓸데없는 문장은 일단 다 지우고 시작

  // 로그아웃버튼
  const logoutBt = async (e) => {
    e.preventDefault();
    await signOut(auth);
  };

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
      >
        <Link to="/">
          <FaHome />
        </Link>
      </h1>
      <div
        style={{
          display: "flex",
          gap: "12px",
        }}
      >
        {/* currenter과 같은 방법인데 먼저 보여주는 유무가 user.email로 사용됨 */}
        {user.email ? (
          <>
            <p>{user.email}</p>
            <button onClick={logoutBt}>로그아웃</button>
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
