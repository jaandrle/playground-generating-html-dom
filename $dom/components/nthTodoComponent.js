/* global $dom */
export function nthTodoComponent({ id, title, done, onchange }){
    const /* listeners */
        change_newInfo= $dom.componentListener("change", function(event){
            const { target }= event;
            const { name: type }= target;
            onchange({ id, type, value: type==="todo_title" ? target.value : target.checked });
        }),
        click_remove= $dom.componentListener("click", ()=> onchange({ type: "remove", id }));
    const { add, share }= $dom.component("DIV");
        add("INPUT", { name: "todo_done", type: "checkbox", checked: done }).on(change_newInfo);
        add("INPUT", { name: "todo_title", type: "text", value: title }, -1).on(change_newInfo);
        add("BUTTON", { textContent: "x" }, -1).on(click_remove);
    return share;
}