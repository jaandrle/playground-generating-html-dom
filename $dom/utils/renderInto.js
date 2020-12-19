export function renderInto(mount_target, mount_type, component_props){
    return function(component){
        const { mount, update }= component(component_props);
        mount(mount_target, mount_type);
        return update;
    };
}