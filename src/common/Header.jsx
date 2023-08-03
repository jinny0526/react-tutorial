import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useSelector } from "react-redux";

export default function Header() {
  const user = useSelector((state) => state.user);
  //user에 저장된 값을 가져왔으니까 쓸데없는 문장은 일단 다 지우고 시작

  // 로그아웃버튼 밑에서 만든거랑 비교해보는데 확실히 차이가 크다
  const logoutButton = async (e) => {
    e.preventDefault();
    await signOut(auth);
  };

  // const 로그아웃 = async () => {
  //   try {
  //     await signOut(auth);
  //     //Firebase 인증에서 제공하는 로그아웃 기능을 빌려왔습니다.
  //     setCurrentUser(null);
  //     // setCurrentUser의 상태를 null로 설정한다.
  //     navigate("/login");
  //   } catch (error) {
  //     console.error("로그아웃이 실패했습니다:", error);
  //   }
  // };

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
            <button onClick={logoutButton}>로그아웃</button>
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
// {currentUser ? (
//           // {currentUser ? currentUser보여주고, 로그아웃 버튼 보여주기 / : input창과 회원가입, 로그인 버튼 보여주기  }

//           <>
//
//               {currentUser}
//             </button>
//             <button
//               style={{
//                 width: "100%",
//                 border: "none",
//                 padding: "12px",
//                 borderRadius: "6px",
//                 backgroundColor: "#78C1F3",
//                 color: "white",
//                 cursor: "pointer",
//               }}
//               onClick={로그아웃}
//             >
//               로그아웃
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login">로그인</Link>
//             <Link to="/signup">회원가입</Link>
//           </>
//         )}
//       </div>
//     </header>
//   );
// }
