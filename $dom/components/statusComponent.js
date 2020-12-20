/* global $dom */
/**
 * 
 * @param {import("../todos").AppState} status 
 */
export function statusComponent(status){
    const { add, addText, share }= $dom.component("P");
        add("B", { textContent: "State: " });
        addText("", -1).onupdate(status, status=> ({ textContent: JSON.stringify(status) }));
    return share;
}