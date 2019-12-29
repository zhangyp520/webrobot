
!(function(win){

    var HtmlParser = {

        /****
         * 根据字符串内容 和标签名获取 内容代码
         * @param str
         * @param ele
         * @returns {string|*}
         */
        getInnerCode4Mutil:function getInnerCode4Mutil(content,ele) {
            var me = this;
            var arr=[];
            var str = ''+content;
            var len = ele.length;
            do{
                var startIndex = str.indexOf('<'+ele)+len+1;
                var endIndex = str.indexOf("</"+ele+">");
                if(endIndex<0 || (startIndex-len-1<0)){
                    break;
                }
                var temp =str.substring(startIndex,endIndex);
                temp = temp.substring(temp.indexOf('>')+1);

                var splitStart = str.indexOf('<'+ele);
                var splitEndIndex = str.indexOf("</"+ele+">")+len+3;
                var rep = str.substring(splitStart,splitEndIndex);

                arr.push({
                    tag:ele,
                    attrString:me.getElementAttrString(str,ele),
                    content:temp
                });
                str = str.replace(rep,"");
            }while(true);
            return arr;
        },
        /****
         * 根据字符串内容 和标签名获取 内容代码
         * @param str
         * @param ele
         * @returns {string|*}
         */
        getInnerCode4One:function getInnerCode4One(str,ele) {
            var len = ele.length; // <>\n
            var startIndex = str.indexOf('<'+ele)+len+1;
            var endIndex = str.lastIndexOf("</"+ele+">");
            if(endIndex<0 || (startIndex-len-1)<0){
                return '';
            }
            var temp =str.substring(startIndex,endIndex);
            temp = temp.substring(temp.indexOf('>')+1);
            return temp;
        },
        /****
         * 获取 元素的属性字符串内容
         * @param str
         * @param ele
         */
        getElementAttrString:function getElementAttrString(str,ele){
            var len = ele.length; // <>\n
            var startIndex = str.indexOf('<'+ele)+len+1;
            var endIndex = str.indexOf("</"+ele+">");
            var temp =str.substring(startIndex,endIndex);
            temp = temp.substring(0,temp.indexOf('>'));
            return temp;
        }

    };
    function isIE() {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            return true;
        } else {
            return false;
        }
    }
    if (isIE()) { // 追加ie promise插件
        var script = document.createElement('script');
        script.type = 'text/javaScript';
        script.src = '/res_common/third/Promise/bluebird.js';  // bluebird 文件地址
        document.getElementsByTagName('head')[0].appendChild(script);
    }
//var isSupportReg = true;
//var regMap ={};
//try{
//    regMap={
//        _styleRegex: new RegExp("(?<=<style.*>)[ \s\S]*?(?=<\/style>)",'gmi'),
//        _styleAttrRegex: new RegExp("(?<=<style) .+(?=>)","gmi"),
//        _htmlRegex: new RegExp("(?<=<template.*>)[\s\S]*?(?=<\/template>)",'gmi'),
//        _scriptRegex: new RegExp("(?<=<script.*>)[ \s\S]*?(?=<\/script>)",'gmi')
//    };
//}catch(err){
//    isSupportReg = false;
//}
    var util = {

        endWith:function(str,endFix){
            if((str.lastIndexOf(endFix)+(endFix.length)) == str.length){
                return true
            }
            return false;
        },
        //获取路由的路径和详细参数
        getParamsUrl: function(url) {
            var tempUrl = url || location.hash;
            var hashDeatail = tempUrl.split("?"),
                hashName = hashDeatail[0].split("#")[1], //路由地址
                params = hashDeatail[1] ? hashDeatail[1].split("&") : [], //参数内容
                query = {};
            for (var i = 0; i < params.length; i++) {
                var item = params[i].split("=");
                var key = decodeURIComponent(item[0]);
                var v  = decodeURIComponent(item[1]);
                oui.JsonPathUtil.setObjByPath(key,query,v,true);
            }
            return {
                currentUrl:tempUrl,
                path: hashName,
                query: query,
                params: params
            }
        },

        // 生成不同的 key
        genKey: function genKey() {
            var t = 'xxxxxxxx'
            return t.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0
                var v = c === 'x' ? r : (r & 0x3 | 0x8)
                return v.toString(16)
            })
        },
        hasClass: function hasClass (elem, cls) {
            cls = cls || '';
            if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
            return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
        },
        addClass: function addClass(ele, cls) {
            if (!util.hasClass(ele, cls)) {
                ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
            }
        },
        removeClass:function removeClass(elem, cls) {
            if (util.hasClass(elem, cls)) {
                var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
                while (newClass.indexOf(' ' + cls + ' ') >= 0) {
                    newClass = newClass.replace(' ' + cls + ' ', ' ');
                }
                elem.className = newClass.replace(/^\s+|\s+$/g, '');
            }
        },

        eval:function(fn){
            if(typeof fn =='object'){
                return fn;
            }
            var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
            try{
                var temp = new Fn('return ' + fn)();
                return temp;
            }catch(err){
                console.log(err);
                return null;
            }
        },
        /***
         * 获取当前元素配置控制器的data属性
         * @param el
         * @returns {*|jQuery}
         */
        getControllerData:function(el){
            var clz = util.getController(el);
            var data = $(el).attr('data');
            if(!data){
                data ="data()";
            }else{
                if(data.indexOf('data()')<0){
                    data = 'data().'+data;
                }
            }

            if(clz && (clz !=window)){
                if(typeof data =='string'){
                    if(data.indexOf('(')>-1){//方法调用
                        var funPath = data.substring(0,data.indexOf('('));
                        if(funPath.indexOf('.')<0){
                            data = clz.FullName+'.'+data;
                        }
                    }else{//属性调用
                        if(data.indexOf('.')<0){
                            data = clz.FullName+'.'+data;
                        }
                    }
                }
            }

            try{
                if(!data){
                    data = window;
                }else{
                    data = oui.parseJson(data);
                }
            }catch(e){
                oui.log(el.outerHTML+'解析异常');
                data = {};
            }
            return data;
        },
        getController:function(el){
            var controller = $(el).attr('oui-controller');
            var clz = '';
            if(controller){
                clz = oui.biz.Tool.getControllerClass(controller);
            }else{
                var clsFullName= $(el).closest('[oui-controller]').attr('oui-controller');
                if(clsFullName){
                    try{
                        clz = oui.biz.Tool.getControllerClass(clsFullName);
                    }catch(err){
                        try{
                            clz = oui.parseJson(clsFullName);
                        }catch(cerr){
                            clz = window;
                        }
                    }
                }
            }
            return clz;
        },
        /****
         *
         */
        /**
         * 解析组件
         */
        parseComponent: function parseComponent(content, options) {
            if (!content) throw Error("content is null.");
            if (!options) options = {};
            var styles,styleAttrs,htmls,scripts;
            styles = [];
            styleAttrs = [];
            htmls =[];
            scripts =[];

            HtmlParser.getInnerCode4Mutil(content,'style').forEach(function(item){
                styles.push(item.content||"");
                styleAttrs.push(item.attrString||"");
            });
            htmls.push( HtmlParser.getInnerCode4One(content,'template')||""); //获取html模板内容
            scripts.push( HtmlParser.getInnerCode4One(content,'script')||"");

            //先处理脚本
            var script = scripts.join("");
            script = "(" + /{[\s\S]*}/gmi.exec(script) + ")";

            var obj = util.eval(script);
            for (var prop in obj) {
                options[prop] = obj[prop];
            }
            options.templateType= options.templateType||'vue';//默认为vue模板

            var style = "";
            if (styles != null && styles.length > 0) {
                if(options.templateType =='vue'){
                    style = "<component scoped :is=\"'style'\"";
                }else{
                    style = "<style type=\"text/css\" scoped ";
                }
                if (styleAttrs != null && styleAttrs.length > 0) {
                    style += styleAttrs.join("");
                }
                style += ">";
                style += styles.join("");

                if(options.templateType =='vue'){
                    style += "</component>";
                }else{
                    style += "</style>";
                }

            }

            if (htmls == null || htmls.length <= 0) {
                throw Error("not found '<template>' tag.");
            }
            var html = htmls.join("");
            html = html.replace(/(<!--.*?-->)/g, '');
            if (style) {
                if(options.templateType =='vue'){ //vue模板特殊处理样式模板
                    var index = html.lastIndexOf("</");
                    if (index !== -1) {
                        html = html.substr(0, index) + style + html.substr(index);
                    }
                    options.styleTemplate = style;
                }else{
                    options.styleTemplate = style;
                }

            }else{
                options.styleTemplate ='';
            }
            options.template = html;
            obj =null;
            delete obj;
            return options;
        },
        loadComponent4Instance:function loadComponent4Vue(url,options,isInclude){
            var target = this;
            var viewsMap =oui.viewsMap;
            //console.log('loadComponent:'+url);
            if(viewsMap[url] &&viewsMap[url].options){
                return oui.getComponent(url,options,isInclude);
            }
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
            /** 模板不存在 尝试 通过ajax拉取模板资源，并解析渲染 ***/
            if(oui_context.promise){ //chrome插件扩展
                return  new Promise(function(success,error){
                    oui.loadUrl({
                        url:url4load,
                        subContentType:2,
                        callback:function(html){
                            var text = html;
                            var tplOptions = target.parseComponent(text, {});
                            viewsMap[url] ={
                                url:url,
                                options:tplOptions //模板属性
                            };
                            success(oui.getComponent(url,options,isInclude));
                        }
                    });
                });
            }else{
                var text = oui.loadUrl(url4load, true, false);
                var tplOptions = target.parseComponent(text, {});
                viewsMap[url] ={
                    url:url,
                    options:tplOptions //模板属性
                };
                return oui.getComponent(url,options,isInclude);
            }
        },
        /**
         * 加载单文件组件
         */
        loadComponent: function loadComponent (url, options,el,success,error) {
            var target = this;
            var viewsMap =oui.viewsMap;
            //console.log('loadComponent:'+url);
            if(viewsMap[url] &&viewsMap[url].options){
                oui.renderComponent(url,options,success,error,el);
                return;
            }

            /** 模板不存在 尝试 通过ajax拉取模板资源，并解析渲染 ***/
            var url4load = url;
            var contextPath = oui.getContextPath();

            if(url.indexOf('/')==0 ||url.indexOf('chrome-extension')==0){ //以斜杠开头
                if(url.indexOf(contextPath)!=0){
                    url4load= contextPath+url.substring(1);
                }
            }else{//以相对路径 或者http路径开头
                if(url.indexOf('http')!=0){//以相对路径开头
                    url4load = contextPath+url;
                }
            }

            if(NProgress){
                NProgress.start();
            }
            var text = '';
            if(oui_context.promise){ //chrome插件扩展
                oui.loadUrl({
                    url:url4load,
                    subContentType:2,
                    callback:function(html){

                        if(NProgress){
                            NProgress.set(0.5);
                            NProgress.done();
                        }
                        text = html;
                        var tplOptions = target.parseComponent(text, {});
                        viewsMap[url] ={
                            url:url,
                            options:tplOptions //模板属性
                        };
                        oui.renderComponent(url,options,success,error,el);//加载渲染属性
                    }
                });
                return  ;
            }else{
                text = oui.loadUrl(url4load, true, false);
            }

            if(NProgress){
                NProgress.set(0.5);
                NProgress.done();
            }
            var tplOptions = target.parseComponent(text, {});
            viewsMap[url] ={
                url:url,
                options:tplOptions //模板属性
            };
            oui.renderComponent(url,options,success,error,el);//加载渲染属性

            //axios.get(url)
            //.then(function (response) {
            //    //ajax拉取后 先缓存资源
            //    var tplOptions = target.parseComponent(response.data, {});
            //    viewsMap[url] ={
            //        url:url,
            //        options:tplOptions //模板属性
            //    };
            //    oui.renderComponent(url,options,success,error,el);//加载渲染属性
            //});
        }
    };
    var PageData = function (cfg) {
        var temp = {
            designerId:null,//设计器id
            dataId:null, //当前页面的数据Id
            designer:null,
            mainData:null,
            detailData:null
        };
        this.getPageData = getPageData;
        this.getData =  getData;
        this.getValue = getValue;
        this.getDisplay = getDisplay;
        this.getControl = getControl;
        this.getDataList = getDataList;
        this.addDataRow = addDataRow;
        this.getDesigner = getDesigner;
        this.getControlRenderDataById =  getControlRenderDataById;
        this.findFieldStyle4Dom = findFieldStyle4Dom;
        this.render = render;
        this.updatePageData = updatePageData;
        this.beforeInit = beforeInit; //初始化前
        this.afterInit = afterInit; //初始化后
        this.bindEvents = bindEvents;

        $.extend(true,this,temp,cfg);
        this.bindEvents(); //绑定事件

    };



    var getPageData = function(){
        return this;
    };
    /***
     * 绑定事件
     */
    var bindEvents = function(){
        var designer = this.getDesigner();
        var events = designer.events ||{};
        for (var k in events) {
            if(events[k]){//有配置才绑定事件配置
                var m= k.charAt(0).toUpperCase()+ k.substring(1);
                this['on'+m] = oui.parseJson2Function(events[k]);
            }
        }
    };
    /*** 获取控件值dom上的样式*****/
    var findFieldStyle4Dom = function(item){
        var s = item.innerStyle&&item.innerStyle.styleFieldString;
        return s||"";
    };

    /***
     * 根据控件id 获取控件渲染数据
     * @param controlId
     * @returns {{}}
     */
    var getControlRenderDataById = function(controlId,rowIndex){
        var me = this;
        var data = {};
        //获取控件的渲染数据
        var control = me.getControl(controlId);
        if(control){
            data.controlId = control.id; //控件id
            data.bizId = control.bizId; //控件业务id
            data.dataId   = me.dataId; //数据id
            data.designerId = me.designerId; //设计器定义id
            data.control = control; //控件定义
            data.rowIndex = rowIndex; //处理表格行数据

            data.id='field-'+control.id; //组件id
            data.name='field-'+control.id;//组件name
            data.bindProp = control.bizId; //双向绑定的业务属性

            data.title=control.name; //组件title
            if(control.detailId && (typeof rowIndex !='undefined')){
                data.detailId  = control.detailId;
                var detailData = this.getDataList(control.detailId);
                data.value= this.getValue(control,detailData[rowIndex]||{}); //组件值
            }else{
                data.value= this.getValue(control,this.mainData||{}); //组件值
            }
            data.style= me.findFieldStyle4Dom(control); //组件style样式
            data.cls = 'control-field-value-abs';//组件css样式

            //绑定事件脚本
            data.bindEvents = function(){
                var control = this.control; //根据当前控件的业务属性配置 获取对应的脚本
                var events = control.events||{}; //前端事件脚本配置
                for (var k in events) {
                    if(events[k]){//有配置才绑定事件配置
                        var m= k.charAt(0).toUpperCase()+ k.substring(1);
                        this['on'+m] = oui.parseJson2Function(events[k]);
                    }
                }
            };
            if(control.isFormField){ //表单类控件才需要处理
                //更新表单字段处理
                data.onUpdate = function(key,v,ov,options){
                    this.updatePageData(key,options);
                };
                data.updatePageData = function(key,options){
                    if(this.detailId && (typeof this.rowIndex !='undefined')){
                        this.getPageData().updatePageData(key,options,this.rowIndex,this.detailId);//更新明细表
                    }else{
                        this.getPageData().updatePageData(key,options);//更新主表
                    }
                }
            }
            data.getPageData = function(){
                return me;
            };
            var placeholder = control.placeholder||(control.otherAttrs&&control.otherAttrs.placeholder)||"";
            if(placeholder){
                data.placeholder= placeholder;
            }
            data.bindEvents();
        }
        return data;
    };

    var render = function(){
        if(!this._render){
            if(this.designer&&this.designer.content){
                this._render = template.compile(this.designer.content);
            }else{
                return '';
            }
        }
        this.content =this._render({pageData:this});
        return this.content;
    };
    //初始化前执行
    var beforeInit = function(){
        this.onBeforeInit&&this.onBeforeInit();
    };
    //初始化后执行
    var afterInit = function(){
        this.onAfterInit&&this.onAfterInit();
    };
    /*** 根据id获取控件定义对象****/
    var getControl = function (id) {
        var controls= this.designer.controls||[];
        var one = oui.findOneFromArrayBy(controls,function(item){
            if(item.id == id){
                return true;
            }
        });
        return one ||{};
    };
    /** 获取主表数据*****/
    var getData = function () {
        return this.mainData||{};
    };
    /** 获取数据表格中数据******/
    var getDataList = function (detailId) {
        var detailData = this.detailData||{};
        return detailData[detailId]||[];
    };
    /** 给指定明细表 在指定行索引前添加默认行数据 **/
    var addDataRow = function(detailId,row,idx){
        if(!this.detailData){
            this.detailData = {};
        }
        if(!this.detailData[detailId]){
            this.detailData[detailId] =[];
        }
        var dataList = this.getDataList(detailId);
        if(typeof idx !='undefined'){
            //指定位置添加行
            dataList.splice(idx,0,row||{});
        }else{
            //默认添加到最后一行
            dataList.push(row||{});
        }
        return true;
    };
    /*****
     * 更新表单数据
     * @param key
     * @param v
     * @param oldv
     */
    var updatePageData = function(key,options,idx,detailId){
        if(!key){
            return ;
        }
        if(typeof idx =='undefined'){
            // 更新主表
            if(!this.mainData){
                this.mainData = {};
            }
            this.mainData[key] =options;

        }else{
            //更新明细表
            if(!this.detailData){
                this.detailData = {};
            }
            if(!this.detailData[detailId]){
                this.detailData[detailId] = [];
            }
            if(!this.detailData[detailId][idx]){
                this.detailData[detailId][idx]= {};
            }
            this.detailData[detailId][idx][key] = options;
        }
    };
    /**** 根据控件定义 和控件数据 获取 html内容,对特殊值的处理 由页面自行处理扩展机制 *****/
    var getValue = function (control,dataMap) {
        //return oui.PageDesignControlRuntimeAdapter.render(control,dataMap[control.id]);
        if((typeof dataMap[control.bizId]=='undefined') || dataMap[control.bizId]==null){
            return "";
        }
        if((typeof dataMap[control.bizId].value=='undefined') || dataMap[control.bizId].value==null){
            return "";
        }
        return dataMap[control.bizId].value+"";
    };

    /** 获取控件显示值*/
    var getDisplay = function(control,dataMap){
        if((typeof dataMap[control.bizId]=='undefined') || dataMap[control.bizId]==null){
            return "";
        }
        if((typeof dataMap[control.bizId].display=='undefined') || dataMap[control.bizId].display==null){
            return "";
        }
        return dataMap[control.bizId].display+"";
    };

    /** 运行态获取 设计对象*****/
    var getDesigner = function(){
        return this.designer||{};
    };

    /**创建 页面数据对象 用于渲染一个页面 oui.util.createPageData({}); ***/
    util.createPageData = function(cfg){
        return new PageData(cfg);
    };
    var oui =win.oui ||{};
    win.oui = oui;
    win.oui.util = util;
})(window);