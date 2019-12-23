!(function (win, $) {

    /****
     *
     *
     * @类 com.oui.demodyna.DemoDyna
     *
     *
     */
    var DemoDyna = {
        "package": "com.oui.demodyna",
        "class": "DemoDyna",
        data:{},
        /** 初始化，在菜单转向时，自动执行init完成应用初始化 ***/
        init:function(){
            var me = this;
            me.data.clickName=oui.os.mobile?'tap':'click';
            template.helper('DemoDyna',this);

            me.data.msg="demodyna";
            oui.parse({
                callback:function(){

                }
            });
        },
        /** 销毁当前控制器***/
        destroy:function(){
            var me = this;
            template.helper('DemoDyna',null);
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
        },
        /** 显示动态菜单，***/
        event2showDynMenu:function(cfg){
            var PortalController =  oui.getTop().com.oui.portal.PortalController;
            PortalController.showDynaMenu({url:'res_apps/demos/demo-dyna/demo-dyna.tpl.html',openType:'inner',display:'NB菜单名称'},{});
        }
    };
    DemoDyna = oui.biz.Tool.crateOrUpdateClass(DemoDyna);//类定义

})(window, jQuery);




