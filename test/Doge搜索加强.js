/ ==UserScript==
// @name         Doge 搜索加强
// @namespace    http://none/
// @version      0.1
// @description  为 Doge 搜索添加 Bing 按钮
// @author       icedragon
// @match        https://www.dogedoge.com/results?q=*
// @icon         https://www.dogedoge.com/assets/doge_ico.png
// ==/UserScript==

(function () {
	'use strict';

	const divParent = document.querySelector('.js-feedback-btn-wrap');
	const newDiv = document.createElement('div');
	newDiv.innerHTML = '<div class="btn feedback-btn">\n<a target="_blank" class="feedback-btn__send js-feedback-start" id="bingSearch">Bing 搜索</a>\n</div>'
	divParent.appendChild(newDiv);
	const aBing = document.getElementById('bingSearch'),
		divInput = document.getElementById('search_form_input'),
		searchText = divInput.value;
	aBing.href = 'https://cn.bing.com/search?q=' + searchText;
})();
