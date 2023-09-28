import React, { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import "./style.css";
import { GlobalContext } from "../../App";

function TodoItem({ item }) {
	const { setItems, items } = useContext(GlobalContext);
	const [isDeletingID, setIsDeletingID] = useState(null);
	const [open, setOpen] = useState(false);
	const [inputTodo, setInputTodo] = useState({
		id: "",
		content: "",
		complete: false,
	});

	const handleComplete = (id) => {
		const localStorageData = JSON.parse(localStorage.getItem("todos"));

		//this is for updating in localStorage
		const updatedData = localStorageData.map((todo) => {
			if (id === todo.id) {
				return { ...todo, complete: true };
				// {id:23, complete:false, content:"this is test data"}
			} else {
				return todo;
			}
		});
		localStorage.setItem("todos", JSON.stringify(updatedData));

		// this is for updating local statte
		setItems(updatedData);
	};

	const handleModal = (id) => {
		const getTodo = items.find((item) => item.id === id);
		setOpen(true);
		setInputTodo(getTodo);
	};

	const handleEdit = (e, id) => {
		const getTodoFromLocalStorage = JSON.parse(localStorage.getItem("todos"));
		const res = getTodoFromLocalStorage.map((todo) => {
			if (todo.id === id) {
				return inputTodo;
			} else {
				return todo;
			}
		});
		localStorage.setItem("todos", JSON.stringify(res));
	};

	const handleDelete = (id) => {
		const localStorageData = JSON.parse(localStorage.getItem("todos"));
		const updatedData = localStorageData.filter((todo) => {
			return id !== todo.id;
		});
		localStorage.setItem("todos", JSON.stringify(updatedData));

		setIsDeletingID(id); // Trigger the deletion animation

		// Remove the item after the animation completes
		setTimeout(() => {
			setIsDeletingID(null);
			setItems(updatedData);
		}, 400); // You can adjust the duration to match your CSS transition duration
	};

	const closeModalOnOutsideClick = (e) => {
		if (e.target === document.querySelector("#modal-wrapper")) {
			setOpen(false);
		}
	};

	return (
		<>
			<li
				className={`todo-item-wrapper ${
					isDeletingID === item.id ? "delete" : ""
				}`}
			>
				<span>{item.content} </span>
				<span className="btns">
					<button
						type="button"
						className="btn edit-btn"
						onClick={() => handleModal(item.id)}
					>
						<FiEdit />
					</button>
					<button
						type="button"
						className="btn complete-btn"
						onClick={() => handleComplete(item.id)}
					>
						<AiOutlineCheckCircle />
					</button>
					<button
						type="button"
						className="btn delete-btn"
						onClick={() => handleDelete(item.id)}
					>
						<MdDelete />
					</button>
				</span>
			</li>
			{/*created modal for editing data in the local storage*/}
			{open ? (
				<div
					className="modal-wrapper"
					id="modal-wrapper"
					onClick={closeModalOnOutsideClick}
				>
					<div className="modal-content">
						<h2 className="modal-content-heading">Edit Todo</h2>
						<div className="form-wrapper">
							<form
								action=""
								className="edit-form"
								onSubmit={(e) => handleEdit(e, item.id)}
							>
								<label htmlFor="input">Todo</label>
								<input
									type="text"
									value={inputTodo.content}
									onChange={(e) =>
										setInputTodo((preState) => {
											return {
												...preState,
												content: e.target.value,
											};
										})
									}
								/>
								<button className="btn edit-btn-submit">Submit</button>
							</form>
						</div>
						<button
							type="button"
							className="close-btn"
							onClick={() => setOpen(false)}
						>
							x
						</button>
					</div>
				</div>
			) : null}
		</>
	);
}

export default TodoItem;
