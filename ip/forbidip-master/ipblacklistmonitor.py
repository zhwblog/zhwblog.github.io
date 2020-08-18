#!/usr/bin/env python
#coding=utf-8

import os
import sys
#import string
#import types
#import requests
#import traceback
import time
import subprocess
import redis        # pip install redis
import signal
import logging
import socket


# 查询本机ip地址
def get_host_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
    finally:
        s.close()

    return ip

localip = get_host_ip()
if localip == None:
    print "local ip is None"
    exit()
print "local ip is ", localip

# 解析输入参数
if len(sys.argv) < 3:
    print "params error，need redis 'ip' and 'port'"
    print "example:"
    print "\twatchiptable.py 127.0.0.1 6381"
    exit()

redisip = sys.argv[1]
redisport = sys.argv[2]
logpath = sys.argv[3]

# 初始日志模块
#logpath=os.environ['HOME'] + "/ipwatcher/"
logfile="ipwatcher.log"
subprocess.check_output("mkdir -p " + logpath, shell=True)

LOG_FORMAT = "%(asctime)s [%(levelname)s] [%(filename)s:%(lineno)d] %(message)s"
#logging.basicConfig(level=logging.DEBUG, format=LOG_FORMAT, filename=logfile)
logger = logging.getLogger("mylogger")
logger.setLevel(logging.DEBUG)
formater = logging.Formatter(LOG_FORMAT)

# console handler 输出到控制台的handler
cmdhandler = logging.StreamHandler()
cmdhandler.setFormatter(formater)
cmdhandler.setLevel('DEBUG')
logger.addHandler(cmdhandler)

# file handler 输出到文件
fhandler = logging.FileHandler(logpath+"/"+logfile)
fhandler.setFormatter(formater)
fhandler.setLevel('DEBUG')
logger.addHandler(fhandler)
logger.info("初始日志模块成功")




# 绑定信号处理函数
def HandleSigUser(a, b):  
    logger.info("recv signal SIGUSR1")
    exit()

def HandleSigInt(a, b):  
    logger.info('recv signal SIGINT, progress will be shutdown')
    exit()

signal.signal(signal.SIGINT, HandleSigInt)
signal.signal(signal.SIGUSR1, HandleSigUser)
logger.info("绑定信号处理函数成功")


# 初始化redis
#redisip = '127.0.0.1'
#redisport = 6372
try:
    hr = redis.Redis(host=redisip, port=redisport)
    hr.ping()
    logger.info("connect %s:%s ok" % (redisip, redisport))
except redis.exceptions.ConnectionError:
    logger.info("connect %s:%s failed, exit" % (redisip, redisport))
    exit()

#hr.sadd("ipblacklist", "192.168.31.202")
#hr.sadd("ipblacklist", "192.168.31.204")
#hr.sadd("ipblacklist", "192.168.31.205")
#hr.sadd("ipblacklist", "192.168.31.206")
iplist = hr.smembers("ipblacklist")
for ip in iplist:
    print ip

# 心跳
def HeartBeat():
    global tickheart
    nowtime = time.time()
    if nowtime > tickheart + 30:
        tickheart = nowtime
        logger.info("heartbeat tick")

# 禁用IP
def ForbidIp(ip):
    hr.sadd("forbidiplist_"+localip, ip)
    cmd = "firewall-cmd --permanent --add-rich-rule=\"rule family='ipv4' source address='{}' reject\"".format(ip)
    logger.info(cmd)
    subprocess.check_output(cmd, shell=True)
    subprocess.check_output("firewall-cmd --reload", shell=True)

# 解禁IP
def DisforbidIp(ip):
    cmd = "firewall-cmd --permanent --remove-rich-rule=\"rule family='ipv4' source address='{}' reject\"".format(ip)
    logger.info(cmd)
    subprocess.check_output(cmd, shell=True)
    subprocess.check_output("firewall-cmd --reload", shell=True)


# 主循环
tickheart = time.time()
while True:
    time.sleep(1.0)     #单位秒，可使用小数表示毫秒
    ip = hr.spop("ipblacklist_"+localip)
    if ip != None:
        ForbidIp(ip)
    HeartBeat()


