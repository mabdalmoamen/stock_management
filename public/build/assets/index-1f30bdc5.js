import{_ as m,r as _,o as n,c as l,a as t,e as d,f as h,d as p,v as f,F as b,g,h as u,t as o}from"./app-0df0aeeb.js";const x={name:"Items",data(){return{items:[],search:""}},async mounted(){await this.getItems()},computed:{filterSearch(){return this.items.filter(s=>s.name.match(this.search))}},methods:{async getItems(){await axios.get("/api/items").then(s=>{this.items=s.data}).catch(s=>{console.log(s)})},async deleteItem(s){confirm("هل أنت متأكد من حذف هذا المنتج؟")&&await axios.delete(`/api/items/${s}`).then(a=>{this.getItems()}).catch(a=>{console.log(a)})}}},y={class:"card mt-2"},w={class:"card-header"},v={class:"d-flex justify-content-between"},k=t("h5",{class:"card-title"},"المعدات",-1),I={class:"card-body table-responsive p-0"},C={class:"table-sm w-100 table-bordered text-center"},V=t("thead",null,[t("tr",null,[t("th",{class:"w-50"},"البيان"),t("th",null,"الكمية"),t("th",null,"الصورة"),t("th",null,"الباركود"),t("th",{class:"w-25"},"أكشن")])],-1),B=["src"],N=["onClick"];function S(s,a,$,D,r,c){const i=_("router-link");return n(),l("div",y,[t("div",w,[t("div",v,[k,d(i,{to:"/items/create",class:"btn btn-primary"},{default:h(()=>[u("اضافة")]),_:1}),p(t("input",{type:"text","onUpdate:modelValue":a[0]||(a[0]=e=>r.search=e),placeholder:"البيان",class:"form-control w-25"},null,512),[[f,r.search]])])]),t("div",I,[t("table",C,[V,t("tbody",null,[(n(!0),l(b,null,g(c.filterSearch,e=>(n(),l("tr",{key:e.id},[t("td",null,o(e.name),1),t("td",null,o(e.quantity),1),t("td",null,[t("img",{src:e.image,width:"50",height:"50"},null,8,B)]),t("td",null,o(e.barcode),1),t("td",null,[d(i,{to:`/items/${e.id}`,class:"btn btn-primary mx-2"},{default:h(()=>[u("تعديل")]),_:2},1032,["to"]),t("button",{class:"btn btn-danger",onClick:F=>c.deleteItem(e.id)}," حذف ",8,N)])]))),128))])])])])}const j=m(x,[["render",S]]);export{j as default};
