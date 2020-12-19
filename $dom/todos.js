import "./$dom_component-min.js";

import { fromStorage, toStorage } from "./utils/storage.js";
const storage_name= "todos";
/**
 * @typedef todo
 * @type {object}
 */
/**
 * @typedef AppState
 * @type {object}
 * @property {number} [idCounter=0]
 * @property {string} [newTitle=""]
 * @property {todo[]} todos
 */
/**
 * @type {AppState}
 */
let app_state= fromStorage(storage_name) || { idCounter: 0, newTitle: "", todos: [] };

import { pubsubProtocol, subscribers, mapper, publish } from "./utils/pubsub.js";
const pubsub= mapper(pubsubProtocol(), function({ type, id, value }){
    let updated= {};
    switch (type){
        case "title":
            updated.newTitle= value;
            break;
        case "add":
            updated.todos= [...app_state.todos, { id: app_state.idCounter, title: app_state.newTitle, done: false }];
            updated.idCounter= app_state.idCounter+1;
            updated.newTitle= "";
            break;
        case "remove":
            updated.todos= [...app_state.todos.filter(({ id: t_id })=> t_id!==id)];
            break;
        default :
            app_state.todos.find(({ id: t_id })=> t_id===id)[ type==="todo_title" ? "title" : "done" ]= value;
            updated.todos= [...app_state.todos];
    }
    return updated;
});

import { renderInto } from "./utils/renderInto.js";
const renderToApp= renderInto(
    document.getElementById("app"),
    "childLast",
    Object.assign({ onchange: publish.bind(null, pubsub) }, app_state));

import { todosComponent } from "./components/todosComponent.js";
import { statusComponent } from "./components/statusComponent.js";
const todosUpdate= renderToApp(todosComponent);
const statusUpdate= renderToApp(statusComponent);

subscribers(
    pubsub,

    todosUpdate,
    updates=> Object.assign(app_state, updates),
    ()=> toStorage(storage_name, app_state),
    ()=> statusUpdate(app_state)
);