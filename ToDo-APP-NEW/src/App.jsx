import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./styles/global.css";
import "./App.css";
import InputItem from "./components/InputItem/InputItem";
import TodoList from "./components/TodoList/TodoList";
import { DataContext } from "./context/DataContext";

function App() {
  const { todoItems } = useContext(DataContext);
  console.log(todoItems, "vishn")
  return (
    <div className="App-main">
   
      <div className="todoListOuter">
        <InputItem />

        {todoItems?.map((item) => (
          <TodoList key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default App;
