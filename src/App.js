import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Edit from "./pages/Edit";

import { useSelector } from "react-redux";

function App() {
  const todos = useSelector(function (state) {
    return state.todos;
  });
  return (
    // 페이지 이동에 사용되는 Route 태그를 위해선 Routes로 먼저 감싸야 한다.
    <Routes>
      {/* path="/"이기 때문에 '<주소>/'인 주소로 접속할 경우 Main 컴포넌트가 화면에 보여지게 된다.  */}
      <Route path="/" element={<Main todos={todos} />} />
      {/* props 개념 이용해서 쓰고 싶은 부분을 쓸 수 있게 만들기인데 이거 진짜 바로바로 생각안난다...
       */}
      <Route path="/detail/:id" element={<Detail todos={todos} />} />
      <Route path="/create" element={<Create todos={todos} />} />
      <Route path="/edit/" element={<Edit todos={todos} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
