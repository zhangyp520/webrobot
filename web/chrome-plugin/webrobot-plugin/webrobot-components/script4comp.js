var me = {
    loadUrl:function(param,event,callbackId){
        param.callback = function(res){
            window.parent.postMessage({
                cmd:'runtimeCmd4loadUrl',
                callbackId:callbackId,//回调id
                param:res
            },'*');
        };
        oui.loadUrl(param);
    }
};
window.addEventListener("message", function(event) {
    var data = event.data;
    if(typeof data =='string'){
        return;
    }
    if(typeof data =='object'){
        //在本类中的方法负责接收消息处理
        if(data.callbackId){
            if(data.cmd&&data.param){
                me[data.cmd]&&me[data.cmd](data.param,event,data.callbackId);
            }
        }else{
            if(data.cmd&&data.param){
                me[data.cmd]&&me[data.cmd](data.param,event);
            }
        }

    }
}, false);