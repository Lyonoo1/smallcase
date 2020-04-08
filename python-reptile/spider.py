from urllib import request
import re

class Spider():
    url = 'https://egame.qq.com/livelist?layoutid=lol'
    root_pattern = '<div class="info-anchor" data-v-4b9d5c88>([\s\S]*?)</div>' # \s 空白字符 \S非空白字符 ?非贪婪     
    name_pattern = '<p class="name" data-v-4b9d5c88>([\s\S]*?)</p>' 
    number_pattern = '=" data-v-4b9d5c88>([\s\S]*?)</span>'
    def __fetch_content(self): #私有方法（函数）
        r = request.urlopen(Spider.url)
        #bytes
        htmls = r.read()
        htmls = str(htmls,encoding='utf-8')
        return htmls

    #分析html数据结构
    def __analysis(self,htmls):
        root_html = re.findall(Spider.root_pattern,htmls)
        anchors = []
        for html in root_html:
            name = re.findall(Spider.name_pattern,html)
            number = re.findall(Spider.number_pattern,html)
            anchor = {'name':name,'number':number}
            anchors.append(anchor)
        return anchors
    #精炼环节
    def __refine(self,anchor):
        l = lambda anchors:{
            'name':anchors['name'][0],
            'number':anchors['number'][0].strip()}#strip去除空格
        return map(l,anchor)
    #比较排序
    def __sort(self,finallanchors):
        sortAnchors = sorted(finallanchors,key=self.__sort_seed,reverse=True)
        return sortAnchors
    #提取人数转化成数字类型
    def __sort_seed(self,x):
        r = re.findall('\d*',x['number'])
        number = float(r[0])
        if '万' in x['number']:
            number *= 10000
        return number

    #打印展示
    def __show(self,sortAnchors):
        for hot in range(0,len(sortAnchors)):
            print('热度  第'+ str(hot+1) 
            +':'+  sortAnchors[hot]['name']
            + '   '+ sortAnchors[hot]['number'] )
               
        
    def go(self):#公开方法
        htmls = self.__fetch_content()#将放法__fetch_content()返回的值赋值给htmls
        anchor = self.__analysis(htmls)#将方法__analysis()返回的值赋值给anchor
        finallanchors = list(self.__refine(anchor))#因为map是对象要转换成list列表
        sortAnchors = self.__sort(finallanchors)
        self.__show(sortAnchors)
spider = Spider() #实例化
spider.go()

