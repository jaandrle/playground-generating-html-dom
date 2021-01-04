import html from "https://cdn.skypack.dev/solid-js/html";
import { createLocalState } from "../hooks/createLocalState.js";
import { nthTodoComponent } from "./nthTodoComponent.js";

export function todosComponent() {
  const [state, setState] = createLocalState("todos", {
    todos: [],
    newTitle: "",
    idCounter: 0
  });
  const onchange = function ({ id: todo_id, type, value }) {
    const todo = state.todos.findIndex(({ id }) => id === todo_id);
    switch (type) {
      case "done":
        setState("todos", todo, { done: value });
        break;
      case "title":
        setState("todos", todo, { title: value });
        break;
      case "delete":
        setState("todos", (todos) => {
          const t = [...todos];
          t.splice(todo, 1);
          return t;
        });
        break;
      default:
    }
  };

  return html`
    <div>
      <h3>Simple Todos Example</h3>
      <input
        type="text"
        placeholder="enter todo and click +"
        value=${() => state.newTitle}
        oninput=${(e) => setState({ newTitle: e.target.value })}
      />
      <button
        onclick=${() =>
          setState({
            idCounter: state.idCounter + 1,
            todos: [
              ...state.todos,
              {
                id: state.idCounter,
                title: state.newTitle,
                done: false
              }
            ],
            newTitle: ""
          })}
      >
        +
      </button>
      ${() =>
        state.todos.map(
          (todo) =>
            html`<${nthTodoComponent} onchange=${onchange} dataset=${todo} />`
        )}
      <p><b>State:</b> ${()=> JSON.stringify(state)}</p>
    </div>
  `;
}
