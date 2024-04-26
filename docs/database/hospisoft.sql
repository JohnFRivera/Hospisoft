-- [AUTOR] - John Freddy Rivera Ayala
--
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-04-2024 a las 01:29:27
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hospisoft`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `campañas`
--

CREATE TABLE `campañas` (
  `id` int(11) NOT NULL,
  `titulo` varchar(250) NOT NULL,
  `fecha_hora` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `id` bigint(20) NOT NULL,
  `fk_paciente` bigint(20) NOT NULL,
  `fk_medico` bigint(20) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formulas_medicas`
--

CREATE TABLE `formulas_medicas` (
  `id` bigint(20) NOT NULL,
  `diagnostico` varchar(250) NOT NULL,
  `medicinas` varchar(250) NOT NULL,
  `examenes_medicos` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historias_clinicas`
--

CREATE TABLE `historias_clinicas` (
  `id` bigint(20) NOT NULL,
  `fk_paciente` bigint(20) NOT NULL,
  `fk_formula_medica` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicinas`
--

CREATE TABLE `medicinas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `existencia` int(11) NOT NULL,
  `valor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos`
--

CREATE TABLE `medicos` (
  `identificacion` bigint(20) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `especialidad` varchar(150) NOT NULL,
  `email` varchar(200) NOT NULL,
  `contraseña` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `identificacion` bigint(20) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `movil` varchar(10) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `eps` varchar(100) NOT NULL,
  `usuario` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `contraseña` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `identificacion` bigint(20) NOT NULL,
  `usuario` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `contraseña` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`identificacion`, `usuario`, `email`, `contraseña`) VALUES
(1, 'admin', 'admin@admin.com', 'root');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `campañas`
--
ALTER TABLE `campañas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_paciente_citas_pacientes` (`fk_paciente`),
  ADD KEY `fk_medico_citas_medicos` (`fk_medico`);

--
-- Indices de la tabla `formulas_medicas`
--
ALTER TABLE `formulas_medicas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `historias_clinicas`
--
ALTER TABLE `historias_clinicas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_formula_medica_historias_clinicas_formulas_medicas` (`fk_formula_medica`),
  ADD KEY `fk_paciente_historias_clinicas_pacientes` (`fk_paciente`);

--
-- Indices de la tabla `medicinas`
--
ALTER TABLE `medicinas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`identificacion`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`identificacion`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`identificacion`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `fk_medico_citas_medicos` FOREIGN KEY (`fk_medico`) REFERENCES `medicos` (`identificacion`),
  ADD CONSTRAINT `fk_paciente_citas_pacientes` FOREIGN KEY (`fk_paciente`) REFERENCES `pacientes` (`identificacion`);

--
-- Filtros para la tabla `historias_clinicas`
--
ALTER TABLE `historias_clinicas`
  ADD CONSTRAINT `fk_formula_medica_historias_clinicas_formulas_medicas` FOREIGN KEY (`fk_formula_medica`) REFERENCES `formulas_medicas` (`id`),
  ADD CONSTRAINT `fk_paciente_historias_clinicas_pacientes` FOREIGN KEY (`fk_paciente`) REFERENCES `pacientes` (`identificacion`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
