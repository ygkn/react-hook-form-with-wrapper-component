import React from "react";
import ReactDOM from "react-dom/client";

import { WhenThereIs } from "./WhenThereIs";
import { WhenThereIsNot } from "./WhenThereIsNot";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <h1>React Hook Form でラッパーコンポーネントを使ってみよう</h1>
    <main>
      <h2>あるとき</h2>
      <WhenThereIs />
      <h2>ないとき</h2>
      <WhenThereIsNot />
    </main>
  </React.StrictMode>,
);
