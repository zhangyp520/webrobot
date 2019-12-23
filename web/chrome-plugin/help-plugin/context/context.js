!(function(win){
    /******
     * 上下文的模拟结构
     * @type {{version: string, js_version: string, checkUrl: string}}
     */
    var contextPath = oui.getParam('contextPath')||chrome.extension.getURL("");
    var serverPath = "http://127.0.0.1:8080/"; //这里可以指定本地web服务 http://127.0.0.1:8080/
    var serviceAddress = "http://127.0.0.1:8080/"; //这里可以指定本地服务
    win.oui_context = {
        "version":"1.1.1",
        webAddress:serverPath,
        serviceAddress:serviceAddress,
        contextPath:contextPath ,
        "js_version":"?_v=1.1.2",
        isChromeExt:true,
        promise:true,
        appId:'app',
        "routerViewInnerId":"router-view-help-plugin-inner",
        "routerViewId":"routerViewHelpPlugin",
        "sysUrl":"",//加载系统列表的url
        //指定后台web地址
        "checkUrl":serverPath+'context/context_check.json'//token校验路径，该资源url 承担token校验以及菜单获取功能；一般情况在页面首次进入时的响应
    };
    var origin = location.origin;
    if(origin.indexOf('startwe')>-1 || origin.indexOf('oursui')>-1){
        return;
    }
    oui.cookie("userId",oui.getUUIDString());
    oui.cookie("tokenId",oui.getUUIDString());
})(window);

