(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-429b6c5e"],{"1e26":function(e,t,a){"use strict";var i=a("d121"),l=a.n(i);l.a},"2dd1":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-card",{staticClass:"box-card"},[a("my-bread",{attrs:{level1:"轮播图管理",level2:"轮播列表"}}),a("el-row",{staticClass:"searchRow"},[a("el-button",{attrs:{size:"medium",type:"success"},on:{click:function(t){e.dialogFormAdd=!0}}},[e._v("添加轮播")])],1),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.viewPagerDataList,border:""}},[a("el-table-column",{attrs:{align:"center",type:"index",label:"轮播图序号","min-width":"2"}}),a("el-table-column",{attrs:{label:"配图","min-width":"20",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("img",{attrs:{src:e.row.viewUrl,alt:"图片消失",width:"50",height:"50"}})]}}])}),a("el-table-column",{attrs:{align:"center",prop:"viewLink",label:"跳转链接","min-width":"16"}}),a("el-table-column",{attrs:{align:"center",prop:"sequence",label:"顺序号","min-width":"2"}}),a("el-table-column",{attrs:{align:"center",label:"未发布/发布","min-width":"10"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tooltip",{attrs:{content:"Switch value: "+t.row.publishStatus,placement:"top"}},[a("el-switch",{attrs:{"active-color":"#13ce66","active-value":1,"inactive-color":"#ff4949","inactive-value":0},on:{change:function(a){return e.changeSwitch(t.row)}},model:{value:t.row.publishStatus,callback:function(a){e.$set(t.row,"publishStatus",a)},expression:"scope.row.publishStatus"}})],1)]}}])}),a("el-table-column",{attrs:{align:"center",prop:"createTime",label:"创建时间","min-width":"10"}}),a("el-table-column",{attrs:{align:"center",prop:"updateTime",label:"更新时间","min-width":"10"}}),a("el-table-column",{attrs:{align:"center",label:"操作","min-width":"20"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"warring",icon:"el-icon-edit"},on:{click:function(a){return e.handleEditViewPager(t.row)}}},[e._v("编辑 ")]),a("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:function(a){return e.handleDeleteViewPager(t.row.id)}}},[e._v("删除 ")])]}}])})],1),a("el-dialog",{attrs:{title:"添加轮播图",visible:e.dialogFormAdd},on:{"update:visible":function(t){e.dialogFormAdd=t}}},[a("el-form",{ref:"viewPagerForm",attrs:{model:e.viewPager}},[a("el-form-item",{attrs:{label:"图片url",prop:"viewUrl"}},[a("el-input",{attrs:{clearable:""},model:{value:e.viewPager.viewUrl,callback:function(t){e.$set(e.viewPager,"viewUrl",t)},expression:"viewPager.viewUrl"}})],1),a("el-form-item",{attrs:{label:"跳转链接",prop:"viewLink"}},[a("el-input",{attrs:{clearable:""},model:{value:e.viewPager.viewLink,callback:function(t){e.$set(e.viewPager,"viewLink",t)},expression:"viewPager.viewLink"}})],1),a("el-form-item",{attrs:{label:"顺序号",prop:"sequence"}},[a("el-input",{attrs:{clearable:""},model:{value:e.viewPager.sequence,callback:function(t){e.$set(e.viewPager,"sequence",t)},expression:"viewPager.sequence"}})],1),a("el-form-item",{attrs:{label:"发布状态",prop:"publishStatus"}},[a("el-select",{attrs:{placeholder:"请选择是否发布"},model:{value:e.viewPager.publishStatus,callback:function(t){e.$set(e.viewPager,"publishStatus",t)},expression:"viewPager.publishStatus"}},[a("el-option",{attrs:{label:"发布",value:"1"}}),a("el-option",{attrs:{label:"不发布",value:"0"}})],1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.addViewPager()}}},[e._v("提交")]),a("el-button",{on:{click:function(t){return e.resetForm("viewPagerForm")}}},[e._v("重置")])],1)],1)],1),a("el-dialog",{attrs:{title:"修改轮播图",visible:e.dialogFormUpdate},on:{"update:visible":function(t){e.dialogFormUpdate=t}}},[a("el-form",{ref:"updateViewPagerForm",attrs:{model:e.updateViewPager}},[a("el-form-item",{attrs:{label:"图片url",prop:"viewUrl"}},[a("el-input",{attrs:{clearable:""},model:{value:e.updateViewPager.viewUrl,callback:function(t){e.$set(e.updateViewPager,"viewUrl",t)},expression:"updateViewPager.viewUrl"}})],1),a("el-form-item",{attrs:{label:"跳转链接",prop:"viewLink"}},[a("el-input",{attrs:{clearable:""},model:{value:e.updateViewPager.viewLink,callback:function(t){e.$set(e.updateViewPager,"viewLink",t)},expression:"updateViewPager.viewLink"}})],1),a("el-form-item",{attrs:{label:"顺序号",prop:"sequence"}},[a("el-input",{attrs:{clearable:""},model:{value:e.updateViewPager.sequence,callback:function(t){e.$set(e.updateViewPager,"sequence",t)},expression:"updateViewPager.sequence"}})],1),a("el-form-item",{attrs:{label:"发布状态",prop:"publishStatus"}},[a("el-select",{attrs:{placeholder:"请选择是否发布"},model:{value:e.updateViewPager.publishStatus,callback:function(t){e.$set(e.updateViewPager,"publishStatus",t)},expression:"updateViewPager.publishStatus"}},[a("el-option",{attrs:{label:"发布",value:"1"}}),a("el-option",{attrs:{label:"不发布",value:"0"}})],1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.updateViewPagerForm()}}},[e._v("提交")]),a("el-button",{on:{click:function(t){return e.resetForm("updateViewPagerForm")}}},[e._v("重置")])],1)],1)],1)],1)},l=[],r={name:"ViewPage",data:function(){return{viewPagerDataList:[],multipleSelection:[],dialogFormAdd:!1,dialogFormUpdate:!1,viewPager:{viewUrl:"",viewLink:"",sequence:null,publishStatus:null},updateViewPager:{viewUrl:"",viewLink:"",sequence:null,publishStatus:null},msg:"",deleteDate:[]}},created:function(){this.findViewPager()},methods:{findViewPager:function(){var e=this;this.$axios.get("/api/menu/findAllViewPager",{params:{usertype:""}}).then((function(t){200===t.status?(e.viewPagerDataList=t.data.data,console.log(t.data.data)):e.$alert("查询轮播图列表失败")}))},addViewPager:function(){var e=this;this.$refs.viewPagerForm.validate((function(t){if(t){console.log(t);var a=JSON.stringify(e.viewPager),i={headers:{"Content-Type":"application/json;charset=UTF-8"}},l="/api/menu/addViewPager";e.$axios.post(l,a,i).then((function(t){if(200!==t.status)return console.log("error submit!!"),!1;e.$message.success("添加成功"),e.dialogFormAdd=!1,e.viewPager={brand_right:0},e.findViewPager()}))}}))},resetForm:function(e){this.$refs[e].resetFields()},handleDeleteViewPager:function(e){var t=this;this.$confirm("确认要删除该记录吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}),this.$axios.delete("/api/menu/deleteViewPager",{params:{viewPagerId:e}}).then((function(e){200===e.data.status?t.findViewPager():t.$alert("删除失败，请刷新后重试!","提示")}))},handleEditViewPager:function(e){console.log(e),this.dialogFormUpdate=!0,this.updateViewPager=e},updateViewPagerForm:function(){var e=this;this.$refs.updateViewPagerForm.validate((function(t){if(t){var a=JSON.stringify(e.updateViewPager);console.log(a);var i={headers:{"Content-Type":"application/json;charset=UTF-8"}},l="/api/menu/updateViewPager";e.$axios.post(l,a,i).then((function(t){if(200!==t.status)return console.log("error submit!!"),!1;e.$message.success("修改成功"),e.dialogFormUpdate=!1,e.findViewPager()}))}}))},changeSwitch:function(e){var t=this,a=JSON.stringify(e);console.log(a);var i={headers:{"Content-Type":"application/json;charset=UTF-8"}},l="/api/menu/updateViewPager";this.$axios.post(l,a,i).then((function(a){if(200!==a.status)return console.log("error submit!!"),!1;console.log(e),t.$message.success("修改成功"),t.findViewPager()}))}}},n=r,o=(a("1e26"),a("2877")),s=Object(o["a"])(n,i,l,!1,null,"66604a6f",null);t["default"]=s.exports},d121:function(e,t,a){}}]);
//# sourceMappingURL=chunk-429b6c5e.0afcf1f8.js.map