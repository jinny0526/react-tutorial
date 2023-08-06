import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/config/configStore";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
//화면에 최종적으로 그림그려주는 역할
//QueryClientProvider : 데이터를 읽어오는 기능(QueryClient)을 애플리케이션 전체에 주입하도록 하는 API라는데 사실 무슨 의미인지는 잘모르겠고 일단 씀
