import { createContext, useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";
import CompletedTodo from "./components/CompletedTodo/Index";
//this is a global context for Context api
export const GlobalContext = createContext();

function App() {
	const [items, setItems] = useState([]);
	useEffect(() => {
		if (localStorage.getItem("todos")) {
			const todos = localStorage.getItem("todos");
			setItems(JSON.parse(todos));
		} else {
			localStorage.setItem("todos", JSON.stringify(items));
		}
	}, []);
	return (
		<GlobalContext.Provider value={{ items, setItems }}>
			<div className="app-wrapper">
				<h1 className="todo-app-heading">Todo APP</h1>
				<div className="app-content">
					<TodoForm />
					<TodoList />
					<CompletedTodo />
				</div>
			</div>
		</GlobalContext.Provider>
	);
}

export default App;
