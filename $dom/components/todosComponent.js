/* global $dom */
import { nthTodoComponent } from "./nthTodoComponent.js";

export function todosComponent({ todos= [], newTitle= "", onchange= ()=>{} }= {}){
    const /* listeners */
        change_newTitle= $dom.componentListener("change", event=> onchange({ type: "title", value: event.target.value })),
        click_newTodo= $dom.componentListener("click", ()=> onchange({ type: "add" }) );
    
    const { add, dynamicComponent, share }= $dom.component("DIV");
        add("h3", { textContent: "Simple Todos Example" });
        add("INPUT", { type: "text", placeholder: "enter todo and click +" }, -1)
         .onupdate({ newTitle }, ({ newTitle: value })=> ({ value }))
         .on(change_newTitle);
        add("BUTTON", { textContent: "+" }, -1)
         .on(click_newTodo);
        dynamicComponent({ type: "add", todos }, function(use, _, { type, todos }){
            if(type!=="add"&&type!=="remove") return false;
            console.log("ahoj"); /* jshint devel: true *///gulp.keep.line
            use(todosListComponent(todos, onchange));
        }, -1);
    return share;
}

function todosListComponent(todos, onchange){
    const { component, setShift, share }= $dom.component("DIV");
        setShift(0);
    todos.forEach(todo => {
        component(nthTodoComponent(Object.assign({ onchange }, todo)), -1);
    });
    return share;
}