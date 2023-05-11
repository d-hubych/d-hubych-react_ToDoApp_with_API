(this["webpackJsonpreact-typescript-starter-pack"]=this["webpackJsonpreact-typescript-starter-pack"]||[]).push([[0],{31:function(t,e,n){},34:function(t,e,n){"use strict";n.r(e);var o=n(0),c=n(25),i=n.n(c),r=(n(30),n(31),n(4)),a=n(11),u=n(8),l=n.n(u),s="https://mate.academy/students-api";function d(t){return new Promise((function(e){setTimeout(e,t)}))}function j(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o={method:e};return n&&(o.body=JSON.stringify(n),o.headers={"Content-Type":"application/json; charset=UTF-8"}),d(300).then((function(){return fetch(s+t,o)})).then((function(t){if(!t.ok)throw new Error("Something went wrong with the request to the server");return t.json()}))}var b,f,m=function(t){return j(t)},p=function(t,e){return j(t,"POST",e)},h=function(t,e){return j(t,"PATCH",e)},O=function(t){return j(t,"DELETE")},v=n(2),g=function(t){var e=t.setUser,n=Object(o.useState)(""),c=Object(r.a)(n,2),i=c[0],a=c[1],u=Object(o.useState)(""),s=Object(r.a)(u,2),d=s[0],j=s[1],b=Object(o.useState)(!1),f=Object(r.a)(b,2),h=f[0],O=f[1],g=Object(o.useState)(!1),x=Object(r.a)(g,2),N=x[0],_=x[1],y=Object(o.useState)(!1),S=Object(r.a)(y,2),T=S[0],C=S[1];return Object(v.jsx)("div",{className:"todoapp authorization",children:Object(v.jsxs)("div",{className:"todoapp__content authorization__content",children:["Please, login to get yours todos",Object(v.jsxs)("form",{method:"post",onSubmit:function(t){return function(t){if(t.preventDefault(),!(i.length<3)){var n=function(t){var n={id:t.id,email:t.email,name:t.name};e(n),localStorage.setItem("user",JSON.stringify(n))};h?p("/users",{email:i,name:d}).then((function(t){n(t)})).catch((function(){_(!0)})):m("/users?email=".concat(i)).then((function(t){var e=t[0];e?n(e):(O(!0),C(!0))})).catch((function(){return _(!0)}))}}(t)},className:"authorization__form",children:[Object(v.jsx)("input",{type:"email",name:"email",placeholder:"Enter your email",value:i,onChange:function(t){return a(t.target.value)},className:l()("input is-primary","authorization__input"),disabled:T,minLength:3}),h&&Object(v.jsx)("input",{type:"text",name:"name",placeholder:"Enter your name",value:d,onChange:function(t){return j(t.target.value)},minLength:3,className:l()("input is-primary","authorization__input")}),Object(v.jsx)("button",{type:"submit",className:"button is-primary",children:"confirm"})]}),N&&Object(v.jsx)("p",{children:"Something went wrong with the authorization."})]})})},x=n(24),N=n(7),_=n(3);!function(t){t.None="None",t.Add="Add",t.Delete="Delete",t.Update="Update",t.Load="Load",t.EmptyInput="EmptyInput"}(b||(b={})),function(t){t.Neutral="Neutral",t.Saving="Saving",t.Deleting="Deleting"}(f||(f={}));var y=function(t){return O("/todos/".concat(t))},S=function(t,e){return h("/todos/".concat(t),e)},T=function(t){var e=t.containsActive,n=t.handleError,c=t.setTodoCondition,i=t.onTrickTempTodo,a=t.setTodos,u=t.toggleAllTodos,s=t.USER_ID,d=Object(o.useState)(""),j=Object(r.a)(d,2),m=j[0],h=j[1],O=Object(o.useState)(!1),g=Object(r.a)(O,2),x=g[0],_=g[1],y=function(t){if(t.preventDefault(),!m)return n(b.EmptyInput);_(!0),c(f.Saving);var e,o={id:0,userId:s,title:m,completed:!1};return i(o),h(""),(e=o,p("/todos/",e)).then((function(t){i(null),a((function(e){return[].concat(Object(N.a)(e),[t])}))})).catch((function(){return n(b.Add)})).finally((function(){c(f.Neutral),_(!1)}))};return Object(v.jsxs)("header",{className:"todoapp__header",children:[Object(v.jsx)("button",{type:"button",className:l()("todoapp__toggle-all",{active:e}),"aria-label":"Complete all todos button",onClick:u}),Object(v.jsx)("form",{onSubmit:function(t){return y(t)},children:Object(v.jsx)("input",{type:"text",className:"todoapp__new-todo",placeholder:"What needs to be done?",value:m,onChange:function(t){var e=t.target;return h(e.value)},disabled:x})})]})},C=function(){},E=function(t){var e=t.todo,n=t.todoCondition,c=t.onDeleteTodo,i=void 0===c?C:c,a=t.toggleTodo,u=void 0===a?C:a,s=t.handleSubmitEditing,d=void 0===s?C:s,j=e.id,b=e.title,m=e.completed,p=Object(o.useState)(!1),h=Object(r.a)(p,2),O=h[0],g=h[1],x=Object(o.useState)(b),N=Object(r.a)(x,2),_=N[0],y=N[1],S=function(t){t.preventDefault(),""===_&&i(j),_!==b&&d(j,_),g(!1)};return Object(v.jsxs)("div",{className:l()("todo",{completed:m}),onDoubleClick:function(){return g(!0)},children:[Object(v.jsx)("label",{className:"todo__status-label",children:Object(v.jsx)("input",{type:"checkbox",className:"todo__status",checked:m,onChange:function(){return u([e])}})}),O?Object(v.jsx)("form",{onSubmit:S,children:Object(v.jsx)("input",{type:"text",className:"todo__title-field",placeholder:"Empty todo will be deleted",value:_,onChange:function(t){y(t.target.value)},onBlur:S,onKeyUp:function(t){"Escape"===t.key&&(g(!1),y(b))}})}):Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)("span",{className:"todo__title",children:b}),Object(v.jsx)("button",{type:"button",className:"todo__remove",onClick:function(){return i(j)},children:"x"})]}),Object(v.jsxs)("div",{className:l()("modal","overlay",{"is-active":n!==f.Neutral}),children:[Object(v.jsx)("div",{className:"modal-background has-background-white-ter"}),Object(v.jsx)("div",{className:"loader"})]})]})},k=function(t){var e=t.todos,n=t.onDeleteTodo,o=t.procesingTodosId,c=t.todoCondition,i=t.toggleTodo,r=t.handleSubmitEditing;return Object(v.jsx)(v.Fragment,{children:e.map((function(t){var e=f.Neutral;return o.includes(t.id)&&(e=c),Object(v.jsx)(E,{todo:t,onDeleteTodo:n,todoCondition:e,toggleTodo:i,handleSubmitEditing:r},t.id)}))})},D=function(t){var e=t.containsCompleted,n=t.onClearCompleted,o=t.itemsLeft;return Object(v.jsxs)("footer",{className:"todoapp__footer",children:[Object(v.jsx)("span",{className:"todo-count",children:"".concat(o," items left")}),Object(v.jsxs)("nav",{className:"filter",children:[Object(v.jsx)(a.b,{to:"/",className:function(t){var e=t.isActive;return l()("filter__link",{selected:e})},children:"All"}),Object(v.jsx)(a.b,{to:"active",className:function(t){var e=t.isActive;return l()("filter__link",{selected:e})},children:"Active"}),Object(v.jsx)(a.b,{to:"completed",className:function(t){var e=t.isActive;return l()("filter__link",{selected:e})},children:"Completed"})]}),Object(v.jsx)("button",{type:"button",className:"todoapp__clear-completed",style:{visibility:e?"visible":"hidden"},onClick:n,children:"Clear completed"})]})},w=function(t){var e=t.errorType,n=t.handleError;return Object(v.jsxs)("div",{className:l()("notification","is-danger","is-light","has-text-weight-normal",{hidden:e===b.None}),children:[Object(v.jsx)("button",{type:"button",className:"delete",onClick:function(){return n(b.None)},"aria-label":"close error"}),e===b.EmptyInput?"Title can't be empty":"Unable to ".concat(e," a todo")]})},A=function(t){var e=t.user,n=Object(o.useState)([]),c=Object(r.a)(n,2),i=c[0],a=c[1],u=Object(o.useState)(b.None),l=Object(r.a)(u,2),s=l[0],d=l[1],j=Object(o.useState)(f.Neutral),p=Object(r.a)(j,2),h=p[0],O=p[1],g=Object(o.useState)([]),C=Object(r.a)(g,2),A=C[0],I=C[1],U=Object(o.useState)(null),L=Object(r.a)(U,2),z=L[0],F=L[1],J=Object(_.j)().pathname,P=Object(_.l)(),B=e.id,H=function(t){t!==b.None&&setTimeout((function(){return d(b.None)}),3e3),d(t)};Object(o.useEffect)((function(){var t;B&&(t=B,m("/todos?userId=".concat(t))).then((function(t){a(t)})).catch((function(){return H(b.Load)}))}),[B]);var R=Object(o.useMemo)((function(){return{isActive:i.some((function(t){return!1===t.completed})),isCompleted:i.some((function(t){return!0===t.completed}))}}),[i]),q=function(t,e){O(f.Saving),t.forEach((function(t){t.completed!==e&&I((function(e){return[].concat(Object(N.a)(e),[t.id])}));var n=Object(N.a)(i),o=n.findIndex((function(e){return e.id===t.id})),c=e||!t.completed;n[o].completed=c,S(t.id,{completed:c}).then((function(){a(n)})).catch((function(){return H(b.Update)})).finally((function(){I([]),O(f.Neutral)}))}))},G=i?function(t,e){switch(e){case"/completed":return t.filter((function(t){return!0===t.completed}));case"/active":return t.filter((function(t){return!1===t.completed}));default:return t}}(i,J):[];return Object(v.jsxs)("div",{className:"todoapp",children:[Object(v.jsx)("h1",{className:"todoapp__title",children:"todos"}),Object(v.jsxs)("div",{className:"todoapp__user",children:["Hello ".concat(e.name.toUpperCase()," \ud83d\ude0a"),Object(v.jsx)("button",{type:"button",onClick:function(){localStorage.removeItem("user"),P(0)},className:"button is-outlined is-danger is-small",children:"Logout"})]}),Object(v.jsxs)("div",{className:"todoapp__content",children:[Object(v.jsx)(T,{containsActive:R.isActive,handleError:H,setTodoCondition:O,onTrickTempTodo:F,setTodos:a,toggleAllTodos:function(){q(i,R.isActive)},USER_ID:B}),G&&Object(v.jsx)(v.Fragment,{children:Object(v.jsxs)("section",{className:"todoapp__main",children:[Object(v.jsx)(k,{todos:G,onDeleteTodo:function(t){O(f.Deleting),I([t]),y(t).then((function(){return a((function(e){return e.filter((function(e){return e.id!==t}))}))})).catch((function(){return H(b.Delete)})).finally((function(){return O(f.Neutral)}))},todoCondition:h,procesingTodosId:A,toggleTodo:q,handleSubmitEditing:function(t,e){I([t]),O(f.Saving),S(t,{title:e}).then((function(){return a((function(n){return n.map((function(n){return n.id===t?Object(x.a)(Object(x.a)({},n),{},{title:e}):n}))}))})).catch((function(){return b.Update})).finally((function(){I([]),O(f.Neutral)}))}}),z&&Object(v.jsx)(E,{todo:z,todoCondition:h})]})}),!!i.length&&Object(v.jsx)(D,{containsCompleted:R.isCompleted,onClearCompleted:function(){O(f.Deleting),null===i||void 0===i||i.forEach((function(t){t.completed&&(I((function(e){return[].concat(Object(N.a)(e),[t.id])})),y(t.id).then((function(){return a((function(e){return e.filter((function(e){return e.id!==t.id}))}))})).catch((function(){return H(b.Delete)})).finally((function(){return O(f.Neutral)})))}))},itemsLeft:i.filter((function(t){return!t.completed})).length})]}),s!==b.None&&Object(v.jsx)(w,{errorType:s,handleError:d})]})},I=function(){var t=Object(o.useState)(function(){var t=localStorage.getItem("user");return t?JSON.parse(t):null}()),e=Object(r.a)(t,2),n=e[0],c=e[1];return Object(v.jsx)(v.Fragment,{children:n?Object(v.jsx)(a.a,{children:Object(v.jsx)(A,{user:n})}):Object(v.jsx)(g,{setUser:c})})};i.a.render(Object(v.jsx)(I,{}),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.baac1354.chunk.js.map