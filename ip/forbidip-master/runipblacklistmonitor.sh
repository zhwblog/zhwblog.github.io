#!/bin/bash

monitor="ipblacklistmonitor.py"
NUM=`ps aux | grep python | grep $monitor | grep -v grep | wc -l`
if [ "${NUM}" -gt "0" ]
then
    echo "==========================================="
    echo "ERROR: monitor is running already"
    echo "监控进程==> "`ps aux | grep python | grep $monitor | grep -v grep`
    echo "==========================================="
    exit
fi


ip=$1
port=$2
if [ -z $ip ]  #如果参数是空
then
    echo "ERROR: monitor is need redis 'ip' and 'port'"
    exit
fi
if [ -z $port ]  #如果参数是空
then
    echo "ERROR: monitor is need redis 'ip' and 'port'"
    exit
fi

#echo "启动监听脚本完成 " $ip $port
#mkdir -p /var/log/ipwatcher/
curdir=`pwd`
logpath=$curdir"/ipwatcher/"
mkdir -p $logpath
nohup ./$monitor $ip $port $logpath > $logpath"/out.log" 2>&1 &
sleep 0.2
while read line
do 
    echo "${line}"
done < $logpath"/out.log"

appname=`ps aux | grep python | grep $monitor | grep -v grep`
if [[ "$appname" == "" ]]; then
    echo "启动监控进程失败"
else
    echo "监控进程成功==>" $appname
fi


