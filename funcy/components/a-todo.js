import { defineComponent, html, useGetAttributes } from "../funcy_export_import.js";

defineComponent(
    "a-todo",
    ({ onchange })=> {
        const [ id, done, title ]= useGetAttributes("id", "done", "title");
        return html`
        <div>
            <input
                type="checkbox"
                checked=${done}
                onchange=${event=> void onchange({ action: "done", value: event.target.checked, id, event })}
            />
            <input
                type="text"
                value=${title}
                onchange=${event=> void onchange({ action: "title", value: event.target.value, id, event })}
            />
            <button
                onclick=${event=> void onchange({ action: "delete", value: true, id, event })}
            > x </button>
        </div>
      `;
    }
);