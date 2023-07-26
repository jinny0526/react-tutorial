import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Edit from "./pages/Edit";
import { useState } from "react";
import { nanoid } from "nanoid";

// import { useSelector } from "react-redux";

function App() {
  const [todos, setTodos] = useState([
    {
      id: nanoid(),
      title: "제목1",
      content: "내용1",
      author:
        "작성자입니다. 추후에 firebase와 연결 후 이메일을 여기에 작성하겠습니다.",
    },
    {
      id: nanoid(),
      title: "제목2",
      content: "내용2",
      author:
        "작성자입니다. 추후에 firebase와 연결 후 이메일을 여기에 작성하겠습니다.",
    },
    {
      id: nanoid(),
      title: "제목3",
      content: "내용3",
      author:
        "작성자입니다. 추후에 firebase와 연결 후 이메일을 여기에 작성하겠습니다.",
    },
  ]);
  return (
    // 페이지 이동에 사용되는 Route 태그를 위해선 Routes로 먼저 감싸야 한다.
    <Routes>
      {/* path="/"이기 때문에 '<주소>/'인 주소로 접속할 경우 Main 컴포넌트가 화면에 보여지게 된다.  */}
      <Route path="/" element={<Main todos={todos} setTodos={setTodos} />} />
      {/* props 개념 이용해서 쓰고 싶은 부분을 쓸 수 있게 만들기인데 이거 진짜 바로바로 생각안난다...
       */}
      <Route
        path="/detail/:id"
        element={<Detail todos={todos} setTodos={setTodos} />}
      />
      <Route
        path="/create"
        element={<Create todos={todos} setTodos={setTodos} />}
      />
      <Route
        path="/edit/:id"
        element={<Edit todos={todos} setTodos={setTodos} />}
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
