!(function (win, $) {
    /**
     * com.oui.portal.PortalController
     * 首页PortalController
     * **/
    var PortalController = {
        "package": "com.oui.portal",
        "class": "PortalController",
        data:{},
        getCurrentUrl:function(){
            var contextPath = oui.getContextPath();
            var loadUrl = oui.router.getCurrentLoadUrl();
            if(loadUrl.indexOf(contextPath)>=0){
                loadUrl = loadUrl.substring(contextPath.length);
            }
            return loadUrl;
        },
        init:function(){
            var me = this;
            me.initRouter(); //这是 插件开发模式的router机制
            me.data.clickName=oui.browser.mobile?'tap':'click';
            this.refs = {};
            template.helper('PortalController',this);
            template.helper('oui',oui);
            oui.loadUrl = oui.loadUrl4ChromeExt; //插件开发 加载url的机制 需要通过插件的加载方式实现

            if(me.data.webrobotState =="edit" || me.data.webrobotState =="runtime4preview" ){ //非运行态不执行 WebRobot自动任务
                if(me.data.webrobotState =="runtime4preview" ){
                    //var url = me.data.webAddress+'/webrobot-components/index.js';
                    var url = chrome.extension.getURL("webrobot-components/index.js");

                    url = oui.setParam(url,'sysId',me.data.sysId);
                    url = oui.setParam(url,'sysName',me.data.sysName);
                    url = oui.setParam(url,'_t',new Date().getTime());
                    oui.require([url]); //加载运行态资源
                }else{
                    me.loadAll();
                }
            }
        },
        loadAll:function(callback){
            var me = this;
            me.bindEvents();

            //追加元素到页面上
            var apiConfigUrl = chrome.extension.getURL("res_engine/portal/js/api-config.json");
            //加载api配置
            me.loadApiConfig(apiConfigUrl,function(){
                //加载portal页面
                var htmlUrl = chrome.extension.getURL("plugin-index.html");
                me.loadPortalHtml(htmlUrl,function(){
                    oui.router.push('tpl/welcome.vue.html');
                    callback&&callback();
                })
            });
        },
        /****
         * 加载portal页面
         * @param htmlUrl
         */
        loadPortalHtml:function(htmlUrl,callback){
            oui.loadUrl({
                url: htmlUrl,
                subContentType:1, //取body中内容
                callback:function(html){
                    $(document.body).append(html);
                    oui.parse({
                        container:'#webrobot-plugin',
                        callback:function(){
                            callback&&callback();
                        }
                    });
                }
            });
        },
        /**加载api配置 **/
        loadApiConfig:function(url,callback){
            var me = this;
            oui.loadUrl({
                url: url,
                subContentType:2, //取整个json内容
                callback:function(json){
                    var config = oui.util.eval(json);//获取配置对象
                    me.apiConfig  = config; //获取api配置
                    if(config.useLocalDB && config.dbConfigPath){//使用本地数据库, 并且要进行数据库配置
                        me.buildLocalApi();
                        //加载数据库配置，并 初始化数据库配置
                        me.loadDBConfig(config.dbConfigPath,function(){
                            //加载完db配置之后， 扩展构建api方法
                            callback&&callback();
                        });
                    }else{//api是调用后台服务
                        me.buildServerApi();
                        callback&&callback();
                    }
                }
            });

        },
        //构造本地api调用
        buildLocalApi:function(){
            var me = this;
            me.api = function(name,param,success,error){
                var path = me.apiConfig.api4LocalDB[name];
                me.api.run(path,param,success,error);
            };
            me.api.run = function(path,param,success,error){
                if(path){
                    var storePath= path.substring(0,path.lastIndexOf('.'));
                    var method = path.substring(path.lastIndexOf('.')+1);
                    var store = oui.util.eval(storePath);
                    store[method](param,function(res){ //回调返回
                        success&&success({
                            success:true,
                            data:res
                        });
                        if(NProgress){
                            NProgress.done();
                        }
                    },function(){
                        error&&error();
                        if(NProgress){
                            NProgress.done();
                        }
                    }); //固定三个参数
                }
            };
            oui.api = me.api;
        },
        //构造 远程api调用
        buildServerApi:function(){
            var me = this;
            //根据命名处理
            me.api = function(name,param,success,error){
                var path = me.apiConfig.api[name]||"";
                me.api.run(path,param,success,error);
            };
            //运行任意url
            me.api.run = function(path,param,success,error){
                if(path){
                    oui.postData(path,param,success,error);
                }
            };
            oui.api = me.api;
        },
        /**加载数据库配置 **/
        loadDBConfig:function(url,callback){
            var me = this;
            oui.loadUrl({
                url: url,
                subContentType:2, //取整个json内容
                callback:function(json){
                    var config = oui.util.eval(json);//获取配置对象
                    me.db = oui.buildDB(config ,callback);
                }
            });
        },
        getView:function(){
            return this;
        },
        //显示左侧布局面板
        event2showLayoutPanel:function(cfg){
            //webrobot-plugin-show
            var me = this;

            var $webrobotPlugin = $(cfg.el).parent();
            if($webrobotPlugin.hasClass('webrobot-plugin-show')){
                me.hidePlugin();
            }else{
                me.showPlugin();
            }
        },

        //隐藏左侧布局面板
        event2hidelayoutPanel:function(cfg){
            var me = this;
            me.hidePlugin();
        },
        // 编辑机器学习模板与WebRobot设置切换
        event2toggle:function(cfg){
            var me = this;
            var $sysPanel = $('#webrobot-plugin .webrobot-sys');
            var $eidt = $('#webrobot-plugin .webrobot-page-edit');
            if($sysPanel.hasClass('current')){
                $sysPanel.removeClass('current');
                $eidt.addClass('current');
            }else{
                $sysPanel.addClass('current');
                $eidt.removeClass('current');
                var $iframe = $('#webrobot-plugin-iframe');
                if(!$iframe[0].src){
                    $iframe[0].src = me.data.webrobotPluginUrl;
                }
            }
        },
        //显示插件
        showPlugin:function(){
            $('#webrobot-plugin').addClass('webrobot-plugin-show');
            var me = this;
            me.changeIframeHeight();
        },
        //iframe高度自适应
        changeIframeHeight:function(){
            var $iframe = $('#webrobot-plugin-iframe');
            if($iframe && $iframe.length){

                var height = $('#webrobot-plugin .webrobot-plugin-view.current').height();
                $iframe[0].height=height-2;
            }
        },
        //隐藏插件
        hidePlugin:function(){
            $('#webrobot-plugin').removeClass('webrobot-plugin-show');
        },
        _data:function(){
          return this;
        },
        /****
         * 绑定事件
         */
        bindEvents:function(){
            var me = this;
            window.addEventListener("message", function(event) {
                var data = event.data;
                if(typeof data =='string'){
                    return;
                }
                if(typeof data =='object'){
                    //在本类中的方法负责接收消息处理
                    if(data.cmd&&data.param){

                        console.log('webrobot-plugin:'+data.cmd);
                        console.log(data);
                        me[data.cmd]&&me[data.cmd](data.param,event);
                    }
                }
            }, false);
        },
        //保存自动任务与设计器关系
        cmd4savePageDesign:function(data,event){
            var guideId = data.guideId;
            var page =data.page;
            if(this.data.guide.id ==guideId){
                this.data.guide.pageDesignId = page.id;
                this.data.guide.pageDesign = page;
                oui.api("saveGuide",this.data.guide, function(res){
                    if(res.success){ //保存成功
                        alert('保存成功');
                    }else{
                    }
                },function(res){
                });
            }
        },
        //监听 来自模型设计器中前去拾取元素选择器的方法
        cmd4go2pickSelector:function(data,event){
            var me = this;

            me.data.pageDesigner = {
                controlId:data.controlId
            };
            me.hidePlugin();

            //发送命令，执行开始拾取元素操作
            chrome.runtime.sendMessage(
                {
                    cmd:'pickDom4control',
                    param:{ //传入当前参数
                        controlId:data.controlId //将当前控件id通过参数传递过去；等待选择回调处理该控件绑定选择器
                    }
                },
                function(response) {

                }
            );
        },
        //回填表单模型中控件绑定的选择器
        cmd2pickSelector4control:function(data,event){
            var me = this;
            var controlId = me.data.pageDesigner.controlId;
            var s =data.selector; //获取当前拾取到的元素
            //回填到当前控件上,通过iframe发送消息

            var iframeId = this.data.iframeId4pageDesign; //获取当前设计器所在iframeID
            document.getElementById(iframeId).contentWindow.postMessage({
                cmd:'cmd4pickDomFillBack',//前去触发 dom拾取
                param:{
                    controlId:controlId,
                    selector:s
                }
            },'*');//跨域处理

            me.showPlugin(); //显示插件

        },
        //通过消息传递 处理 元素定位器的拾取回填
        cmd4pickSelector:function(data,event){
            //监听元素拾取的消息
            var me = this;
            var selector = me.data.selector;
            var s=data.selector;
            for(var k in s){
                selector[k] =s[k];
            }
            //保存定位器
            if(selector.id){
                //保存定位器
                oui.api("saveSelector",selector,function(res){
                    if(res.success){ //保存成功
                        //保存成功
                        console.log('定位器保存成功');
                        //刷新页面
                        var url  = oui.router.getCurrentLoadUrl();
                        console.log(url);
                        oui.router.push(url,oui.router.query||{});
                    }else{
                        //保存失败
                        console.log('定位器保存失败');
                    }
                },function(res){
                    console.log('定位器保存失败');
                });
            }
            me.showPlugin();
        },
        /**
         * 处理接收的消息数据，根据cmd 处理相关消息
         * @param data
         * @param event
         */
        cmd4load:function(data,event){
            //加载 WebRobot中 系统列表、菜单列表 用于回填页面信息
            var me = this;
            var sysId = data.sysId; //系统id
            var menus =data.menus; //系统菜单列表
            var sys = data.sys; //系统列表
            var sysName ='';
            oui.findOneFromArrayBy(sys,function(item){
                if(item.id == sysId){
                    sysName = item.display;
                    return true;
                }
            });

            var lastSysId = me.data.sysId;
            var hasChange = false;
            if(lastSysId !=sysId){
                //系统切换
                hasChange = true;
            }
            me.data.sysId = sysId;
            me.data.menus = menus;
            me.data.sys = sys;
            me.data.sysName = sysName;
            oui.storage.set('webrobot.plugin.sysId',sysId);
            oui.storage.set('webrobot.plugin.sysName',sysName);
            //加载完成后，重新渲染 指定区域
            me.renderByLoadSys(hasChange);
            console.log(data);
        },
        renderByLoadSys:function(hasChange){
            oui.getById('webrobot-page-edit-content').render(); //编辑页面渲染
            oui.getById('webrobot-sys-header-info').render(); //系统信息头部渲染
            if(hasChange){
                oui.router.push('tpl/welcome.vue.html');
            }
        },
        /***
         * 获取当前数据
         * @returns {PortalController.data|{}}
         */
        getData:function(){
            var me = this;
            return me.data;
        },
        getIncludeData:function(){
            return oui.router.query;
        },
        /***
         * 删除某个script标签
         * @param urls
         */
        clearScriptTag:function(urls){
            if((!urls)||(!urls.length)){
                return ;
            }
            var scripts = $('script[data-url]');
            for(var i = 0; i < scripts.length; i++){//是否已加载
                var src =scripts[i].getAttribute('data-url') || scripts[i].src;
                src = src.substring(0,src.indexOf(oui_context.js_version));
                if(urls.indexOf(src)>-1){
                    scripts[i].parentNode.removeChild(scripts[i]);
                    scripts[i]=null;
                }
            }
        },
        /***
         * 初始化路由
         */
        initRouter:function(){
            var util= oui.util;
            function Router() {
                this.routes = {};
            }
            //获取当前加载的url
            Router.prototype.getCurrentLoadUrl = function(){
                return this.url4load||"tpl/welcome.vue.html"; //默认开始页面
            };
            Router.prototype.route = function (path, callback) {
                this.routes[path] = callback || function () { };
            };
            /**
             * 处理 url参数
             * @param obj
             * @returns {*}
             */
            Router.prototype.param =function(data){
                if ( typeof data != 'object') {
                    return( ( data == null ) ? "" : data.toString() );
                }
                var buffer = [];
                // Serialize each key in the object.
                for ( var name in data ) {
                    if ( ! data.hasOwnProperty( name ) ) {
                        continue;
                    }
                    var value = data[ name ];
                    buffer.push(
                        encodeURIComponent( name ) + "=" + encodeURIComponent( ( value == null ) ? "" : value )
                    );
                }
                // Serialize the buffer and clean it up for transportation.
                var source = buffer.join( "&" ).replace( /%20/g, "+" );
                return( source );
            };
            //放入路由路径
            Router.prototype.push = function(path,query,includeEl){

                //console.log('path :', path)
                //var paramsStr=this.param(query);

                var paramsStr = this.param(query||{});
                if(paramsStr){
                    paramsStr= '&'+paramsStr;
                }
                this.includeEl = includeEl;
                if (path.indexOf("?") !== -1) {
                    this.currentUrl =  path + '&key=' + util.genKey()+paramsStr;
                } else {
                    this.currentUrl =  path + '?key=' + util.genKey()+paramsStr;
                }
                if(this.currentUrl.indexOf('#')<0){
                    this.currentUrl='#'+this.currentUrl;
                }
                this.refresh();
            };
            Router.prototype.refresh = function () {
                //console.log('url change');
                //console.log(location.hash);
                var params = util.getParamsUrl(this.currentUrl);
                this.query = params.query;
                this.path = params.path;
                this.params = params.params;

                if(!this.path){
                    //当前没有路由，则不做处理
                    return;
                }
                var me = this;
                //如果存在自定义路由配置，则执行自定义路由逻辑，否则执行自动路由
                if(this.refreshBefore){
                    var flag = this.refreshBefore();
                    if(!flag){
                        return ;
                    }
                }
                var url = this.path;
                var url4load = url;
                var contextPath = oui.getContextPath();
                if(url.indexOf('/')==0){ //以斜杠开头
                    if(url.indexOf(contextPath)!=0){
                        url4load= contextPath+url.substring(1);
                    }
                }else{//以相对路径 或者http路径开头
                    if(url.indexOf('http')!=0){//以相对路径开头
                        url4load = contextPath+url;
                    }
                }
                if(this.currentUrl.indexOf('?')>0){
                    url4load = url4load + this.currentUrl.substring(this.currentUrl.indexOf('?'));
                }
                //刷新页面
                this.url4load = url4load;
                if(this.routes[this.path]){
                    this.routes[this.path]();
                }else{
                    this.startTime = new Date(); // router 改变时间
                    //存在点，则就说明是后缀名类型的模板
                    var pathSuffix = this.path.substring(0,this.path.indexOf('.html'));
                    if(pathSuffix.indexOf('.')>0){ // 指定模板类型的后缀
                        //尝试通过ajax获取视图模板
                        //跟上文件名后缀
                        NProgress.start();

                        util.loadComponent(this.path,{
                            $router:params
                        },this.includeEl,function(options){
                            NProgress.set(0.5);
                            NProgress.done();
                            me.endTime = new Date();
                            //成功回调
                        },function(error){
                            //失败回调
                            NProgress.set(0.5);
                            NProgress.done();
                            console.log(error);
                            console.log('路由['+me.currentUrl+']资源加载异常!!!');
                        });
                    }else{//模拟原生html页面跳转，无模板类型的页面自动转向

                        com.oui.portal.PortalController.renderByLoadSys();
                    }
                }
            };
            //默认文件全路径自动路由机制
            win.Router = Router;
            win.oui.router = new Router();
        }

    };
    PortalController = oui.biz.Tool.crateOrUpdateClass(PortalController);
})(window, jQuery); 


