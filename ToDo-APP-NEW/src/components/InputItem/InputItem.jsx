import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import './InputItem.css'
function InputItem() {
  const { getInputDataHandler, addTodoHandler ,inputData} = useContext(DataContext);
  return (
    <div className="newtodo">
        <p>Todo List</p>
      <div className="input-text">
      <input type="text" onChange={getInputDataHandler} value={inputData} />
      <button onClick={addTodoHandler}>Add</button>
      </div>
      
    </div>
  );
}

export default InputItem;
