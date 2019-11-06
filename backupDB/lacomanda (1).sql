-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-11-2019 a las 14:01:48
-- Versión del servidor: 10.4.6-MariaDB
-- Versión de PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `lacomanda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(18) NOT NULL,
  `nombre` varchar(80) COLLATE utf8_spanish2_ci NOT NULL,
  `mesa` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `orden` varchar(80) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `mesa`, `orden`) VALUES
(5, 'Matias Caceros', 'mep4a', '91nz8'),
(6, 'Lucia Cardozo', 'mep6a', 'xmg2e'),
(7, 'Jonathan Haedo', 'minea', 'rm8yz'),
(8, 'Juan Huissi', 'mexea', 'f05ly'),
(9, 'Juan Huissi', 'mexeb', 'c3lg4'),
(10, 'Juan Huissi', 'mexec', 'mixqp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuestas`
--

CREATE TABLE `encuestas` (
  `id` int(18) NOT NULL,
  `idMozo` int(18) NOT NULL,
  `mesa` varchar(18) COLLATE utf8_spanish2_ci NOT NULL,
  `orden` varchar(80) COLLATE utf8_spanish2_ci NOT NULL,
  `puntosmozo` int(18) NOT NULL,
  `puntoscocinero` int(18) NOT NULL,
  `puntosrestaurante` int(18) NOT NULL,
  `puntosmesa` int(18) NOT NULL,
  `experiencia` varchar(66) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `puntuacionTotal` int(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `encuestas`
--

INSERT INTO `encuestas` (`id`, `idMozo`, `mesa`, `orden`, `puntosmozo`, `puntoscocinero`, `puntosrestaurante`, `puntosmesa`, `experiencia`, `puntuacionTotal`) VALUES
(1, 5, 'mep4a', '91nz8', 4, 8, 5, 5, '', 22);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menubebidas`
--

CREATE TABLE `menubebidas` (
  `id` int(18) NOT NULL,
  `nombre` varchar(80) COLLATE utf8_spanish2_ci NOT NULL,
  `precio` double NOT NULL,
  `cantidadVendida` int(18) NOT NULL,
  `imagen` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `menubebidas`
--

INSERT INTO `menubebidas` (`id`, `nombre`, `precio`, `cantidadVendida`, `imagen`) VALUES
(1, 'Coca-Cola 600ml', 65, 0, '../../../assets/imagenes/bebidas/1.png'),
(2, 'Pepsi 600ml', 60, 0, '../../../assets/imagenes/bebidas/2.png'),
(3, 'Agua mineral', 45, 0, '../../../assets/imagenes/bebidas/3.png'),
(4, 'Sprite 600ml', 65, 0, '../../../assets/imagenes/bebidas/4.png'),
(5, 'Fanta en lata', 50, 0, '../../../assets/imagenes/bebidas/5.png'),
(6, 'H2OH', 50, 0, '../../../assets/imagenes/bebidas/6.png'),
(7, 'Levite 600ml', 45, 0, '../../../assets/imagenes/bebidas/7.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menucomidas`
--

CREATE TABLE `menucomidas` (
  `id` int(18) NOT NULL,
  `nombre` varchar(80) COLLATE utf8_spanish2_ci NOT NULL,
  `precio` double NOT NULL,
  `cantidadVendida` int(18) NOT NULL,
  `imagen` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `menucomidas`
--

INSERT INTO `menucomidas` (`id`, `nombre`, `precio`, `cantidadVendida`, `imagen`) VALUES
(1, 'Asado a la parrilla', 270, 0, '../../../assets/imagenes/comidas/1.png'),
(2, 'Bifes al disco', 270, 0, '../../../assets/imagenes/comidas/2.jpg'),
(3, 'Carne a la parrilla', 170, 0, '../../../assets/imagenes/comidas/3.png'),
(4, 'Costillas', 320, 0, '../../../assets/imagenes/comidas/4.jpg'),
(5, 'Ensalada', 150, 0, '../../../assets/imagenes/comidas/5.png'),
(6, 'Milanesa de ternera', 160, 0, '../../../assets/imagenes/comidas/6.png'),
(7, 'Pizza picante', 260, 0, '../../../assets/imagenes/comidas/7.png'),
(8, 'Rabas con queso', 160, 0, '../../../assets/imagenes/comidas/8.png'),
(9, 'Sushi', 450, 0, '../../../assets/imagenes/comidas/9.png'),
(10, 'Chips de tofu', 130, 0, '../../../assets/imagenes/comidas/10.jpg'),
(11, 'Crema natural de rucula, perejil y frutos secos', 390, 0, '../../../assets/imagenes/comidas/11.jpg'),
(12, 'Hamburguesa vegana de lentejas', 105, 0, '../../../assets/imagenes/comidas/12.jpg'),
(13, 'Tofu con pisto', 195, 0, '../../../assets/imagenes/comidas/13.jpg'),
(14, 'Panesillos asiaticos', 85, 0, '../../../assets/imagenes/comidas/14.jpg'),
(15, 'Pizza vegana de pesto y verduras', 320, 0, '../../../assets/imagenes/comidas/15.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menupostres`
--

CREATE TABLE `menupostres` (
  `id` int(18) NOT NULL,
  `nombre` varchar(80) COLLATE utf8_spanish2_ci NOT NULL,
  `precio` double NOT NULL,
  `cantidadVendida` int(18) NOT NULL,
  `imagen` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `menupostres`
--

INSERT INTO `menupostres` (`id`, `nombre`, `precio`, `cantidadVendida`, `imagen`) VALUES
(1, 'Banana split', 150, 0, '../../../assets/imagenes/postres/1.jpg'),
(2, 'Brownie con Helado', 150, 0, '../../../assets/imagenes/postres/2.jpg'),
(3, 'copa de oreo y nutella', 180, 0, '../../../assets/imagenes/postres/3.jpg'),
(4, 'Dona chocoavellana', 100, 0, '../../../assets/imagenes/postres/4.jpg'),
(5, 'Galleta Choco Chip helado', 110, 0, '../../../assets/imagenes/postres/5.jpg'),
(6, 'Tulipán', 75, 0, '../../../assets/imagenes/postres/6.jpg'),
(7, 'Waffle de Nutella y helado', 130, 0, '../../../assets/imagenes/postres/7.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menutragos`
--

CREATE TABLE `menutragos` (
  `id` int(18) NOT NULL,
  `nombre` varchar(80) COLLATE utf8_spanish2_ci NOT NULL,
  `precio` double NOT NULL,
  `cantidadVendida` int(18) NOT NULL,
  `imagen` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `menutragos`
--

INSERT INTO `menutragos` (`id`, `nombre`, `precio`, `cantidadVendida`, `imagen`) VALUES
(1, 'Aperol spritz', 250, 0, '../../../assets/imagenes/tragos/1.png'),
(2, 'Coñac y soda', 270, 0, '../../../assets/imagenes/tragos/2.png'),
(3, 'Gin fizz', 190, 0, '../../../assets/imagenes/tragos/3.png'),
(4, 'Margarita', 220, 0, '../../../assets/imagenes/tragos/4.png'),
(5, 'Pina colada', 160, 0, '../../../assets/imagenes/tragos/5.jpg'),
(6, 'Bloody Mary', 345, 0, '../../../assets/imagenes/tragos/6.jpg'),
(7, 'Jager bomb', 350, 0, '../../../assets/imagenes/tragos/7.jpg'),
(8, 'Mojitob', 270, 0, '../../../assets/imagenes/tragos/8.jpg'),
(9, 'Cosmopolitan', 260, 0, '../../../assets/imagenes/tragos/9.jpg'),
(10, 'Caipirinha', 320, 0, '../../../assets/imagenes/tragos/10.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mesas`
--

CREATE TABLE `mesas` (
  `id` int(18) NOT NULL,
  `mesa` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `asientos` int(18) NOT NULL,
  `ubicacion` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `estado` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `usos` int(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `mesas`
--

INSERT INTO `mesas` (`id`, `mesa`, `asientos`, `ubicacion`, `estado`, `usos`) VALUES
(1, 'mip1a', 1, 'interior', 'libre', 0),
(2, 'mip1b', 1, 'interior', 'libre', 0),
(3, 'mip1c', 1, 'interior', 'libre', 0),
(4, 'mip1d', 1, 'interior', 'libre', 0),
(5, 'mip1e', 1, 'interior', 'libre', 0),
(6, 'mip1f', 1, 'interior', 'libre', 0),
(7, 'mip2a', 2, 'interior', 'libre', 0),
(8, 'mip2b', 2, 'interior', 'libre', 0),
(9, 'mip2c', 2, 'interior', 'libre', 0),
(10, 'mip2d', 2, 'interior', 'libre', 0),
(11, 'mip2e', 2, 'interior', 'libre', 0),
(12, 'mip2f', 2, 'interior', 'libre', 0),
(13, 'mip4a', 4, 'interior', 'libre', 0),
(14, 'mip4b', 4, 'interior', 'libre', 0),
(15, 'mip4c', 4, 'interior', 'libre', 0),
(16, 'mip4d', 4, 'interior', 'libre', 0),
(17, 'mip4e', 4, 'interior', 'libre', 0),
(18, 'mip4f', 4, 'interior', 'libre', 0),
(19, 'mip6a', 6, 'interior', 'libre', 0),
(20, 'mip6b', 6, 'interior', 'libre', 0),
(21, 'mip6c', 6, 'interior', 'libre', 0),
(22, 'mip6d', 6, 'interior', 'libre', 0),
(23, 'mip6e', 6, 'interior', 'libre', 0),
(24, 'mip6f', 6, 'interior', 'libre', 0),
(25, 'mep1a', 1, 'exterior', 'libre', 0),
(26, 'mep1b', 1, 'exterior', 'libre', 0),
(27, 'mep1c', 1, 'exterior', 'libre', 0),
(28, 'mep1d', 1, 'exterior', 'libre', 0),
(29, 'mep1e', 1, 'exterior', 'libre', 0),
(30, 'mep1f', 1, 'exterior', 'libre', 0),
(31, 'mep2a', 2, 'exterior', 'libre', 0),
(32, 'mep2c', 2, 'exterior', 'libre', 0),
(33, 'mep2d', 2, 'exterior', 'libre', 0),
(34, 'mep2e', 2, 'exterior', 'libre', 0),
(35, 'mep2f', 2, 'exterior', 'libre', 0),
(36, 'mep4a', 4, 'exterior', 'libre', 1),
(37, 'mep4b', 4, 'exterior', 'libre', 0),
(38, 'mep4c', 4, 'exterior', 'libre', 0),
(39, 'mep4d', 4, 'exterior', 'libre', 0),
(40, 'mep6a', 6, 'exterior', 'esperando pedido', 1),
(41, 'mep6b', 6, 'exterior', 'libre', 0),
(42, 'mep6c', 6, 'exterior', 'libre', 0),
(43, 'mexea', 25, 'exterior', 'esperando pedido', 1),
(44, 'mexeb', 25, 'exterior', 'esperando pedido', 1),
(45, 'mexec', 25, 'exterior', 'libre', 1),
(46, 'minea', 25, 'interior', 'esperando pedido', 1),
(47, 'mineb', 25, 'interior', 'libre', 0),
(48, 'minec', 25, 'interior', 'libre', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidosbebida`
--

CREATE TABLE `pedidosbebida` (
  `id` int(18) NOT NULL,
  `orden` varchar(80) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idBebida` int(18) NOT NULL,
  `cantidad` int(18) NOT NULL,
  `estado` varchar(80) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `pedidosbebida`
--

INSERT INTO `pedidosbebida` (`id`, `orden`, `idBebida`, `cantidad`, `estado`) VALUES
(5, '91nz8', 14, 12, 'entregado'),
(6, 'xmg2e', 15, 2, 'pendiente'),
(7, 'rm8yz', 15, 2, 'pendiente'),
(8, 'rm8yz', 16, 7, 'pendiente'),
(9, 'f05ly', 16, 12, 'pendiente'),
(10, 'c3lg4', 16, 12, 'pendiente'),
(11, 'mixqp', 16, 12, 'cancelado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidoscomida`
--

CREATE TABLE `pedidoscomida` (
  `id` int(18) NOT NULL,
  `orden` varchar(80) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idComida` varchar(80) COLLATE utf8_spanish2_ci NOT NULL,
  `cantidad` int(18) NOT NULL,
  `estado` varchar(80) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `pedidoscomida`
--

INSERT INTO `pedidoscomida` (`id`, `orden`, `idComida`, `cantidad`, `estado`) VALUES
(5, '91nz8', '14', 12, 'entregado'),
(6, 'xmg2e', '15', 5, 'pendiente'),
(7, 'rm8yz', '15', 5, 'pendiente'),
(8, 'rm8yz', '16', 3, 'pendiente'),
(9, 'f05ly', '15', 5, 'pendiente'),
(10, 'f05ly', '16', 3, 'pendiente'),
(11, 'ompin', '15', 5, 'pendiente'),
(12, 'ompin', '16', 3, 'pendiente'),
(13, 'c3lg4', '15', 5, 'pendiente'),
(14, 'c3lg4', '16', 3, 'pendiente'),
(15, 'c3lg4', '14', 8, 'pendiente'),
(16, 'mixqp', '15', 5, 'cancelado'),
(17, 'mixqp', '16', 3, 'cancelado'),
(18, 'mixqp', '14', 8, 'cancelado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidosmozo`
--

CREATE TABLE `pedidosmozo` (
  `id` int(18) NOT NULL,
  `idMozo` int(18) NOT NULL,
  `orden` varchar(80) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `mesa` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `estado` varchar(80) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `facturacion` float NOT NULL,
  `foto` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `pedidosmozo`
--

INSERT INTO `pedidosmozo` (`id`, `idMozo`, `orden`, `mesa`, `estado`, `facturacion`, `foto`) VALUES
(5, 6, '91nz8', 'mep4a', 'entregado', 5760, NULL),
(6, 6, 'xmg2e', 'mep6a', 'en preparacion', 990, './public/img/mesas/Lucia Cardozo-mep6a-xmg2e.jpg'),
(7, 6, 'rm8yz', 'minea', 'en preparacion', 3433, NULL),
(8, 6, 'f05ly', 'mexea', 'en preparacion', 3545, NULL),
(9, 6, 'c3lg4', 'mexeb', 'en preparacion', 4185, NULL),
(10, 6, 'mixqp', 'mexec', 'cancelado', 4185, './public/img/mesas/Juan Huissi-mexec-mixqp.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidospostre`
--

CREATE TABLE `pedidospostre` (
  `id` int(18) NOT NULL,
  `orden` varchar(80) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idPostre` int(30) NOT NULL,
  `cantidad` int(18) NOT NULL,
  `estado` varchar(80) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `pedidospostre`
--

INSERT INTO `pedidospostre` (`id`, `orden`, `idPostre`, `cantidad`, `estado`) VALUES
(5, '91nz8', 14, 12, 'entregado'),
(6, 'xmg2e', 15, 4, 'pendiente'),
(7, 'rm8yz', 15, 4, 'pendiente'),
(8, 'rm8yz', 16, 7, 'pendiente'),
(9, 'f05ly', 15, 9, 'pendiente'),
(10, 'c3lg4', 15, 9, 'pendiente'),
(11, 'mixqp', 15, 9, 'cancelado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidostrago`
--

CREATE TABLE `pedidostrago` (
  `id` int(18) NOT NULL,
  `orden` varchar(80) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTrago` int(18) NOT NULL,
  `cantidad` int(18) NOT NULL,
  `estado` varchar(80) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `pedidostrago`
--

INSERT INTO `pedidostrago` (`id`, `orden`, `idTrago`, `cantidad`, `estado`) VALUES
(5, '91nz8', 14, 12, 'entregado'),
(6, 'xmg2e', 15, 3, 'pendiente'),
(7, 'rm8yz', 15, 3, 'pendiente'),
(8, 'rm8yz', 14, 4, 'pendiente'),
(9, 'f05ly', 14, 3, 'pendiente'),
(10, 'f05ly', 16, 8, 'pendiente'),
(11, 'c3lg4', 14, 3, 'pendiente'),
(12, 'c3lg4', 16, 8, 'pendiente'),
(13, 'mixqp', 14, 3, 'cancelado'),
(14, 'mixqp', 16, 8, 'cancelado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registrologeo`
--

CREATE TABLE `registrologeo` (
  `id` int(18) NOT NULL,
  `fecha` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `hora` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `registrologeo`
--

INSERT INTO `registrologeo` (`id`, `fecha`, `hora`, `idUsuario`) VALUES
(5, '16-07-2019', '02-07-06am', 6),
(6, '22-07-2019', '12-10-46am', 6),
(7, '11-10-2019', '02-26-57am', 7),
(8, '17-10-2019', '09-10-37pm', 7),
(9, '17-10-2019', '09-10-46pm', 7),
(10, '17-10-2019', '09-10-48pm', 7),
(11, '17-10-2019', '09-10-49pm', 7),
(12, '18-10-2019', '02-09-11am', 7),
(13, '18-10-2019', '02-09-52am', 6),
(14, '18-10-2019', '02-12-15am', 7),
(15, '18-10-2019', '02-18-04am', 7),
(16, '18-10-2019', '02-18-13am', 7),
(17, '18-10-2019', '02-18-13am', 7),
(18, '18-10-2019', '02-18-13am', 7),
(19, '18-10-2019', '02-18-13am', 7),
(20, '18-10-2019', '02-18-31am', 7),
(21, '18-10-2019', '02-18-31am', 7),
(22, '18-10-2019', '02-18-31am', 7),
(23, '18-10-2019', '02-18-31am', 7),
(24, '18-10-2019', '02-18-31am', 7),
(25, '18-10-2019', '02-18-31am', 7),
(26, '18-10-2019', '02-18-32am', 7),
(27, '18-10-2019', '02-18-32am', 7),
(28, '18-10-2019', '02-18-32am', 7),
(29, '18-10-2019', '02-18-32am', 7),
(30, '18-10-2019', '02-18-32am', 7),
(31, '18-10-2019', '02-18-32am', 7),
(32, '18-10-2019', '02-18-33am', 7),
(33, '18-10-2019', '02-19-43am', 7),
(34, '18-10-2019', '02-20-24am', 7),
(35, '18-10-2019', '02-20-40am', 7),
(36, '18-10-2019', '02-22-11am', 7),
(37, '18-10-2019', '02-24-26am', 7),
(38, '19-10-2019', '01-24-36am', 7),
(39, '19-10-2019', '01-31-06am', 7),
(40, '19-10-2019', '04-32-39am', 7),
(41, '19-10-2019', '11-44-34pm', 7),
(42, '19-10-2019', '11-49-35pm', 7),
(43, '20-10-2019', '12-04-57am', 7),
(44, '20-10-2019', '12-06-15am', 7),
(45, '20-10-2019', '12-07-07am', 7),
(46, '20-10-2019', '12-22-28am', 7),
(47, '20-10-2019', '12-22-52am', 7),
(48, '20-10-2019', '12-23-14am', 7),
(49, '20-10-2019', '12-26-09am', 7),
(50, '20-10-2019', '12-28-06am', 7),
(51, '20-10-2019', '12-29-20am', 7),
(52, '20-10-2019', '12-30-01am', 7),
(53, '20-10-2019', '12-30-32am', 7),
(54, '20-10-2019', '12-30-55am', 7),
(55, '20-10-2019', '12-31-29am', 7),
(56, '20-10-2019', '12-32-09am', 7),
(57, '20-10-2019', '12-32-18am', 7),
(58, '20-10-2019', '12-33-02am', 7),
(59, '20-10-2019', '12-33-20am', 7),
(60, '20-10-2019', '12-34-20am', 7),
(61, '20-10-2019', '12-38-46am', 7),
(62, '20-10-2019', '12-39-22am', 7),
(63, '20-10-2019', '12-39-28am', 7),
(64, '20-10-2019', '12-40-21am', 7),
(65, '20-10-2019', '12-40-59am', 7),
(66, '20-10-2019', '12-45-06am', 7),
(67, '20-10-2019', '12-45-37am', 7),
(68, '20-10-2019', '12-45-56am', 7),
(69, '20-10-2019', '12-46-29am', 7),
(70, '20-10-2019', '12-47-27am', 7),
(71, '20-10-2019', '12-48-17am', 7),
(72, '20-10-2019', '12-49-19am', 7),
(73, '20-10-2019', '12-50-31am', 7),
(74, '20-10-2019', '12-54-33am', 7),
(75, '20-10-2019', '12-56-09am', 7),
(76, '20-10-2019', '12-56-39am', 7),
(77, '20-10-2019', '12-58-55am', 7),
(78, '20-10-2019', '01-01-19am', 7),
(79, '20-10-2019', '01-02-17am', 7),
(80, '20-10-2019', '01-02-43am', 7),
(81, '20-10-2019', '01-02-53am', 7),
(82, '20-10-2019', '01-04-00am', 7),
(83, '20-10-2019', '01-05-05am', 7),
(84, '20-10-2019', '01-06-08am', 7),
(85, '20-10-2019', '01-08-16am', 7),
(86, '20-10-2019', '01-08-41am', 7),
(87, '20-10-2019', '01-48-17am', 7),
(88, '20-10-2019', '01-49-09am', 7),
(89, '20-10-2019', '01-50-08am', 7),
(90, '20-10-2019', '01-50-38am', 7),
(91, '20-10-2019', '01-51-17am', 13),
(92, '20-10-2019', '01-55-20am', 14),
(93, '20-10-2019', '01-56-19am', 14),
(94, '20-10-2019', '01-56-21am', 14),
(95, '20-10-2019', '01-56-22am', 14),
(96, '20-10-2019', '01-57-30am', 7),
(97, '20-10-2019', '01-57-31am', 7),
(98, '20-10-2019', '01-57-33am', 7),
(99, '20-10-2019', '02-31-56am', 21),
(100, '23-10-2019', '10-18-46pm', 7),
(101, '24-10-2019', '02-32-18am', 7),
(102, '24-10-2019', '03-59-36am', 7),
(103, '24-10-2019', '03-59-42am', 7),
(104, '24-10-2019', '11-32-07pm', 7),
(105, '24-10-2019', '11-38-26pm', 7),
(106, '25-10-2019', '01-56-03am', 7),
(107, '25-10-2019', '01-56-38am', 7),
(108, '25-10-2019', '01-56-40am', 7),
(109, '25-10-2019', '01-56-52am', 7),
(110, '25-10-2019', '02-13-43am', 7),
(111, '25-10-2019', '02-38-59am', 7),
(112, '25-10-2019', '02-58-54am', 7),
(113, '25-10-2019', '02-59-33am', 7),
(114, '25-10-2019', '01-24-29pm', 7),
(115, '25-10-2019', '03-00-43pm', 7),
(116, '25-10-2019', '05-08-20pm', 7),
(117, '28-10-2019', '11-45-01pm', 7),
(118, '28-10-2019', '11-48-16pm', 7),
(119, '28-10-2019', '11-49-57pm', 7),
(120, '28-10-2019', '11-52-08pm', 7),
(121, '28-10-2019', '11-52-50pm', 7),
(122, '28-10-2019', '11-55-51pm', 7),
(123, '29-10-2019', '12-06-00am', 7),
(124, '29-10-2019', '12-06-38am', 7),
(125, '29-10-2019', '12-06-57am', 7),
(126, '29-10-2019', '12-07-37am', 7),
(127, '29-10-2019', '12-08-08am', 7),
(128, '29-10-2019', '12-54-17am', 7),
(129, '29-10-2019', '12-54-25am', 9),
(130, '29-10-2019', '12-54-34am', 8),
(131, '29-10-2019', '12-55-27am', 10),
(132, '29-10-2019', '12-55-46am', 6),
(133, '29-10-2019', '01-20-53am', 9),
(134, '29-10-2019', '01-23-25am', 7),
(135, '29-10-2019', '01-24-16am', 7),
(136, '29-10-2019', '01-34-36am', 7),
(137, '29-10-2019', '01-38-15am', 7),
(138, '29-10-2019', '01-41-59am', 7),
(139, '29-10-2019', '01-42-25am', 7),
(140, '29-10-2019', '01-52-04am', 7),
(141, '29-10-2019', '01-56-17am', 7),
(142, '29-10-2019', '01-58-13am', 7),
(143, '29-10-2019', '02-01-53am', 7),
(144, '29-10-2019', '02-04-02am', 9),
(145, '29-10-2019', '02-05-33am', 7),
(146, '29-10-2019', '02-06-48am', 9),
(147, '29-10-2019', '02-07-30am', 7),
(148, '29-10-2019', '02-10-28am', 8),
(149, '29-10-2019', '02-11-49am', 9),
(150, '29-10-2019', '02-13-22am', 7),
(151, '29-10-2019', '02-14-22am', 7),
(152, '29-10-2019', '02-14-53am', 7),
(153, '29-10-2019', '02-15-31am', 7),
(154, '29-10-2019', '02-16-18am', 7),
(155, '29-10-2019', '02-16-50am', 7),
(156, '29-10-2019', '02-35-33am', 7),
(157, '30-10-2019', '10-44-29pm', 7),
(158, '30-10-2019', '10-45-32pm', 7),
(159, '30-10-2019', '10-46-10pm', 7),
(160, '30-10-2019', '10-47-56pm', 9),
(161, '30-10-2019', '11-10-27pm', 7),
(162, '30-10-2019', '11-10-58pm', 8),
(163, '30-10-2019', '11-12-05pm', 8),
(164, '30-10-2019', '11-17-26pm', 7),
(165, '30-10-2019', '11-18-21pm', 7),
(166, '30-10-2019', '11-19-03pm', 8),
(167, '30-10-2019', '11-20-04pm', 8),
(168, '30-10-2019', '11-22-52pm', 7),
(169, '30-10-2019', '11-23-21pm', 7),
(170, '30-10-2019', '11-25-35pm', 7),
(171, '30-10-2019', '11-26-53pm', 7),
(172, '30-10-2019', '11-29-08pm', 8),
(173, '30-10-2019', '11-29-49pm', 9),
(174, '30-10-2019', '11-31-12pm', 7),
(175, '30-10-2019', '11-32-36pm', 7),
(176, '30-10-2019', '11-34-08pm', 7),
(177, '30-10-2019', '11-34-50pm', 7),
(178, '30-10-2019', '11-36-04pm', 9),
(179, '30-10-2019', '11-36-45pm', 9),
(180, '30-10-2019', '11-37-16pm', 7),
(181, '30-10-2019', '11-38-11pm', 7),
(182, '30-10-2019', '11-39-24pm', 8),
(183, '30-10-2019', '11-39-46pm', 9),
(184, '30-10-2019', '11-43-28pm', 8),
(185, '31-10-2019', '12-18-57am', 7),
(186, '31-10-2019', '12-25-10am', 7),
(187, '31-10-2019', '12-33-13am', 8),
(188, '31-10-2019', '12-35-34am', 7),
(189, '31-10-2019', '12-36-06am', 9),
(190, '31-10-2019', '12-37-19am', 9),
(191, '31-10-2019', '12-37-19am', 9),
(192, '31-10-2019', '12-42-37am', 9),
(193, '31-10-2019', '12-47-16am', 7),
(194, '31-10-2019', '12-48-23am', 7),
(195, '31-10-2019', '12-49-31am', 7),
(196, '31-10-2019', '12-51-17am', 7),
(197, '31-10-2019', '12-52-09am', 7),
(198, '31-10-2019', '12-53-25am', 8),
(199, '31-10-2019', '01-02-58am', 8),
(200, '31-10-2019', '01-04-17am', 7),
(201, '31-10-2019', '01-07-33am', 9),
(202, '31-10-2019', '01-08-22am', 9),
(203, '31-10-2019', '01-08-59am', 7),
(204, '31-10-2019', '01-19-34am', 8),
(205, '31-10-2019', '01-19-59am', 9),
(206, '31-10-2019', '01-20-25am', 7),
(207, '31-10-2019', '01-34-58am', 8),
(208, '31-10-2019', '01-36-27am', 8),
(209, '31-10-2019', '01-38-55am', 7),
(210, '31-10-2019', '01-45-53am', 7),
(211, '31-10-2019', '01-46-44am', 9),
(212, '31-10-2019', '01-48-38am', 9),
(213, '31-10-2019', '01-49-58am', 8),
(214, '31-10-2019', '01-50-59am', 7),
(215, '31-10-2019', '01-52-32am', 8),
(216, '31-10-2019', '01-54-32am', 9),
(217, '31-10-2019', '01-58-08am', 8),
(218, '31-10-2019', '01-59-12am', 8),
(219, '31-10-2019', '02-02-38am', 9),
(220, '31-10-2019', '02-03-31am', 9),
(221, '31-10-2019', '02-19-12am', 7),
(222, '31-10-2019', '02-19-30am', 8),
(223, '31-10-2019', '03-00-49am', 9),
(224, '31-10-2019', '03-04-01am', 8),
(225, '31-10-2019', '03-04-01am', 8),
(226, '31-10-2019', '03-08-58am', 8),
(227, '31-10-2019', '03-09-29am', 9),
(228, '31-10-2019', '03-12-22am', 7),
(229, '31-10-2019', '03-14-41am', 8),
(230, '31-10-2019', '03-16-54am', 9),
(231, '31-10-2019', '03-17-59am', 9),
(232, '31-10-2019', '03-19-08am', 9),
(233, '31-10-2019', '03-20-37am', 9),
(234, '31-10-2019', '03-21-28am', 8),
(235, '31-10-2019', '03-22-47am', 8),
(236, '31-10-2019', '03-24-13am', 8),
(237, '31-10-2019', '03-34-07am', 7),
(238, '31-10-2019', '03-35-05am', 9),
(239, '31-10-2019', '03-40-49am', 8),
(240, '31-10-2019', '03-42-02am', 7),
(241, '31-10-2019', '03-43-28am', 9),
(242, '31-10-2019', '03-43-53am', 8),
(243, '31-10-2019', '12-19-12pm', 8),
(244, '31-10-2019', '12-40-18pm', 8),
(245, '31-10-2019', '12-56-03pm', 8),
(246, '31-10-2019', '05-34-56pm', 8),
(247, '31-10-2019', '05-39-04pm', 8),
(248, '31-10-2019', '05-39-29pm', 8),
(249, '31-10-2019', '05-39-35pm', 8),
(250, '31-10-2019', '05-39-37pm', 8),
(251, '31-10-2019', '05-39-46pm', 9),
(252, '31-10-2019', '05-41-09pm', 9),
(253, '31-10-2019', '05-44-06pm', 7),
(254, '31-10-2019', '05-46-44pm', 9),
(255, '31-10-2019', '10-20-22pm', 9),
(256, '31-10-2019', '10-20-47pm', 7),
(257, '31-10-2019', '10-23-30pm', 7),
(258, '31-10-2019', '10-24-39pm', 8),
(259, '31-10-2019', '10-29-04pm', 9),
(260, '31-10-2019', '10-30-53pm', 9),
(261, '31-10-2019', '10-31-40pm', 7),
(262, '31-10-2019', '11-17-26pm', 7),
(263, '31-10-2019', '11-28-14pm', 9),
(264, '31-10-2019', '11-28-41pm', 9),
(265, '31-10-2019', '11-34-10pm', 9),
(266, '31-10-2019', '11-38-55pm', 9),
(267, '31-10-2019', '11-50-11pm', 7),
(268, '01-11-2019', '12-08-41am', 8),
(269, '01-11-2019', '12-19-59am', 8),
(270, '01-11-2019', '12-20-24am', 8),
(271, '01-11-2019', '12-20-55am', 9),
(272, '01-11-2019', '12-27-35am', 9),
(273, '01-11-2019', '12-50-56am', 8),
(274, '01-11-2019', '01-17-14am', 9),
(275, '01-11-2019', '01-18-21am', 9),
(276, '01-11-2019', '01-19-32am', 7),
(277, '01-11-2019', '01-23-19am', 25),
(278, '03-11-2019', '10-14-03pm', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registrooperaciones`
--

CREATE TABLE `registrooperaciones` (
  `id` int(18) NOT NULL,
  `hora` varchar(80) COLLATE utf8_spanish2_ci NOT NULL,
  `fecha` varchar(80) COLLATE utf8_spanish2_ci NOT NULL,
  `operacion` varchar(80) COLLATE utf8_spanish2_ci NOT NULL,
  `idUsuario` int(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `registrooperaciones`
--

INSERT INTO `registrooperaciones` (`id`, `hora`, `fecha`, `operacion`, `idUsuario`) VALUES
(8, '01-51-41am', '16-07-2019', '/tp/template/Mozo/TomarPedido', 6),
(9, '01-54-16am', '16-07-2019', '/tp/template/Mozo/TomarPedido', 6),
(10, '01-54-20am', '16-07-2019', '/tp/template/Mozo/TomarPedido', 6),
(11, '01-54-31am', '16-07-2019', '/tp/template/Mozo/TomarPedido', 6),
(12, '01-55-11am', '16-07-2019', '/tp/template/Mozo/TomarPedido', 6),
(13, '01-56-18am', '16-07-2019', '/tp/template/Mozo/TomarPedido', 6),
(14, '01-59-46am', '16-07-2019', '/tp/template/Mozo/TomarPedido', 6),
(15, '02-01-17am', '16-07-2019', '/tp/template/Mozo/TomarPedido', 6),
(16, '02-03-02am', '16-07-2019', '/tp/template/Mozo/TomarPedido', 6),
(17, '02-03-27am', '16-07-2019', '/tp/template/Mozo/TomarPedido', 6),
(18, '02-04-35am', '16-07-2019', '/tp/template/Mozo/TomarPedido', 6),
(19, '02-04-43am', '16-07-2019', '/tp/template/Mozo/TomarFotografia', 6),
(20, '02-05-15am', '16-07-2019', '/tp/template/Mozo/TomarFotografia', 6),
(21, '02-05-51am', '16-07-2019', '/tp/template/Mozo/TomarFotografia', 6),
(22, '02-06-35am', '16-07-2019', '/tp/template/Mozo/CancelarPedido', 6),
(23, '02-08-21am', '16-07-2019', '/tp/template/Mozo/ServirPedido', 6),
(24, '02-08-42am', '16-07-2019', '/tp/template/Cocinero/CocinarPedido', 6),
(25, '02-09-11am', '16-07-2019', '/tp/template/Cocinero/CocinarPedido', 6),
(26, '02-09-17am', '16-07-2019', '/tp/template/Cocinero/TerminarPedido', 6),
(27, '02-09-25am', '16-07-2019', '/tp/template/Cocinero/PrepararPostre', 6),
(28, '02-09-32am', '16-07-2019', '/tp/template/Cocinero/TerminarPedidoPostre', 6),
(29, '02-09-49am', '16-07-2019', '/tp/template/Bartender/PrepararPedido', 6),
(30, '02-09-53am', '16-07-2019', '/tp/template/Bartender/TerminarPedido', 6),
(31, '02-10-02am', '16-07-2019', '/tp/template/Mozo/ServirPedido', 6),
(32, '02-10-18am', '16-07-2019', '/tp/template/Cervecero/PrepararPedido', 6),
(33, '02-10-29am', '16-07-2019', '/tp/template/Cervecero/TerminarPedido', 6),
(34, '02-10-59am', '16-07-2019', '/tp/template/Mozo/ServirPedido', 6),
(35, '02-11-25am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(36, '02-13-33am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(37, '02-13-42am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(38, '02-14-39am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(39, '02-14-45am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(40, '02-14-50am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(41, '02-14-57am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(42, '02-15-25am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(43, '02-16-00am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(44, '02-16-42am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(45, '02-17-03am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(46, '02-17-05am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(47, '02-17-19am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(48, '02-17-22am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(49, '02-17-28am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(50, '02-17-38am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(51, '02-17-45am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(52, '02-17-52am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(53, '02-18-07am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(54, '02-18-18am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(55, '02-18-36am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(56, '02-19-33am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(57, '02-19-49am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(58, '02-19-54am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(59, '02-20-04am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(60, '02-20-20am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(61, '02-20-24am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(62, '02-20-31am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(63, '02-21-35am', '16-07-2019', '/tp/template/Mozo/CobrarPedido', 6),
(64, '02-32-23am', '16-07-2019', '/tp/template/Cocinero/', 6),
(65, '02-37-44am', '16-07-2019', '/tp/template/Socio/Administracion/Mesas/MejoresComentarios', 6),
(66, '02-37-52am', '16-07-2019', '/tp/template/Socio/Administracion/Mesas/PeoresComentarios', 6),
(67, '02-38-29am', '16-07-2019', '/tp/template/Socio/Administracion/Mesas/FacturaMasBaja', 6),
(68, '02-38-37am', '16-07-2019', '/tp/template/Socio/Administracion/Mesas/FacturaMasAlta', 6),
(69, '02-40-23am', '16-07-2019', '/tp/template/Socio/Administracion/Mesas/FacturaMasAlta', 6),
(70, '02-40-32am', '16-07-2019', '/tp/template/Socio/Administracion/Mesas/FacturaMasAlta', 6),
(71, '03-09-43am', '16-07-2019', '/tp/template/Socio/Administracion/Mesas/FacturaMasAlta', 6),
(72, '03-10-16am', '16-07-2019', '/tp/template/Socio/Administracion/Mesas/FacturaMasAlta', 6),
(73, '03-12-01am', '16-07-2019', '/tp/template/Socio/Administracion/Pedidos/MasVendido', 6),
(74, '03-12-13am', '16-07-2019', '/tp/template/Socio/Administracion/Pedidos/MenosVendido', 6),
(75, '03-12-36am', '16-07-2019', '/tp/template/Socio/Administracion/Pedidos/Cancelados', 6),
(76, '03-13-11am', '16-07-2019', '/tp/template/Socio/Pedidos/', 6),
(77, '03-13-18am', '16-07-2019', '/tp/template/Socio/Pedidos/EnPreparacion', 6),
(78, '03-13-22am', '16-07-2019', '/tp/template/Socio/Pedidos/Terminados', 6),
(79, '03-13-34am', '16-07-2019', '/tp/template/Socio/Pedidos/CerrarMesa', 6),
(80, '03-13-36am', '16-07-2019', '/tp/template/Socio/Pedidos/CerrarMesa', 6),
(81, '03-13-51am', '16-07-2019', '/tp/template/Socio/Pedidos/CerrarMesa', 6),
(82, '03-14-09am', '16-07-2019', '/tp/template/Socio/Pedidos/LiberarMesas', 6),
(83, '12-10-58am', '22-07-2019', '/tp/template/Mozo/CambiarPedidoComida', 6),
(84, '12-11-02am', '22-07-2019', '/tp/template/Mozo/CambiarPedidoComida', 6),
(85, '12-11-25am', '22-07-2019', '/tp/template/Mozo/CambiarPedidoComida', 6),
(86, '12-11-35am', '22-07-2019', '/tp/template/Mozo/CambiarPedidoComida', 6),
(87, '12-11-45am', '22-07-2019', '/tp/template/Mozo/CambiarPedidoComida', 6),
(88, '12-12-00am', '22-07-2019', '/tp/template/Mozo/CambiarPedidoComida', 6),
(89, '12-12-28am', '22-07-2019', '/tp/template/Mozo/CambiarPedidoComida', 6),
(90, '12-12-53am', '22-07-2019', '/tp/template/Mozo/CambiarPedidoComida', 6),
(91, '12-17-51am', '22-07-2019', '/tp/template/Mozo/CambiarPedidoComida', 6),
(92, '12-18-06am', '22-07-2019', '/tp/template/Mozo/CambiarPedidoComida', 6),
(93, '02-27-17am', '11-10-2019', '/template/Cocinero/', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(18) NOT NULL,
  `nombre` varchar(80) COLLATE utf8_spanish2_ci NOT NULL,
  `clave` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `role` varchar(80) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `clave`, `role`) VALUES
(6, 'admin', '$2y$10$MdKy.Oq9msQZ0jiz5abx5eP2zyOYRJL0u3x/uFCOnukVJHb35qyTu', 'admin'),
(7, 'cocinero', '$2y$10$e8OpM0ujKf9783VTASYgLeFf4zDDgufiX1G.KziVv/5ynGg42C/Si', 'cocinero'),
(8, 'cervecero', '$2y$10$D3iv0WGEcEwPPPHX./WXZO3lOsyXGvE4Mo69yGDqLj5fWQEGur6Yi', 'cervecero'),
(9, 'bartender', '$2y$10$MgeUwqWkCiibTOPlhI9Sv.2C6nbkzJKv9rfsjcb1Clod0NiGmho2C', 'bartender'),
(10, 'mozo', '$2y$10$Os5lB6m2kQijyPWxOOArs.X3QvGG48YXpHoBOZG/YZXf.E.mXBPym', 'mozo'),
(11, 'mozo1', '$2y$10$cMaGJEJnka7h.skgcYizc.CUbsYPlcgok9g5NhUs7rqDuciaI.hzC', 'mozo'),
(15, 'yonykikok', '$2y$10$Z0.CDUmGAXLxvBjeRAwYj.creK5KTGszgSkdpqENoD8qOYCOfF2Ny', 'cliente'),
(16, 'yonykikok', '$2y$10$FEbm2waPrmz6Bf5XTDA97ODkotjxbm3Wx1lOdeXuKuUK9OG1o2sgu', 'cliente'),
(17, 'yonykikok', '$2y$10$chedqaR0d5gy1fX1RLnhaOvc37zYNUaOobPajb0lWL/HNhAQvlHjC', 'cliente'),
(18, 'cocinero', '$2y$10$9BI4gbP1olKzJGJzQ/OwxeEJVDvTYcrW09gGLK.w0O1DGqArT.Le2', 'algo'),
(19, 'cocinero', '$2y$10$80o9z/A4OQ6FZJy82YCZxu.LOWwizvXT/o6y07xY6TFs6k1XOQyyi', 'algo'),
(20, 'cocinero', '$2y$10$lsV//odc8MwqWRoKnHa6p.ncApAeasxpGlcwGIYAm4Rw/oiAkdeiW', 'algo'),
(21, 'adasds', '$2y$10$e7gElPbcou/eyNS877jR0e/Tq4fBR8G3QfLYXJ3qBv61xw1niTAni', 'cliente'),
(22, 'cervecero', '$2y$10$/uPrSD69/zw9TKFIHN3fGOMLAb7p.KJnqv29l0FA0UnOj13a4H1qu', 'cliente'),
(23, 'cervecero', '$2y$10$htklmO5tkJk1yI8Zru2J4uWkibT0JBPyCbryF5ph/1Bwp9i8gqUzW', 'cliente'),
(24, 'cervecero', '$2y$10$FfVzXAgY6JZ6sT6uCEdpo.rxsFzn1NTuqVVTVZV9zQIHC86MSyWIC', 'cliente'),
(25, 'jonathan', '$2y$10$Ga6YT/16zk6tyu9pm1GzIuZUTJQ23H5QVov1j7Ayh1.ry4oVsQbWa', 'cliente');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `menubebidas`
--
ALTER TABLE `menubebidas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `menucomidas`
--
ALTER TABLE `menucomidas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `menupostres`
--
ALTER TABLE `menupostres`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `menutragos`
--
ALTER TABLE `menutragos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mesas`
--
ALTER TABLE `mesas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedidosbebida`
--
ALTER TABLE `pedidosbebida`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedidoscomida`
--
ALTER TABLE `pedidoscomida`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedidosmozo`
--
ALTER TABLE `pedidosmozo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedidospostre`
--
ALTER TABLE `pedidospostre`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedidostrago`
--
ALTER TABLE `pedidostrago`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `registrologeo`
--
ALTER TABLE `registrologeo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `registrooperaciones`
--
ALTER TABLE `registrooperaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  MODIFY `id` int(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `menubebidas`
--
ALTER TABLE `menubebidas`
  MODIFY `id` int(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1002;

--
-- AUTO_INCREMENT de la tabla `menucomidas`
--
ALTER TABLE `menucomidas`
  MODIFY `id` int(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1001;

--
-- AUTO_INCREMENT de la tabla `menupostres`
--
ALTER TABLE `menupostres`
  MODIFY `id` int(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1001;

--
-- AUTO_INCREMENT de la tabla `menutragos`
--
ALTER TABLE `menutragos`
  MODIFY `id` int(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1009;

--
-- AUTO_INCREMENT de la tabla `mesas`
--
ALTER TABLE `mesas`
  MODIFY `id` int(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `pedidosbebida`
--
ALTER TABLE `pedidosbebida`
  MODIFY `id` int(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `pedidoscomida`
--
ALTER TABLE `pedidoscomida`
  MODIFY `id` int(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `pedidosmozo`
--
ALTER TABLE `pedidosmozo`
  MODIFY `id` int(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `pedidospostre`
--
ALTER TABLE `pedidospostre`
  MODIFY `id` int(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `pedidostrago`
--
ALTER TABLE `pedidostrago`
  MODIFY `id` int(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `registrologeo`
--
ALTER TABLE `registrologeo`
  MODIFY `id` int(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=279;

--
-- AUTO_INCREMENT de la tabla `registrooperaciones`
--
ALTER TABLE `registrooperaciones`
  MODIFY `id` int(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(18) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
