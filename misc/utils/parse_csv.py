#!/usr/bin/python
# -*- coding:utf-8 -*-

import csv
import sqlite3

if __name__ == "__main__":
    conn = sqlite3.connect('ppi.db')
#    with open('csi_ppi.csv','rb') as f: 
#    with open('csi_exp.csv','rb') as f:
    with open('csi_mapman.csv','rb') as f:
        reader = csv.reader(f,delimiter=',')
        for row in reader:
            if reader.line_num == 1:
                print row
                continue
            print row
            sql = "UPDATE summ SET colorpro = '"+row[2]+"' WHERE gene = '"+row[1]+"';"
            print sql
            cursor = conn.execute(sql)
            conn.commit()

    conn.close()
    print "csi_mapman.csv Insert data compelte :) !!!"

#parse csi_ppi.csv            
#            if not row[3]:
#                score1 = '0'
#            else:
#                score1 = str(row[3])
#                
#            if not row[4]:
#                score2 = '0'
#            else:
#                score2 = str(row[4])
#            sql = "INSERT INTO ppi(source,target,score1,score2) VALUES ('"+row[1] +"','"+row[2]+"',"+score1+","+score2+");"            


#parse csi_exp.csv
#            sql = "INSERT INTO exp VALUES ('"+row[0]+"',"+row[1]+","+row[2]+","+row[3]+","+row[4]+","+row[5]+","+row[6]+","+row[7]+");"       
#            print sql
#            conn.execute(sql)
#            conn.commit()

#parse csi_mapman.csv and csi_information.csv
#            sql = 'INSERT INTO summ VALUES ("'+row[1]+'","'+row[3]+'","'+row[4]+'","");'
#            print sql
#            conn.execute(sql)
#            conn.commit()
#
#    sql = "select * from summ where gene = 'orange1.1t06073.1';"
#    cursor = conn.execute(sql)
#    if cursor.fetchall():
#        with open('csi_information.csv','rb') as f:
#            reader = csv.reader(f,delimiter=',')
#            for row in reader:
#                if reader.line_num == 1:
#                    print row
#                    continue
#                print row
#                sql = "select * from summ where gene = '"+ row[1] +"';"
#                cursor = conn.execute(sql)
#                if cursor.fetchall():
#                    sql = 'update summ set annotation = "'+ row[2] +'" WHERE gene = "'+row[1]+'";'
#                    print sql
#                    cursor = conn.execute(sql)
#                    conn.commit()
#                    
#        conn.close()
#        print "csi_mapman.csv and csi_mapman.csv Insert data complete :) !!!"
#    else:
#        conn.close()
#        print "csi_mapman.csv Insert data error :( !!!"
    
    
