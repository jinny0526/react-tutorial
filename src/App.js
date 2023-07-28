import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Edit from "./pages/Edit";
import { useState } from "react";
import { nanoid } from "nanoid";

function App() {
  // const todos = useSelector((state) => state.todos);
  //없어도 되는데 넣었다. props 안내려보내도 되게 하려고 그니까 안써도 됨

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
