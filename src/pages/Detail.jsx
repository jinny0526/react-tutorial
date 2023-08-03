import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo } from "../redux/modules/todos";

export default function Detail() {
  const todos = useSelector((state) => state.todos);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const todo = todos.find((todo) => todo.id === id);
  const user = useSelector((state) => state.user);

  const 로그인확인 = () => {
    if (!user.email) return false;
    return true;
  };

  const 작성자확인 = (author) => {
    if (user.email !== author) return false;
    return true;
  };

  return (
    <>
      <Header />
      <Container>
        <h1
          style={{
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {todo?.title}
          {/* 여기가 없을 수도 있다. */}
        </h1>
        <div
          style={{
            height: "400px",
            border: "1px solid lightgray",
            borderRadius: "12px",
            padding: "12px",
          }}
        >
          {todo?.content}
        </div>
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <button
            onClick={() => {
              if (!로그인확인()) {
                return alert("로그인 후 사용할 수 있습니다.");
              }

              if (!작성자확인(todo.author)) {
                return alert("작성자가 일치하지 않습니다.");
              }
              navigate(`/edit/${todo.id}`, {
                state: {
                  todo,
                },
              });
            }}
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "orange",
              color: "white",
              cursor: "pointer",
              marginRight: "6px",
            }}
          >
            수정
          </button>
          <button
            onClick={() => {
              if (!로그인확인()) {
                return alert("로그인 후 사용할 수 있습니다.");
              }

              if (!작성자확인(todo.author)) {
                return alert("작성자가 일치하지 않습니다.");
              }
              const result = window.confirm("정말로 삭제하시겠습니까?");
              if (result) {
                dispatch(deleteTodo(todo.id));
                navigate("/");
              }
            }}
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "red",
              color: "white",
              cursor: "pointer",
            }}
          >
            삭제
          </button>
        </div>
      </Container>
    </>
  );
}
