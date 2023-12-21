import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const DataContext = createContext();
export const DataContextProvider = ({ children }) => {
  const [inputData, setInputData] = useState("");
  const LOCAL_STORAGE_KEY = "items";
  const [todoItems, setTodoItems] = useState([]);
  // const [todoItems, setTodoItems] = useState(
  //   JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
  // );
  // const [todoItems, setTodoItems] = useState([
  //   { id: 5, todoItem: "vishnu", isCompleted: false },
  // ]);

  const fetchData = async () => {
    let result = await axios("http://localhost:3000/api/todo");

    setTodoItems(result.data);
  };
 
  const addTodoHandler = async () => {
    // let newItem = { id: Date.now(), todoItem: inputData, isCompleted: false };

    if (inputData === "") {
      alert("Please enter a valid todo item");
      return;
    }
    let result = await axios("http://localhost:3000/api/todo", {
      method: "POST",
      data: {
        newTodoItem: inputData,
      },
    });
    setTodoItems(result.data);
    setInputData("");
  };

  const getInputDataHandler = (e) => {
    setInputData(e.target.value);
  };

  useEffect(() => {
    // localStorage.setItem("items", JSON.stringify(todoItems));
    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        getInputDataHandler,
        addTodoHandler,
        todoItems,
        inputData,
        setTodoItems,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
