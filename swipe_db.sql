-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 15, 2015 at 08:38 PM
-- Server version: 5.5.32
-- PHP Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `swipe_db`
--
CREATE DATABASE IF NOT EXISTS `swipe_db` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `swipe_db`;

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE IF NOT EXISTS `service` (
  `service_id` int(11) NOT NULL AUTO_INCREMENT,
  `service_name` varchar(20) NOT NULL,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`service_id`, `service_name`) VALUES
(1, 'Home'),
(2, 'Sofa'),
(3, 'Carpet'),
(4, 'Washroom'),
(5, 'Chair'),
(6, 'Matress');

-- --------------------------------------------------------

--
-- Table structure for table `service_subcategory`
--

CREATE TABLE IF NOT EXISTS `service_subcategory` (
  `service_sub_id` int(11) NOT NULL AUTO_INCREMENT,
  `service_id_fk` int(11) NOT NULL,
  `service_sub_name` varchar(20) NOT NULL,
  PRIMARY KEY (`service_sub_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `service_subcategory`
--

INSERT INTO `service_subcategory` (`service_sub_id`, `service_id_fk`, `service_sub_name`) VALUES
(1, 1, 'Basic'),
(2, 1, 'Deep'),
(3, 1, 'Move In');

-- --------------------------------------------------------

--
-- Table structure for table `subcategory_type`
--

CREATE TABLE IF NOT EXISTS `subcategory_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service_id_fk` int(11) NOT NULL,
  `service_sub_id_fk` int(11) NOT NULL,
  `sub_type_id_fk` int(11) NOT NULL,
  `sub_type_price` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `subcategory_type`
--

INSERT INTO `subcategory_type` (`id`, `service_id_fk`, `service_sub_id_fk`, `sub_type_id_fk`, `sub_type_price`) VALUES
(1, 1, 1, 1, 2400),
(2, 1, 1, 2, 3600),
(3, 1, 1, 3, 6000),
(4, 1, 1, 4, 8400),
(5, 1, 2, 1, 4200),
(6, 1, 2, 2, 5400),
(7, 1, 2, 3, 6600),
(8, 1, 2, 4, 7800),
(9, 1, 3, 1, 3000),
(10, 1, 3, 2, 4200),
(11, 1, 3, 3, 5400),
(12, 1, 3, 4, 6600);

-- --------------------------------------------------------

--
-- Table structure for table `subcategory_type_detail`
--

CREATE TABLE IF NOT EXISTS `subcategory_type_detail` (
  `sub_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `sub_type_name` varchar(20) NOT NULL,
  PRIMARY KEY (`sub_type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `subcategory_type_detail`
--

INSERT INTO `subcategory_type_detail` (`sub_type_id`, `sub_type_name`) VALUES
(1, '1 BHK'),
(2, '2 BHK'),
(3, '3 BHK'),
(4, '4 BHK');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
