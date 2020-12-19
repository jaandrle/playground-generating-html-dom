/* TODO: Pseudo functiona!!! PubSub is passed by reference! */
/**
 * Identity function
 * @method identity
 * @param {any} v 
 * @returns {any} v
 */
const identity= v=> v;
/**
 * @typedef PubSub
 * @type {object}
 * @property {function} [mapFun=identity]
 * @property {Set<function>|null} [listeners]
 */

/**
 * @returns {PubSub}
 */
export function pubsubProtocol(){
    return { mapFun: identity, listeners: null };
}
/**
 * 
 * @param {PubSub} pubsub 
 * @param  {...function} funs 
 * @returns {PubSub}
 */
export function subscribers(pubsub, ...funs){
    if(!pubsub.listeners) pubsub.listeners= new Set();
    funs.map(fun=> pubsub.listeners.add(fun));
    return pubsub;
}
/**
 * 
 * @param {PubSub} pubsub 
 * @param {function} fun 
 * @returns {PubSub}
 */
export function mapper(pubsub, fun){
    pubsub.mapFun= fun;
    return pubsub;
}
/**
 * 
 * @param {PubSub} pubsub 
 * @param {any} event 
 * @returns {PubSub}
 */
export function publish(pubsub, event){
    if(!pubsub.listeners) return pubsub;
    const new_state= pubsub.mapFun(event);
    pubsub.listeners.forEach(fun=> fun(new_state));
    return pubsub;
}