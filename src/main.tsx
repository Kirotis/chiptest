import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { ConfigProvider, AdaptivityProvider } from "@vkontakte/vkui";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <App />
    </AdaptivityProvider>
  </ConfigProvider>
);
