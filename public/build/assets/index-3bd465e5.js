import{_,r as m,o as r,c as n,a as e,e as d,f as i,d as p,v as f,F as b,g as x,h as u,t as h}from"./app-7e9eed4f.js";const y={name:"Users",data(){return{users:[],search:""}},async mounted(){await this.getUsers()},computed:{filterSearch(){return this.users.filter(t=>t.name.match(this.search))}},methods:{async getUsers(){await axios.get("/api/users").then(t=>{this.users=t.data}).catch(t=>{console.log(t)})},async deleteItem(t){confirm("هل أنت متأكد من حذف هذا مدير الجرد الحاسب؟")&&await axios.delete(`/api/users/${t}`).then(a=>{this.getUsers()}).catch(a=>{console.log(a)})}}},g={class:"card mt-2"},v={class:"card-header"},w={class:"d-flex justify-content-between"},k=e("h5",{class:"card-title"},"مدير الجرد الحاسبون",-1),U={class:"card-body table-responsive p-0"},C={class:"table-sm w-100 table-bordered text-center"},V=e("thead",null,[e("tr",null,[e("th",{class:"w-50"},"الاسم"),e("th",null,"البريد الالكتروني"),e("th",{class:"w-25"},"أكشن")])],-1),B=["onClick"];function N(t,a,S,$,o,l){const c=m("router-link");return r(),n("div",g,[e("div",v,[e("div",w,[k,d(c,{to:"/users/create",class:"btn btn-primary"},{default:i(()=>[u("اضافة")]),_:1}),p(e("input",{type:"text","onUpdate:modelValue":a[0]||(a[0]=s=>o.search=s),placeholder:"الاسم",class:"form-control w-25"},null,512),[[f,o.search]])])]),e("div",U,[e("table",C,[V,e("tbody",null,[(r(!0),n(b,null,x(l.filterSearch,s=>(r(),n("tr",{key:s.id},[e("td",null,h(s.name),1),e("td",null,h(s.email),1),e("td",null,[d(c,{to:`/users/${s.id}`,class:"btn btn-primary mx-2"},{default:i(()=>[u("تعديل")]),_:2},1032,["to"]),e("button",{class:"btn btn-danger",onClick:D=>l.deleteItem(s.id)}," حذف ",8,B)])]))),128))])])])])}const I=_(y,[["render",N]]);export{I as default};
