Search.prototype = {
    constructor: SearchBlog,
//    异步获取数据内容后的处理函数调用
    init: function (xml) {
        searchBlogObj.xmlToObjectArray(xml)
        searchBlogObj.formTableSubmit()
    },
//    异步获取整个站点文章
    getXmlHttpResponse: function () {
        var fn = searchBlogObj.init
        $.ajax({
                url: this.url,
                dataType: "xml",
                success: function (xml) {
                    fn(xml)
                }
            }
        )
    },
//    将xml转换为对象的数组
    xmlToObjectArray: function (xml) {
        var json = []
        $(xml).find("*:first").children().each(function (i) {
            var obj = {title: $(this).find("title").text(), content: $(this).find("content").text(), url: $(this).find("url").text(),time:$(this).find("time").text()}
            json.push(obj)
        })
        searchBlogObj.json = json
    },
//    全站搜索
    fullTextSearch: function (keyword) {
        var reg = new RegExp(keyword)
        var regArray = []
        $.each(searchBlogObj.json, function (n, v) {
            if (reg.test(this.title) || reg.test(this.content)) {
                regArray.push(this)
            }
        })
        return regArray
    },
//   搜索成功后重新渲染页面
    review: function (regArray) {
        $.each(regArray,function(){
        })
        html
        $("#show_post").html(html)
    },
//    绑定搜索输入框获取输入框内容
    formTableSubmit: function () {
        var thisObj = this
        $("#search_form").submit(function (e) {
            e.preventDefault();
            var regArray = searchBlogObj.fullTextSearch($("#search_input").val())
            if (regArray.length === 0) {
                alert("没有搜到任何东西")
                return
            }
            thisObj.review(regArray);
        })
    }
}

