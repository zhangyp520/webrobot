oui.ready(function(){
  ////加载业务资源 这里不能做业务资源的动态加载，无法访问全局变量
  //在content-script中注入的页面初始化
  var me = com.oui.portal.PortalController;
  //在这里配置 后台管理的web地址
  //在这里配置 后台服务的api接口
  //在这里配置 帮助系统编辑工具 与 集成页面 相关的通信机制
  me.data.webAddress ="http://127.0.0.1:8080";
  me.data.serviceAddress="http://127.0.0.1:8080";
  //本地存储获取当前页面存储的系统id和系统名称
  me.data.sysId = oui.storage.get('help.plugin.sysId')||""; //http://127.0.0.1:8080/index-1.html?sysId={{}}isIframeInclude=true&isChromeExt=true
  me.data.sysName = oui.storage.get('help.plugin.sysName')||"";//获取系统名称
  me.data.helpState= oui.storage.get('help.plugin.state') ||"edit";
  oui.storage.set('help.plugin.state', me.data.helpState); //回填本地存储当前的插件状态

  me.data.helpPluginUrl = me.data.webAddress+'/index-1.html?sysId='+me.data.sysId+'&isIframeInclude=true&isChromeExt=true&_t='+oui.getUUIDLong();
  me.data.helpEditUrl = oui.getContextPath()+'index.html&isIframeInclude=true&isChromeExt=true&_t='+oui.getUUIDLong();
  if(me.data.serviceAddress == location.origin){
    return ;
  }
  me.init();
});
