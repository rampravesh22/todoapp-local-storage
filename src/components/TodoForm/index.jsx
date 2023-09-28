import React, { useState, useContext } from "react";
import "./style.css";
import { GlobalContext } from "../../App";
import { AiOutlinePlus } from "react-icons/ai";

const createTodo = (content) => {
	return { id: new Date().toISOString(), content: content, complete: false };
};
function TodoForm() {
	const [inputitem, setInputItem] = useState("");

	//using global context of stored state
	const { items, setItems } = useContext(GlobalContext);
	//to add data in the localstorage
	const addTodo = (e) => {
		e.preventDefault();
		if (inputitem) {
			const newData = [createTodo(inputitem), ...items];
			localStorage.setItem("todos", JSON.stringify(newData));
			setItems(newData);
			setInputItem("");
		}
	};

	return (
		<>
			<div className="form-wrapper">
				<form className="form-container" onSubmit={addTodo}>
					<input
						className="input-form"
						type="text"
						value={inputitem}
						onChange={(e) => setInputItem(e.target.value)}
						placeholder="Enter your todo"
					/>
					<button className="form-btn" type="Submit">
						<AiOutlinePlus />
					</button>
				</form>
			</div>
		</>
	);
}

export default TodoForm;
