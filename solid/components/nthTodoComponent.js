import html from "solid-js/html";

export function nthTodoComponent({ dataset: { id, done, title }, onchange }) {
  return html`
    <div>
      <input
        type="checkbox"
        checked=${done}
        onchange=${(event) =>
          void onchange({
            type: "done",
            value: event.target.checked,
            id,
            event
          })}
      />
      <input
        type="text"
        value=${title}
        onchange=${(event) =>
          void onchange({
            type: "title",
            value: event.target.value,
            id,
            event
          })}
      />
      <button
        onclick=${(event) =>
          void onchange({ type: "delete", value: true, id, event })}
      >
        x
      </button>
    </div>
  `;
}
