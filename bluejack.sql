CREATE DATABASE  IF NOT EXISTS `backdoor` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `backdoor`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: backdoor
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `achievments`
--

DROP TABLE IF EXISTS `achievments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `achievments` (
  `Achievmentsid` int unsigned NOT NULL AUTO_INCREMENT,
  `Title` varchar(500) DEFAULT NULL,
  `LinkURL` varchar(500) DEFAULT NULL,
  `AchivementDate` date DEFAULT NULL,
  `UserLoginid` int DEFAULT NULL,
  `ExternalLinkid` int unsigned DEFAULT NULL,
  PRIMARY KEY (`Achievmentsid`),
  KEY `ExternalLinkid` (`ExternalLinkid`),
  CONSTRAINT `achievments_ibfk_1` FOREIGN KEY (`ExternalLinkid`) REFERENCES `userlogin` (`UserLoginid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `achievments`
--

LOCK TABLES `achievments` WRITE;
/*!40000 ALTER TABLE `achievments` DISABLE KEYS */;
/*!40000 ALTER TABLE `achievments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `userProfileid` int unsigned NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `post_id` (`post_id`),
  KEY `userProfileid` (`userProfileid`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`userProfileid`) REFERENCES `userprofile` (`userProfileid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ctfcategory`
--

DROP TABLE IF EXISTS `ctfcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ctfcategory` (
  `CTFCategoryId` int unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Description` text,
  `UserLoginid` int DEFAULT NULL,
  PRIMARY KEY (`CTFCategoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ctfcategory`
--

LOCK TABLES `ctfcategory` WRITE;
/*!40000 ALTER TABLE `ctfcategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `ctfcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ctfteam`
--

DROP TABLE IF EXISTS `ctfteam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ctfteam` (
  `CTFTeamid` int unsigned NOT NULL AUTO_INCREMENT,
  `TeamName` varchar(255) NOT NULL,
  `TeamOwnerId` int unsigned DEFAULT NULL,
  `Description` text,
  `createdOn` date DEFAULT NULL,
  `createdById` int unsigned DEFAULT NULL,
  `LastUpdatedOn` date DEFAULT NULL,
  `LastUpdatedById` int unsigned DEFAULT NULL,
  `UserCategoryId` int unsigned DEFAULT NULL,
  `TeamStatus` varchar(255) NOT NULL,
  PRIMARY KEY (`CTFTeamid`),
  KEY `UserCategoryId` (`UserCategoryId`),
  KEY `TeamOwnerId` (`TeamOwnerId`),
  KEY `createdById` (`createdById`),
  KEY `LastUpdatedById` (`LastUpdatedById`),
  CONSTRAINT `ctfteam_ibfk_1` FOREIGN KEY (`UserCategoryId`) REFERENCES `usercategory` (`UserCategoryId`),
  CONSTRAINT `ctfteam_ibfk_2` FOREIGN KEY (`TeamOwnerId`) REFERENCES `usercategory` (`UserCategoryId`),
  CONSTRAINT `ctfteam_ibfk_3` FOREIGN KEY (`createdById`) REFERENCES `usercategory` (`UserCategoryId`),
  CONSTRAINT `ctfteam_ibfk_4` FOREIGN KEY (`LastUpdatedById`) REFERENCES `usercategory` (`UserCategoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ctfteam`
--

LOCK TABLES `ctfteam` WRITE;
/*!40000 ALTER TABLE `ctfteam` DISABLE KEYS */;
/*!40000 ALTER TABLE `ctfteam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `externallinks`
--

DROP TABLE IF EXISTS `externallinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `externallinks` (
  `ExternalLinkid` int unsigned NOT NULL AUTO_INCREMENT,
  `LinkURL` varchar(500) DEFAULT NULL,
  `UserLoginid` int DEFAULT NULL,
  `UserWriteUpid` int NOT NULL,
  PRIMARY KEY (`UserWriteUpid`),
  KEY `ExternalLinkid` (`ExternalLinkid`),
  CONSTRAINT `externallinks_ibfk_1` FOREIGN KEY (`ExternalLinkid`) REFERENCES `userlogin` (`UserLoginid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `externallinks`
--

LOCK TABLES `externallinks` WRITE;
/*!40000 ALTER TABLE `externallinks` DISABLE KEYS */;
/*!40000 ALTER TABLE `externallinks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `userProfileid` int unsigned NOT NULL,
  `type` enum('like','dislike') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`like_id`),
  KEY `post_id` (`post_id`),
  KEY `userProfileid` (`userProfileid`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`userProfileid`) REFERENCES `userprofile` (`userProfileid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `userProfileid` int unsigned NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `likes` int DEFAULT '0',
  `dislikes` int DEFAULT '0',
  PRIMARY KEY (`post_id`),
  KEY `userProfileid` (`userProfileid`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userProfileid`) REFERENCES `userprofile` (`userProfileid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usercategory`
--

DROP TABLE IF EXISTS `usercategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usercategory` (
  `UserCategoryId` int unsigned NOT NULL AUTO_INCREMENT,
  `UserLoginid` int DEFAULT NULL,
  `CTFCategoryId` int DEFAULT NULL,
  PRIMARY KEY (`UserCategoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usercategory`
--

LOCK TABLES `usercategory` WRITE;
/*!40000 ALTER TABLE `usercategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `usercategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userfavorites`
--

DROP TABLE IF EXISTS `userfavorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userfavorites` (
  `FavoriteId` int unsigned NOT NULL AUTO_INCREMENT,
  `UserLoginid` int unsigned NOT NULL,
  `UserWriteUpid` int unsigned NOT NULL,
  PRIMARY KEY (`FavoriteId`),
  KEY `UserLoginid` (`UserLoginid`),
  KEY `UserWriteUpid` (`UserWriteUpid`),
  CONSTRAINT `userfavorites_ibfk_1` FOREIGN KEY (`UserLoginid`) REFERENCES `userlogin` (`UserLoginid`) ON DELETE CASCADE,
  CONSTRAINT `userfavorites_ibfk_2` FOREIGN KEY (`UserWriteUpid`) REFERENCES `userwriteups` (`UserWriteUpid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userfavorites`
--

LOCK TABLES `userfavorites` WRITE;
/*!40000 ALTER TABLE `userfavorites` DISABLE KEYS */;
INSERT INTO `userfavorites` VALUES (14,4,7),(15,4,4);
/*!40000 ALTER TABLE `userfavorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userlogin`
--

DROP TABLE IF EXISTS `userlogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userlogin` (
  `UserLoginid` int unsigned NOT NULL AUTO_INCREMENT,
  `Username` varchar(80) NOT NULL,
  `userpassword` varchar(255) NOT NULL,
  `HintQuestion` varchar(255) NOT NULL,
  `HintAnswer` varchar(255) NOT NULL,
  `Status` varchar(50) NOT NULL,
  PRIMARY KEY (`UserLoginid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userlogin`
--

LOCK TABLES `userlogin` WRITE;
/*!40000 ALTER TABLE `userlogin` DISABLE KEYS */;
INSERT INTO `userlogin` VALUES (1,'Atharva','Testing','','',''),(2,'johndoe@gmail.com','success','1','Red','Active'),(3,'johndoe@gmail.com','success','1','Red','Active'),(4,'jsmith@gmail.com','test','4','Atlanta','Active');
/*!40000 ALTER TABLE `userlogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userprofile`
--

DROP TABLE IF EXISTS `userprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userprofile` (
  `userProfileid` int unsigned NOT NULL AUTO_INCREMENT,
  `userid` int DEFAULT NULL,
  `firstname` varchar(80) NOT NULL,
  `middlename` varchar(80) DEFAULT NULL,
  `lastname` varchar(80) NOT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `PrimaryEmail` varchar(80) NOT NULL,
  `SecondaryEmail` varchar(80) DEFAULT NULL,
  `userjoindate` datetime DEFAULT NULL,
  `ProfilePicture` blob,
  `Bio` text,
  `UserLoginid` int unsigned DEFAULT NULL,
  `team` enum('Red','Blue','Purple') DEFAULT 'Red',
  PRIMARY KEY (`userProfileid`),
  KEY `UserLoginid` (`UserLoginid`),
  CONSTRAINT `userprofile_ibfk_1` FOREIGN KEY (`UserLoginid`) REFERENCES `userlogin` (`UserLoginid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userprofile`
--

LOCK TABLES `userprofile` WRITE;
/*!40000 ALTER TABLE `userprofile` DISABLE KEYS */;
INSERT INTO `userprofile` VALUES (1,NULL,'John',NULL,'Doe',NULL,'2025-01-09','johndoe@gmail.com',NULL,NULL,NULL,NULL,3,'Red'),(2,NULL,'Jack',NULL,'Smith','Male','2025-01-17','jsmith@gmail.com','jsmith@outlook.com',NULL,NULL,'Passionate Penetration Tester',4,'Red');
/*!40000 ALTER TABLE `userprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userprojects`
--

DROP TABLE IF EXISTS `userprojects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userprojects` (
  `Projectid` int unsigned NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) NOT NULL,
  `Description` text,
  `UserLoginid` int unsigned DEFAULT NULL,
  `Tags` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Projectid`),
  KEY `UserLoginid` (`UserLoginid`),
  CONSTRAINT `userprojects_ibfk_1` FOREIGN KEY (`UserLoginid`) REFERENCES `userlogin` (`UserLoginid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userprojects`
--

LOCK TABLES `userprojects` WRITE;
/*!40000 ALTER TABLE `userprojects` DISABLE KEYS */;
INSERT INTO `userprojects` VALUES (1,'Project Honeypot','Created a honeypot using python',4,'Python, Linux, Hacking'),(2,'Owasp Top 10','Created CTF\'s of all OWASP top 10',4,'Owasp, CTF, Hacking, HTML');
/*!40000 ALTER TABLE `userprojects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userwriteups`
--

DROP TABLE IF EXISTS `userwriteups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userwriteups` (
  `UserWriteUpid` int unsigned NOT NULL AUTO_INCREMENT,
  `Image` blob,
  `Title` text,
  `Date` date DEFAULT NULL,
  `UserLoginid` int unsigned DEFAULT NULL,
  `Category` enum('THM','HTB') NOT NULL,
  `Content` text NOT NULL,
  `Upvotes` int unsigned NOT NULL DEFAULT '0',
  `Downvotes` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`UserWriteUpid`),
  KEY `UserLoginid` (`UserLoginid`),
  CONSTRAINT `userwriteups_ibfk_1` FOREIGN KEY (`UserLoginid`) REFERENCES `userlogin` (`UserLoginid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userwriteups`
--

LOCK TABLES `userwriteups` WRITE;
/*!40000 ALTER TABLE `userwriteups` DISABLE KEYS */;
INSERT INTO `userwriteups` VALUES (1,NULL,'csa','2025-01-31',4,'HTB','csa',0,0),(2,NULL,'Test Writeup','2025-01-31',4,'HTB','The song came from the bathroom belting over the sound of the shower\'s running water. It was the same way each day began since he could remember. It listened intently and concluded that the singing today was as terrible as it had ever been.\nThe trees, therefore, must be such old and primitive techniques that they thought nothing of them, deeming them so inconsequential that even savages like us would know of them and not be suspicious. At that, they probably didn\'t have too much time after they detected us orbiting and intending to land. And if that were true, there could be only one place where their civilization was hidden.\nSamantha wanted to be famous. The problem was that she had never considered all the downsides to actually being famous. Had she taken the time to objectively consider these downsides, she would have never agreed to publically sing that first song.\nIt seemed like it should have been so simple. There was nothing inherently difficult with getting the project done. It was simple and straightforward enough that even a child should have been able to complete it on time, but that wasn\'t the case. The deadline had arrived and the project remained unfinished.\nHe watched as the young man tried to impress everyone in the room with his intelligence. There was no doubt that he was smart. The fact that he was more intelligent than anyone else in the room could have been easily deduced, but nobody was really paying any attention due to the fact that it was also obvious that the young man only cared about his intelligence.',0,0),(3,NULL,'Test 2','2025-01-31',4,'THM','At that moment he had a thought that he\'d never imagine he\'d consider. \"I could just cheat,\" he thought, \"and that would solve the problem.\" He tried to move on from the thought but it was persistent. It didn\'t want to go away and, if he was honest with himself, he didn\'t want it to.\n\"Can I get you anything else?\" David asked. It was a question he asked a hundred times a day and he always received the same answer. It had become such an ingrained part of his daily routine that he had to step back and actively think when he heard the little girl\'s reply. Nobody had before answered the question the way that she did, and David didn\'t know how he should respond.\nShe\'s asked the question so many times that she barely listened to the answers anymore. The answers were always the same. Well, not exactly the same, but the same in a general sense. A more accurate description was the answers never surprised her. So, she asked for the 10,000th time, \"What\'s your favorite animal?\" But this time was different. When she heard the young boy\'s answer, she wondered if she had heard him correctly.\nThe fog was as thick as pea soup. This was a problem. Gary was driving but couldn\'t see a thing in front of him. He knew he should stop, but the road was narrow so if he did, it would be right in the center of the road. He was sure that another car would end up rear-ending him, so he continued forward despite the lack of visibility. This was an unwise move.\nI recently discovered I could make fudge with just chocolate chips, sweetened condensed milk, vanilla extract, and a thick pot on slow heat. I tried it with dark chocolate chunks and I tried it with semi-sweet chocolate chips. It\'s better with both kinds. It comes out pretty bad with just the dark chocolate. The best add-ins are crushed almonds and marshmallows -- what you get from that is Rocky Road. It takes about twenty minutes from start to fridge, and then it takes about six months to work off the twenty pounds you gain from eating it. All things in moderation, friends. All things in moderation.',1,0),(4,NULL,'test 3','2025-01-31',4,'THM','She was infatuated with color. She didn\'t have a favorite color per se, but she did have a fondness for teals and sea greens. You could see it in the clothes she wore that color was an important part of her overall style. She took great pride that color flowed from her and that color was always all around her. That is why, she explained to her date sitting across the table, that she could never have a serious relationship with him due to the fact that he was colorblind.\nAll he wanted was a candy bar. It didn\'t seem like a difficult request to comprehend, but the clerk remained frozen and didn\'t seem to want to honor the request. It might have had something to do with the gun pointed at his face.\nDon\'t be scared. The things out there that are unknown aren\'t scary in themselves. They are just unknown at the moment. Take the time to know them before you list them as scary. Then the world will be a much less scary place for you.\nHe dropped the ball. While most people would think that this was a metaphor of some type, in Joe\'s case it was absolutely literal. He had hopes of reaching the Major League and that dream was now it great jeopardy. All because he had dropped the ball.\nSleeping in his car was never the plan but sometimes things don\'t work out as planned. This had been his life for the last three months and he was just beginning to get used to it. He didn\'t actually enjoy it, but he had accepted it and come to terms with it. Or at least he thought he had. All that changed when he put the key into the ignition, turned it and the engine didn\'t make a sound.',0,0),(5,NULL,'Test 44','2025-01-31',4,'HTB','He stepped away from the mic. This was the best take he had done so far, but something seemed missing. Then it struck him all at once. Visuals ran in front of his eyes and music rang in his ears. His eager fingers went to work in an attempt to capture his thoughts hoping the results would produce something that was at least half their glory.\nIt really didn\'t matter what they did to him. He\'s already made up his mind. Whatever came his way, he was prepared for the consequences. He knew in his heart that the sacrifice he made was done with love and not hate no matter how others decided to spin it.\nThe leather jacked showed the scars of being his favorite for years. It wore those scars with pride, feeling that they enhanced his presence rather than diminishing it. The scars gave it character and had not overwhelmed to the point that it had become ratty. The jacket was in its prime and it knew it.\nHe hid under the covers hoping that nobody would notice him there. It really didn\'t make much sense since it would be obvious to anyone who walked into the room there was someone hiding there, but he still held out hope. He heard footsteps coming down the hall and stop in front in front of the bedroom door. He heard the squeak of the door hinges and someone opened the bedroom door. He held his breath waiting for whoever was about to discover him, but they never did.\nIt wasn\'t quite yet time to panic. There was still time to salvage the situation. At least that is what she was telling himself. The reality was that it was time to panic and there wasn\'t time to salvage the situation, but he continued to delude himself into believing there was.',0,0),(6,NULL,'Anshul','2025-01-31',4,'HTB','The answer was within her reach. It was hidden in a box and now that box sat directly in front of her. She\'d spent years searching for it and could hardly believe she\'d finally managed to find it. She turned the key to unlock the box and then gently lifted the top. She held her breath in anticipation of finally knowing the answer she had spent so much of her time in search of. As the lid came off she could see that the box was empty.\nShe closed her eyes and then opened them again. What she was seeing just didn\'t make sense. She shook her head seeing if that would help. It didn\'t. Although it seemed beyond reality, there was no denying she was witnessing a large formation of alien spaceships filling the sky.\nIt really didn\'t matter what they did to him. He\'s already made up his mind. Whatever came his way, he was prepared for the consequences. He knew in his heart that the sacrifice he made was done with love and not hate no matter how others decided to spin it.\nThere wasn\'t a whole lot more that could be done. It had become a wait-and-see situation with the final results no longer in her control. That didn\'t stop her from trying to control the situation. She demanded that things be done as she desperately tried to control what couldn\'t be.\nJosh had spent year and year accumulating the information. He knew it inside out and if there was ever anyone looking for an expert in the field, Josh would be the one to call. The problem was that there was nobody interested in the information besides him and he knew it. Years of information painstakingly memorized and sorted with not a sole giving even an ounce of interest in the topic.',1,0),(7,NULL,'WriteupZone Redirection Test','2025-01-31',4,'THM','There was something in the sky. What exactly was up there wasn\'t immediately clear. But there was definitely something in the sky and it was getting bigger and bigger.\nWhat if dogs were racist? Would they care about fur color….. “son, only play with other tan dogs”? Or maybe it would depend on breed, “honey, only play with other German Shepards, never poodles”. Better yet it could depend on occupation. “I’m a sled dog while you’re only a running companion, leave me alone”. Maybe the neighborhood they live in could be the way they choose which dogs to associate with and which to shun? Size could be the determining factor, “see how tall that dog is, they are probably dumb”. Luckily dogs don’t discriminate. Just watch at a dog park. Big black and white dogs wag their tails and play with tiny tan dogs. A service dog chases after the same ball as the off-duty police dog. So if dogs don’t discriminate then why do we?\nThe computer wouldn\'t start. She banged on the side and tried again. Nothing. She lifted it up and dropped it to the table. Still nothing. She banged her closed fist against the top. It was at this moment she saw the irony of trying to fix the machine with violence.\nThere was a leak in the boat. Nobody had yet noticed it, and nobody would for the next couple of hours. This was a problem since the boat was heading out to sea and while the leak was quite small at the moment, it would be much larger when it was ultimately discovered. John had planned it exactly this way.\nShe had been told time and time again that the most important steps were the first and the last. It was something that she carried within her in everything she did, but then he showed up and disrupted everything. He told her that she had it wrong. The first step wasn\'t the most important. The last step wasn\'t the most important. It was the next step that was the most important.',0,1),(8,NULL,'dwq','2025-01-31',4,'HTB','dwq',0,0),(9,NULL,'Final test hopefully','2025-01-31',4,'THM','This is gonna be short cuz why not',15,11);
/*!40000 ALTER TABLE `userwriteups` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-15 18:44:01
