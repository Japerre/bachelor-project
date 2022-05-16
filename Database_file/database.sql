-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: project_v2
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `UK_hawikyhwwfvbnog5byokutpff` (`user_id`),
  CONSTRAINT `FK8ahhk8vqegfrt6pd1p9i03aej` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus`
--

DROP TABLE IF EXISTS `campus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campus` (
  `name` varchar(255) NOT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `street_nr` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus`
--

LOCK TABLES `campus` WRITE;
/*!40000 ALTER TABLE `campus` DISABLE KEYS */;
INSERT INTO `campus` VALUES ('Gent','9000','Gebroeders De Smetstraat','1');
/*!40000 ALTER TABLE `campus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `company_id` bigint NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `contact_person_email` varchar(255) DEFAULT NULL,
  `contact_person_first_name` varchar(255) DEFAULT NULL,
  `contact_person_last_name` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `employer_id` bigint NOT NULL,
  PRIMARY KEY (`company_id`),
  UNIQUE KEY `UK_rvxxsbmjarqj5xpv0paoy0l0x` (`employer_id`),
  CONSTRAINT `FK1fcyk534qc5f7r4ctl05c78aa` FOREIGN KEY (`employer_id`) REFERENCES `employer` (`employer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'ArcelorMittal','jan.fabre@gmail.com','jan','fabre',' https://belgium.arcelormittal.com/',5);
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_sequence`
--

DROP TABLE IF EXISTS `company_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_sequence`
--

LOCK TABLES `company_sequence` WRITE;
/*!40000 ALTER TABLE `company_sequence` DISABLE KEYS */;
INSERT INTO `company_sequence` VALUES (2);
/*!40000 ALTER TABLE `company_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coordinator`
--

DROP TABLE IF EXISTS `coordinator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coordinator` (
  `coordinator_id` bigint NOT NULL,
  `target_audience_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`coordinator_id`),
  UNIQUE KEY `UK_brlh8kgjm12vumqhif7k7dt4o` (`target_audience_id`),
  UNIQUE KEY `UK_my03u66inokwjudstg3c8sdut` (`user_id`),
  CONSTRAINT `FK2unn6wwg2yhno2kc1gghkmywx` FOREIGN KEY (`target_audience_id`) REFERENCES `target_audience` (`target_audience_id`),
  CONSTRAINT `FKl88y2u2j3u253b4y67lvfo485` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coordinator`
--

LOCK TABLES `coordinator` WRITE;
/*!40000 ALTER TABLE `coordinator` DISABLE KEYS */;
INSERT INTO `coordinator` VALUES (1,1,3);
/*!40000 ALTER TABLE `coordinator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coordinator_sequence`
--

DROP TABLE IF EXISTS `coordinator_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coordinator_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coordinator_sequence`
--

LOCK TABLES `coordinator_sequence` WRITE;
/*!40000 ALTER TABLE `coordinator_sequence` DISABLE KEYS */;
INSERT INTO `coordinator_sequence` VALUES (2);
/*!40000 ALTER TABLE `coordinator_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employer`
--

DROP TABLE IF EXISTS `employer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employer` (
  `employer_id` bigint NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`employer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employer`
--

LOCK TABLES `employer` WRITE;
/*!40000 ALTER TABLE `employer` DISABLE KEYS */;
INSERT INTO `employer` VALUES (1,'researchGroup'),(2,'researchGroup'),(3,'researchGroup'),(4,'researchGroup'),(5,'company');
/*!40000 ALTER TABLE `employer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employer_sequence`
--

DROP TABLE IF EXISTS `employer_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employer_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employer_sequence`
--

LOCK TABLES `employer_sequence` WRITE;
/*!40000 ALTER TABLE `employer_sequence` DISABLE KEYS */;
INSERT INTO `employer_sequence` VALUES (6);
/*!40000 ALTER TABLE `employer_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotor`
--

DROP TABLE IF EXISTS `promotor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotor` (
  `promotor_id` bigint NOT NULL,
  `research_group_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`promotor_id`),
  KEY `FKsd1k2roo3g5lsmbgu0ljexgxb` (`research_group_id`),
  KEY `FKf9khlh0twylwfqrbpoi53xaq2` (`user_id`),
  CONSTRAINT `FKf9khlh0twylwfqrbpoi53xaq2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKsd1k2roo3g5lsmbgu0ljexgxb` FOREIGN KEY (`research_group_id`) REFERENCES `research_group` (`research_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotor`
--

LOCK TABLES `promotor` WRITE;
/*!40000 ALTER TABLE `promotor` DISABLE KEYS */;
INSERT INTO `promotor` VALUES (1,1,2),(2,3,4);
/*!40000 ALTER TABLE `promotor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotor_sequence`
--

DROP TABLE IF EXISTS `promotor_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotor_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotor_sequence`
--

LOCK TABLES `promotor_sequence` WRITE;
/*!40000 ALTER TABLE `promotor_sequence` DISABLE KEYS */;
INSERT INTO `promotor_sequence` VALUES (3);
/*!40000 ALTER TABLE `promotor_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `research_group`
--

DROP TABLE IF EXISTS `research_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `research_group` (
  `research_group_id` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `employer_id` bigint DEFAULT NULL,
  PRIMARY KEY (`research_group_id`),
  KEY `FKhdn9af8mq2xnyuwapki22chm5` (`employer_id`),
  CONSTRAINT `FKhdn9af8mq2xnyuwapki22chm5` FOREIGN KEY (`employer_id`) REFERENCES `employer` (`employer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `research_group`
--

LOCK TABLES `research_group` WRITE;
/*!40000 ALTER TABLE `research_group` DISABLE KEYS */;
INSERT INTO `research_group` VALUES (1,'NUMA',4),(2,'CODES',NULL),(3,'distrinet',3);
/*!40000 ALTER TABLE `research_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `research_group_employer`
--

DROP TABLE IF EXISTS `research_group_employer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `research_group_employer` (
  `research_group_id` bigint NOT NULL,
  `employer_id` bigint NOT NULL,
  KEY `FK140hhfwqupp1m3jq39yxl2pvh` (`employer_id`),
  KEY `FKbase6rxh1f3sjil7i8rvpiact` (`research_group_id`),
  CONSTRAINT `FK140hhfwqupp1m3jq39yxl2pvh` FOREIGN KEY (`employer_id`) REFERENCES `employer` (`employer_id`),
  CONSTRAINT `FKbase6rxh1f3sjil7i8rvpiact` FOREIGN KEY (`research_group_id`) REFERENCES `research_group` (`research_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `research_group_employer`
--

LOCK TABLES `research_group_employer` WRITE;
/*!40000 ALTER TABLE `research_group_employer` DISABLE KEYS */;
/*!40000 ALTER TABLE `research_group_employer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `research_group_sequence`
--

DROP TABLE IF EXISTS `research_group_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `research_group_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `research_group_sequence`
--

LOCK TABLES `research_group_sequence` WRITE;
/*!40000 ALTER TABLE `research_group_sequence` DISABLE KEYS */;
INSERT INTO `research_group_sequence` VALUES (4);
/*!40000 ALTER TABLE `research_group_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `student_id` bigint NOT NULL,
  `subject_id` bigint DEFAULT NULL,
  `target_audience` bigint DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`student_id`),
  UNIQUE KEY `UK_bkix9btnoi1n917ll7bplkvg5` (`user_id`),
  KEY `FKmyd718fb0oebjwr8siyift6gu` (`subject_id`),
  KEY `FKjrbeatkq2xboj9xsy2x2axl2v` (`target_audience`),
  CONSTRAINT `FKjrbeatkq2xboj9xsy2x2axl2v` FOREIGN KEY (`target_audience`) REFERENCES `target_audience` (`target_audience_id`),
  CONSTRAINT `FKk5m148xqefonqw7bgnpm0snwj` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKmyd718fb0oebjwr8siyift6gu` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,2,1,1),(2,NULL,1,5),(3,NULL,1,6),(4,NULL,1,7),(5,3,1,8);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_sequence`
--

DROP TABLE IF EXISTS `student_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_sequence`
--

LOCK TABLES `student_sequence` WRITE;
/*!40000 ALTER TABLE `student_sequence` DISABLE KEYS */;
INSERT INTO `student_sequence` VALUES (6);
/*!40000 ALTER TABLE `student_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_subject`
--

DROP TABLE IF EXISTS `student_subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_subject` (
  `id` bigint NOT NULL,
  `amount_of_stars` int NOT NULL,
  `boosted` tinyint(1) DEFAULT '0',
  `favorite` tinyint(1) DEFAULT '0',
  `in_cart` tinyint(1) DEFAULT '0',
  `submitted` tinyint(1) DEFAULT '0',
  `student_id` bigint DEFAULT NULL,
  `subject_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnhw926s5os3ei5wqfaq94j0mh` (`student_id`),
  KEY `FK5cvx0kd792xhvd99s3bsbygfq` (`subject_id`),
  CONSTRAINT `FK5cvx0kd792xhvd99s3bsbygfq` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`),
  CONSTRAINT `FKnhw926s5os3ei5wqfaq94j0mh` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_subject`
--

LOCK TABLES `student_subject` WRITE;
/*!40000 ALTER TABLE `student_subject` DISABLE KEYS */;
INSERT INTO `student_subject` VALUES (1,3,1,1,1,1,1,2),(2,2,0,1,1,1,1,3),(3,2,1,1,1,1,1,4),(4,3,0,1,1,1,2,2),(5,1,0,1,1,1,2,3),(6,1,0,1,1,1,2,4),(7,3,0,1,1,1,3,2),(8,3,0,1,1,1,3,3),(9,0,0,1,0,1,3,4),(10,3,0,1,1,1,3,5),(11,1,0,1,1,1,4,2),(12,1,0,1,1,1,4,3),(13,0,0,0,0,1,4,4),(14,3,1,1,1,1,4,5),(15,0,0,0,0,0,5,2),(16,3,1,1,1,1,5,3),(17,2,0,1,1,1,5,4),(18,1,0,1,1,1,5,5),(19,0,0,0,0,0,1,5);
/*!40000 ALTER TABLE `student_subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_subject_sequence`
--

DROP TABLE IF EXISTS `student_subject_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_subject_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_subject_sequence`
--

LOCK TABLES `student_subject_sequence` WRITE;
/*!40000 ALTER TABLE `student_subject_sequence` DISABLE KEYS */;
INSERT INTO `student_subject_sequence` VALUES (20);
/*!40000 ALTER TABLE `student_subject_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject` (
  `subject_id` bigint NOT NULL,
  `amount_of_students` int NOT NULL,
  `approved` bit(1) DEFAULT NULL,
  `assigned` bit(1) DEFAULT NULL,
  `description` text,
  `title` varchar(255) DEFAULT NULL,
  `employer_id` bigint DEFAULT NULL,
  `boosted` bit(1) DEFAULT NULL,
  PRIMARY KEY (`subject_id`),
  KEY `FK5kpyxpoopexg6af4my4tsy4sn` (`employer_id`),
  CONSTRAINT `FK5kpyxpoopexg6af4my4tsy4sn` FOREIGN KEY (`employer_id`) REFERENCES `employer` (`employer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES (2,1,_binary '',_binary '','INHOUD\nTemporal constraint satisfaction problems are an important tool for reasoning about time in Artificial Intelligence, Operations Research, and Computer Science. One subclass of these problems is the Simple Disjunctive Temporal Problem (SDTP) which is the focus of this project. In a nutshell, a SDTP represents real-world problems where tasks must be performed over time. These tasks, however, are subject to precedence constraints and time windows restricting when they can be carried out. The goal of the SDTP is to assign an execution time to each task while respecting all of the aforementioned constraints. As expected, the difficulty of solving the problem grows as the number of tasks grows. Therefore, quick and smart algorithms are needed to solve the problem efficiently. \n\nSDTPs have many applications. For example, they can be used in the planning of robots’ activities. They can also be used in logistics to effectively plan the daily journey of delivery trucks (both manned or autonomous). SDTPs also appear in some personnel scheduling for technicians and maintenance teams. Additionally, some researchers target applications in industrial, business and health-care management systems.\n\nThe goal of this project is to develop algorithms that will decide the best time to perform each task in the SDTP according to a preference value defined by the task (e.g., whether there is preference to perform a task in the morning or in the evening). The student will be expected to implement efficient algorithms, data structures and perform thorough computational experiments to test their code. Students interested in graphs, shortest paths, and engineering and experimenting algorithms are sure to enjoy working on this project.\n\n\nObjectives\n\n(1) Develop optimization algorithms (naive enumeration, branch and bound, dynamic programming) to solve the problem at hand.\n\n(2) Run experiments and derive strong conclusions from them.\n\n(3) Compare the performance of your implementation against that of generic mathematical programming tools (e.g., CPLEX or Gurobi).\n\n(Optional) Derive theoretical results about the problem, including cases when it can be solved faster or instances which make the problem difficult.\n\n\nPrerequisites\n\nGood knowledge of a compiled programming language (C, C++, Java, C#, Rust);\n\nKnowledge of basic data structures (queue, stack, list, vector, array, priority queue, binary tree);\n\nExperience implementing at least one classic shortest path algorithm (Dijkstra, Bellman-Ford, Floyd-Warshall). If you have never implemented one of them, it may suffice to have an understanding of how they work and how they differ from each other.','ALGORITHMS FOR OPTIMIZING SIMPLE TEMPORAL PROBLEMS',2,_binary ''),(3,1,_binary '',_binary '','Steeds vaker realiseren bedrijven, organisaties en overheidsdiensten zich dat ze op een berg van onschatbare waarde aan data zitten. Terwijl de winsten die geboekt kunnen worden door analyses op deze data uit te voeren immens zijn, is ook de complexiteit van mogelijke analyses de laatste jaren enorm gestegen. Vaak hebben bedrijven niet langer de nodige know-how in huis om deze analyses zelf uit te voeren. Bedrijven, gespecialiseerd in machine learning en artificiële intelligentie, die zich specialiseren in dit type analyses schieten als paddenstoelen uit de grond. Vele organisaties zijn echter (terecht) niet bereid om zomaar hun data te delen. Dit zou immers de privacy van de individuen in de dataset, of zelfs concurrentiele voordelen ten opzichte van andere bedrijven kunnen in het gedrang brengen. Een oplossing in deze gevallen is om in plaats van de originele, volledige dataset een geanonimiseerd derivaat ervan te delen met het dataverwerkingsbedrijf. \n \nEr zijn daarentegen ook gevallen waarbij dataverwerkingsbedrijven modellen (bvb. machine learning modellen) kunnen maken voor een organisatie op basis van publiek beschikbare data. Hier is de data van de organisatie (dataeigenaar) enkel nodig voor het valideren van het gecreëerde model. Het doel van deze masterproef is om een systeem op te zetten waarbij de dataverwerker voorspellingen kan gaan controleren aan de hand van data van de dataeigenaar. Hierbij is een extra vereiste dat beide partijen elkaar niet hoeven te vertrouwen. Met andere woorden, de dataeigenaar hoeft zijn data niet te delen met de data verwerker, en de data verwerker hoeft ook zijn model niet te delen met de dataeigenaar. Daarenboven moet de dataeigenaar ook de zekerheid hebben dat de dataverwerker geen extra informatie (bvb. over een individu in de dataset) kan te weten komen.\n\nOm dit te bereiken is het doel van deze masterproef om een ‘trusted’ third party op te zetten om deze validatie uit te voeren. Het systeem moet zo ontworpen worden dat beide partijen ook deze derde partij zo minimaal mogelijk moeten vertrouwen om een correcte werking te garanderen. \n\nVoor deze masterproef zijn we opzoek naar een student met een passie voor security en privacy technologieën, en die graag redeneert over complexe gedistribueerde systemen. Deze masterproef zal (behalve de implementatie van een proof-of-concept) ook voor een groot deel bestaan uit architecturaal werk waarbij verschillende designs tegen elkaar worden afgewogen. ','PRIVACY VERBETERENDE TECHNOLOGIEËN ALS VERVANGING VOOR VERTROUWEN',3,_binary ''),(4,1,_binary '',_binary '\0','Acro Companion\n\nAcro Companion is a start-up located in Belgium, Portugal and Switzerland and operating worldwide. Our goal is to help the gymnastics community to achieve a higher working standard and to simplify and automate processes through digitization. \n\nWe are involved in some of the biggest competitions (World Games, World Championships and World Cups) as well as hundreds of national and regional gymnastics competitions.Our platform offers an end-to-end solution for membership, competition management, scoring and livestreaming.\n\nThe internship can mostly be done in Dutch but when talking to some of the clients or colleagues, English will be necessary.\n\nAcro Companion is a fully remote company, as such the internship can be done from home and/or from the university.\n\n\n\nThe Gymnastics Competition Planning Problem\n\nOne of the most time-consuming aspects for an organizer of a competition is creating the competition schedule. This is an operational research problem in its purest form.\n\nA high-level competition schedule consists of a calendar, starting order and judges panels. A competition with 2000 gymnasts to be assigned to starting orders and 100 judges to be assigned to judges panels represents a very complex problem. The three parts (calendar, starting order, judges panel) can each be solved independently as most (hard) constraints only impact one of the three constraints. However, there are some constraints that impact multiple parts. Most constraints are the same over all disciplines, however some constraints are unique per discipline.\n\nThe goal would be to begin by solving one part of the problem and one discipline and then expand depending on the progress.','GYMNASTICS COMPETITION PLANNING',4,_binary ''),(5,3,_binary '',_binary '\0','ArcelorMittal Gent is a steel production company situated alongside the canal Gent-Terneuzen in the port of Gent. It produces flat steel products, used amongst others in the automotive industry.\n\nThe raw materials department (GHV) is responsible for the logistics of the bulk materials from the port up to the plant. A quick overview: large sea vessels and barges deliver bulk raw materials to the site. These materials need to be discharged as fast as possible onto conveyor belts and are transported to their storage location in parks. If the plant demands some type of raw materials, a partially mutual trajectory of conveyor belts is used to reclaim the material. This results in a competitive usage of the infrastructure for ship discharging tasks and for supplying production needs. Production demands are always given absolute priority. Hence, ship discharging activities can be postponed and the ship will charge demurrage costs due to its delay.\n\nThe stockyard planning model is part of a larger project to optimize the raw materials flow, and to minimize discharge and demurrage costs. Intelligent allocation of the available free space at the storage parks is crucial for this. At the moment, these decisions are made manually and ad-hoc. This has some huge consequences. If some part of the park is filled with a certain shipload, this location will only become available again after several weeks or even months. Moreover, the assignment could lead to task interference in the future. For example, a simultaneous demand for several raw materials from the same park could jeopardize production continuity. Another possible conflict occurs if raw materials can only be reclaimed from and stacked at the same park. If we can predict the long-term impact of a current allocation at the park, we can select the best option for the long term, even though it might appear to be an inferior decision at this moment.\n\nThe stockyard planning model takes into account the present stockyard layout, the planned arrival (ship ETA) and estimated consumption rate of all types of raw materials, as well as large maintenance and standstills of the infrastructure known in advance. The main goal of the model is to determine the optimal location of each raw material so that production and discharging demands can be fulfilled as much as possible. This means that the optimal stockyard planning should minimize the total cost related to raw materials logistics, without violating its specific constraints (e.g., park capacity).\n\nIn this master thesis, you will design and implement several optimization heuristics to assign amounts of raw materials (either as the whole batch or partially divided). You will test the heuristics using historical production data. You will assess the “best” heuristic based on its performance and whether it is computationally feasible.\n\nThis master dissertation provides the opportunity to get hands-on experience in a state-of-the-art steel plant, to work together with industry specialists in optimizing techniques and to contribute to technological innovation.\n\nOBJECTIVES:\n➢ Implement several heuristics suitable for the problem\n➢ Evaluate their performance using a set of realistic input data\n➢ Make founded conclusions based on your computational results\n\nEXPECTED COMPETENCES (KEY WORDS):\nGeneral knowledge of optimization techniques/ operations research\nGeneral programming skills (Python, C#, C++,..)\nData analysis and statistics\n\nNUMBER OF STUDENTS:\n➢ 1\n\nTARGET GROUP : BACHELOR/MASTER/ … & SPECIALISATION(S):\n➢ Master of science in engineering (computer science, operations research, …)\n\nLOCATION:\n➢ SYMO ArcelorMittal Gent, John Kennedylaan 51, 9042 Gent','DEVELOPMENT OF STOCKYARD PLANNING HEURISTIC FOR RAW MATERIALS STORAGE',5,_binary '');
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject_promotor`
--

DROP TABLE IF EXISTS `subject_promotor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject_promotor` (
  `subject_id` bigint NOT NULL,
  `promotor_id` bigint NOT NULL,
  KEY `FKt2w18sq7awafjr92f1iebebl2` (`promotor_id`),
  KEY `FKc9nmunkom5rx2lbrcgy7wmhqv` (`subject_id`),
  CONSTRAINT `FKc9nmunkom5rx2lbrcgy7wmhqv` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`),
  CONSTRAINT `FKt2w18sq7awafjr92f1iebebl2` FOREIGN KEY (`promotor_id`) REFERENCES `promotor` (`promotor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject_promotor`
--

LOCK TABLES `subject_promotor` WRITE;
/*!40000 ALTER TABLE `subject_promotor` DISABLE KEYS */;
INSERT INTO `subject_promotor` VALUES (5,1),(2,1),(4,1),(3,2);
/*!40000 ALTER TABLE `subject_promotor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject_sequence`
--

DROP TABLE IF EXISTS `subject_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject_sequence`
--

LOCK TABLES `subject_sequence` WRITE;
/*!40000 ALTER TABLE `subject_sequence` DISABLE KEYS */;
INSERT INTO `subject_sequence` VALUES (6);
/*!40000 ALTER TABLE `subject_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject_target_audience`
--

DROP TABLE IF EXISTS `subject_target_audience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject_target_audience` (
  `subject_id` bigint NOT NULL,
  `target_audience_id` bigint NOT NULL,
  KEY `FK3geeumclahve6ohu9or9vet0j` (`target_audience_id`),
  KEY `FKm00r4yflnlyv5srbjfjyoh6ow` (`subject_id`),
  CONSTRAINT `FK3geeumclahve6ohu9or9vet0j` FOREIGN KEY (`target_audience_id`) REFERENCES `target_audience` (`target_audience_id`),
  CONSTRAINT `FKm00r4yflnlyv5srbjfjyoh6ow` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject_target_audience`
--

LOCK TABLES `subject_target_audience` WRITE;
/*!40000 ALTER TABLE `subject_target_audience` DISABLE KEYS */;
INSERT INTO `subject_target_audience` VALUES (5,1),(2,1),(4,1),(3,1);
/*!40000 ALTER TABLE `subject_target_audience` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject_topic`
--

DROP TABLE IF EXISTS `subject_topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject_topic` (
  `subject_id` bigint NOT NULL,
  `topic_id` bigint NOT NULL,
  KEY `FK68mjibbribaholj768wacwqo` (`topic_id`),
  KEY `FKrkqlb2sjd23jw0jic6blsbbdh` (`subject_id`),
  CONSTRAINT `FK68mjibbribaholj768wacwqo` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`topic_id`),
  CONSTRAINT `FKrkqlb2sjd23jw0jic6blsbbdh` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject_topic`
--

LOCK TABLES `subject_topic` WRITE;
/*!40000 ALTER TABLE `subject_topic` DISABLE KEYS */;
INSERT INTO `subject_topic` VALUES (5,1),(5,2),(2,1),(2,2),(4,1),(4,2),(3,2);
/*!40000 ALTER TABLE `subject_topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `target_audience`
--

DROP TABLE IF EXISTS `target_audience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `target_audience` (
  `target_audience_id` bigint NOT NULL,
  `major_code` varchar(255) DEFAULT NULL,
  `campus` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`target_audience_id`),
  KEY `FKdrfvgkxsfoijhmggqdnvyas6f` (`campus`),
  CONSTRAINT `FKdrfvgkxsfoijhmggqdnvyas6f` FOREIGN KEY (`campus`) REFERENCES `campus` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `target_audience`
--

LOCK TABLES `target_audience` WRITE;
/*!40000 ALTER TABLE `target_audience` DISABLE KEYS */;
INSERT INTO `target_audience` VALUES (1,'IW E-ICT','Gent');
/*!40000 ALTER TABLE `target_audience` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `target_audience_sequence`
--

DROP TABLE IF EXISTS `target_audience_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `target_audience_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `target_audience_sequence`
--

LOCK TABLES `target_audience_sequence` WRITE;
/*!40000 ALTER TABLE `target_audience_sequence` DISABLE KEYS */;
INSERT INTO `target_audience_sequence` VALUES (2);
/*!40000 ALTER TABLE `target_audience_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic`
--

DROP TABLE IF EXISTS `topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic` (
  `topic_id` bigint NOT NULL,
  `major_code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`topic_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic`
--

LOCK TABLES `topic` WRITE;
/*!40000 ALTER TABLE `topic` DISABLE KEYS */;
INSERT INTO `topic` VALUES (1,'IW E-ICT','Data science en engineering'),(2,'IW E-ICT','Software Development');
/*!40000 ALTER TABLE `topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic_sequence`
--

DROP TABLE IF EXISTS `topic_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic_sequence`
--

LOCK TABLES `topic_sequence` WRITE;
/*!40000 ALTER TABLE `topic_sequence` DISABLE KEYS */;
INSERT INTO `topic_sequence` VALUES (3);
/*!40000 ALTER TABLE `topic_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Tibo','Laperre','$2a$10$GUFmH2eM1cGiL1vncDml1uyaIYGE53IBwQlF7l2YV9WIJ0dkJ/ezC','ROLE_STUDENT','tibo.laperre@student.kuleuven.be'),(2,'Greet ','Vandenberghe','$2a$10$Kur1YcPSY6YPBVFokr07hO4.hblrngDuqcboCkkgQCH04lUT.cLia','ROLE_PROMOTOR','greet.vandenberghe@promotor.kuleuven.be'),(3,'tony','wauters','$2a$10$25BE9uiyt9FtcFp.Ao3pQOHEwCTqMQGLZItsCB15VsyI02SB0cA6O','ROLE_COORDINATOR','tony.wauters@kuleuven.be'),(4,'Vincent','Naessens','$2a$10$k6lJG/m8KYPCtArfjMqGtOIE.5tbb0YVvbv4A9H8SKxYzvORV1TEq','ROLE_PROMOTOR','vincent.naessens@promotor.kuleuven.be'),(5,'Elian','Vantomme','$2a$10$kI.uNf9okZPJbebOe/DQ7.WQeBmqlo/9sIpVcQ2gDddmhlff1Olsq','ROLE_STUDENT','elian.vantomme@student.kuleuven.be'),(6,'Louis','Acke','$2a$10$6cuiceUHBr.wcApEDv4Q0O0sBxrT0Qf1mlxEgzInIQgPaQCGax542','ROLE_STUDENT','louis.acke@student.kuleuven.be'),(7,'Henri','Vandeputte','$2a$10$obTW3apg9886ysb/lk/co.P6.BktGyfJIBD4yYjpPUHeZVF2b5cBS','ROLE_STUDENT','henri.vandeputte@student.kuleuven.be'),(8,'Emma','Deleu','$2a$10$X3k7P3SP7fF90V41EXGwwuuQ.IjRuf9iz8ENDKo3GwygqoiYgru8O','ROLE_STUDENT','emmadeleu@student.kuleuven.be');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_sequence`
--

DROP TABLE IF EXISTS `user_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_sequence`
--

LOCK TABLES `user_sequence` WRITE;
/*!40000 ALTER TABLE `user_sequence` DISABLE KEYS */;
INSERT INTO `user_sequence` VALUES (9);
/*!40000 ALTER TABLE `user_sequence` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-16 16:10:13
