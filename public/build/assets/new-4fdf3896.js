import{_ as m,o as n,c,a as e,d as l,v as d,b as h,F as _,g as y,n as p,t as u}from"./app-0df0aeeb.js";const v={data(){return{search:"",employee:null,employees:[],items:[],cart:[],form:{},barcode:null}},async mounted(){await this.getEmployee(),await this.getItems()},computed:{filteredList(){return this.employees.filter(t=>t.name.toLowerCase().includes(this.search.toLowerCase()))}},methods:{async findEmployee(){await axios.get("api/customers/"+this.search).then(t=>{this.employee=t.data}).catch(t=>{this.employee=null,console.log(t)})},async findByBarcode(){this.barcode&&await axios.get("api/items/"+this.barcode).then(t=>{t.data?(this.addToCart(t.data),this.barcode=null):alert("الباركود غير صحيح")}).catch(t=>{console.log(t)})},async updateQty(t){t.qty<1&&(alert("الكمية لا تقل عن صفر"),t.qty=1),t.qty>t.quantity&&(alert("الكمية لا تزيد عن متوفرة"),t.qty=t.quantity),this.cart=[...this.cart]},async getEmployee(){await await axios.get("api/customers").then(t=>{this.employees=t.data}).catch(t=>{console.log(t)})},async getItems(){await axios.get("api/items").then(t=>{this.items=t.data}).catch(t=>{console.log(t)})},async addToCart(t){if(this.cart.indexOf(t)!==-1){alert("هذه المعدة موجودة في السلة");return}t.qty=1,this.cart.push(t),this.cart=[...this.cart]},async removeFromCart(t){this.cart.splice(this.cart.indexOf(t),1),this.cart=[...this.cart]},async submit(){if(this.cart.length===0){alert("يجب اختيار معدة واحده على الاقل");return}if(this.employee===null||this.employee===void 0||this.employee===""){alert("يجب اختيار الموظف");return}this.form.customer_id=this.employee.id,this.form.cart=this.cart,await axios.post("api/inuses",this.form).then(t=>{this.cart=[],this.form={},this.form.cart=[],alert(" تمت العملية بنجاح "),this.$router.push({name:"home"})})}}},f={class:"card text-center p-0 m-0 min-vh-100"},g={class:"card-header"},b={class:"d-flex justify-content-around"},x=e("h5",null,"صرف معدة",-1),w=["value"],C={class:"card-body p-0 m-0"},k={class:"row"},q={class:"col-6"},B={key:0,class:"card min-vh-100"},V=e("div",{class:"card-header"},[e("h5",{class:"card-title text-end"},"المعدات")],-1),E={class:"card-body m-0 p-0"},F={class:"row"},L=["onClick"],T={class:"card-body"},U=["src"],j={class:"card-text text-end"},D={class:"col-6"},I={key:0,class:"card min-vh-100"},N=e("div",{class:"card-header"},[e("h5",{class:"card-title text-end"},"السلة")],-1),O={class:"card-body m-0 p-0"},Q={class:"row"},z={class:"card mb-2"},K={class:"card-body"},M={class:"d-flex justify-content-between"},S=["src"],A={class:"card-title"},G=["onClick"],H={class:"card-footer"},J=["onUpdate:modelValue","onChange"];function P(t,o,R,W,a,i){return n(),c("div",f,[e("div",g,[e("div",b,[x,l(e("input",{type:"text",placeholder:"كود-باركود المعدة",class:"form-control w-25","onUpdate:modelValue":o[0]||(o[0]=s=>a.barcode=s),onChange:o[1]||(o[1]=s=>i.findByBarcode())},null,544),[[d,a.barcode]]),l(e("input",{type:"text",placeholder:"كود-جوال الموظف",class:"form-control w-25","onUpdate:modelValue":o[2]||(o[2]=s=>a.search=s),onKeyup:o[3]||(o[3]=s=>i.findEmployee())},null,544),[[d,a.search]]),a.employee?(n(),c("input",{key:0,class:"form-control w-25",readonly:"",value:a.employee.name},null,8,w)):h("",!0),e("button",{class:"btn btn-primary",onClick:o[4]||(o[4]=s=>i.submit())},"حفظ")])]),e("div",C,[e("div",k,[e("div",q,[a.items.length?(n(),c("div",B,[V,e("div",E,[e("div",F,[(n(!0),c(_,null,y(a.items,s=>(n(),c("div",{class:"col-4",key:s.id},[e("div",{class:"card mb-2",onClick:r=>i.addToCart(s),style:{cursor:"pointer"}},[e("div",T,[e("span",{class:p(["float-start position-absolute",`
                                                        ${s.quantity<1?"badge bg-danger":"badge bg-success"}
                                                    `]),style:{right:"0",top:"0"}},u(s.quantity),3),e("img",{src:s.image,width:"50",height:"50"},null,8,U),e("div",j,u(s.name),1)])],8,L)]))),128))])])])):h("",!0)]),e("div",D,[a.cart.length?(n(),c("div",I,[N,e("div",O,[e("div",Q,[(n(!0),c(_,null,y(a.cart,s=>(n(),c("div",{class:"col-6",key:s.id},[e("div",z,[e("div",K,[e("div",M,[e("img",{src:s.image,width:"50",height:"50"},null,8,S),e("h5",A,u(s.name),1),e("button",{class:"btn btn-xs btn-danger",onClick:r=>i.removeFromCart(s)}," حذف ",8,G)])]),e("div",H,[l(e("input",{class:"form-control text-center",type:"number",min:"1","onUpdate:modelValue":r=>s.qty=r,onChange:r=>i.updateQty(s)},null,40,J),[[d,s.qty]])])])]))),128))])])])):h("",!0)])])])])}const Y=m(v,[["render",P]]);export{Y as default};