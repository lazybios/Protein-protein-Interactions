CREATE TABLE ppi(
	ppiid INTEGER PRIMARY KEY AUTOINCREMENT,
	source text not null,
	target text not null,
	score1 REAL,
	score2 REAL,	
);

#colorpro  soft coding in the js

INSERT INTO ppi(source,target,score1,score2) VALUES ('Cs4g18200.1','Cs4g11150.3',0.185604063988537,0);


#########################
CREATE TABLE exp(
	gene text PRIMARY KEY,
	calus REAL,
	flower REAL,
	leaf REAL,
	fruit REAL,
	mixture1 REAL,
	mixture2 REAL,
	mixture3 REAL
);

INSERT INTO exp VALUES ('Cs1g01010',18.35,31.0807,28.0716,22.0292,22.8775,16.5435,21.5009);

DELETE FROM exp WHERE gene='Cs1g01010';

##########################
CREATE TABLE summ(
	gene text PRIMARY KEY,
	bin text,
	mapman text,
	annotation text,
	colorpro text
);

INSERT INTO summ VALUES ('orange1.1t06073.1','27.3.11','protein.postranslational modification','');

DELETE FROM summ WHERE gene='Cs4g01010.1';

ALTER TABLE summ ADD colorpro text;

UPDATE summ SET annotation = '13307145776 ' WHERE gene = 'Cs4g01010.1';
UPDATE summ SET colorpro = '13307145776 ' WHERE gene = 'Cs4g01010.1';

##########################
#ERROR COMMAND ESCAPE PROBLEM
INSERT INTO summ VALUES ("Cs1g17740.1","11.8.10","lipid metabolism.'exotics' (steroids, squalene etc).phosphatidylcholinesterol O-acyltransferase","");