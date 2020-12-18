import { defineComponent, usePreactHtm, useAttribute, prps } from "https://unpkg.com/funcy-components/dist/full.min.mjs";

export { defineComponent, prps };
export const useGetAttributes= (...attrs_name)=> attrs_name.map(attr=> useAttribute(attr)[0]);
export const html= (...args)=> usePreactHtm()(...args);