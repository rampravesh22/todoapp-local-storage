import React, { useContext, useState } from "react";
import "./style.css";
import TodoItem from "../TdodItem";
import { GlobalContext } from "../../App";
import Paginate from "../Paginate";
function TodoList() {
	const { items } = useContext(GlobalContext);
	const [currentPage, setCurrentPage] = useState(1);
	const todosPerPage = 8;
	const firstIndex = (currentPage - 1) * todosPerPage;
	const lastIndex = firstIndex + todosPerPage;
	const data = items.filter((item) => item.complete === false);
	const todosForPaginate = data.slice(firstIndex, lastIndex);
	const totalTodosPage = Math.ceil(data.length / todosPerPage);

	return (
		<div className="todo-list-wrapper">
			<ul>
				{todosForPaginate.map((item, index) => {
					if (!item.complete) {
						return <TodoItem item={item} key={index} />;
					}
				})}
			</ul>
			<Paginate
				currentPage={currentPage}
				totalTodosPage={totalTodosPage}
				todosForPaginate={todosForPaginate}
				setCurrentPage={setCurrentPage}
				lastIndex={lastIndex}
				data={data}
			/>
		</div>
	);
}

export default TodoList;
