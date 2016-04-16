DROP TABLE IF EXISTS `categorytable`;
DROP TABLE IF EXISTS `accounttable`;
DROP TABLE IF EXISTS `setting`;
DROP TABLE IF EXISTS `itemlist`;
DROP TABLE IF EXISTS `billlist`;

CREATE TABLE `categorytable` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `categorygroup` varchar(255) NOT NULL DEFAULT '',
  `categoryname` varchar(255) NOT NULL DEFAULT '',
  `categorytype` varchar(10) NOT NULL DEFAULT '',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `categorytable` VALUES( 1,'食品酒水','早午晚餐','outlay');
INSERT INTO `categorytable` VALUES( 2,'食品酒水','烟酒茶','outlay');
INSERT INTO `categorytable` VALUES( 3,'食品酒水','水果零食','outlay');
INSERT INTO `categorytable` VALUES( 4,'食品酒水','食品原材料','outlay');
INSERT INTO `categorytable` VALUES( 5,'衣服饰品','衣服裤子','outlay');
INSERT INTO `categorytable` VALUES( 6,'衣服饰品','鞋帽包包','outlay');
INSERT INTO `categorytable` VALUES( 7,'衣服饰品','化妆饰品','outlay');
INSERT INTO `categorytable` VALUES( 8,'居家物业','日常用品','outlay');
INSERT INTO `categorytable` VALUES( 9,'居家物业','水电煤气','outlay');
INSERT INTO `categorytable` VALUES( 10,'居家物业','物业管理','outlay');
INSERT INTO `categorytable` VALUES( 11,'居家物业','维修保养','outlay');
INSERT INTO `categorytable` VALUES( 12,'居家物业','厨房用具','outlay');
INSERT INTO `categorytable` VALUES( 13,'行车交通','公共交通','outlay');
INSERT INTO `categorytable` VALUES( 14,'行车交通','打车租车','outlay');
INSERT INTO `categorytable` VALUES( 15,'行车交通','私家车费用','outlay');
INSERT INTO `categorytable` VALUES( 16,'行车交通','停车费','outlay');
INSERT INTO `categorytable` VALUES( 17,'行车交通','汽油费','outlay');
INSERT INTO `categorytable` VALUES( 18,'交流通讯','座机费','outlay');
INSERT INTO `categorytable` VALUES( 19,'交流通讯','手机费','outlay');
INSERT INTO `categorytable` VALUES( 20,'交流通讯','上网费','outlay');
INSERT INTO `categorytable` VALUES( 21,'交流通讯','邮寄费','outlay');
INSERT INTO `categorytable` VALUES( 22,'休闲娱乐','运动健身','outlay');
INSERT INTO `categorytable` VALUES( 23,'休闲娱乐','腐败聚会','outlay');
INSERT INTO `categorytable` VALUES( 24,'休闲娱乐','休闲玩乐','outlay');
INSERT INTO `categorytable` VALUES( 25,'休闲娱乐','宠物宝贝','outlay');
INSERT INTO `categorytable` VALUES( 26,'休闲娱乐','旅游度假','outlay');
INSERT INTO `categorytable` VALUES( 27,'学习进修','书报杂志','outlay');
INSERT INTO `categorytable` VALUES( 28,'学习进修','培训进修','outlay');
INSERT INTO `categorytable` VALUES( 29,'学习进修','数码装备','outlay');
INSERT INTO `categorytable` VALUES( 30,'学习进修','打印复印','outlay');
INSERT INTO `categorytable` VALUES( 31,'人情往来','送礼请客','outlay');
INSERT INTO `categorytable` VALUES( 32,'人情往来','孝敬家长','outlay');
INSERT INTO `categorytable` VALUES( 33,'人情往来','还人钱物','outlay');
INSERT INTO `categorytable` VALUES( 34,'人情往来','慈善捐助','outlay');
INSERT INTO `categorytable` VALUES( 35,'医疗保健','药品费','outlay');
INSERT INTO `categorytable` VALUES( 36,'医疗保健','保健费','outlay');
INSERT INTO `categorytable` VALUES( 37,'医疗保健','美容费','outlay');
INSERT INTO `categorytable` VALUES( 38,'医疗保健','治疗费','outlay');
INSERT INTO `categorytable` VALUES( 39,'金融保险','银行手续','outlay');
INSERT INTO `categorytable` VALUES( 40,'金融保险','投资亏损','outlay');
INSERT INTO `categorytable` VALUES( 41,'金融保险','按揭还款','outlay');
INSERT INTO `categorytable` VALUES( 42,'金融保险','消费税收','outlay');
INSERT INTO `categorytable` VALUES( 43,'金融保险','利息支出','outlay');
INSERT INTO `categorytable` VALUES( 44,'金融保险','赔偿罚款','outlay');
INSERT INTO `categorytable` VALUES( 45,'其他杂项','其他支出','outlay');
INSERT INTO `categorytable` VALUES( 46,'其他杂项','意外丢失','outlay');
INSERT INTO `categorytable` VALUES( 47,'其他杂项','烂账损失','outlay');
INSERT INTO `categorytable` VALUES( 48,'其他杂项','手续费','outlay');
INSERT INTO `categorytable` VALUES( 49,'房租','房租','outlay');
INSERT INTO `categorytable` VALUES( 50,'房租','押金','outlay');
INSERT INTO `categorytable` VALUES( 51,'职业收入','工资收入','income');
INSERT INTO `categorytable` VALUES( 52,'职业收入','加班收入','income');
INSERT INTO `categorytable` VALUES( 53,'职业收入','奖金收入','income');
INSERT INTO `categorytable` VALUES( 54,'职业收入','投资收入','income');
INSERT INTO `categorytable` VALUES( 55,'职业收入','兼职收入','income');
INSERT INTO `categorytable` VALUES( 56,'其他收入','礼金收入','income');
INSERT INTO `categorytable` VALUES( 57,'其他收入','中奖收入','income');
INSERT INTO `categorytable` VALUES( 58,'其他收入','意外来钱','income');
INSERT INTO `categorytable` VALUES( 59,'其他收入','经营所得','income');
INSERT INTO `categorytable` VALUES( 60,'其他收入','优惠返额','income');
INSERT INTO `categorytable` VALUES( 61,'其他收入','利息','income');

CREATE TABLE `accounttable` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `accountgroup` varchar(255) NOT NULL DEFAULT '',
  `accountname` varchar(255) NOT NULL DEFAULT '',
  `balance` float(11,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `accounttable` VALUES( 1  ,'现金账户','现金' ,1000 );
INSERT INTO `accounttable` VALUES( 2  ,'现金账户','彩票基金' ,1000 );
INSERT INTO `accounttable` VALUES( 3  ,'信用卡','信用卡' ,1001 );
INSERT INTO `accounttable` VALUES( 4  ,'金融账户', '中国银行借记卡' , 1002 );
INSERT INTO `accounttable` VALUES( 5  ,'金融账户', 'Kiwi借记卡' ,1003 );
INSERT INTO `accounttable` VALUES( 6  ,'金融账户', 'Kiwi消费卡' , 1004 );
INSERT INTO `accounttable` VALUES( 7  ,'金融账户', 'ASB lin' , 1005 );
INSERT INTO `accounttable` VALUES( 8  ,'金融账户', '绵阳市商业银行' , 1006 );
INSERT INTO `accounttable` VALUES( 9  ,'金融账户', 'Kiwi Notice' , 1007 );
INSERT INTO `accounttable` VALUES( 10 ,'虚拟账户', '支付宝' , 1008 );
INSERT INTO `accounttable` VALUES( 11 ,'虚拟账户', '房租押金' , 1009 );

CREATE TABLE `setting` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `settingkey` varchar(255) NOT NULL DEFAULT '',
  `settingvalue` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `setting` VALUES(1,'outlay_default_category','食品酒水/食品原材料');
INSERT INTO `setting` VALUES(2,'income_default_category','职业收入/工资收入');
INSERT INTO `setting` VALUES(3,'outlay_default_account','金融账户/Kiwi消费卡');
INSERT INTO `setting` VALUES(4,'income_default_account','现金账户/现金');

CREATE TABLE `billlist` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `billname` varchar(255) NOT NULL DEFAULT '',
  `billtime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `accountidout` int(11) DEFAULT NULL,
  `accountidin` int(11) DEFAULT NULL,
  `billamount` float(11,2) NOT NULL DEFAULT '0.00',
  `billtype` varchar(10) NOT NULL DEFAULT '',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `itemlist` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `billid` int(11) NOT NULL DEFAULT '0',
  `categoryid` int(11) NOT NULL DEFAULT '0',
  `itemname` varchar(255) NOT NULL DEFAULT '',
  `amount` float(11,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`Id`),
  CONSTRAINT `withbill` FOREIGN KEY (`billid`) REFERENCES `billlist` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

drop procedure IF EXISTS addOutlayBill;
CREATE PROCEDURE addOutlayBill(in agroup VARCHAR(64),in aname VARCHAR(64),in btime datetime, in mount float(11,2), out billid int)
begin
DECLARE accountid INT DEFAULT 0;
select id into accountid from accounttable where accountgroup = agroup && accountname = aname;
insert into billlist(billname, billtime, accountidout, billamount, billtype) VALUES ('', btime, accountid, mount,'outlay');
SELECT LAST_INSERT_ID() into billid;
select billid;
end;


drop procedure IF EXISTS addIncomeBill;
CREATE PROCEDURE addIncomeBill(in agroup VARCHAR(64),in aname VARCHAR(64),in btime datetime, in mount float(11,2), out billid int)
begin
DECLARE accountid INT DEFAULT 0;
select id into accountid from accounttable where accountgroup = agroup && accountname = aname;
insert into billlist(billname, billtime, accountidin, billamount, billtype) VALUES ('', btime, accountid, mount,'income');
SELECT LAST_INSERT_ID() into billid;
select billid;
end;


drop procedure IF EXISTS addTransferBill;
CREATE PROCEDURE addTransferBill(in aoutgroup VARCHAR(64),in aoutname VARCHAR(64),in aingroup VARCHAR(64),in ainname VARCHAR(64),in btime datetime, in mount float(11,2), out billid int)
begin
DECLARE accountoutid, accountinid INT DEFAULT 0;
select id into accountoutid from accounttable where accountgroup = aoutgroup && accountname = aoutname;
select id into accountinid from accounttable where accountgroup = aingroup && accountname = ainname;
insert into billlist(billname, billtime, accountidout, accountidin, billamount, billtype) VALUES ('', btime, accountoutid, accountinid, mount,'transfer');
SELECT LAST_INSERT_ID() into billid;
select billid;
end;


