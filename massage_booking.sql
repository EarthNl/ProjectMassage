-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 11, 2025 at 12:20 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

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
(4, 'Earth BlackBurn', 'theearthalone@gmail.com', '0814385447', '2025-03-06', '15:00:00', 'confirmed', '2025-03-05 15:59:10', NULL, 16, NULL),
(5, 'ธีรภัทร กระชิมรัมย์', 'theearthalone@gmail.com', '0814385447', '2025-03-07', '19:00:00', 'completed', '2025-03-05 22:10:08', NULL, 15, NULL),
(6, 'ธีรภัทร กระชิมรัมย์', 'theearthalone@gmail.com', '0814385447', '2025-03-20', '00:00:00', 'completed', '2025-03-06 11:40:27', NULL, 13, NULL),
(7, 'ธีรภัทร กระชิมรัมย์', 'theearthalone@gmail.com', '0814385447', '2025-03-07', '16:00:00', 'pending', '2025-03-06 12:16:23', NULL, 15, NULL),
(8, 'ธีรภัทร กระชิมรัมย์', 'theearthalone@gmail.com', '0814385447', '2025-03-07', '17:00:00', 'pending', '2025-03-06 12:19:08', NULL, 18, NULL),
(9, 'ธีรภัทร กระชิมรัมย์', 'theearthalone@gmail.com', '0814385447', '2025-03-07', '14:00:00', 'completed', '2025-03-06 13:33:25', NULL, 13, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `review_id` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `creationDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`review_id`, `rating`, `comment`, `user_id`, `service_id`, `name`, `creationDate`) VALUES
(1, 5, 'นวดดีมากกกกก', NULL, 16, 'ธีรภัทร กระชิมรัมย์', '2025-03-05 16:13:05'),
(2, 5, 'ฟินนนนน', NULL, 15, 'ธีรภัทร กระชิมรัมย์', '2025-03-05 22:38:31'),
(3, 5, 'นวดดีมากกกก', NULL, 19, 'ธีรภัทร กระชิมรัมย์', '2025-03-06 13:37:09');

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
(13, 'นวดไทยน้ำมัน', 'ใช้เทคนิคการกดจุด การบีบ การดัดของนวดไทย ผสมผสานกับการนวดน้ำมันเพื่อความผ่อนคลาย และอาการตึงเครียด และยังช่วยให้ระบบไหลเวียนเลือดดีขึ้น และยังคงช่วยบำรุงผิวพรรณให้นุ่มชุ่มชื่น', 400.00, 60, '2025-02-05 23:41:49'),
(15, 'นวดเท้า', 'เทคนิคการนวดคลึงฝ่าเท้าและหลังเท้า สะท้อนจุดต่าง ๆ ของร่างกาย ช่วยผ่อนคลายความเมื่อยล้าและทำให้ฝ่าเท้าเนียนนุ่มชุ่มชื้นขึ้นอย่างเห็นได้ชัด', 300.00, 60, '2025-02-05 23:45:00'),
(16, 'นวดไทย', 'ใช้เทคนิคการกดจุด การบีบ การดัดของนวดไทย ผสมผสานกับอาสนะของโยคะ โดยจะเน้นการยืดเหยียดเพื่อคลายกล้ามเนื้อทีละส่วนทั่วร่างกาย ช่วยลดอาการปวดเมื่อยหรือ อาการบาดเจ็บจากการออกกำลังกาย', 300.00, 60, '2025-02-05 23:46:21'),
(18, 'นวดน้ำมันอโรม่า', 'การนวดน้ำมันอโรม่าเป็นการบำบัดด้วยกลิ่นที่ได้ผลดีมากอีกวิธีหนึ่ง มีจุดประสงค์เพื่อให้เกิดความ สมดุลของร่างกาย จิตใจ และอารมณ์ ด้วยสรรพคุณของน้ำมันหอมระเหยแต่ละชนิด ตัวน้ำมันจะซึมผ่านผิวหนังด้วยกระบวนการนวด จมูกรับกลิ่นของน้ำมันหอมระเหยส่งผลให้อารมณ์ และความรู้สึกผ่อนคลายขึ้น', 600.00, 60, '2025-03-05 15:45:28'),
(19, 'นวดคอ บ่า ไหล่', 'การนวดกดจุดเอ็นข้อต่อร่วมกับการยืดเหยียด คลายกล้ามเนื้อ แบบไม่ใช้น้ำมัน โดยการนวดจะนวดตั้งแต่ ไหล่ ต้นคอ ท้ายทอย จนถึงกลางกระหม่อมเพื่อช่วยบรรเทาอาการตึงเมื่อยล้า', 400.00, 60, '2025-03-05 15:57:13'),
(20, 'นวดเฉพาะจุด', 'ใช้เทคนิคการกดจุด การบีบ การดัดของนวดไทย ผสมผสานกับอาสนะของโยคะ โดยจะเน้นการยืดเหยียดเพื่อคลายกล้ามเนื้อทีละส่วนทั่วร่างกาย ช่วยลดอาการปวดเมื่อยหรือ อาการบาดเจ็บจากการออกกำลังกาย', 400.00, 60, '2025-03-05 15:57:39');

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
(76, '1434803905', 16, 'uploads/rooms/1434803905.jpg', 1),
(77, '0504070883', 16, 'uploads/rooms/0504070883.jpg', 2),
(78, '3943239307', 16, 'uploads/rooms/3943239307.jpg', 3),
(79, '3951415218', 15, 'uploads/rooms/3951415218.jpg', 1),
(80, '0098874967', 15, 'uploads/rooms/0098874967.jpg', 2),
(81, '1507890338', 15, 'uploads/rooms/1507890338.jpg', 3),
(82, '4241930647', 13, 'uploads/rooms/4241930647.jpg', 1),
(83, '3142590538', 13, 'uploads/rooms/3142590538.jpg', 2),
(84, '1037053439', 13, 'uploads/rooms/1037053439.jpg', 3),
(94, '0609353969', 18, 'uploads/rooms/0609353969.jpg', 1),
(95, '2841893998', 18, 'uploads/rooms/2841893998.jpg', 2),
(96, '1073960986', 18, 'uploads/rooms/1073960986.jpg', 3),
(104, '1494720772', 19, 'uploads/rooms/1494720772.jpg', 1),
(105, '1503612727', 19, 'uploads/rooms/1503612727.jpg', 2),
(106, '2347453447', 19, 'uploads/rooms/2347453447.jpg', 3),
(107, '3129290407', 20, 'uploads/rooms/3129290407.jpg', 1),
(108, '2868265462', 20, 'uploads/rooms/2868265462.jpg', 2),
(109, '1461087046', 20, 'uploads/rooms/1461087046.jpg', 3);

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
(31, '3387128174', 'นายสถาพร บุญเกิด', 'uploads/staff/3387128174.jpg', '0987024170', '2025-02-05 20:26:53'),
(32, '0981083283', 'นายธีรภัทร กระชิมรัมย์', 'uploads/staff/0981083283.jpg', '0814385447', '2025-02-05 20:26:53'),
(33, '1833404797', 'นายวุฒิชัย อ่ำอ่อน', 'uploads/staff/1833404797.jpg', '0987024170', '2025-02-05 20:26:53'),
(34, '2274335586', 'นายอภิรักษ์ ยิ้มพันวงษ์', 'uploads/staff/2274335586.jpg', '0987024170', '2025-02-05 20:26:53');

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
(17, 'thiraphat kachimram', 'theearthalone@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', '0814385447', 'admin'),
(18, 'ไม้งาม Admin', 'massagemaingam@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', '0814385447', 'admin');

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
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `service_images`
--
ALTER TABLE `service_images`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

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
