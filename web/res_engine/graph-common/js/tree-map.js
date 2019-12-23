!(function(win){
    /****
     * treeMap构造器
     * @param cfg
     * @constructor
     */
    var TreeMap = {
        "package": "com.oui",
        "class": "TreeMap",
        /** 私有属性块***/
        Priv:{
            clickName:oui.os.mobile?'tap':'click',
            idKey:'id',
            parentIdKey:'parentId',
            nameKey:'name',
            ids:null,
            rootIds:null,
            map:null
        },
        /** 公共api***/
        Publ:{
            newId:function(prefix){
                prefix= prefix ||"";
                var id = prefix+oui.getUUIDLong();
                if(this.map&& this.map[id]){
                    return this.newId(prefix);
                }
                return id;
            },
            /** 核心 treeMap api 开始***/
            isRoot:function(id){
                var flag = false;
                if(this.rootIds.indexOf(id)>-1){
                    flag = true;
                }
                return flag;
            },
            /** 是否是join节点**/
            isJoin:function(id){
                var treeNode = this.findNode(id);
                if(treeNode&&treeNode.prevId){
                    return true;
                }
                return false;
            },
            isExpand:function(id){
                var treeNode = this.findNode(id);
                if(treeNode){
                    return !treeNode.unExpand;
                }
                return false;
            },
            /** 展开子集***/
            expandChildren:function(id){
                var currNode = this.findNode(id);
                if(currNode){
                    currNode.unExpand = false;
                }
            },
            /** 折叠所有节点****/
            unExpandChildren:function(id){
                var currNode = this.findNode(id);
                if(currNode){
                    currNode.unExpand = true;
                }
            },
            findRootId:function(){
                return this.rootIds[0]||"";
            },
            findRootIds:function(){
                return this.rootIds||[];
            },
            findRoot:function(){
                var rootId = this.rootIds[0];
                if(rootId){
                    return this.map[rootId] ||{} ;
                }else{
                    return {};
                }
            },
            findRoots:function(){
                var ids = this.rootIds;
                var roots = [];
                for(var k=0,len=ids.length;k<len;k++){
                    roots.push(this.map[ids[k]]);
                }
                return roots;
            },
            /***
             * 获取split节点的子节点长度
             * @param id
             * @returns {number}
             */
            findSplitChildrenLength:function(id){
                var len = 0;
                var treeNode = this.findNode(id);
                if(treeNode&&treeNode.prevId){
                    var splitNode = this.findNode(treeNode.prevId);
                    if(splitNode&&splitNode.childIds){
                        len = splitNode.childIds.length;
                    }
                }
                return len;
            },
            /** 获取split节点的子节点列表****/
            findSplitChildren:function(id){
                var ids = [];
                var treeNode = this.findNode(id);
                if(treeNode&&treeNode.prevId){
                    var splitNode = this.findNode(treeNode.prevId);
                    if(splitNode){
                        ids =  splitNode.childIds ||[];
                    }
                }
                var arr = [];
                if(ids.length){
                    arr = this.findNodes(ids);
                }
                return arr;
            },
            findParentId:function(id){
                var parentIds = this.map[id].parentIds||[];
                return parentIds[0]||"";
            },
            findParentIds:function(id){
                var parentIds = this.map[id].parentIds||[];
                return parentIds||[] ;
            },
            findParent:function(id){
                var parentIds = this.map[id].parentIds||[];
                var parentId = parentIds[0]||"";
                if(parentId){
                    return this.map[parentId]||{};
                }else{
                    return {};
                }
            },
            findParents:function(id){
                var parentIds = this.map[id].parentIds||[];
                var parents = [];
                for(var k=0,len=parentIds.length;k<len;k++){
                    parents.push(this.map[parentIds[k]]);
                }
                return parents;
            },
            hasChildren:function(id){
                var curr = this.map[id]||{};
                var childIds = curr.childIds||[];
                return childIds.length>0;
            },
            findChildren:function(id){
                var curr = this.map[id]||{};
                var childIds = curr.childIds||[];
                var children = [];
                for(var k=0,len=childIds.length;k<len;k++){
                    children.push(this.map[childIds[k]]);
                }
                return children;
            },

            findJoinId:function(nodeId){
                var curr = this.map[nodeId]||{};
                return curr.joinId||'';
            },
            /****
             * 判断当前节点是否有兄弟节点
             * @param id
             */
            hasBrother:function(id){
                var parent = this.findParent(id);
                var flag = false;
                if(parent&&parent.childIds){
                    if(parent.childIds.length>1){
                        flag = true;
                    }
                }
                return flag;
            },
            /** 获取子节点id列表 **/
            findChildIds:function(id){
                var curr = this.map[id]||{};
                var childIds = curr.childIds||[];
                return childIds;
            },
            /** 获取所有子孙节点 id列表*****/
            findChildIdsAll:function(id){
                var curr = this.map[id]||{};
                var childIds = curr.childIds||[];
                var arr = [];
                var me = this;
                for(var i= 0,len= childIds.length;i<len;i++){
                    var temp = me.map[childIds[i]];
                    if(temp&&temp.id){
                        if(arr.indexOf(temp.id)<0){
                            arr.push(temp.id);
                        }
                        arr = arr.concat(me.findChildIdsAll(temp.id));
                    }
                }
                if(curr.joinId){
                    if(arr.indexOf(curr.joinId)<0){
                        arr.push(curr.joinId);
                    }
                    arr = arr.concat(me.findChildIdsAll(curr.joinId));
                }
                return arr;
            },
            /*****
             * 根据当前节点 获取所有的祖先id列表
             * @param id
             */
            findParentIdsAll:function(id){
                var curr = this.map[id]||{};
                var parentIds = curr.parentIds||[];
                var arr = [];
                var me = this;
                for(var i= 0,len= parentIds.length;i<len;i++){
                    var temp = me.map[parentIds[i]];
                    if(temp&&temp.id){
                        if(arr.indexOf(temp.id)<0){
                            arr.push(temp.id);
                        }
                        arr = arr.concat(me.findParentIdsAll(temp.id));
                    }
                }
                return arr;
            },
            findNode:function(id){
                return this.map[id] || {};
            },
            findSourceNode:function(id){
                var treeNode = this.findNode(id);
                var node = treeNode.node ||{};
                return node;
            },
            findSourceNodes:function(ids){
                var nodes = [];
                var me = this;
                for(var k=0,len=ids.length;k<len;k++){
                    nodes.push(me.findSourceNode(ids[k]));
                }
                return nodes;
            },
            findNodes:function(ids){
                var nodes = [];
                for(var k=0,len=ids.length;k<len;k++){
                    nodes.push(this.map[ids[k]]);
                }
                return nodes;
            },
            updateNodeName:function(id,newValue){
                var node = this.findNode(id);
                if(node&&node.node){
                    var nameKey = this.nameKey;
                    node.node[nameKey] = newValue;
                }
            },
            findNodeName:function(id){
                var node = this.findNode(id);
                var nameKey = this.nameKey;
                if(node&&node.node&&node.node[nameKey]){
                    return node.node[nameKey];
                }
                return '';
            },
            findNodeNames:function(ids){
                var nodes = this.findNodes(ids)||[];
                var nameKey = this.nameKey;
                var names = [];
                for(var k=0,len=nodes.length;k<len;k++){
                    var curr = nodes[k];
                    if((!curr)||(!curr.node) ||(!curr.node[nameKey])){
                        continue;
                    }
                    names.push(curr.node[nameKey]);
                }
                return names;
            },
            /****
             * 添加兄弟节点
             * @param newNode
             * @param node
             */
            addBrotherNode:function(newNode,node){
                var parentIds = node.parentIds;
                var me = this;
                /** 更新当前节点的父节点为新的节点Id****/
                if(node.parentIds&&node.parentIds.length){
                    for(var i= 0,len=node.parentIds.length;i<len;i++){
                        var parentNode = me.findNode(node.parentIds[i]);
                        if(parentNode){
                            var childIds = parentNode.childIds||[];
                            var currIdx = childIds.indexOf(node.id);
                            if(childIds[currIdx]>-1){
                                childIds.splice(currIdx+1,0,newNode.id); //指定兄弟节点后面位置插入新节点
                            }
                        }
                    }
                }
                var currMainIdx = this.ids.indexOf(node.id);
                this.ids.splice(currMainIdx+1,0,newNode.id);
                this.map[newNode.id] = {
                    id:newNode.id,
                    parentId:parentIds[0]||"",
                    parentIds:parentIds, //考虑多父节点的情况,应用于流程图
                    childIds:[],
                    node:newNode
                };
            },
            addParentNode:function(newNode,node){
                var parentIds = node.parentIds;
                var me = this;
                /** 更新新节点作为当前节点在父节点的子节点中的位置***/
                if(node.parentIds&&node.parentIds.length){
                    for(var i= 0,len=node.parentIds.length;i<len;i++){
                        var parentNode = me.findNode(node.parentIds[i]);
                        if(parentNode){
                            var childIds = parentNode.childIds||[];
                            var currIdx = childIds.indexOf(node.id);
                            if(childIds[currIdx]>-1){
                                childIds[currIdx] = newNode.id; //只当新的父节点替换当前节点的位置
                            }
                        }
                    }
                }else{
                    this.rootIds = [newNode.id];//重新设置根节点
                }
                /** 更新当前节点的父节点为新的节点Id****/
                node.parentId  = newNode.id;
                node.parentIds = [newNode.id];
                this.ids.push(newNode.id);
                this.map[newNode.id] = {
                    id:newNode.id,
                    parentId:parentIds[0]||"",
                    parentIds:parentIds, //考虑多父节点的情况,应用于流程图
                    childIds:[node.id],
                    node:newNode
                };
            },
            addNode:function(newNode){
                var idKey = this.idKey;
                var parentIdKey = this.parentIdKey;

                var id = newNode[idKey];
                if(!id){
                    newNode[idKey] = oui.getUUIDLong();
                    id = newNode[idKey];
                }
                var parentId = newNode[parentIdKey];
                if((!parentId)||(!parentId.length)){ // is root
                    if(!newNode.prevId){ //非孙子节点
                        this.rootIds.push(id);
                    }
                }
                var parentIds = [];
                if(typeof parentId =='string'){
                    if(parentId){
                        parentIds = parentId.split(',');
                    }
                }else if(parentId){

                    parentIds = parentId;
                }
                this.ids.push(newNode.id);
                this.map[newNode.id] = {
                    id:newNode.id,
                    isLoopStart:newNode.isLoopStart,
                    isLoopEnd:newNode.isLoopEnd,
                    prevId:newNode.prevId,
                    parentId:parentIds[0]||"",
                    parentIds:parentIds, //考虑多父节点的情况,应用于流程图
                    childIds:[],
                    node:newNode
                };
                if(newNode.prevId){
                    var splitNode = this.map[newNode.prevId];
                    if(!splitNode.joinId){
                        splitNode.joinId = newNode.id;
                        splitNode.node.joinId = newNode.id;
                    }
                }
                //更新父节点的childIds属性
                if(parentId){
                    var parentTreeNode = this.map[parentId];
                    if(parentTreeNode){
                        if(parentTreeNode.childIds.indexOf(id)<0){
                            parentTreeNode.childIds.push(id);
                        }
                    }
                }


            },
            /****
             * 清除join节点和后续所有子节点
             * @param node
             */
            removeNodeAll4join:function(node){
                if(node.prevId){//是join节点
                    var childIdsAll = this.findChildIdsAll(node.id)||[];
                    if(childIdsAll.length){

                    }
                    var splitNode = this.findNode(node.prevId);
                    splitNode.joinId = '';
                    splitNode.node.joinId = '';
                    var delIds =  childIdsAll ||[];
                    var me = this;
                    oui.removeFromArrayBy(this.ids||[],function(item){
                        if(delIds.indexOf(item)>-1){
                            oui.removeFromArrayBy(delIds,function(temp){
                                if(item == temp){
                                    return true;
                                }
                            });
                            me.map[item] = null;
                            delete me.map[item];
                            return true;
                        }else{
                            return false;
                        }
                    });

                    if(delIds&&delIds.length){
                        oui.removeFromArrayBy(delIds,function(item){
                            me.map[item] = null;
                            delete me.map[item];
                        });
                    }
                    var id = node.id;
                    /** 删除当前节点***/
                    var idx = this.ids.indexOf(id);
                    if(idx>-1){
                        this.ids.splice(idx,1); //删除当前id
                    }
                    this.map[id] = null;
                    delete this.map[id];//清空map中对象
                }
            },
            /*****
             *
             * 删除当前节点并且删除 当前节点下的所有子孙
             * @param node
             */
            removeNodeAll:function(node){
                var id = node.id;
                var parentIds = node.parentIds||[];
                var childIds = node.childIds||[];
                var newParentId = node.parentIds[0];
                var newParentNode = this.map[newParentId];
                /** 更新父节点****/
                if(parentIds.length){
                    for(var i= 0,len=parentIds.length;i<len;i++){
                        //删除当前节点在父节点中的位置
                        var parentNode = this.map[parentIds[i]];
                        if(parentNode&&parentNode.childIds){
                            var cidx =  parentNode.childIds.indexOf(id);
                            if(cidx>-1){
                                parentNode.childIds.splice(cidx,1);
                            }
                        }
                    }
                }
                var me = this;

                var delWithJoinIds=[];

                /** 获取所有要删除的孙子节点***/
                var delIds =  this.findChildIdsAll(id) ||[];
                delIds = delIds.concat(delWithJoinIds);
                oui.removeFromArrayBy(this.ids||[],function(item){
                    if(delIds.indexOf(item)>-1){
                        oui.removeFromArrayBy(delIds,function(temp){
                            if(item == temp){
                                return true;
                            }
                        });
                        me.map[item] = null;
                        delete me.map[item];
                        return true;
                    }else{
                        return false;
                    }
                });

                if(delIds&&delIds.length){
                    oui.removeFromArrayBy(delIds,function(item){
                        me.map[item] = null;
                        delete me.map[item];
                    });
                }
                /** 删除当前节点***/
                var idx = this.ids.indexOf(id);
                if(idx>-1){
                    this.ids.splice(idx,1); //删除当前id
                }
                this.map[id] = null;
                delete this.map[id];//清空map中对象
            },
            /** 删除根节点***/
            removeRoot:function(node){
                var id = node.id;
                var childIds = node.childIds||[];
                var rootIdx = this.rootIds.indexOf(id);
                this.rootIds.splice(rootIdx,1);
                /** 更新子节点***/
                if(childIds.length){
                    for(var i= 0,len=childIds.length;i<len;i++){
                        var childNode = this.map[childIds[i]];
                        if(childNode&&childNode.parentIds){
                            var pidx = childNode.parentIds.indexOf(id);
                            if(pidx>-1){
                                //更新节点的新的父节点
                                childNode.parentIds.splice(pidx,1);
                            }
                            childNode.parentId = childNode.parentIds.join(',');
                            this.rootIds.push(childNode.id);
                        }
                    }
                }
                /** 删除当前节点***/
                var idx = this.ids.indexOf(id);
                if(idx>-1){
                    this.ids.splice(idx,1); //删除当前id
                }
                this.map[id] = null;
                delete this.map[id];//清空map中对象
            },
            /** 删除当前节点 ，删除当前节点 但是不删除子集，需要将子集的 parentId 重新指向 当前节点的父亲节点，并更新父亲节点下的子节点列表****/
            removeNode:function(node){
                var id = node.id;
                var parentIds = node.parentIds||[];
                var childIds = node.childIds||[];
                var newParentId = node.parentIds[0];
                var newParentNode = this.map[newParentId];
                var joinId = node.joinId;
                var delIds =[];
                if(joinId){
                    delIds = this.findChildIdsAll(joinId)||[];
                    delIds.push(joinId);
                }
                /** 更新父节点****/
                if(parentIds.length){
                    for(var i= 0,len=parentIds.length;i<len;i++){
                        //删除当前节点在父节点中的位置
                        var parentNode = this.map[parentIds[i]];
                        if(parentNode&&parentNode.childIds){
                            var cidx =  parentNode.childIds.indexOf(id);
                            if(cidx>-1){
                                parentNode.childIds.splice(cidx,1);
                            }
                        }
                    }
                }
                /** 更新子节点***/
                if(childIds.length){
                    for(var i= 0,len=childIds.length;i<len;i++){
                        var childNode = this.map[childIds[i]];
                        if(childNode&&childNode.parentIds){
                            var pidx = childNode.parentIds.indexOf(id);
                            if(pidx>-1){
                                //更新节点的新的父节点
                                childNode.parentIds.splice(pidx,1);
                                childNode.parentIds.push(newParentId);
                            }
                            childNode.parentId = childNode.parentIds.join(',');
                            newParentNode.childIds.push(childNode.id);//在新的父亲节点上追加子节点列表
                        }
                    }
                }
                delIds.push(id);//增加当前节点
                var me = this;
                oui.removeFromArrayBy(this.ids,function(item){
                    if(delIds.indexOf(item)>-1){
                        me.map[item] = null;
                        delete me.map[item];//清空map中对象
                        return true;
                    }
                });
            },
            /****
             * 判断两个节点是否为兄弟节点
             * @param nodeId
             * @param targetNodeId
             */
            isBrothers:function(nodeId,targetNodeId){
                var node = this.findNode(nodeId);
                var targetNode = this.findNode(targetNodeId);
                var flag = false;
                if(node && targetNode){
                    if(node.parentId == targetNode.parentId){
                        flag = true;
                    }
                }
                return flag;
            },
            /***
             * 判断当前节点是否为目标节点的子节点
             * @param nodeId
             * @param targetNodeId
             */
            isChild:function(nodeId,targetNodeId){
                var targetNode = this.findNode(targetNodeId);
                var flag = false;
                if(targetNode&&targetNode.childIds){
                    if(targetNode.childIds.indexOf(nodeId)>-1){
                        flag = true;
                    }
                }
                return flag;
            },
            /******
             * 判断当前节点 是否是目标节点的祖先
             * @param nodeId
             * @param targetNodeId
             */
            hasParents:function(nodeId,targetNodeId){
                var parentIds= this.findParentIdsAll(targetNodeId) ||[];
                var flag = false;
                if(parentIds.indexOf(nodeId)>-1){
                    flag = true;
                }
                return flag;
            },

            /******* 核心treeMap api 结束 *******************************/
            /*****根据treeMap绘制 表格相关的api ********************/
            /***
             * 根据节点id 获取占用的单元格跨列数[childIds.length*2]
             * @param id
             * @returns {number}
             */
            findColspan : function(id){
                var node = this.findNode(id);
                var childIds = node.childIds ||[];
                var colspan = 2;
                if(childIds.length){
                    colspan = childIds.length*2;
                }
                return colspan;
            },
            /*****
             * 获取聚合线条位置
             * @param id
             */
            findLineCls4BottomArray:function(id){
                var node = this.findNode(id);
                var childIds = node.childIds ||[];
                var arr = [];
                var len =childIds.length*2;
                if(len ==2){ //只有一个节点的情况
                    arr.push('right topHeight');
                    arr.push('left topHeight');
                }else{
                    for(var i=0;i<len;i++){
                        var curr = '';
                        if(i%2==0){
                            curr = 'right';
                        }else{
                            curr ='left';
                        }
                        if((i!=0) && (i!=len-1)){
                            curr+=' bottom';
                        }
                        arr.push(curr);
                    }
                }

                return arr;
            },

            /****
             * 根据id获取节点所在表格的 线条位置 [right,left top,right top,...]
             * @param id
             * @returns {Array}
             */
            findLineClsArray : function(id){
                var node = this.findNode(id);
                var childIds = node.childIds ||[];
                var arr = [];
                var len =childIds.length*2;
                if(len ==2){ //只有一个节点的情况
                    arr.push('right topHeight');
                    arr.push('left topHeight');
                }else{
                    for(var i=0;i<len;i++){
                        var curr = '';
                        if(i%2==0){
                            curr = 'right';
                        }else{
                            curr ='left';
                        }
                        if((i!=0) && (i!=len-1)){
                            curr+=' top';
                        }
                        arr.push(curr);
                    }
                }

                return arr;
            }


        }
    };
    TreeMap =oui.biz.Tool.Class(TreeMap);
    /** TreeMap 静态方法 ****/
    TreeMap.findChildrenIdsByParentIdFromArray = function(arr,parentIdValue,idKey,parentIdKey){
        var ids = [];
        for(var i=0,len=arr.length;i<len;i++){
            var parentId = arr[i][parentIdKey];
            if(parentId == parentIdValue && (arr[i].id != parentId)){
                ids.push(arr[i][idKey]);
            }
        }
        return ids;
    };
    /***
     * new一个treeMap对象
     * @param treeMap
     */
    TreeMap.newTreeMap = function(treeMap){
        var me = this;
        var treeMap = new me(treeMap);
        return treeMap;
    };
    function dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    }
    function exportCanvas(canvas,saveName,callback){
        var blob = dataURLtoBlob(canvas.toDataURL());
        exportFileByUrl(blob,saveName,callback);
    };
    function exportFileByUrl(url,saveName,callback){
        if(typeof url == 'object' && url instanceof Blob)
        {
            if(oui.browser.ie || oui.browser.isEdge){
                window.navigator.msSaveBlob(url, saveName);
                callback&&callback();
                //ie特殊下载处理
                return ;
            }
            url = URL.createObjectURL(url); // 创建blob地址
        }
        var id = oui.getUUIDLong();
        var $lastA = $('a.a-download');
        if($lastA&&$lastA.length){
            $lastA.remove();
        }
        $(document.body).append('<a class="a-download" id="'+id+'"></a>');
        var $a = $('#'+id);
        $a.attr({
            'href':url,
            download:saveName||''
        });
        $a[0].click();
        setTimeout(function () {
            URL.revokeObjectURL(url);
            callback&&callback();
        }, 100);
    }
    /****
     * 导出图片
     * @param url
     * @param saveName
     * @param callback
     */
    TreeMap.exportGraph = function(treeMap,$chartContainer,saveName,callback){
        var style = $chartContainer.attr('style');
        $chartContainer.attr('style','');
        if(!treeMap.direction){
            treeMap.direction ='';
        }
        var flag = treeMap.direction === 'l2r' || treeMap.direction === 'r2l';
        var sourceChart = $chartContainer.children()[0];
        var w =flag ? sourceChart.clientHeight : sourceChart.clientWidth;
        var h =flag ? sourceChart.clientWidth : sourceChart.clientHeight;
        var parentStyle = $chartContainer.parent().attr('style');
        $chartContainer.parent().attr('style','width:'+w+'px;height:'+h+'px');

        var jsArray =[];
        if(oui.browser.isEdge || oui.browser.ie){
            jsArray.push(oui.getContextPath()+'res_common/third/html2canvas/dist/bluebird.js');
        }
        oui.require(jsArray,function(){
            html2canvas(sourceChart, {
                'width': w,
                'height': h,
                'onclone': function(cloneDoc) {
                },
                'onrendered': function(canvas) {
                    $chartContainer.parent().attr('style',parentStyle);
                    exportCanvas(canvas,saveName,callback);
                }
            });
        });

    };
    /****
     * 数组转 treeMap
     * @param arr
     * @param idKey
     * @param parentIdKey
     * @param nameKey
     * @returns {TreeMap}
     */
    TreeMap.array2treeMap=function(arr,idKey,parentIdKey,nameKey,isFlow){

        var  me = this;
        var map = {
        };
        var treeMap = new me({
            direction:'',
            clickName:oui.os.mobile?'tap':'click',
            idKey:idKey||"id",
            parentIdKey:parentIdKey||"parentId",
            nameKey:nameKey||"name",
            ids:[],
            rootIds:[],
            map:map
        });
        for(var i=0,len=arr.length;i<len;i++){
            var id = arr[i][idKey];
            var parentId = arr[i][parentIdKey];
            if((!parentId)||(!parentId.length) ||(id&&(id == parentId)) ){ // is root
                if(treeMap.rootIds.indexOf(id)<0 ){
                    if(!arr[i].prevId){
                        treeMap.rootIds.push(id);
                    }
                }
            }
            var parentIds = [];
            if(typeof parentId =='string'){
                if(parentId){
                    parentIds = parentId.split(',');
                }
            }else if(parentId){

                parentIds = parentId;
            }
            if(parentIds.indexOf(id)>-1){
                parentIds.length=0;
            }
            treeMap.ids.push(id);//存储整个数组顺序
            var joinId = arr[i].joinId||'';
            var childIds = me.findChildrenIdsByParentIdFromArray(arr,id,idKey,parentIdKey);
            var prevId = arr[i].prevId;
            treeMap.map[id] = {
                id:id,
                joinId:joinId,
                prevId:prevId||'',
                parentId: treeMap.rootIds.indexOf(id)>-1?"": parentIds[0]||"",
                parentIds:parentIds, //考虑多父节点的情况,应用于流程图
                childIds:childIds,
                node:arr[i]
            };

        }

        if(isFlow){
            treeMap.isFlow = true;
        }
        return treeMap;
    };

    /***
     * treeMap转数组
     * @param treeMap
     * @param idKey
     * @param parentIdKey
     * @param prevIdKey
     * @returns {Array}
     */
    TreeMap.treeMap2array = function(treeMap,idKey,parentIdKey,prevIdKey){
        var ids = treeMap.ids ||[];
        var map = treeMap.map ||{};
        var arr = [];
        idKey = idKey||'id';
        parentIdKey= parentIdKey||'parentId';
        prevIdKey = prevIdKey||'prevId';
        for(var i= 0,len=ids.length;i<len;i++){
            var treeNode = map[ids[i]];
            if(treeNode){
                var node = treeNode.node ||{};
                node[idKey] = treeNode.id;
                node[parentIdKey] = treeNode.parentId;
                node[prevIdKey] = treeNode.prevId;
                node.joinId = treeNode.joinId ||"";
                arr.push(node);
            }
        }
        return arr;
    };
    /***
     * 获取节点路径
     * @param treeMap
     * @param node
     */
    TreeMap.getNodePath = function(treeMap,treeNode,idKey,parentIdKey){
        var map = treeMap.map ||{};
        idKey = idKey||'id';
        parentIdKey= parentIdKey||'parentId';
        var arr = [];
        var temp = treeNode;
        do{

            if(temp.id=='root' || (treeMap.rootIds&&treeMap.rootIds.indexOf(temp.id)>-1)){
                break;
            }
            arr.push(temp[idKey]);
            var parentTreeNode = map[temp[parentIdKey]];
            if(!parentTreeNode){ //没有父节点了
                break;
            }
            temp = parentTreeNode;
        }while(true);
        return arr.reverse();
    }
})(window);

