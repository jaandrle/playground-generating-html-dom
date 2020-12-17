import { useReducer } from "https://unpkg.com/funcy-components/dist/full.min.mjs";

export function useLocalStorageReducer(name, reducerFun, initState){
    if (localStorage[name]) initState= JSON.parse(localStorage[name]);
    const [state, dispatch]= useReducer(function(...args){
        const new_state= reducerFun(...args);
        localStorage[name]= JSON.stringify(new_state);
        return new_state;
    }, initState);
    return [state, dispatch];
}