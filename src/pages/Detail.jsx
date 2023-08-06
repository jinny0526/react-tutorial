import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQueryClient, useQuery, useMutation } from "react-query";
import api from "../axios/api";

export default function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const user = useSelector((state) => state.user);
  const 로그인확인 = () => {
    if (!user.email) return false;
    return true;
  };

  const 작성자확인 = (author) => {
    if (user.email !== author) return false;
    return true;
  };
  const queryClient = new useQueryClient();

  //main 부분과 대부분 일치해서 더 쓸만한 내용은 없는데
  //데이터부분이 차이나는 이유는 main에서는 전체 내용을 detail에서는 id 값이라는 단일 데이터를 필요로 하기때문이다.

  const {
    isLoading,
    data: todo,
    error,
    isError,
  } = useQuery(["todo", id], async () => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  });

  const mutation = useMutation(
    async (id) => {
      await api.delete(`/todos/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );
  //
  const deleteTodo = async () => {
    if (!로그인확인()) {
      return alert("로그인 후 사용할 수 있습니다.");
    }
    if (!작성자확인(todo.author)) {
      return alert("작성자가 일치하지 않습니다.");
    }
    const result = window.confirm("정말로 삭제하시겠습니까?");
    if (result) {
      await mutation.mutateAsync(todo.id);
      navigate("/");
    }
  };

  if (isLoading) {
    return <div>데이터 가져오는 중...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <Header />
      <Container>
        {/* {로그인확인() && 작성자확인(todo.author) && ( )}
          이걸 써야된다고 생각한 이유 위로 기능을 다 빼버렸으니까 and 연산자로 조건을 걸어줘야 내가 작성한 것을 볼 수 있게 되는 것이 아닌가
          하는 미친 생각으로 시도 그리고 내가 작성한 글만 딱 상세페이지가 보이게 됨 그래서 이건 아니다싶어서 
          지웠더니 그냥 다 보임 희대의 쓸데없는 짓을 함 */}
        <>
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
              onClick={deleteTodo}
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
        </>
      </Container>
    </>
  );
