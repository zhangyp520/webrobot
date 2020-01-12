oui.ready(function(){
  ////加载业务资源 这里不能做业务资源的动态加载，无法访问全局变量
  //在content-script中注入的页面初始化
  var me = com.oui.portal.PortalController;
  //在这里配置 后台管理的web地址
  //在这里配置 后台服务的api接口
  //在这里配置 WebRobot编辑机器学习模板 与 集成页面 相关的通信机制
  me.data.webAddress =oui_context.webAddress;
  me.data.serviceAddress=oui_context.serviceAddress;
  //本地存储获取当前页面存储的系统id和系统名称
  me.data.sysId = oui.storage.get('webrobot.plugin.sysId')||""; //http://127.0.0.1:8080/index-1.html?sysId={{}}isIframeInclude=true&isChromeExt=true
  me.data.sysName = oui.storage.get('webrobot.plugin.sysName')||"";//获取系统名称
  me.data.webrobotState= oui.storage.get('webrobot.plugin.state') ||"edit";
  oui.storage.set('webrobot.plugin.state', me.data.webrobotState); //回填本地存储当前的插件状态

  me.data.pageDesignUrl = me.data.webAddress+"res_engine/page_design/pc/page-design.html";
  //处理扩展设计器的url参数
  //1、扩展页面业务属性
  //2、扩展控件的业务属性、拾取元素
  //3、保存事件特殊处理扩展 跨域iframe不能做到接口处理，需要重新考虑 设计器在保存和加载的扩展点
  var tempUrl = oui.addParams(me.data.pageDesignUrl,{
    pageBizPropsUrl:'res_engine/page_design/pc/page-biz-tpl-robot.art.html', //页面业务属性扩展url
    controlBizPropsUrl:'res_engine/page_design/pc/components-biz-prop-art-tpl-robot', //控件业务属性扩展url
    buttons:'preview,save,merge,split,insertColumn4prev,insertRow4prev,removeColumn,removeRow',
    bizJs:'res_engine/page_design/pc/js/page-plugin-robot.js',
    saveCallBack:'saveCallback'
  });
  me.data.pageDesignUrl = tempUrl;
  me.data.webrobotPluginUrl = me.data.webAddress+'index-1.html?sysId='+me.data.sysId+'&isIframeInclude=true&isChromeExt=true&_t='+oui.getUUIDLong();
  me.data.webrobotEditUrl = oui.getContextPath()+'index.html&isIframeInclude=true&isChromeExt=true&_t='+oui.getUUIDLong();

  if(me.data.serviceAddress == location.origin){
    return ;
  }
  var excludePath = [
    //域名相关
    'startwe',
    'oursui',
    'robgo',
    'webrobot',

    //特殊页面路径
    'res_engine/page_design/pc/page-runtime.html',
    'res_engine/page_design/pc/page-design.html'
  ];
  var isExclude = false;
  var origin = window.origin;
  var path  = location.pathname;
  oui.eachArray(excludePath,function(item){
    if(origin.indexOf(item)>-1 || path.indexOf(item)>-1){
      isExclude = true;
      return false;
    }
  });
  if(isExclude){
    return;
  }
  me.init();
});
