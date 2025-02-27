-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 27, 2025 at 02:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `massage_booking`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `status` enum('pending','confirmed','completed','canceled') DEFAULT 'pending',
  `creationDate` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`booking_id`, `name`, `email`, `phone`, `date`, `time`, `status`, `creationDate`, `user_id`, `service_id`, `staff_id`) VALUES
(1, 'กกก กกก', 'a@a.com', '0982577542', '2025-02-27', '07:00:00', 'pending', '2025-02-27 16:54:34', NULL, 9, NULL),
(2, 'กกก กกก', 'a@a.com', '0982577542', '2025-02-28', '00:00:00', 'pending', '2025-02-27 19:58:57', NULL, 10, NULL),
(3, 'กกก กกก', 'a@a.com', '0982577542', '2025-02-28', '00:00:00', 'pending', '2025-02-27 20:00:03', NULL, 10, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `review_id` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `service_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `creationDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`service_id`, `name`, `description`, `price`, `duration`, `creationDate`) VALUES
(8, 'นวดรีดเส้น', '555555', 5000.00, 60, '2025-02-05 21:56:59'),
(9, 'นวดเฉพาะจุด', 'ใช้เทคนิคการกดจุด การบีบ การดัดของนวดไทย ผสมผสานกับอาสนะของโยคะ โดยจะเน้นการยืดเหยียดเพื่อคลายกล้ามเนื้อทีละส่วนทั่วร่างกาย ช่วยลดอาการปวดเมื่อยหรือ อาการบาดเจ็บจากการออกกำลังกาย', 350.00, 60, '2025-02-05 21:57:00'),
(10, 'นวดรีดเส้น', '555555', 5000.00, 60, '2025-02-05 21:57:00'),
(11, 'นวดคอ บ่า ไหล่', 'การนวดกดจุดเอ็นข้อต่อร่วมกับการยืดเหยียด คลายกล้ามเนื้อ แบบไม่ใช้น้ำมัน โดยการนวดจะนวดตั้งแต่ ไหล่ ต้นคอ ท้ายทอย จนถึงกลางกระหม่อมเพื่อช่วยบรรเทาอาการตึงเมื่อยล้า', 350.00, 60, '2025-02-05 23:41:26'),
(13, 'นวดไทยน้ำมัน', 'ใช้เทคนิคการกดจุด การบีบ การดัดของนวดไทย ผสมผสานกับการนวดน้ำมันเพื่อความผ่อนคลาย และอาการตึงเครียด และยังช่วยให้ระบบไหลเวียนเลือดดีขึ้น และยังคงช่วยบำรุงผิวพรรณให้นุ่มชุ่มชื่น', 350.00, 60, '2025-02-05 23:41:49'),
(15, 'นวดเท้า', 'เทคนิคการนวดคลึงฝ่าเท้าและหลังเท้า สะท้อนจุดต่าง ๆ ของร่างกาย ช่วยผ่อนคลายความเมื่อยล้าและทำให้ฝ่าเท้าเนียนนุ่มชุ่มชื้นขึ้นอย่างเห็นได้ชัด', 350.00, 60, '2025-02-05 23:45:00'),
(16, 'นวดไทย', 'ใช้เทคนิคการกดจุด การบีบ การดัดของนวดไทย ผสมผสานกับอาสนะของโยคะ โดยจะเน้นการยืดเหยียดเพื่อคลายกล้ามเนื้อทีละส่วนทั่วร่างกาย ช่วยลดอาการปวดเมื่อยหรือ อาการบาดเจ็บจากการออกกำลังกาย', 350.00, 60, '2025-02-05 23:46:21');

-- --------------------------------------------------------

--
-- Table structure for table `service_images`
--

CREATE TABLE `service_images` (
  `image_id` int(11) NOT NULL,
  `image_code` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL,
  `image_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `image_idx` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_images`
--

INSERT INTO `service_images` (`image_id`, `image_code`, `service_id`, `image_url`, `image_idx`) VALUES
(46, '0214235900', 16, 'uploads/rooms/0214235900.png', 1),
(47, '0237849283', 16, 'uploads/rooms/0237849283.png', 2),
(48, '2889204490', 16, 'uploads/rooms/2889204490.png', 3),
(49, '0192227499', 15, 'uploads/rooms/0192227499.png', 1),
(50, '3815713342', 15, 'uploads/rooms/3815713342.png', 2),
(51, '0527765583', 15, 'uploads/rooms/0527765583.png', 3),
(52, '3212339790', 13, 'uploads/rooms/3212339790.png', 1),
(53, '2436233902', 13, 'uploads/rooms/2436233902.png', 2),
(54, '1523574328', 13, 'uploads/rooms/1523574328.png', 3),
(55, '3826437709', 11, 'uploads/rooms/3826437709.png', 1),
(56, '3601636061', 11, 'uploads/rooms/3601636061.png', 2),
(57, '2579869420', 11, 'uploads/rooms/2579869420.png', 3),
(58, '1470655663', 9, 'uploads/rooms/1470655663.png', 1),
(59, '1249431596', 9, 'uploads/rooms/1249431596.png', 2),
(60, '1003963334', 9, 'uploads/rooms/1003963334.png', 3),
(74, '2422635072', 8, 'uploads/rooms/2422635072.png', 1),
(75, '1602863520', 10, 'uploads/rooms/1602863520.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staff_id` int(11) NOT NULL,
  `staff_code` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `image_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `creationDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`staff_id`, `staff_code`, `name`, `image_url`, `phone`, `creationDate`) VALUES
(31, '3387128174', 'chok', 'uploads/staff/3387128174.png', '0987024170', '2025-02-05 20:26:53'),
(32, '0981083283', 'chok', 'uploads/staff/0981083283.png', '0987024170', '2025-02-05 20:26:53'),
(33, '1833404797', 'chok', 'uploads/staff/1833404797.png', '0987024170', '2025-02-05 20:26:53'),
(34, '2274335586', 'chok', 'uploads/staff/2274335586.png', '0987024170', '2025-02-05 20:26:53');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `role` enum('admin','customer') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'customer'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `name`, `email`, `password`, `phone`, `role`) VALUES
(1, 'sathaporn', 'sathaporn.chok42@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', '0987024170', 'customer'),
(4, 'choki', 'a@a.com', '81dc9bdb52d04dc20036dbd8313ed055', '0987024170', 'admin'),
(7, 'choki', 'a@s.com', '81dc9bdb52d04dc20036dbd8313ed055', '0987024170', 'admin'),
(11, 'ddd', '5@5.com', '15de21c670ae7c3f6f3f1f37029303c9', '0987024170', 'admin'),
(12, 'sathaporn5', 'b@b.com', '15de21c670ae7c3f6f3f1f37029303c9', '0987024170', 'admin'),
(13, 'choki', 'a@d.com', '81dc9bdb52d04dc20036dbd8313ed055', '0987024170', 'admin'),
(14, 'sathaporn', '5@a.com', '15de21c670ae7c3f6f3f1f37029303c9', '0987024170', 'admin'),
(15, 's', '555', 'd41d8cd98f00b204e9800998ecf8427e', '0987024170', 'customer'),
(16, 'max', '5@l.com', '15de21c670ae7c3f6f3f1f37029303c9', '0987024170', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `staff_id` (`staff_id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `service_id` (`service_id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `service_images`
--
ALTER TABLE `service_images`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `service_id` (`service_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `service_images`
--
ALTER TABLE `service_images`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`),
  ADD CONSTRAINT `booking_ibfk_3` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`);

--
-- Constraints for table `service_images`
--
ALTER TABLE `service_images`
  ADD CONSTRAINT `service_images_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
