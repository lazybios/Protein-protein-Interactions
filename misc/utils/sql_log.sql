CREATE TABLE ppi(
	ppiid INTEGER PRIMARY KEY AUTOINCREMENT,
	source text not null,
	target text not null,
	score1 REAL,
	score2 REAL
);

INSERT INTO ppi(source,target,score1,score2) VALUES ('Cs4g18200.1','Cs4g11150.3',0.185604063988537,0);
INSERT INTO ppi(source,target,score1,score2) VALUES ('Cs8g05790.2','Cs4g05680.2',0,2.28571428571428);