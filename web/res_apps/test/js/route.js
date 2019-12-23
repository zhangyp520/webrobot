

var config = {
    routerViewId: 'routerView', // 路由切换的挂载点 id
    stackPages: true, // 多级页面缓存
    animationName: "fade", // 切换页面时的动画
    //routes:[
    //    {
    //        path: "/home",
    //        name: "home",
    //        callback: function(route) {
    //            console.log('home:', route)
    //            var str = "<div><a class='back' onclick='window.history.go(-1)'>返回</a></div> <h2>首页</h2> <input type='text'> <div><a href='javascript:void(0);' onclick='linkTo(\"#/list\")'>列表</a></div><div class='height'>内容占位</div>"
    //            document.querySelector("#home").innerHTML = str
    //        }
    //    }
    //]
    //routes: [{
    //    path: "/home",
    //    name: "home",
    //    callback: function(route) {
    //        console.log('home:', route)
    //        var str = "<div><a class='back' onclick='window.history.go(-1)'>返回</a></div> <h2>首页</h2> <input type='text'> <div><a href='javascript:void(0);' onclick='linkTo(\"#/list\")'>列表</a></div><div class='height'>内容占位</div>"
    //        document.querySelector("#home").innerHTML = str
    //    }
    //}, {
    //    path: "/list",
    //    name: "list",
    //    callback: function(route) {
    //        console.log('list:', route)
    //        var str = "<div><a class='back' onclick='window.history.go(-1)'>返回</a></div> <h2>列表</h2> <input type='text'> <div><a href='javascript:void(0);' onclick='linkTo(\"#/detail\")'>详情</a></div>"
    //        document.querySelector("#list").innerHTML = str
    //    }
    //}, {
    //    path: "/detail",
    //    name: "detail",
    //    callback: function(route) {
    //        console.log('detail:', route)
    //        var str = "<div><a class='back' onclick='window.history.go(-1)'>返回</a></div> <h2>详情</h2> <input type='text'> <div><a href='javascript:void(0);' onclick='linkTo(\"#/detail2\")'>详情 2</a></div><div class='height'>内容占位</div>"
    //        document.querySelector("#detail").innerHTML = str
    //    }
    //}, {
    //    path: "/detail2",
    //    name: "detail2",
    //    callback: function(route) {
    //        console.log('detail2:', route)
    //        var str = "<div><a class='back' onclick='window.history.go(-1)'>返回</a></div> <h2>详情 2</h2> <input type='text'> <div><a href='javascript:void(0);' onclick='linkTo(\"#/home\")'>首页</a></div>"
    //        document.querySelector("#detail2").innerHTML = str
    //    }
    //}]
}

//初始化路由
//router.init(config)