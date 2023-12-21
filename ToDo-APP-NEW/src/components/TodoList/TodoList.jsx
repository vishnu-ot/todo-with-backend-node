import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import "./TodoList.css";
import axios from "axios";
import { useState } from "react";
function TodoList({ item }) {
  const [editData, setEditData] = useState(false);
  const { todoItems, setTodoItems } = useContext(DataContext);
  const [changeData, setChangeData] = useState("");
  const [completed, setCompleted] = useState(false);
  const editHandler = (id) => {
    setEditData(!editData);
  };

  const completeTaskHandler = async (id) => {
    // let newData = todoItems.map((item) => {
    //   if (item.id === id) {
    //     return { ...item, isCompleted: !item.isCompleted };
    //   }
    //   return item;
    // });
    let result = await axios("http://localhost:3000/api/todo", {
      method: "POST",
      data: {
        id: id,
      },
    });
    setTodoItems(result.data);
  };

  const saveEditedData = async (id) => {
    if (changeData === "") {
      alert("Please do make change on data ....");
      return;
    }

    let result = await axios("http://localhost:3000/api/todo", {
      method: "PUT",
      data: {
        id: id,
        newData: changeData,
      },
    });
    // let newData = todoItems.map((item) => {
    //   if (item.id === id) {
    //     return {
    //       ...item,
    //       todoItem: changeData,
    //       isCompleted: item.isCompleted ? false : item.isCompleted,
    //     };
    //   }
    //   return item;
    // });
    setChangeData("");
    setTodoItems(result.data);
    setEditData(false);
  };

  const deleteHandler = async (id) => {
    let result = await axios("http://localhost:3000/api/todo", {
      method: "DELETE",
      data: {
        itemId: id,
      },
    });
    console.log(result.data, "vishnu");
    setTodoItems(result.data);
    // setTodoItems(todoItems.filter((item) => item.id !== id));
  };

  return (
    <div className="todo-item">
      {editData ? (
        <div className="edit">
          <input
            type="text"
            defaultValue={item.todoItem}
            onChange={(e) => setChangeData(e.target.value)}
          />
          <button
            onClick={() => saveEditedData(item.id)}
            className="save-button"
          >
            Save
          </button>
          <button onClick={() => setEditData(false)} className="cancel-button">
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div
            className={item.isCompleted ? "completed" : "todolist"}
            onClick={() => completeTaskHandler(item.id)}
          >
            {item.todoItem}
          </div>
          <img
            src="./images/image7.png"
            alt=""
            className="edit-image"
            onClick={editHandler}
          />
          <img
            src="./images/image9.png"
            alt=""
            className="delete-image"
            onClick={() => deleteHandler(item.id)}
          />
        </>
      )}
    </div>
  );
}

export default TodoList;
