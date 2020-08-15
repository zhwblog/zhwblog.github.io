<%
dim onlineip
onlineip=Request.ServerVariables("HTTP_X_FORWARDED_FOR") '获取代理baiIP
if onlineip="" then onlineip=Request.ServerVariables("REMOTE_ADDR") '如果未使用代理IP，则du获取客户端IP
if Instr(onlineip, "202.118")=1 then
Response.Write "欢迎光临zhi！"
else
Response.Write "非法用dao户！"
end if
%>
