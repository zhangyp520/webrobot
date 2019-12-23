!(function (win, $) {

    /****
     *
     *
     * @类 com.oui.demo.Demo
     *
     *
     */
    var Demo = {
        "package": "com.oui.demo",
        "class": "Demo",
        data:{},
        /** 初始化，在菜单转向时，自动执行init完成应用初始化 ***/
        init:function(){
            var me = this;
            me.data.clickName=oui.os.mobile?'tap':'click';
            template.helper('Demo',this);

            me.data.msg="demo";
            oui.parse({
                callback:function(){

                }
            });
        },
        /** 销毁当前控制器***/
        destroy:function(){
            var me = this;
            template.helper('Demo',null);
            me.data=null;
            oui.biz.Tool.Clear(me);
        },
        /** 业务数据 ****/
        getData:function(){
            var me = this;
            return me.data ||{};
        },
        /** 触发事件***/
        event2helloClick:function(cfg){

            console.log(cfg);
            console.log(this.data.msg);
            alert(this.data.msg);
        }
    };
    Demo = oui.biz.Tool.crateOrUpdateClass(Demo);//类定义

})(window, jQuery);




