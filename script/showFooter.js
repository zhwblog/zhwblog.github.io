var version = "1.0.4"
var years = "2020"
var date = "Jul 16th,2020"
document.write('<p style="font-family:Consolas;color:white;">Kevinblog ' + version + ' | Designed by (©) ' + years + ' kevin | 更新于 ' + date + ' | <a href="malito:kevinzhw153@126.com" style="color:white;">联系我们</a>（kevinzhw153@126.com）' + ' | <a href="https://kevinzhw153.github.io/new.txt" style="color:white;">更新记录</a></p>')
window.onload = function() {
				var bigImg = document.createElement("img"); //创建一个img元素

				bigImg.src = "https://github.com/kevinzhw153/kevinzhw153.github.io/blob/master/img/1.jpg"; //给img元素的src属性赋值
				//bigImg.width="120";  //320个像素 不用加px
				var myp = document.getElementById('myp'); //获得dom对象
				myp.appendChild(bigImg); //为dom添加子元素img
};
