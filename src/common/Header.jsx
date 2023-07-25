import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();
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
        {/* 링크를 사용하여 메인페이지를 이동하려고 한다. useNavigate를 활용하는 부분은 일단 좀 더 고민해보기 다시해보기 */}
      </h1>
      <div
        style={{
          display: "flex",
          gap: "12px",
        }}
      >
        <Link to="/Create">추가하기</Link>
        <Link to="/login">로그인</Link>
        <Link to="/signup">회원가입</Link>
      </div>
    </header>
  );
}
