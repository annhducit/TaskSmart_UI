import{ay as a,t as s}from"./index-bcifMYEQ.js";const r=async e=>{const{data:t}=await s.get(`/templates/search-only?query=${e}`);return t},u=e=>a({queryKey:["tsm/search/template",e],queryFn:()=>r(e),enabled:!!e});export{u};
