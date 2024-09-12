import{c as j,d as N,i as T,A as p,t as C,aB as P,b as S,j as e,Q as z,ad as A,h as I,a as b,r as u,aC as R,aD as D,aE as E,S as F,B as m,P as M,l as B,T as _,p as H,af as L,aa as h,y as V,aF as G,aG as U}from"./index-bcifMYEQ.js";import{u as q}from"./use-search-template-CQCCOJ07.js";import{F as K}from"./Table-DqxhufFh.js";import{I as Q}from"./image-AIOiPcV4.js";import{T as y}from"./text-BZj7_MT7.js";import{H as $}from"./hand-BOGrgO0c.js";import"./index-DMQ_vExv.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=j("FileDigit",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",key:"1pf5j1"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["rect",{width:"4",height:"6",x:"2",y:"12",rx:"2",key:"jm304g"}],["path",{d:"M10 12h2v6",key:"12zw74"}],["path",{d:"M10 18h4",key:"1ulq68"}]]);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=j("PawPrint",[["circle",{cx:"11",cy:"4",r:"2",key:"vol9p0"}],["circle",{cx:"18",cy:"8",r:"2",key:"17gozi"}],["circle",{cx:"20",cy:"16",r:"2",key:"1v9bxh"}],["path",{d:"M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z",key:"1ydw1z"}]]),Y=async i=>await C.put(`/templates/${i}/status`),Z=()=>{const i=P();return N({mutationFn:Y,onSuccess:a=>{T(a.status)?(p.success("Template removed successfully"),i()):p.error("Failed to remove template")}})};function J(){const{modal:i}=S.useApp(),a=Z();return async n=>{const r=i.confirm({title:"Remove Template",content:"Are you sure you want to remove this template?",cancelText:"Cancel",okText:"Remove",okType:"danger",icon:e.jsx(z,{color:"red",className:"mr-2 mt-0.5 h-5 w-5"})});return r.update({okButtonProps:{loading:a.isPending},cancelButtonProps:{disabled:a.isPending}}),await r.then(c=>(c&&a.mutate(n),c),()=>{})}}const ne=()=>{const i=[{title:"No.",width:60,dataIndex:"id",key:"key",render:(s,t,l)=>e.jsx("p",{children:l+1})},{title:e.jsxs("div",{className:"flex items-center gap-x-2",children:[e.jsx(Q,{size:12}),"Background Image"]}),key:"imageUrl",width:180,render:(s,t)=>{var l,x;return e.jsx("div",{className:"flex items-center justify-center",children:e.jsx("img",{className:"h-10 w-10 rounded",src:(x=(l=t.image)==null?void 0:l.urls)==null?void 0:x.small})})}},{title:e.jsxs("div",{className:"flex items-center gap-x-2",children:[e.jsx(y,{size:12}),"Name"]}),dataIndex:"name",key:"name",render:(s,t)=>e.jsx(B,{color:"black",title:"Click to view detail",children:e.jsx(_.Text,{onClick:()=>o(`../template-detail/${t.id}`),children:s})})},{title:e.jsxs("div",{className:"flex items-center gap-x-2",children:[e.jsx(y,{size:12}),"Description"]}),dataIndex:"description",key:"description",render:s=>e.jsx(H,{overlayClassName:"w-96",content:s,children:e.jsx("p",{className:"w-32 truncate",children:s})})},{title:e.jsxs("div",{className:"flex items-center gap-x-2",children:[e.jsx(L,{size:12}),"View Count"]}),key:"viewCount",dataIndex:"viewCount",render:s=>e.jsx(h,{color:"green",children:s})},{title:e.jsxs("div",{className:"flex items-center gap-x-2",children:[e.jsx(O,{size:12}),"Use Count"]}),dataIndex:"useCount",key:"useCount",render(s){return e.jsx(h,{color:"blue",children:s})}},{title:e.jsxs("div",{className:"flex items-center gap-x-2",children:[e.jsx(W,{size:12}),"Category"]}),key:"category",render:(s,t)=>{var l;return e.jsx("p",{children:(l=t==null?void 0:t.category)==null?void 0:l.name})}},{title:e.jsxs("div",{className:"flex items-center gap-x-2",children:[e.jsx($,{size:12}),"Action"]}),width:200,key:"action",render:(s,t)=>e.jsxs(V,{children:[e.jsx(m,{icon:e.jsx(G,{className:"h-3 w-3 text-primary-default"}),size:"small",children:"Edit"}),e.jsx(m,{onClick:()=>w(t.id),icon:e.jsx(U,{color:"red",className:"h-3 w-3"}),size:"small",type:"text",children:"Delete"})]})}],[,,a]=A(I.KEYWORD),o=b(),[n,r]=u.useState(""),{data:c,refetch:g,isPending:v}=R({categoryId:n}),{data:f,isPending:k}=q(a);u.useEffect(()=>{g()},[n]);const{data:d}=D(),w=J();return e.jsxs("div",{className:"flex flex-col gap-y-4 px-6",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h1",{className:"text-2xl font-semibold",children:"Templates"}),e.jsxs("div",{className:"flex items-end gap-x-4",children:[e.jsxs("div",{className:"flex flex-col gap-y-1",children:[e.jsx("span",{className:"text-sm opacity-70",children:"Search"}),e.jsx(E.Keyword,{})]}),e.jsxs("div",{className:"flex flex-col gap-y-1",children:[e.jsx("span",{className:"text-sm opacity-70",children:"Filter"}),e.jsx(F,{className:"w-[150px]",defaultValue:"All",onChange:s=>r(s),options:[{label:"All",value:""},...(d==null?void 0:d.map(s=>({label:s.name,value:s.id})))||[]]})]}),e.jsx(m,{onClick:()=>o("../create/template"),type:"primary",size:"middle",icon:e.jsx(M,{className:"h-3 w-3"}),children:"Add"})]})]}),e.jsx(K,{pagination:{pageSize:50,position:["bottomLeft"]},columns:i,loading:a?k:v,dataSource:a?f:c})]})};export{ne as default};