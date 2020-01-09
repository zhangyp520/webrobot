!(function(win){
    Vue.prototype.$router = win.oui.router;
    var app = new Vue({
        el: document.getElementById(oui_context.appId),
        data: function () {
            return {
                router:win.oui.router
            }
        },
        mounted:function(){

        },
        methods: {
            getSelected:function(){
                return this.router.path;
            },
            handleSelect : function(key, path) {
                //console.log(key, path)

                this.$router.push(key);
                //this.$router.push(key)
            }
        }
    });
    Vue.component('oui-include',{
        props: ['url','data','ref','type'],
        data: function() {
            return {
                currUrl:this.url,
                data:this.data,
                ref:this.ref,
                type:this.type,
                compFullName:null,
                comp:null
            }
        },
        created:function(){


        },
        methods:{
            init:function(){

            }
        },
        mounted:function(){
            var data ={};//vue include vue 的场景

            if(this.$parent.FullName){
                data = oui.getJsonAttr(this.$parent,this.data);//vue include vue 的场景
                if(typeof this.data =='object'){
                    data = this.data;
                }else if(typeof data =='string'){
                    data = oui.util.eval(this.$parent.FullName+'.'+this.data);
                }else{

                }
            }else if(this.$root.FullName){
                if(typeof this.data =='object'){
                    data = this.data;
                }else if(typeof data =='string'){
                    data = oui.util.eval(this.$root.FullName+'.'+this.data);
                }else{

                }
            }

            data = JSON.stringify(data);
            data = JSON.parse(data);

            var compOrThen = oui.util.loadComponent4Instance(this.url,data,true);
            var me = this;
            if(compOrThen instanceof  Promise){
                compOrThen.then(function(resComp){
                    me.comp =resComp;
                    me.comp._ref = me.ref;
                    me.comp._dataPath= me.data;
                    me.comp._parentRef = me.$parent;
                    me.compFullName = me.comp.FullName;
                    me.$nextTick(function(){
                        oui.render4Instance(me.comp,me.$el);
                    });
                });
            }else{
                this.comp =compOrThen;
                this.comp._ref = this.ref;
                this.comp._dataPath= this.data;
                this.comp._parentRef = this.$parent;

                this.compFullName = this.comp.FullName;
                this.$nextTick(function(){
                    oui.render4Instance(this.comp,this.$el);
                });
            }


        },
        template:'<div class="vue-include" :data="data" :ref="ref" ></div>'
    });
    var oui =win.oui || {};
    win.oui = oui;
    oui.app =app;
})(window);