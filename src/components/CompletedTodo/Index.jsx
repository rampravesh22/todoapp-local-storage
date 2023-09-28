import React, { useContext, useState } from "react";
import { GlobalContext } from "../../App";
import "./style.css";
import { MdDelete } from "react-icons/md";
import Paginate from "../Paginate";

const CompletedTodo = () => {
	const { items, setItems } = useContext(GlobalContext);
	const [deletedId, setDeletedId] = useState(null);
	const completedTodo = items.filter((item) => item.complete === true);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 6;
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	const paginateItems = completedTodo.slice(startIndex, endIndex);

	const totalPages = Math.ceil(completedTodo.length / itemsPerPage);

	const handleDelete = (id) => {
		const localStorageData = JSON.parse(localStorage.getItem("todos"));
		const updatedTodo = localStorageData.filter((todo) => todo.id !== id);
		localStorage.setItem("todos", JSON.stringify(updatedTodo));

		setDeletedId(id);
		setTimeout(() => {
			setDeletedId(null);
			setItems(updatedTodo);
		}, 400);
	};
	return (
		<div className="completed-todo-wrapper">
			<h4 className="completed-todo-heading">
				<span>Completed Todo</span>
			</h4>

			<ul className="completed-todo">
				{paginateItems.map((item) => {
					if (item.complete) {
						return (
							<li
								key={item.id}
								className={`delete-list-class ${
									deletedId === item.id ? "deleting-animation" : ""
								}`}
							>
								<span>{item.content}</span>
								<button
									className="btn delete-btn"
									onClick={() => handleDelete(item.id)}
								>
									<MdDelete />
								</button>
							</li>
						);
					}
				})}
			</ul>
			<Paginate
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				lastIndex={endIndex}
				totalTodosPage={totalPages}
				data={completedTodo}
			/>
		</div>
	);
};

export default CompletedTodo;
