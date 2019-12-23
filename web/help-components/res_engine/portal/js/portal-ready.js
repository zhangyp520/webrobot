oui.ready(function(){
  var me = com.oui.portal.runtime.PortalController;
  //在这里配置 后台管理的web地址
  //在这里配置 后台服务的api接口
  //在这里配置 帮助系统编辑工具 与 集成页面 相关的通信机制
  //在这里配置 后台管理的web地址
  //在这里配置 后台服务的api接口
  //在这里配置 帮助系统编辑工具 与 集成页面 相关的通信机制
  me.data.webAddress ="http://127.0.0.1:8080";
  me.data.serviceAddress="http://127.0.0.1:8080";
  //本地存储获取当前页面存储的系统id和系统名称
  var pageUrl = oui_context.pageUrl; //当前页面路径
  var scriptUrl = oui_context.scriptUrl; //脚本路径，监测是否串改
  var scriptParams = oui_context.scriptParams; //脚本参数处理
  var sysId = oui_context.sysId;
  var sysName = oui_context.sysName;
  //系统id
  oui.storage.set('help.plugin.sysId',sysId);
  oui.storage.set('help.plugin.sysName',sysName);
  me.data.sysId = sysId; //系统id
  me.data.sysName = sysName;//系统名称
  me.data.pageUrl = pageUrl; //页面url
  me.data.scriptUrl = scriptUrl; //脚本url

  me.data.scriptParams = scriptParams; //脚本参数
  //系统名称

  if(me.data.serviceAddress == location.origin){
    return ;
  }
  me.data.helpState= oui.storage.get('help.plugin.state') ||"runtime";
  oui.storage.set('help.plugin.state', me.data.helpState); //回填本地存储当前的插件状态

  me.init();
});