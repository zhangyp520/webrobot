NProgress.start();
document.onreadystatechange = function () {
    if (document.readyState === "interactive") {
        NProgress.set(0.5);
    } else if(document.readyState === "complete") {
        NProgress.done();
    }
};