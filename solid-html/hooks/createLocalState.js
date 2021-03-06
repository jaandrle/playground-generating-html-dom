import { createState, createEffect } from "https://cdn.skypack.dev/solid-js";

export function createLocalState(name, initState) {
    const [state, setState] = createState(initState);
    if (localStorage[name]) setState(JSON.parse(localStorage[name]));
    createEffect(() => (localStorage[name] = JSON.stringify(state)));
    return [state, setState];
}