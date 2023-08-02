import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Edit from "./pages/Edit";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";

function App() {
  const [userEmail, setUserEmail] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail("");
      }
    });
  }, []);
  //새로고침을 할때나 없어질때나 기존에 있던 애를 삭제하고 다시 만들어주는 것, 쌓이는 걸 방지해줌
  // 언제 동작한다를 알아야한다. {}에 들어있는 함수가 화면에 그림을 다 그리고 나서 실행되는 것, 화면에 그리는 것과 상관없는 코드를
  // 화면에 먼저 그림을 그리고 그  {}안에 들어가는 건 나중에 해도 되는 애들, 화면에 아무것도 안나오는걸 방지하기 위해 사용
  //정 모르겠으면 콘솔찍기!
  //[] 안에 들어가는 데이터가 변경이 되면 다시 시작하게 해주기 데이터 다시 가져오고 싶을때도 씀
  //[] defend 어쩌고 실행한다음에 실행이 안되게 만드는 경우도 씀
  // 이걸 밖에 다두면 관찰자가 계속 생기니까 useeffect로 방지
  //[] 들어가든 말든 상관이 없고 늦게 실행되는 것!! 이건 한번만 방지용

  return (
    // 페이지 이동에 사용되는 Route 태그를 위해선 Routes로 먼저 감싸야 한다.
    <Routes>
      {/* path="/"이기 때문에 '<주소>/'인 주소로 접속할 경우 Main 컴포넌트가 화면에 보여지게 된다.  */}
      <Route path="/" element={<Main />} />
      {/* props 개념 이용해서 쓰고 싶은 부분을 쓸 수 있게 만들기인데 이거 진짜 바로바로 생각안난다...
       */}
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
