import os.path
import sqlite3
import json
from lxml import etree

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
import tornado.httpclient

def _execute(query):
    dbPath='misc/utils/ppi.db'
    connection = sqlite3.connect(dbPath)
    cursorobj = connection.cursor()
    try:
        cursorobj.execute(query)
        result = cursorobj.fetchall()
        connection.commit()
    except Exception:
        raise
    connection.close()
    return result

from tornado.options import define,options
define("port",default=8000,help="run on the given port",type=int)

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('index.html')
    def write_error(self,status_code,**kwargs):
        self.write("Gosh darnit,usre! You caused a %d error." % status_code)

class AboutHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('about.html')

class GeneInfoHandler(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    def get(self):    
        gene = self.get_argument('gene',None)        
        if not gene:
            self.render("search.html")
        else:            
            client = tornado.httpclient.AsyncHTTPClient()
            client.fetch("http://citrus.hzau.edu.cn/cgi-bin/orange/gene/"+gene,callback=self.on_response)

#    def post(self):
#        gene = self.get_argument('gene',None)
#        print gene
#        client = tornado.httpclient.AsyncHTTPClient()
#        client.fetch("http://citrus.hzau.edu.cn/cgi-bin/orange/gene/"+gene,callback=self.on_response)


    def on_response(self,response):
        gene_info = {}
        tree = etree.HTML(response.body)
        for i in range(1,5):
            if 1==i:
                name_info = [] 
                for j in range(1,4):
                    name_xpath = "//div[@class='gene'][1]/table/tbody/tr["+ str(j) +"]/td[@class='second']" 
                    r = tree.xpath(name_xpath)
                    name_info.append(r[0].text) 
                gene_info['name'] = name_info
            if 2 == i:
                homolog_info = []
                for j in range(1,4):
                    nomolog_xpath = "//div[@class='gene'][2]/table/tbody/tr["+ str(j) +"]/td[@class='second']/node()" 
                    r = tree.xpath(nomolog_xpath)
                    second = ''
                    for k  in range(len(r)):
                        if not isinstance(r[k],etree._Element):
                            second += r[k]
                        else:
                            second += etree.tostring(r[k],pretty_print=True)
                    if 2==j:
                        t = etree.HTML(second)
                        r = t.xpath("//div[@class='trans']/a/text()")
                        second = []
                        for protein in r:
                            second.append("<a href='/gene?gene="+protein+"'>"+protein+"</a><br/>")
                        second = ''.join(second)
                    homolog_info.append(second)
                gene_info['homolog'] = homolog_info
            if 3==i:
                ontology_info = []
                ontology_xpath = "//div[@class='gene'][3]/table[@class='iprlist']//table[@class='linetable']"
                r = tree.xpath(ontology_xpath)
                for j in range(len(r)):
                    if isinstance(r[j],etree._Element):
                        ontology_info.append(etree.tostring(r[j]))
                gene_info['ontology'] = ontology_info
            '''if 4 == i:
                domain_info  = []
                domain_xpath = "//div[@id='content']/div[@class='gene'][4]/table[@class='iprlist']//table[@class='linetable']"
                r = tree.xpath(domain_xpath)
                for j in range(len(r)):
                    pass'''
        self.render('gene.html',gene=gene_info)
#        self.finish()

class GenerateJsonHandler(tornado.web.RequestHandler):
    def get(self):    
        nodes,links = [],[]
        protein = self.get_argument('protein',None)        
        name = protein
        name = name[::-1][name[::-1].index('.')+1:][::-1]
        if not protein:
            self.write('Sorry,the argument is null!!!')
            return         
        sql = "select * from exp where gene = '"+ name +"'" 
        print sql
        rows = _execute(sql)
        exp =  {
            "callus":rows[0][1],
            "flower":rows[0][2],
            "leaf":rows[0][3],
            "fruit":rows[0][4],
            "mixture1":rows[0][5],
            "mixture2":rows[0][6],
            "mixture3":rows[0][7]
        }
        sql = "select * from summ where gene = '"+ protein +"'"
        rows = _execute(sql)
        summ = {
            "bin":rows[0][1],
            "mapman":rows[0][2],
            "annotation":rows[0][3],
            "protype":rows[0][4]
        }  
        nodes.append({"name":protein,"center":"y","exp":exp,"summ":summ})
        sql = "select * from ppi where source='"+protein+"'"      
        print sql
        rows = _execute(sql)
        if not rows:
            #404Page the json is null and process logcal in the page
            self.write('Sorry,the protein is not here!!!')
            return 
        for row in rows:
            node_tmp = {}
            link_tmp = {}
            summ_tmp = {}
            exp_tmp = {}
            node_tmp['name'],name = row[2],row[2]
            node_tmp['center'] = 'n'        
            name = name[::-1][name[::-1].index('.')+1:][::-1]
            sql = "select * from exp where gene = '"+ name +"'"            
            rows = _execute(sql)
            if not rows:
                #TODO fix it 
                self.write('Sorry,the protein exp is not here!!!')
                return 
            exp_tmp =  {
                "callus":rows[0][1],
                "flower":rows[0][2],
                "leaf":rows[0][3],
                "fruit":rows[0][4],
                "mixture1":rows[0][5],
                "mixture2":rows[0][6],
                "mixture3":rows[0][7]
            }
            node_tmp['exp'] = exp_tmp
            sql = "select * from summ where gene = '"+ node_tmp['name']  +"'"
            rows = _execute(sql)
            summ_tmp = {
                "bin":rows[0][1],
                "mapman":rows[0][2],
                "annotation":rows[0][3],
                "protype":rows[0][4]
            }  
            node_tmp['summ'] = summ_tmp
            
            nodes.append(node_tmp)
            link_tmp['source'] = row[1]
            link_tmp['target'] = row[2]
            link_tmp['score1'] = row[3]
            link_tmp['score2'] = row[4]
            links.append(link_tmp)
                  
        res_json = {"nodes":nodes,"links":links}
        res_json = json.JSONEncoder().encode(res_json)  
        self.set_header("Content-Type", 'application/json; charset="utf-8"') 
        self.write(res_json)

if __name__ == "__main__":
    tornado.options.parse_command_line()
    app = tornado.web.Application(
        handlers=[
            (r'/',IndexHandler),
            (r'/json',GenerateJsonHandler),
            (r'/gene',GeneInfoHandler),
            (r'/about',AboutHandler)
        ],
        template_path=os.path.join(os.path.dirname(__file__),'templates'),
        static_path = os.path.join(os.path.dirname(__file__),'static'),
        debug=True
    ) 
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
