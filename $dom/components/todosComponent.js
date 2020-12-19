/* global $dom */
import { nthTodoComponent } from "./nthTodoComponent.js";

/**
 * 
 * @param {import("../todos.js").AppState & { onchange: function }} def
 */
export function todosComponent({ todos= [], newTitle= "", onchange= ()=>{} }= {}){
    const /* listeners */
        change_newTitle= $dom.componentListener("change", event=> onchange({ type: "title", value: event.target.value })),
        click_newTodo= $dom.componentListener("click", ()=> onchange({ type: "add" }) );
    let
        rerender_list= false;
    
    const { add, dynamicComponent, share }= $dom.component("DIV");
        add("H3", { textContent: "Simple Todos Example" });
        add("INPUT", { type: "text", placeholder: "enter todo and click +" }, -1)
         .onupdate({ newTitle }, ({ newTitle: value })=> ({ value }))
         .on(change_newTitle);
        add("BUTTON", { textContent: "+" }, -1)
         .on(click_newTodo);
        dynamicComponent({ todos }, function(use, _, { todos }){
            if(rerender_list) return false;
            use(todosListComponent(todos, nthChange));
        }, -1);
    return share;

    function nthChange(event){
        rerender_list= event.type!=="add"&&event.type!=="remove";
        onchange(event);
    }
}

function todosListComponent(todos, onchange){
    const { component, setShift, share }= $dom.component("DIV");
        setShift(0);
    todos.forEach(todo => {
        component(nthTodoComponent(Object.assign({ onchange }, todo)), -1);
    });
    return share;
}