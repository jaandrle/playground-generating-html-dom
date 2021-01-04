import { create, h } from "https://cdn.jsdelivr.net/npm/switzerland@latest/es/index.js";

export default create("a-todos", function({ use }){
    return [
        h("H3", { textContent: "Simple Todos Example." }),
        h("INPUT", { type: "text", placeholder: "enter todo and click +" })
    ];
});