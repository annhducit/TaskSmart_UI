import{ay as r,t as a}from"./index-bcifMYEQ.js";const s=async t=>{const{data:e}=await a.get(`/categories/${t}`);return e},y=t=>r({queryKey:["tsm/category",t],queryFn:()=>s(t)});export{y as u};
