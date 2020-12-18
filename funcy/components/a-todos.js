import { useLocalStorageReducer } from "../hooks/useLocalStorageReducer.js";
import { defineComponent, html, prps } from "../funcy_export_import.js";
import "./a-todo.js";

defineComponent(
    "a-todos",
    ()=> {
        const [state, dispatch]= useLocalStorageReducer("todos", function(state, { action, value, id }){
            switch (action){
                case "title": return Object.assign({}, state, id ? updateTodo({ id, action, value }, state) : { newTitle: value });
                case "add": return createNewTodo(state);
                default : return Object.assign({}, state, updateTodo({ id, action, value }, state));
            }
        }, {
            todos: [],
            newTitle: "",
            idCounter: 0
        });
        return html`
            <div>
                <h3>Simple Todos Example</h3>
                <input
                    type="text"
                    placeholder="enter todo and click +"
                    value=${state.newTitle}
                    oninput=${event=> dispatch({ action: "title", value: event.target.value, event })}
                    />
                <button onClick=${dispatch.bind(null, { action: "add" })}> + </button>
                ${state.todos.map(
                    todo=> html`<a-todo ...${todo} ...${prps({ onchange: dispatch })} ></a-todo>`
                )}
                <p><b>State:</b> ${JSON.stringify(state)}</p>
            </div>
        `;
    }
);

function createNewTodo({ todos, newTitle, idCounter }){
    return {
        todos: [...todos, { id: idCounter++, title: newTitle, done: false }],
        idCounter, newTitle: ""
    };
}
function updateTodo({ id: todo_id, action, value }, state){
    const todo_index= state.todos.findIndex(({ id }) => Number(id) === Number(todo_id));
    const todos= [...state.todos];
    switch (action) {
        case "done": todos[todo_index].done= value; break;
        case "title": todos[todo_index].title= value; break;
        case "delete": todos.splice(todo_index, 1); break;
        default:
    }
    return { todos };
}