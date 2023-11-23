"use strict";(self.webpackChunkflatUnity=self.webpackChunkflatUnity||[]).push([[258],{3258:(ee,x,l)=>{l.r(x),l.d(x,{AdminModule:()=>W});var m=l(6814),s=l(6223),u=l(649),e=l(5879),f=l(9229),c=l(3072);let A=(()=>{var n;class i{constructor(t,o,a,d){this.fb=t,this.router=o,this.toastr=a,this.adminservice=d,this.password="",this.hidePassword=!0,this.submit=!1,this.adminToken="",this.adminForm=this.fb.group({username:["",[s.kI.required,s.kI.minLength(2)]],password:["",[s.kI.required,s.kI.minLength(6)]]})}ngOnInit(){}togglePasswordVisibility(){this.hidePassword=!this.hidePassword}usernameError(){const t=this.adminForm.get("username");if(!t?.valid){if(t?.hasError("required"))return"Username required";if(t?.hasError("minlength"))return"Minimum length of username is two"}}passwordError(){const t=this.adminForm.get("password");if(!t?.valid){if(t?.hasError("required"))return"Password required";if(t?.hasError("minlength"))return"Minimum length of password is six";if(t?.hasError("pattern"))return"Pattern does'nt match"}}onSubmit(){if(this.adminForm.valid)this.submit=!0,this.adminLogin();else{if(this.usernameError())return void this.toastr.warning(this.usernameError(),"",{timeOut:1e3,progressAnimation:"increasing",progressBar:!0});this.passwordError()&&this.toastr.warning(this.passwordError(),"",{timeOut:1e3,progressAnimation:"increasing",progressBar:!0})}}adminLogin(){this.adminservice.adminLogin(this.adminForm.value).subscribe(t=>{this.toastr.success(t.message,"Success",{timeOut:2e3,progressAnimation:"increasing",progressBar:!0}),this.adminToken=t.adminToken,localStorage.setItem("adminToken",this.adminToken),this.router.navigate(["/admin/adminhome"])},t=>{this.toastr.error(t.error.message,"Error",{timeOut:2e3,progressAnimation:"increasing",progressBar:!0})})}}return(n=i).\u0275fac=function(t){return new(t||n)(e.Y36(s.qu),e.Y36(u.F0),e.Y36(f._W),e.Y36(c.m))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-admin-login"]],decls:39,vars:4,consts:[["lang","en"],["charset","UTF-8"],["name","viewport","content","width=device-width, initial-scale=1.0"],["href","https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css","rel","stylesheet"],[1,"bg-gray-100","flex","items-center","justify-center","h-screen"],[1,"flex","flex-col","items-center"],[1,"font-bold","text-black-500"],[1,"font-bold","text-violet-500"],[1,"flex","items-center"],[1,"h-1/2"],["src","../assets/images/usersStanding.png","alt","jhbhgcdgxdfsasSDz",1,"h-72"],[1,"bg-white","p-8","shadow-md","rounded-lg","w-96","flex","flex-col","items-center"],[1,"text-2xl","font-semibold","text-gray-500","mb-4"],[1,"w-full",3,"formGroup","ngSubmit"],[1,"mb-4"],["for","username",1,"block","text-gray-700","text-sm","font-bold","mb-2"],["id","username","type","text","placeholder","Username","formControlName","username",1,"appearance-none","border","rounded","w-full","py-2","px-3","text-gray-700","leading-tight","focus:outline-none","focus:shadow-outline","focus:border-purple-500"],[1,"mb-6"],["for","password",1,"block","text-gray-700","text-sm","font-bold","mb-2"],[1,"relative"],["id","password","placeholder","Password","formControlName","password",1,"appearance-none","border","rounded","w-full","py-2","px-3","text-gray-700","leading-tight","focus:outline-none","focus:shadow-outline","focus:border-purple-500",3,"type","ngModel","ngModelChange"],[1,"absolute","right-0","top-0","mt-2","mr-3","text-cyan-700","text-sm","font-bold"],[3,"click"],[1,"flex","items-center","justify-between"],["type","submit",1,"bg-green-500","hover:bg-green-600","text-white","font-bold","py-2","px-4","rounded","focus:outline-none","focus:shadow-outline"],["href","",1,"inline-block","align-baseline","font-bold","text-sm","text-green-500","hover:text-green-600"]],template:function(t,o){1&t&&(e.TgZ(0,"html",0)(1,"head"),e._UZ(2,"meta",1)(3,"meta",2),e.TgZ(4,"title"),e._uU(5,"Login"),e.qZA(),e._UZ(6,"link",3),e.qZA(),e.TgZ(7,"body",4)(8,"div",5)(9,"div")(10,"h2")(11,"span",6),e._uU(12,"flat"),e.qZA(),e.TgZ(13,"span",7),e._uU(14,"Unity"),e.qZA()()(),e.TgZ(15,"div",8)(16,"div",9),e._UZ(17,"img",10),e.qZA(),e.TgZ(18,"div",11)(19,"h2",12),e._uU(20,"Admin Login"),e.qZA(),e.TgZ(21,"form",13),e.NdJ("ngSubmit",function(){return o.onSubmit()}),e.TgZ(22,"div",14)(23,"label",15),e._uU(24,"Username"),e.qZA(),e._UZ(25,"input",16),e.qZA(),e.TgZ(26,"div",17)(27,"label",18),e._uU(28,"Password"),e.qZA(),e.TgZ(29,"div",19)(30,"input",20),e.NdJ("ngModelChange",function(d){return o.password=d}),e.qZA(),e.TgZ(31,"div",21)(32,"button",22),e.NdJ("click",function(){return o.togglePasswordVisibility()}),e._uU(33),e.qZA()()()(),e.TgZ(34,"div",23)(35,"button",24),e._uU(36," Login "),e.qZA(),e.TgZ(37,"a",25),e._uU(38,"Forgot Password?"),e.qZA()()()()()()()()),2&t&&(e.xp6(21),e.Q6J("formGroup",o.adminForm),e.xp6(9),e.s9C("type",o.hidePassword?"password":"text"),e.Q6J("ngModel",o.password),e.xp6(3),e.hij(" ",o.hidePassword?"Show":"Hide"," "))},dependencies:[s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u],styles:['@import"https://fonts.googleapis.com/css2?family=Poppins&family=Ubuntu&display=swap";*[_ngcontent-%COMP%]{font-family:Poppins,sans-serif}']}),i})();var y=l(7509),h=l(2169),b=l(6053),Z=l(8413);function U(n,i){1&n&&(e.TgZ(0,"td",14),e._uU(1,"Flat Owner"),e.qZA())}function T(n,i){1&n&&(e.TgZ(0,"td",14),e._uU(1,"Looking for flat/flatmate"),e.qZA())}function k(n,i){if(1&n&&(e.TgZ(0,"td",14),e._uU(1),e.ALo(2,"date"),e.qZA()),2&n){const r=e.oxw().$implicit;e.xp6(1),e.Oqu(e.xi3(2,1,r.subscriptionStarts,"mediumDate"))}}function q(n,i){1&n&&(e.TgZ(0,"td",14),e._uU(1,"Not Subscribed"),e.qZA())}function C(n,i){if(1&n&&(e.TgZ(0,"td",14),e._uU(1),e.ALo(2,"date"),e.qZA()),2&n){const r=e.oxw().$implicit;e.xp6(1),e.Oqu(e.xi3(2,1,r.subscriptionEnds,"mediumDate"))}}function P(n,i){1&n&&(e.TgZ(0,"td",14),e._uU(1,"Not Subscribed"),e.qZA())}function F(n,i){1&n&&(e.TgZ(0,"button",19),e._uU(1,"Block"),e.qZA())}function M(n,i){1&n&&(e.TgZ(0,"button",20),e._uU(1,"Unblock"),e.qZA())}function E(n,i){if(1&n){const r=e.EpF();e.TgZ(0,"tr")(1,"td",14),e._uU(2),e.qZA(),e.TgZ(3,"td",14),e._uU(4),e.qZA(),e.YNc(5,U,2,0,"td",15),e.YNc(6,T,2,0,"td",15),e.YNc(7,k,3,4,"td",15),e.YNc(8,q,2,0,"td",15),e.YNc(9,C,3,4,"td",15),e.YNc(10,P,2,0,"td",15),e.TgZ(11,"td",14)(12,"div",16),e.NdJ("click",function(){const a=e.CHM(r).$implicit,d=e.oxw(2);return e.KtG(d.unBlockUser(a._id))}),e.YNc(13,F,2,0,"button",17),e.YNc(14,M,2,0,"button",18),e.qZA()()()}if(2&n){const r=i.$implicit;e.xp6(2),e.Oqu(r.name),e.xp6(2),e.Oqu(r.email),e.xp6(1),e.Q6J("ngIf","flatOwner"===r.userType),e.xp6(1),e.Q6J("ngIf","searcher"===r.userType),e.xp6(1),e.Q6J("ngIf",r.is_premium),e.xp6(1),e.Q6J("ngIf",!r.is_premium),e.xp6(1),e.Q6J("ngIf",r.is_premium),e.xp6(1),e.Q6J("ngIf",!r.is_premium),e.xp6(3),e.Q6J("ngIf",!1===r.is_blocked),e.xp6(1),e.Q6J("ngIf",r.is_blocked)}}function N(n,i){if(1&n&&(e.TgZ(0,"tbody"),e.YNc(1,E,15,10,"tr",13),e.qZA()),2&n){const r=i.ngIf;e.xp6(1),e.Q6J("ngForOf",r)}}let O=(()=>{var n;class i{constructor(t,o,a){this.store=t,this.adminService=o,this.toastr=a}ngOnInit(){this.store.dispatch((0,b.BT)()),this.users$=this.store.pipe((0,h.Ys)(Z.br))}unBlockUser(t){this.adminService.unBlockUser(t).subscribe(o=>{this.toastr.success(o.message,"Success",{timeOut:1e3,progressAnimation:"increasing",progressBar:!0}),this.store.dispatch((0,b.BT)())})}}return(n=i).\u0275fac=function(t){return new(t||n)(e.Y36(h.yh),e.Y36(c.m),e.Y36(f._W))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-usermanagement"]],decls:28,vars:3,consts:[[1,"flex"],[1,""],[1,"relative","py-16","bg-blueGray-50"],[1,"w-full","mb-12","px-4"],[1,"relative","flex","flex-col","min-w-0","break-words","w-full","mb-6","shadow-lg","rounded","bg-purple-500","text-white"],[1,"rounded-t","mb-0","px-4","py-3","border-0"],[1,"flex","flex-wrap","items-center"],[1,"relative","w-full","px-4","max-w-full","flex-grow","flex-1"],[1,"font-semibold","text-lg","text-white"],[1,"block","w-full","overflow-x-auto"],[1,"items-center","w-full","bg-transparent","border-collapse",2,"table-layout","fixed"],[1,"px-6","align-middle","text-center","border","border-solid","py-3","text-xs","uppercase","border-l-0","border-r-0","whitespace-nowrap","font-semibold","text-left","text-white"],[4,"ngIf"],[4,"ngFor","ngForOf"],[1,"border-t-0","px-6","align-middle","text-center","border-l-0","border-r-0","text-xs","p-4"],["class","border-t-0 px-6 align-middle text-center border-l-0 border-r-0 text-xs p-4",4,"ngIf"],[1,"flex","justify-center","items-center",3,"click"],["onclick","","class","bg-red-500 rounded-lg text-sm px-4 py-2 font-bold",4,"ngIf"],["onclick","","class","bg-green-500 rounded-lg text-sm px-4 py-2 font-bold",4,"ngIf"],["onclick","",1,"bg-red-500","rounded-lg","text-sm","px-4","py-2","font-bold"],["onclick","",1,"bg-green-500","rounded-lg","text-sm","px-4","py-2","font-bold"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"section",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"div",6)(7,"div",7)(8,"h3",8),e._uU(9,"Users"),e.qZA()()()(),e.TgZ(10,"div",9)(11,"table",10)(12,"thead")(13,"tr")(14,"th",11),e._uU(15,"Name"),e.qZA(),e.TgZ(16,"th",11),e._uU(17,"E-mail"),e.qZA(),e.TgZ(18,"th",11),e._uU(19,"User type"),e.qZA(),e.TgZ(20,"th",11),e._uU(21,"Subscription starts"),e.qZA(),e.TgZ(22,"th",11),e._uU(23,"Subscription ends"),e.qZA(),e.TgZ(24,"th",11),e._uU(25,"Action"),e.qZA()()(),e.YNc(26,N,2,1,"tbody",12),e.ALo(27,"async"),e.qZA()()()()()()()),2&t&&(e.xp6(26),e.Q6J("ngIf",e.lcZ(27,1,o.users$)))},dependencies:[m.sg,m.O5,m.Ov,m.uU],styles:['@import"https://fonts.googleapis.com/css2?family=Poppins&family=Ubuntu&display=swap";*[_ngcontent-%COMP%]{font-family:Poppins,sans-serif}']}),i})(),I=(()=>{var n;class i{}return(n=i).\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-flatfeeds"]],decls:2,vars:0,template:function(t,o){1&t&&(e.TgZ(0,"h1"),e._uU(1,"ddddddddddddddddddddddddd"),e.qZA())}}),i})(),S=(()=>{var n;class i{}return(n=i).\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-flat-matefeeds"]],decls:2,vars:0,template:function(t,o){1&t&&(e.TgZ(0,"p"),e._uU(1,"flat-matefeeds works!"),e.qZA())}}),i})();var Y=l(2296),p=l(7700);let J=(()=>{var n;class i{}return(n=i).\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-plan-delete-confirmation"]],decls:9,vars:2,consts:[["mat-dialog-title",""],["mat-button","",3,"mat-dialog-close"],["mat-button","","cdkFocusInitial","",3,"mat-dialog-close"]],template:function(t,o){1&t&&(e.TgZ(0,"p",0),e._uU(1,"Confirm Deletion"),e.qZA(),e.TgZ(2,"mat-dialog-content"),e._uU(3," Are you sure you want to delete this plan?\n"),e.qZA(),e.TgZ(4,"mat-dialog-actions")(5,"button",1),e._uU(6,"Cancel"),e.qZA(),e.TgZ(7,"button",2),e._uU(8," Delete "),e.qZA()()),2&t&&(e.xp6(5),e.Q6J("mat-dialog-close","cancel"),e.xp6(2),e.Q6J("mat-dialog-close","delete"))},dependencies:[Y.lW,p.ZT,p.uh,p.xY,p.H8],styles:['@import"https://fonts.googleapis.com/css2?family=Poppins&family=Ubuntu&display=swap";*[_ngcontent-%COMP%]{font-family:Poppins,sans-serif}']}),i})(),L=(()=>{var n;class i{constructor(t,o,a,d,_){this.fb=t,this.admin=o,this.toastr=a,this.router=d,this.dialog=_,this.subscriptionForm=this.fb.group({planName:["",s.kI.required],amount:[0,[s.kI.required,s.kI.min(1)]],duration:[1,[s.kI.required,s.kI.min(1),s.kI.max(12)]],features:["",[s.kI.required,s.kI.minLength(4)]]})}ngOnInit(){}onSubmit(){if(this.subscriptionForm.valid)this.addPlan();else{if(this.nameError())return void this.toastr.warning(this.nameError(),"",{timeOut:1e3,progressAnimation:"increasing",progressBar:!0});if(this.amountError())return void this.toastr.warning(this.amountError(),"",{timeOut:1e3,progressAnimation:"increasing",progressBar:!0});if(this.durationError())return void this.toastr.warning(this.durationError(),"",{timeOut:1e3,progressAnimation:"increasing",progressBar:!0});if(this.featuresError())return void this.toastr.warning(this.featuresError(),"",{timeOut:1e3,progressAnimation:"increasing",progressBar:!0})}}nameError(){const t=this.subscriptionForm.get("planName");if(!t?.valid){if(t?.hasError("required"))return"Name required";if(t?.hasError("minlength"))return"Minimum length of Name should be three"}}amountError(){const t=this.subscriptionForm.get("amount");if(!t?.valid){if(t?.hasError("required"))return"Amount required";if(t?.hasError("min"))return"Amount should'nt be 0"}}durationError(){const t=this.subscriptionForm.get("duration");if(!t?.valid){if(t?.hasError("required"))return"Duration required";if(t?.hasError("min"))return"Minimum one month";if(t?.hasError("max"))return"Maximum 12 months"}}featuresError(){const t=this.subscriptionForm.get("features");if(!t?.valid){if(t?.hasError("required"))return"features required";if(t?.hasError("min"))return"features should'nt be 0"}}addPlan(){this.admin.addPlan(this.subscriptionForm.value).subscribe(o=>{this.toastr.success(o.message,"Success",{timeOut:1e3,progressAnimation:"increasing",progressBar:!0}),this.dialog.closeAll()})}}return(n=i).\u0275fac=function(t){return new(t||n)(e.Y36(s.qu),e.Y36(c.m),e.Y36(f._W),e.Y36(u.F0),e.Y36(p.uw))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-add-plan"]],decls:19,vars:1,consts:[[1,"modal-dialog-content","p-6","bg-white","rounded-lg","shadow-lg",3,"formGroup","ngSubmit"],[1,"mb-4"],["for","planName",1,"text-sm","font-medium","text-gray-600"],["type","text","id","planName","formControlName","planName",1,"block","w-full","px-3","py-2","mt-1","border","border-gray-300","rounded-md","shadow-sm","focus:ring-indigo-500","focus:border-indigo-500","focus:outline-none","focus:ring-2","focus:ring-offset-2"],["for","amount",1,"text-sm","font-medium","text-gray-600"],["type","number","id","amount","formControlName","amount",1,"block","w-full","px-3","py-2","mt-1","border","border-gray-300","rounded-md","shadow-sm","focus:ring-indigo-500","focus:border-indigo-500","focus:outline-none","focus:ring-2","focus:ring-offset-2"],["for","duration",1,"text-sm","font-medium","text-gray-600"],["type","number","id","duration","formControlName","duration",1,"block","w-full","px-3","py-2","mt-1","border","border-gray-300","rounded-md","shadow-sm","focus:ring-indigo-500","focus:border-indigo-500","focus:outline-none","focus:ring-2","focus:ring-offset-2"],["for","features",1,"text-sm","font-medium","text-gray-600"],["type","text","id","features","formControlName","features",1,"block","w-full","px-3","py-2","mt-1","border","border-gray-300","rounded-md","shadow-sm","focus:ring-indigo-500","focus:border-indigo-500","focus:outline-none","focus:ring-2","focus:ring-offset-2"],["type","submit",1,"w-full","px-4","py-2","text-white","bg-purple-600","rounded-md","hover:bg-purple-700","focus:outline-none","focus:ring","focus:ring-purple-200"]],template:function(t,o){1&t&&(e.TgZ(0,"form",0),e.NdJ("ngSubmit",function(){return o.onSubmit()}),e.TgZ(1,"div",1)(2,"label",2),e._uU(3,"Plan Name:"),e.qZA(),e._UZ(4,"input",3),e.qZA(),e.TgZ(5,"div",1)(6,"label",4),e._uU(7,"Amount:"),e.qZA(),e._UZ(8,"input",5),e.qZA(),e.TgZ(9,"div",1)(10,"label",6),e._uU(11,"Duration (in months):"),e.qZA(),e._UZ(12,"input",7),e.qZA(),e.TgZ(13,"div",1)(14,"label",8),e._uU(15,"Features (Separate features with a comma):"),e.qZA(),e._UZ(16,"input",9),e.qZA(),e.TgZ(17,"button",10),e._uU(18," Add Plan "),e.qZA()()),2&t&&e.Q6J("formGroup",o.subscriptionForm)},dependencies:[s._Y,s.Fj,s.wV,s.JJ,s.JL,s.sg,s.u],styles:['@import"https://fonts.googleapis.com/css2?family=Poppins&family=Ubuntu&display=swap";*[_ngcontent-%COMP%]{font-family:Poppins,sans-serif}']}),i})(),H=(()=>{var n;class i{constructor(t,o,a,d,_,K){this.fb=t,this.data=o,this.admin=a,this.store=d,this.toastr=_,this.dialog=K,this.planId=this.data.id,this.planForm=this.fb.group({planName:[this.planName,s.kI.required],amount:[this.amount,[s.kI.required,s.kI.min(1)]],duration:[this.duration,[s.kI.required,s.kI.min(1),s.kI.max(12)]],features:[this.featuresString,[s.kI.required,s.kI.minLength(4)]]})}ngOnInit(){this.store.dispatch((0,b.Eo)()),this.plans$=this.store.pipe((0,h.Ys)(Z.z6)),this.plans$.subscribe(t=>{if(t.length>0){const o=t.find(a=>a._id==this.planId);this.planName=o.planName,this.duration=o.duration,this.amount=o.amount,this.featuresString=o.features.join(","),this.planForm.patchValue(o)}})}onSubmit(){if(this.planForm.valid)this.editPlan();else{if(this.nameError())return void this.toastr.warning(this.nameError(),"",{timeOut:1e3,progressAnimation:"increasing",progressBar:!0});if(this.amountError())return void this.toastr.warning(this.amountError(),"",{timeOut:1e3,progressAnimation:"increasing",progressBar:!0});if(this.durationError())return void this.toastr.warning(this.durationError(),"",{timeOut:1e3,progressAnimation:"increasing",progressBar:!0});if(this.featuresError())return void this.toastr.warning(this.featuresError(),"",{timeOut:1e3,progressAnimation:"increasing",progressBar:!0})}}nameError(){const t=this.planForm.get("planName");if(!t?.valid){if(t?.hasError("required"))return"Name required";if(t?.hasError("minlength"))return"Minimum length of Name should be three"}}amountError(){const t=this.planForm.get("amount");if(!t?.valid){if(t?.hasError("required"))return"Amount required";if(t?.hasError("min"))return"Amount should'nt be 0"}}durationError(){const t=this.planForm.get("duration");if(!t?.valid){if(t?.hasError("required"))return"Duration required";if(t?.hasError("min"))return"Minimum one month";if(t?.hasError("max"))return"Maximum 12 months"}}featuresError(){const t=this.planForm.get("features");if(!t?.valid){if(t?.hasError("required"))return"features required";if(t?.hasError("min"))return"features should'nt be 0"}}editPlan(){this.admin.editPlan(this.planForm.value,this.planId).subscribe(o=>{this.toastr.success(o.message,"Success",{timeOut:1e3,progressAnimation:"increasing",progressBar:!0}),this.dialog.closeAll()})}}return(n=i).\u0275fac=function(t){return new(t||n)(e.Y36(s.qu),e.Y36(p.WI),e.Y36(c.m),e.Y36(h.yh),e.Y36(f._W),e.Y36(p.uw))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-edit-plan"]],decls:19,vars:1,consts:[[1,"modal-dialog-content","p-6","bg-white","rounded-lg","shadow-lg",3,"formGroup","ngSubmit"],[1,"mb-4"],["for","planName",1,"text-sm","font-medium","text-gray-600"],["type","text","id","planName","formControlName","planName",1,"block","w-full","px-3","py-2","mt-1","border","border-gray-300","rounded-md","shadow-sm","focus:ring-indigo-500","focus:border-indigo-500","focus:outline-none","focus:ring-2","focus:ring-offset-2"],["for","amount",1,"text-sm","font-medium","text-gray-600"],["type","number","id","amount","formControlName","amount",1,"block","w-full","px-3","py-2","mt-1","border","border-gray-300","rounded-md","shadow-sm","focus:ring-indigo-500","focus:border-indigo-500","focus:outline-none","focus:ring-2","focus:ring-offset-2"],["for","duration",1,"text-sm","font-medium","text-gray-600"],["type","number","id","duration","formControlName","duration",1,"block","w-full","px-3","py-2","mt-1","border","border-gray-300","rounded-md","shadow-sm","focus:ring-indigo-500","focus:border-indigo-500","focus:outline-none","focus:ring-2","focus:ring-offset-2"],["for","features",1,"text-sm","font-medium","text-gray-600"],["type","text","id","features","formControlName","features",1,"block","w-full","px-3","py-2","mt-1","border","border-gray-300","rounded-md","shadow-sm","focus:ring-indigo-500","focus:border-indigo-500","focus:outline-none","focus:ring-2","focus:ring-offset-2"],["type","submit",1,"w-full","px-4","py-2","text-white","bg-purple-600","rounded-md","hover:bg-purple-700","focus:outline-none","focus:ring","focus:ring-purple-200"]],template:function(t,o){1&t&&(e.TgZ(0,"form",0),e.NdJ("ngSubmit",function(){return o.onSubmit()}),e.TgZ(1,"div",1)(2,"label",2),e._uU(3,"Plan Name:"),e.qZA(),e._UZ(4,"input",3),e.qZA(),e.TgZ(5,"div",1)(6,"label",4),e._uU(7,"Amount:"),e.qZA(),e._UZ(8,"input",5),e.qZA(),e.TgZ(9,"div",1)(10,"label",6),e._uU(11,"Duration (in months):"),e.qZA(),e._UZ(12,"input",7),e.qZA(),e.TgZ(13,"div",1)(14,"label",8),e._uU(15,"Features (Separate features with a comma):"),e.qZA(),e._UZ(16,"input",9),e.qZA(),e.TgZ(17,"button",10),e._uU(18," Update "),e.qZA()()),2&t&&e.Q6J("formGroup",o.planForm)},dependencies:[s._Y,s.Fj,s.wV,s.JJ,s.JL,s.sg,s.u]}),i})();function B(n,i){if(1&n){const r=e.EpF();e.TgZ(0,"tr")(1,"td",16),e._uU(2),e.qZA(),e.TgZ(3,"td",16),e._uU(4),e.qZA(),e.TgZ(5,"td",16),e._uU(6),e.qZA(),e.TgZ(7,"td",16)(8,"div",17)(9,"button",18),e.NdJ("click",function(){const a=e.CHM(r).$implicit,d=e.oxw(2);return e.KtG(d.openEditScreen(a._id))}),e.O4$(),e.TgZ(10,"svg",19),e._UZ(11,"path",20),e.qZA()(),e.kcU(),e.TgZ(12,"button",21),e.NdJ("click",function(){const a=e.CHM(r).$implicit,d=e.oxw(2);return e.KtG(d.openDeleteConfirmation(a._id))}),e.O4$(),e.TgZ(13,"svg",22),e._UZ(14,"path",23),e.qZA()()()()()}if(2&n){const r=i.$implicit;e.xp6(2),e.hij(" ",r.planName," "),e.xp6(2),e.hij(" ",r.amount," "),e.xp6(2),e.hij(" ",r.duration," Month/s ")}}function j(n,i){1&n&&(e.TgZ(0,"div",24)(1,"p"),e._uU(2,"No plans added"),e.qZA()())}function Q(n,i){if(1&n&&(e.TgZ(0,"tbody"),e.YNc(1,B,15,3,"tr",14),e.TgZ(2,"div"),e.YNc(3,j,3,0,"div",15),e.qZA()()),2&n){const r=e.oxw();e.xp6(1),e.Q6J("ngForOf",r.plans),e.xp6(2),e.Q6J("ngIf",!r.plans.length)}}let $=(()=>{var n;class i{constructor(t,o,a,d){this.adminService=t,this.toastr=o,this.router=a,this.dialog=d}ngOnInit(){this.adminService.loadPlans().subscribe(t=>{this.plans=t.plans})}openDeleteConfirmation(t){this.dialog.open(J,{data:{id:t}}).afterClosed().subscribe(a=>{"delete"===a&&this.deletePlan(t)})}deletePlan(t){this.adminService.deletePlan(t).subscribe(o=>{this.toastr.success(o.message,"Success",{timeOut:1e3,progressAnimation:"increasing",progressBar:!0}),this.ngOnInit()})}openAddForm(){this.dialog.open(L,{width:"auto",maxWidth:"95vw"}).afterClosed().subscribe(o=>{this.ngOnInit()})}openEditScreen(t){this.dialog.open(H,{width:"auto",maxWidth:"95vw",data:{id:t}}).afterClosed().subscribe(a=>{this.ngOnInit()})}}return(n=i).\u0275fac=function(t){return new(t||n)(e.Y36(c.m),e.Y36(f._W),e.Y36(u.F0),e.Y36(p.uw))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-plans"]],decls:24,vars:1,consts:[[1,"flex"],[1,""],[1,"relative","py-16","bg-blueGray-50"],[1,"w-full","mb-12","px-4"],[1,"bg-red-500","rounded-lg","text-sm","text-white","mb-2","px-4","py-2","font-bold",3,"click"],[1,"relative","flex","flex-col","min-w-0","break-words","w-full","mb-6","shadow-lg","rounded","bg-purple-500","text-white"],[1,"rounded-t","mb-0","px-4","py-3","border-0"],[1,"flex","flex-wrap","items-center"],[1,"relative","w-full","px-4","max-w-full","flex-grow","flex-1"],[1,"font-semibold","text-lg","text-white"],[1,"block","w-full","overflow-x-auto"],[1,"items-center","w-full","bg-transparent","border-collapse",2,"table-layout","fixed"],[1,"px-6","align-middle","text-center","border","border-solid","py-3","text-xs","uppercase","border-l-0","border-r-0","whitespace-nowrap","font-semibold","text-left","text-white"],[4,"ngIf"],[4,"ngFor","ngForOf"],["class","flex justify-end w-full",4,"ngIf"],[1,"border-t-0","px-6","align-middle","text-center","border-l-0","border-r-0","text-xs","p-4"],[1,"flex","justify-center","items-center"],[3,"click"],["xmlns","http://www.w3.org/2000/svg","fill","none","viewBox","0 0 24 24","stroke-width","1.5","stroke","blue",1,"w-6","h-6"],["stroke-linecap","round","stroke-linejoin","round","d","M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"],[1,"",3,"click"],["xmlns","http://www.w3.org/2000/svg","fill","none","viewBox","0 0 24 24","stroke-width","1.5","stroke","red",1,"w-6","h-6"],["stroke-linecap","round","stroke-linejoin","round","d","M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"],[1,"flex","justify-end","w-full"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"section",2)(3,"div",3)(4,"button",4),e.NdJ("click",function(){return o.openAddForm()}),e._uU(5," Add Plan "),e.qZA(),e.TgZ(6,"div",5)(7,"div",6)(8,"div",7)(9,"div",8)(10,"p",9),e._uU(11,"Plans"),e.qZA()()()(),e.TgZ(12,"div",10)(13,"table",11)(14,"thead")(15,"tr")(16,"th",12),e._uU(17," Plan Name "),e.qZA(),e.TgZ(18,"th",12),e._uU(19," Amount "),e.qZA(),e.TgZ(20,"th",12),e._uU(21," Duration "),e.qZA(),e._UZ(22,"th",12),e.qZA()(),e.YNc(23,Q,4,2,"tbody",13),e.qZA()()()()()()()),2&t&&(e.xp6(23),e.Q6J("ngIf",o.plans))},dependencies:[m.sg,m.O5],styles:['@import"https://fonts.googleapis.com/css2?family=Poppins&family=Ubuntu&display=swap";*[_ngcontent-%COMP%]{font-family:Poppins,sans-serif}']}),i})();function D(n,i){1&n&&e._UZ(0,"app-usermanagement")}function z(n,i){1&n&&e._UZ(0,"app-flatfeeds")}function V(n,i){1&n&&e._UZ(0,"app-flat-matefeeds")}function G(n,i){1&n&&e._UZ(0,"app-plans")}let g=(()=>{var n;class i{constructor(t,o){this.router=t,this.adminService=o,this.showUserManagement=!1,this.showFlatfeed=!1,this.showFlatmatefeed=!1,this.showsales=!1,this.showPref=!1,this.showPlans=!1}ngOnInit(){this.router.url.subscribe(t=>{this.showUserManagement=t.some(o=>"users"===o.path),this.showFlatfeed=t.some(o=>"flatfeed"===o.path),this.showFlatmatefeed=t.some(o=>"flatMatefeed"===o.path),this.showPlans=t.some(o=>"plans"===o.path)})}logOutAdmin(){localStorage.removeItem("adminToken")}}return(n=i).\u0275fac=function(t){return new(t||n)(e.Y36(u.gz),e.Y36(c.m))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-admin-home"]],decls:66,vars:4,consts:[[1,"flex"],[1,""],[1,"bg-purple-800","h-screen","w-64","fixed","top-0","left-0","overflow-y-auto"],[1,"p-4"],[1,"text-2xl","font-semibold"],[1,"text-white"],[1,"text-green-500"],[1,"font-light","text-white"],[1,"space-y-2","px-4"],[1,"flex","hover:bg-white","text-white","hover:text-black","dashboard"],["xmlns","http://www.w3.org/2000/svg","fill","none","viewBox","0 0 24 24","stroke-width","1.5","stroke","currentColor",1,"w-6","h-8"],["stroke-linecap","round","stroke-linejoin","round","d","M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"],["stroke-linecap","round","stroke-linejoin","round","d","M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"],["href","/admin/adminhome",1,"block","py-2","px-4",3,"ngClass"],[1,"flex","hover:bg-white","text-white","hover:text-black"],["xmlns","http://www.w3.org/2000/svg","fill","none","viewBox","0 0 24 24","stroke-width","1.5","stroke","currentColor",1,"w-6","h-6"],["stroke-linecap","round","stroke-linejoin","round","d","M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"],["href","/admin/users",1,"block","py-2","px-4"],["stroke-linecap","round","stroke-linejoin","round","d","M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"],["href","/admin/flatfeed",1,"block","py-2","px-4"],["stroke-linecap","round","stroke-linejoin","round","d","M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"],["href","/admin/flatMatefeed",1,"block","py-2","px-4"],["stroke-linecap","round","stroke-linejoin","round","d","M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"],["href","/admin/plans",1,"block","py-2","px-4"],["stroke-linecap","round","stroke-linejoin","round","d","M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"],["href","",1,"block","py-2","px-4"],["stroke-linecap","round","stroke-linejoin","round","d","M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"],[1,"flex","hover:bg-white","text-red-500"],["stroke-linecap","round","stroke-linejoin","round","d","M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"],["href","/admin/login",1,"block","py-2","px-4",3,"click"],[1,"ml-64"],[4,"ngIf"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"span",5),e._uU(6,"flat"),e.qZA(),e.TgZ(7,"span",6),e._uU(8,"Unity"),e.qZA(),e.TgZ(9,"span",7),e._uU(10,"-Admin"),e.qZA()()(),e.TgZ(11,"ul",8)(12,"li")(13,"div",9),e.O4$(),e.TgZ(14,"svg",10),e._UZ(15,"path",11)(16,"path",12),e.qZA(),e.kcU(),e.TgZ(17,"a",13),e._uU(18,"Dashboard"),e.qZA()()(),e.TgZ(19,"li")(20,"div",14),e.O4$(),e.TgZ(21,"svg",15),e._UZ(22,"path",16),e.qZA(),e.kcU(),e.TgZ(23,"a",17),e._uU(24,"Users"),e.qZA()()(),e.TgZ(25,"li")(26,"div",14),e.O4$(),e.TgZ(27,"svg",15),e._UZ(28,"path",18),e.qZA(),e.kcU(),e.TgZ(29,"a",19),e._uU(30,"Feed-flats"),e.qZA()()(),e.TgZ(31,"li")(32,"div",14),e.O4$(),e.TgZ(33,"svg",15),e._UZ(34,"path",20),e.qZA(),e.kcU(),e.TgZ(35,"a",21),e._uU(36,"Feed-flatmates"),e.qZA()()(),e.TgZ(37,"li")(38,"div",14),e.O4$(),e.TgZ(39,"svg",15),e._UZ(40,"path",22),e.qZA(),e.kcU(),e.TgZ(41,"a",23),e._uU(42,"Plans"),e.qZA()()(),e.TgZ(43,"li")(44,"div",14),e.O4$(),e.TgZ(45,"svg",15),e._UZ(46,"path",24),e.qZA(),e.kcU(),e.TgZ(47,"a",25),e._uU(48,"Preferences"),e.qZA()()(),e.TgZ(49,"li")(50,"div",14),e.O4$(),e.TgZ(51,"svg",15),e._UZ(52,"path",26),e.qZA(),e.kcU(),e.TgZ(53,"a",25),e._uU(54,"Sales report"),e.qZA()()(),e.TgZ(55,"li")(56,"div",27),e.O4$(),e.TgZ(57,"svg",15),e._UZ(58,"path",28),e.qZA(),e.kcU(),e.TgZ(59,"a",29),e.NdJ("click",function(){return o.logOutAdmin()}),e._uU(60,"Signout"),e.qZA()()()()()(),e.TgZ(61,"div",30),e.YNc(62,D,1,0,"app-usermanagement",31),e.YNc(63,z,1,0,"app-flatfeeds",31),e.YNc(64,V,1,0,"app-flat-matefeeds",31),e.YNc(65,G,1,0,"app-plans",31),e.qZA()()),2&t&&(e.xp6(62),e.Q6J("ngIf",o.showUserManagement),e.xp6(1),e.Q6J("ngIf",o.showFlatfeed),e.xp6(1),e.Q6J("ngIf",o.showFlatmatefeed),e.xp6(1),e.Q6J("ngIf",o.showPlans))},dependencies:[m.mk,m.O5,y.oO,O,I,S,$],styles:['@import"https://fonts.googleapis.com/css2?family=Poppins&family=Ubuntu&display=swap";*[_ngcontent-%COMP%]{font-family:Poppins,sans-serif}.dashboard[_ngcontent-%COMP%]{box-flex-group:yellow!important}.rounded-grey-bg[_ngcontent-%COMP%]{background-color:#f8f8f852;border-radius:50px;padding:1rem}']}),i})();var v=l(7398),w=l(5765);const X=[{path:"login",component:A,canActivate:[(n,i)=>{const r=(0,e.f3M)(w.H),t=(0,e.f3M)(u.F0);return r.checkAdminLogin().pipe((0,v.U)(o=>!o||(t.navigate(["/admin/adminhome"]),!1)))}]},{path:"adminhome",component:g,canActivate:[(n,i)=>{const r=(0,e.f3M)(w.H),t=(0,e.f3M)(u.F0);return r.checkAdminLogin().pipe((0,v.U)(o=>!!o||(t.navigate(["/admin/login"]),!1)))}]},{path:"users",component:g},{path:"flatfeed",component:g},{path:"flatMatefeed",component:g},{path:"plans",component:g}];let R=(()=>{var n;class i{}return(n=i).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[u.Bz.forChild(X),u.Bz]}),i})(),W=(()=>{var n;class i{}return(n=i).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[m.ez,R,s.UX,s.u5]}),i})()}}]);