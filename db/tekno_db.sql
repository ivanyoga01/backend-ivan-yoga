-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for tekno
CREATE DATABASE IF NOT EXISTS `tekno` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tekno`;

-- Dumping structure for table tekno.product
CREATE TABLE IF NOT EXISTS `product` (
  `id` char(36) NOT NULL,
  `merchantId` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` double NOT NULL DEFAULT (0),
  `stock` double NOT NULL DEFAULT (0),
  `description` text NOT NULL,
  `image` char(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table tekno.product: ~7 rows (approximately)
INSERT INTO `product` (`id`, `merchantId`, `name`, `price`, `stock`, `description`, `image`, `createdAt`, `updatedAt`) VALUES
	('539a5d39-a1c5-4120-bad9-0c1ca7e56fd7', '3d53cd51-f6f6-4edd-9bc7-bc4ca0299a17', 'tes', 1000000, 11, 'tes', NULL, '2024-07-16 15:43:40', '2024-07-16 09:44:51'),
	('795c901d-3cc8-4c0f-ad2b-fb51e8889cdb', '3d53cd51-f6f6-4edd-9bc7-bc4ca0299a17', 'nice123', 10000, 0, 'tes123', NULL, '2024-07-16 08:59:00', '2024-07-16 09:43:35'),
	('83264159-103f-4e0b-ab1a-0ba0f7444023', '3d53cd51-f6f6-4edd-9bc7-bc4ca0299a17', 'mantap1', 1000000, 12, 'tes', NULL, '2024-07-16 15:43:40', '2024-07-16 15:43:43'),
	('8a9fe659-bda2-4f37-b11f-d6e7602979d2', '3d53cd51-f6f6-4edd-9bc7-bc4ca0299a17', 'tes2', 1000000, 12, 'tes', NULL, '2024-07-16 15:43:40', '2024-07-16 15:43:43'),
	('914b1707-1c14-45e6-8c35-6f76b9c3aacf', '3d53cd51-f6f6-4edd-9bc7-bc4ca0299a17', 'mantap', 1000000, 12, 'tes', NULL, '2024-07-16 15:43:40', '2024-07-16 15:43:43'),
	('9f019c6a-037c-4589-aa44-5afa629b029e', '3d53cd51-f6f6-4edd-9bc7-bc4ca0299a17', 'nice', 2000000, 12, 'tes', NULL, '2024-07-16 17:32:18', '2024-07-16 17:32:18'),
	('d8b1a989-ae74-4fb2-bd29-3a6ee9363672', '3d53cd51-f6f6-4edd-9bc7-bc4ca0299a17', 'tes1', 1000000, 12, 'tes', NULL, '2024-07-16 15:43:40', '2024-07-16 15:43:43');

-- Dumping structure for table tekno.transaction
CREATE TABLE IF NOT EXISTS `transaction` (
  `id` char(36) NOT NULL,
  `productId` char(36) NOT NULL,
  `clientId` char(36) NOT NULL,
  `qty` double NOT NULL DEFAULT (0),
  `subTotal` double NOT NULL DEFAULT (0),
  `discount` double NOT NULL DEFAULT (0),
  `total` double NOT NULL DEFAULT (0),
  `gratisOngkir` int NOT NULL DEFAULT (0),
  `createdAt` datetime DEFAULT (now()),
  `updatedAt` datetime DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table tekno.transaction: ~5 rows (approximately)
INSERT INTO `transaction` (`id`, `productId`, `clientId`, `qty`, `subTotal`, `discount`, `total`, `gratisOngkir`, `createdAt`, `updatedAt`) VALUES
	('758f10ce-59f7-4e60-83e0-18104f3ceb73', '539a5d39-a1c5-4120-bad9-0c1ca7e56fd7', '480c1aaa-522e-4f55-bb00-0d36c86786e8', 1, 1000000, 100000, 900000, 1, '2024-07-16 09:44:51', '2024-07-16 09:44:51'),
	('af39b3fe-9f71-44de-8d89-3e59d528891d', '795c901d-3cc8-4c0f-ad2b-fb51e8889cdb', '480c1aaa-522e-4f55-bb00-0d36c86786e8', 2, 20000, 0, 20000, 1, '2024-07-16 09:43:21', '2024-07-16 09:43:21'),
	('b887e667-d0db-4efb-a7df-066a73b9a215', '795c901d-3cc8-4c0f-ad2b-fb51e8889cdb', '480c1aaa-522e-4f55-bb00-0d36c86786e8', 5, 50000, 5000, 45000, 1, '2024-07-16 09:43:10', '2024-07-16 09:43:10'),
	('d8d7a087-3f02-44aa-aa98-9b21eb609dad', '795c901d-3cc8-4c0f-ad2b-fb51e8889cdb', '480c1aaa-522e-4f55-bb00-0d36c86786e8', 1, 10000, 0, 10000, 0, '2024-07-16 09:43:35', '2024-07-16 09:43:35'),
	('ef6b0cbf-200f-4883-b957-ac4e7db3fdd9', '795c901d-3cc8-4c0f-ad2b-fb51e8889cdb', '480c1aaa-522e-4f55-bb00-0d36c86786e8', 5, 50000, 45000, 45000, 1, '2024-07-16 09:42:36', '2024-07-16 09:42:36');

-- Dumping structure for table tekno.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` char(36) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table tekno.users: ~4 rows (approximately)
INSERT INTO `users` (`id`, `firstName`, `lastName`, `password`, `email`, `role`, `createdAt`, `updatedAt`) VALUES
	('3d53cd51-f6f6-4edd-9bc7-bc4ca0299a17', 'ivan', 'yoga', '$2a$12$JmM2KdlmGJMPnv0Fz95HuupJ.KG3eLrAqoaf/YKPr9k8/0tYmjCii', 'ivan_yoga16@student.uns.ac.id', 'merchant', '2024-07-16 15:10:18', '2024-07-16 15:10:20'),
	('480c1aaa-522e-4f55-bb00-0d36c86786e8', 'ivan', 'yoga', '$2a$12$JmM2KdlmGJMPnv0Fz95HuupJ.KG3eLrAqoaf/YKPr9k8/0tYmjCii', 'ivan.yoga16@gmail.com', 'admin', '2024-07-16 15:10:18', '2024-07-16 15:10:20'),
	('bf15e3e3-98c7-4305-bed4-2dff1e91f552', 'ivan', 'yoga', '$2a$12$JmM2KdlmGJMPnv0Fz95HuupJ.KG3eLrAqoaf/YKPr9k8/0tYmjCii', 'ivan.yoga16@yopmail.com', 'client', '2024-07-16 15:10:18', '2024-07-16 15:10:20'),
	('d39899c6-67c3-4652-87a4-767a656c4fb6', 'ivan', 'tes', '$2a$12$JmM2KdlmGJMPnv0Fz95HuupJ.KG3eLrAqoaf/YKPr9k8/0tYmjCii', 'ivan.tes@yopmail.com', 'client', '2024-07-16 08:32:26', '2024-07-16 08:32:26');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
