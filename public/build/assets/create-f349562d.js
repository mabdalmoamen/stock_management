import{_ as m,o as a,c as i,a as e,t as d,b as p,w as u,d as c,v as l}from"./app-0df0aeeb.js";const h={data(){return{form:{name:"",phone:""},error:null}},methods:{async create(){this.error=null,this.form.name==""&&(this.error="يجب ملء جميع الحقول"),await axios.post("/api/customers",this.form).then(r=>{this.$router.push("/employees")}).catch(r=>{this.error=r.response.data.message})}}},_={class:"row justify-content-center"},f={class:"col-6"},b={class:"card"},v=e("div",{class:"card-header"},[e("h5",null,"إضافة موظف")],-1),y={class:"card-body"},x={key:0,class:"alert alert-sm alert-danger"},g={class:"form-group mb-3"},w=e("label",{class:"mb-1",for:"name"},"الاسم",-1),V={class:"form-group mb-3"},k=e("label",{class:"mb-1",for:"phone"},"الجوال",-1),B=e("button",{type:"submit",class:"btn btn-primary text-center m-auto float-start"}," حفظ ",-1);function D(r,t,M,N,s,n){return a(),i("div",_,[e("div",f,[e("div",b,[v,e("div",y,[s.error?(a(),i("div",x,d(s.error),1)):p("",!0),e("form",{onSubmit:t[2]||(t[2]=u((...o)=>n.create&&n.create(...o),["prevent"]))},[e("div",g,[w,c(e("input",{type:"text",class:"form-control",id:"name","onUpdate:modelValue":t[0]||(t[0]=o=>s.form.name=o),required:""},null,512),[[l,s.form.name]])]),e("div",V,[k,c(e("input",{type:"text",class:"form-control",id:"phone","onUpdate:modelValue":t[1]||(t[1]=o=>s.form.phone=o)},null,512),[[l,s.form.phone]])]),B],32)])])])])}const U=m(h,[["render",D]]);export{U as default};
