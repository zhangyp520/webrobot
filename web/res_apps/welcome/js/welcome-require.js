!(function(){
    var cssArray = [];
    if (oui.os.mobile) {
        cssArray = [//TODO mobile
        ];
    } else {
        cssArray = [ //TODO PC
        ];
    }

//css资源 顺序需要倒叙
    oui.require4notSort(cssArray,function(){},function(){},false);

    var jsArray = [];

    if(oui.os.mobile){//移动端 tap 事件
        jsArray.push(oui.getContextPath()+"res_common/third/jquery.tap/jquery.tap.js");
    }

    if(!oui.os.mobile){//TODO mobile
        //jsArray.push(
        //    oui.getContextPath()+"res_common/oui/ui/ui_pc/dialog/dialog.js"
        //);
    } else {//TODO PC
        //jsArray.push(
        //    oui.getContextPath()+"res_common/oui/ui/ui_phone/dialog/dialog.js"
        //);
    }
    var resourceUrls = [oui.getContextPath()+'res_apps/welcome/js/welcome.js'];
    oui.require(jsArray,function(){
        /** 默认不缓存 welcome加载资源***/
        oui.require(resourceUrls,function(){
            var me = com.oui.welcome.WelCome;
            me.resourceUrls = resourceUrls.join(',').split(',');
            resourceUrls.length=0;
            resourceUrls =null;
            me.init();
        });//业务资源不做缓存
    },function(){},true);//需要缓存的资源
})();

