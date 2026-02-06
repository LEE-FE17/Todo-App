import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123", done: false },
    { id: 1, content: "코딩 공부하기", done: false },
    { id: 2, content: "잠 자기", done: true },
  ]);

  return (
    <div className="app">
      <h1 className="title">📝 Todo App</h1>
      <TodoInput setTodoList={setTodoList} />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

function TodoInput({ setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (!inputValue.trim()) return;
    setTodoList((prev) => [
      ...prev,
      { id: Date.now(), content: inputValue, done: false },
    ]);
    setInputValue("");
  };

  return (
    <div className="todo-input">
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button className="btn add" onClick={addTodo}>
        추가
      </button>
    </div>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul className="todo-list">
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(todo.content);

  const updateTodo = () => {
    setTodoList((prev) =>
      prev.map((el) =>
        el.id === todo.id ? { ...el, content: inputValue } : el
      )
    );
    setIsEditing(false);
  };

  return (
    <li className={`todo ${todo.done ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() =>
          setTodoList((prev) =>
            prev.map((el) =>
              el.id === todo.id ? { ...el, done: !el.done } : el
            )
          )
        }
      />

      {isEditing ? (
        <input
          className="edit-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      ) : (
        <span className="content">{todo.content}</span>
      )}

      <div className="buttons">
        {isEditing ? (
          <button className="btn edit" onClick={updateTodo}>
            저장
          </button>
        ) : (
          <button className="btn edit" onClick={() => setIsEditing(true)}>
            수정
          </button>
        )}

        <button
          className="btn delete"
          onClick={() =>
            setTodoList((prev) => prev.filter((el) => el.id !== todo.id))
          }
        >
          삭제
        </button>
      </div>
    </li>
  );
}

export default App;
