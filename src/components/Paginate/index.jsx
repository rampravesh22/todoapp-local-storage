import React, { useContext } from "react";
import "./style.css";
import { GlobalContext } from "../../App";
import { GrFormNext, GrPrevious } from "react-icons/gr";
const Paginate = ({
	currentPage,
	totalTodosPage,
	setCurrentPage,
	lastIndex,
	data,
}) => {
	const handlePrev = () => {
		setCurrentPage((preState) => preState - 1);
	};
	const handleNext = () => {
		setCurrentPage((preState) => preState + 1);
	};

	return (
		<div className="paginate-wrapper">
			<button
				type="button"
				className="paginate-btn"
				onClick={handlePrev}
				disabled={currentPage === 1}
			>
				{"<"}
			</button>
			<span className="current-page">
				{currentPage} of {totalTodosPage}
			</span>
			<button
				type="button"
				className="paginate-btn"
				onClick={handleNext}
				disabled={lastIndex >= data.length}
			>
				{">"}
			</button>
		</div>
	);
};

export default Paginate;
