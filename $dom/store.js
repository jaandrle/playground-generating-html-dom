export class Store{
    static create(...args){ return new this.prototype.constructor(...args); }
    constructor(name, init_data= null){
        this.name= name;
        this.data= localStorage[name] ? JSON.parse(localStorage[name]) : init_data;
    }
    change({ type, id, value }){
        let new_data= {};
        switch (type){
            case "title":
                new_data.newTitle= value;
                break;
            case "add":
                new_data.todos= [...this.data.todos, { id: this.data.idCounter, title: this.data.newTitle, done: false }];
                new_data.idCounter= this.data.idCounter+1;
                new_data.newTitle= "";
                break;
            case "remove":
                new_data.todos= [...this.data.todos.filter(({ id: t_id })=> t_id!==id)];
                break;
            default :
                this.data.todos.find(({ id: t_id })=> t_id===id)[ type==="todo_title" ? "title" : "done" ]= value;
                new_data.todos= [...this.data.todos];
        }
        this.update(type, new_data);
    }
    update(type, new_data){
        this.data= Object.assign(this.data, new_data);
        localStorage[this.name]= JSON.stringify(this.data);
        this.listeners.forEach(lisFun=> lisFun(Object.assign({ type }, new_data)));
    }
    addListener(lisFun){
        if(!this.listeners) this.listeners= new Set();
        this.listeners.add(lisFun);
    }
    currentState(){
        return this.data;
    }
}