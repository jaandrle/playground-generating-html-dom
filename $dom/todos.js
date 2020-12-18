import "./$dom_component-min.js";
import { Store } from "./store.js";
import { todosComponent } from "./components/todosComponent.js";
import { statusComponent } from "./components/statusComponent.js";

const todos_store= Store.create("todos", { idCounter: 0, newTitle: "", todos: [] });

const todos_component= todosComponent(Object.assign({ onchange: todos_store.change.bind(todos_store) }, todos_store.currentState()));
todos_store.addListener(todos_component.update);
todos_component.mount(document.getElementById("app"));

const status_component= statusComponent(todos_store.currentState());
todos_store.addListener(status_component.update);
status_component.mount(document.getElementById("app"));