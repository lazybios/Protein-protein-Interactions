import os.path
import sqlite3
import json

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web

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

class GenerateJsonHandler(tornado.web.RequestHandler):
    def post(self):    
        nodes,links = [],[]
        protein = self.get_argument('protein',None)        
        if not protein:
            self.write('Sorry,the argument is null!!!')
            return 
        nodes.append({"name":'Cs8g05790.2',"center":'y'})
        sql = "select * from ppi where source='"+protein+"'"       
        rows = _execute(sql)
        if not rows:
            #404Page the json is null and process logcal in the pagg
            self.write('Sorry,the protein is not here!!!')
            return 
        for row in rows:
            node_tmp = {}
            link_tmp = {}
            node_tmp['name'] = row[2] 
            node_tmp['center'] = 'n'        
            nodes.append(node_tmp)
            link_tmp['source'] = row[1]
            link_tmp['target'] = row[2]
            link_tmp['score1'] = row[3]
            link_tmp['score2'] = row[4]
            links.append(link_tmp)
                  
        res_json = {"nodes":nodes,"links":links}
        res_json = json.JSONEncoder().encode(res_json)  
        
        self.write(res_json)

if __name__ == "__main__":
    tornado.options.parse_command_line()
    app = tornado.web.Application(
        handlers=[
            (r'/',IndexHandler),
            (r'/json',GenerateJsonHandler)
        ],
        template_path=os.path.join(os.path.dirname(__file__),'templates'),
        static_path = os.path.join(os.path.dirname(__file__),'static'),
        debug=True
    ) 
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()

