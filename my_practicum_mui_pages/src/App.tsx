import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./main/Main";
import List from "./list/List";
import Chart from "./chart/components/Chart"; // Импорт компонента Chart
import GameDetails from "./game/GameDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/list",
    element: <List />,
  },
  {
    path: "/chart", // Новый маршрут
    element: <Chart />,
  },
  {
    path: "/game/:id",
    element: <GameDetails />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;