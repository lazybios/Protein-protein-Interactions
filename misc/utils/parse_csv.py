#!/usr/bin/python
# -*- coding:utf-8 -*-

import csv
import sqlite3

if __name__ == "__main__":
    conn = sqlite3.connect('ppi.db')
    with open('csi_ppi.csv','rb') as f:
        reader = csv.reader(f,delimiter=',')
        for row in reader:
            if reader.line_num == 1:
                print row
                continue
            if not row[3]:
                score1 = '0'
            else:
                score1 = str(row[3])
                
            if not row[4]:
                score2 = '0'
            else:
                score2 = str(row[4])

            sql = "INSERT INTO ppi(source,target,score1,score2) VALUES ('"+row[1] +"','"+row[2]+"',"+score1+","+score2+");"            
            print sql
            conn.execute(sql)
            conn.commit()
    conn.close()
    print "Insert data complete!!!"
