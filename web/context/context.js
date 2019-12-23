!(function(win){
    /******
     * 上下文的模拟结构
     * @type {{version: string, js_version: string, checkUrl: string}}
     */
    var contextPath = oui.getParam('contextPath')|| '/';
    win.oui_context = {
        "version":"1.1.1",
        contextPath:contextPath || '/',
        isChromeExt:false,
        appId:'app',
        "js_version":"?_v=1.1.2",
        "sysUrl":"",//加载系统列表的url
        "checkUrl":contextPath+'context/context_check.json'//token校验路径，该资源url 承担token校验以及菜单获取功能；一般情况在页面首次进入时的响应
    };
    oui.cookie("userId",oui.getUUIDString());
    oui.cookie("tokenId",oui.getUUIDString());
})(window);

