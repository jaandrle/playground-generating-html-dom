/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* global customElements */
/*
    Hlavní utilita pro "zhezčení" zápisu
        - Jednoduchá ukázka
            ```HTML
            <template id="vysledne-jmeno-tagu">
                <p>Hello <slot>world</slot></p>
            </template>
            <script>registerCustomElemment(document.currentScript);</script>
            <vysledne-jmeno-tagu></vysledne-jmeno-tagu>
            <vysledne-jmeno-tagu>visitor</vysledne-jmeno-tagu>
            ```
*/
const wcue= (function(){
    const components_name= "wcue";
    const { forEach }= initNamespace();

    customElements.define(components_name+"-global-styles", class extends HTMLElement{
        constructor(){
            super();
            const insertBefore= HTMLElement.prototype.insertBefore.bind(this.parentNode);
            //this.parentNode.adoptedStyleSheets= [ shared_styles ];
            forEach(document.styleSheets,
                ({ ownerNode }= {})=> ownerNode&&
                    insertBefore(document.importNode(ownerNode, true), this));
            this.remove();
        }
    });
    
    return { register, useEffect };
    
    function register(init= {}){
        const template= document.currentScript.previousElementSibling;
        const { name, refs= {}, shadow= "open" }= Object.assign({}, init, template.dataset);
        if(!name) throw new Error("Parameter `name` must be specify (it corresponds to tag name e.g. <tag-name>)");
        customElements.define(name, class extends HTMLElement{
            constructor(){
                super();
                const this_element= shadow!=="none" ? this.attachShadow({ mode: shadow }) : this;
                this_element.appendChild(template.content.cloneNode(true));
                this._events= {};
                forEach(this_element.querySelectorAll("[ref]"), el=> refs[el.getAttribute("ref")](this, el));
                //this_element.addEventListener('slotchange', ev=> console.dir(ev.target, ev.target.assignedNodes()[0]));
            }
            addInnerEventListener(event, element, callback){
                const curr_event= this._events[event] || new Map();
                const curr_listeners= curr_event.get(element) || new Set();
                curr_listeners.add(callback);
                this._events[event]= curr_event.set(element, curr_listeners);
                return 1;
            }
            //connectedCallback() {
            //    this._shadow.appendChild(document.importNode(shared_style.content, true));
            //}
        });
    }
    function useEffect(callback, limit){
        return function useEffectInner(component, element){
            const onunmount_callback= callback(component, element);
            if(typeof onunmount_callback!=="function") return 1;
            return component.addInnerEventListener("onunmount", element, onunmount_callback);
        };
    }
    function handleListeners(cd, el, dataset){
        const [ event_name, event_listener_name ]= el.dataset.wc.split(":");
        let fun= cd[event_listener_name];
        switch(event_name){
            case "oninit":          return fun(el, dataset);
            case "onslotchange":    return el.addEventListener('slotchange', fun);
        }
    }
    function initNamespace(){
        const { call }= Function.prototype;
        const { forEach }= Array.prototype;
        return {
            forEach: call.bind(forEach)
        };
    }
})();