#!/usr/bin/python
# -*- coding:utf-8 -*-

import json
import sqlite3

if __name__  == "__main__":
    conn = sqlite3.connect('ppi.db')
    nodes,links= [],[]

    sql = "select * from ppi where source='Cs8g05790.2'" 
    cursor = conn.execute(sql)
    nodes.append({"name":'Cs8g05790.2',"center":'y'})
    for row in cursor:
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

#type通过跨表查询得到
    print nodes
    print links
    res_json = {"nodes":nodes,"links":links}
    res_json = json.JSONEncoder().encode(res_json)    
    print type(res_json)

    with open('ppi.json',"w+") as fp:
        fp.writelines(res_json)

    conn.close()
