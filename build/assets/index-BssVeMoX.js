import{c as S,d as C,i as f,A as d,t as g,bW as j,ad as u,h as t,b as I,j as e,Q as F,ay as N,aD as P,aE as w,B as x,k as h,P as D,X as v,aa as k,y as E,aF as T,aG as R,a2 as b,F as y,r as M,I as O}from"./index-bcifMYEQ.js";import{u as Y}from"./use-get-category-BFJn7vmh.js";import{u as _}from"./use-search-params-Bty0Q4Dj.js";import{F as z}from"./Table-DqxhufFh.js";import{T as B}from"./text-BZj7_MT7.js";import{H as L}from"./hand-BOGrgO0c.js";import"./index-DMQ_vExv.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=S("BarChart2",[["line",{x1:"18",x2:"18",y1:"20",y2:"10",key:"1xfpm4"}],["line",{x1:"12",x2:"12",y1:"20",y2:"4",key:"be30l9"}],["line",{x1:"6",x2:"6",y1:"20",y2:"14",key:"1r4le6"}]]),K=async a=>await g.post("/categories",a),H=()=>{const a=j();return C({mutationFn:K,onSuccess:s=>{f(s.status)?(d.success("Category created successfully"),a()):d.error("Failed to create category")}})},V={useId(){return u(t.ID)},useState(){return u(t.STATE)},useKeyword(){return u(t.KEYWORD)},useType(){return u(t.TYPE)}},q=async a=>await g.put(`/categories/${a.id}`,a),U=()=>{const a=j();return C({mutationFn:q,onSuccess:s=>{f(s.status)?(d.success("Category updated successfully"),a()):d.error("Failed to update category")}})},W=async a=>await g.delete(`/categories/${a}`),$=()=>{const a=j();return C({mutationFn:W,onSuccess:s=>{f(s.status)?(d.success("Category removed successfully"),a()):d.error("Failed to remove category")}})};function Q(){const{modal:a}=I.useApp(),s=$();return async c=>{const r=a.confirm({title:"Remove Category",content:"Are you sure you want to remove this category?",cancelText:"Cancel",okText:"Remove",okType:"danger",icon:e.jsx(F,{color:"red",className:"mr-2 mt-0.5 h-5 w-5"})});return r.update({okButtonProps:{loading:s.isPending},cancelButtonProps:{disabled:s.isPending}}),await r.then(l=>(l&&s.mutate(c),l),()=>{})}}const X=async a=>{const{data:s}=await g.get(`/categories/search?keyword=${a}`);return s},J=a=>N({queryKey:["tsm/search/category",a],queryFn:()=>X(a),enabled:!!a}),ce=()=>{const a=[{title:"No.",width:80,dataIndex:"id",key:"key",render:(o,n,A)=>e.jsx("p",{children:A+1})},{title:e.jsxs("div",{className:"flex items-center gap-x-2",children:[e.jsx(B,{size:12}),"Name"]}),dataIndex:"name",key:"name",render:o=>e.jsx("a",{children:o})},{title:e.jsxs("div",{className:"flex items-center gap-x-2",children:[e.jsx(G,{size:12}),"Status"]}),dataIndex:"active",key:"active",render:o=>e.jsx(k,{color:o===!0?"green":"red",children:o?"Active":"Un Active"})},{title:e.jsxs("div",{className:"flex items-center gap-x-2",children:[e.jsx(L,{size:12}),"Action"]}),width:200,key:"action",render:(o,n)=>e.jsxs(E,{children:[e.jsx(x,{onClick:()=>{m.set({[t.MODAL]:h.MODIFY_CATEGORY,[t.ID]:n.id})},icon:e.jsx(T,{className:"w-3 h-3 text-primary-default"}),size:"small",children:"Edit"}),e.jsx(x,{onClick:()=>p(n.id),icon:e.jsx(R,{color:"red",className:"w-3 h-3"}),size:"small",type:"text",children:"Delete"})]})}],[,,s]=u(t.KEYWORD),{data:i,isPending:c}=P(),{data:r,isPending:l}=J(s),p=Q(),m=_();return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex flex-col px-6 gap-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h1",{className:"text-2xl font-semibold",children:"Categories"}),e.jsxs("div",{className:"flex items-end gap-x-4",children:[e.jsxs("div",{className:"flex flex-col gap-y-1",children:[e.jsx("span",{className:"text-sm opacity-70",children:"Search"}),e.jsx(w.Keyword,{})]}),e.jsx(x,{onClick:()=>m.set({[t.MODAL]:h.MODIFY_CATEGORY}),type:"primary",size:"middle",icon:e.jsx(D,{className:"w-3 h-3"}),children:"Add"})]})]}),e.jsx(z,{loading:s?l:c,pagination:{pageSize:50,position:["bottomLeft"]},columns:a,dataSource:s?r:i})]}),e.jsx(ee,{})]})},Z=()=>{const{onClose:a}=b(),[s]=V.useId(),i=!!s,[c]=y.useForm(),{data:r}=Y(s),{mutate:l}=U(),{mutate:p}=H(),m=n=>{i?l({...n,id:s}):p(n),o()},o=()=>{a(n=>{n.has(t.ID)&&n.delete(t.ID)})};return M.useEffect(()=>{i&&c.setFieldsValue({name:r==null?void 0:r.name})},[c,r,i]),e.jsxs("div",{className:"flex flex-col gap-y-4",children:[e.jsx(v.CloseButton,{onClose:o}),e.jsx("h1",{className:"text-2xl font-semibold",children:i?"Edit Category":"Add Category"}),e.jsxs(y,{form:c,layout:"vertical",onFinish:m,children:[e.jsx(y.Item,{label:"Name",name:"name",rules:[{required:!0,message:"Please input category name!"}],children:e.jsx(O,{})}),e.jsx(y.Item,{className:"float-right",children:e.jsx(x,{type:"primary",htmlType:"submit",children:"Submit"})})]})]})},ee=()=>e.jsx(v.Param,{paramKey:t.MODAL,paramValue:h.MODIFY_CATEGORY,size:"xxs",children:e.jsx(Z,{})});export{ce as default};
