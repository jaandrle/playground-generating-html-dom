import { r, t as html } from 'https://cdn.skypack.dev/@arrow-js/core';
function component(data_init= {}){
	let template;
	const data= r(data_init);
	return {
		data,
		template: function(T){ template= T; return T; },
		share: {
			get $mount(){ return template; },
			get $on(){ return data.$on; },
			get $off(){ return data.$off; }
		}
	};
}

function helloWorldComponent({ counter= 0 }= {}){
	const { template, share }= component();
	const data= r({ counter });
	const template_buttons= html`
		<button @click="${()=> data.counter--}">-</button>
		/
		<button @click="${()=> data.counter++}">+</button>
	`;
	template(html`
		<p>Hello world!</p>
		<p>Count: ${()=> data.counter} (${template_buttons})</p>
	`);
	return share;
}
const c= helloWorldComponent();
c.$on("counter", console.log); /* jshint devel: true *///gulp.keep.line
c.$mount(document.body);
