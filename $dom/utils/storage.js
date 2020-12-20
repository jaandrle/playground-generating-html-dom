/**
 * 
 * @param {string} name Name of localStorage key
 * @returns {object|null}
 */
export function fromStorage(name){
    return localStorage[name] ? JSON.parse(localStorage[name]) : null;
}
export function toStorage(name, data){
    return ( localStorage[name]= JSON.stringify(data) ); 
}