-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-06-2024 a las 10:27:45
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

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
  `fecha` date NOT NULL,
  `hora` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `campañas`
--

INSERT INTO `campañas` (`id`, `titulo`, `fecha`, `hora`) VALUES
(1, 'Campaña de Vacunación contra la Influenza', '2024-07-01', '10:00:00'),
(2, 'Jornada de Detección de Diabetes', '2024-07-10', '09:00:00'),
(3, 'Taller de Nutrición y Salud', '2024-07-15', '14:00:00'),
(4, 'Campaña de Donación de Sangre', '2024-07-20', '08:00:00'),
(5, 'Chequeo General Gratuito', '2024-07-25', '11:00:00'),
(6, 'Taller de Prevención de Enfermedades Cardíacas', '2024-07-30', '15:00:00'),
(7, 'Jornada de Salud Mental', '2024-08-05', '13:00:00'),
(8, 'Campaña de Prevención del Cáncer de Mama', '2024-08-10', '10:30:00'),
(9, 'Taller de Ejercicio y Bienestar', '2024-08-15', '16:00:00'),
(10, 'Consulta Gratuita de Pediatría', '2024-08-20', '09:30:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `id` bigint(20) NOT NULL,
  `FK_idPaciente` bigint(20) NOT NULL,
  `FK_idMedico` bigint(20) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `citas`
--

INSERT INTO `citas` (`id`, `FK_idPaciente`, `FK_idMedico`, `fecha`, `hora`) VALUES
(1, 1, 2, '2024-07-01', '10:00:00'),
(2, 2, 3, '2024-07-02', '11:00:00'),
(3, 3, 4, '2024-07-03', '09:00:00'),
(4, 4, 5, '2024-07-04', '12:00:00'),
(5, 5, 1, '2024-07-05', '08:00:00'),
(6, 1, 3, '2024-07-06', '13:00:00'),
(7, 2, 4, '2024-07-07', '14:00:00'),
(8, 3, 5, '2024-07-08', '15:00:00'),
(9, 4, 1, '2024-07-09', '16:00:00'),
(10, 5, 2, '2024-07-10', '10:30:00');

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

--
-- Volcado de datos para la tabla `formulas_medicas`
--

INSERT INTO `formulas_medicas` (`id`, `diagnostico`, `medicinas`, `examenes_medicos`) VALUES
(1, 'Gripe', 'Paracetamol, Ibuprofeno', 'Examen de sangre, Radiografía de tórax'),
(2, 'Diabetes', 'Metformina, Insulina', 'Prueba de glucosa, Hemoglobina A1C'),
(3, 'Hipertensión', 'Enalapril, Atenolol', 'Electrocardiograma, Prueba de presión arterial'),
(4, 'Alergia', 'Loratadina, Desloratadina', 'Prueba de alergias, Examen de sangre'),
(5, 'Artritis', 'Diclofenaco, Ibuprofeno', 'Radiografía de articulaciones, Examen de sangre'),
(6, 'Infección Urinaria', 'Ciprofloxacino, Amoxicilina', 'Análisis de orina, Urocultivo'),
(7, 'Asma', 'Salbutamol, Budesonida', 'Espirometría, Prueba de alergias'),
(8, 'Gastritis', 'Omeprazol, Ranitidina', 'Endoscopia, Prueba de H. pylori'),
(9, 'Anemia', 'Sulfato Ferroso, Ácido Fólico', 'Hemograma completo, Prueba de ferritina'),
(10, 'Migraña', 'Sumatriptán, Naproxeno', 'Resonancia magnética, Tomografía computarizada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historias_clinicas`
--

CREATE TABLE `historias_clinicas` (
  `id` bigint(20) NOT NULL,
  `FK_idPaciente` bigint(20) NOT NULL,
  `FK_idFormula_medica` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historias_clinicas`
--

INSERT INTO `historias_clinicas` (`id`, `FK_idPaciente`, `FK_idFormula_medica`) VALUES
(1, 1, 9),
(2, 1, 2),
(3, 2, 4),
(4, 3, 8),
(5, 4, 5),
(6, 5, 10),
(7, 1, 1),
(8, 2, 3),
(9, 3, 7),
(10, 5, 6);

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

--
-- Volcado de datos para la tabla `medicinas`
--

INSERT INTO `medicinas` (`id`, `nombre`, `existencia`, `valor`) VALUES
(1, 'Paracetamol', 150, 79461),
(2, 'Ibuprofeno', 200, 135759),
(3, 'Amoxicilina', 100, 140412),
(4, 'Omeprazol', 50, 289783),
(5, 'Metformina', 75, 137676),
(6, 'Loratadina', 120, 109034),
(7, 'Aspirina', 180, 127142),
(8, 'Ciprofloxacino', 90, 8608),
(9, 'Diclofenaco', 130, 246616),
(10, 'Enalapril', 60, 22253);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos`
--

CREATE TABLE `medicos` (
  `id` bigint(20) NOT NULL,
  `identificacion` bigint(20) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `especialidad` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicos`
--

INSERT INTO `medicos` (`id`, `identificacion`, `nombres`, `apellidos`, `especialidad`) VALUES
(1, 345678, 'Jane', 'Doe', 'Cardiología'),
(2, 789012, 'Laura', 'Brown', 'Pediatría'),
(3, 123457, 'Amy', 'Wilson', 'Dermatología'),
(4, 567891, 'Nicolas', 'Murphy', 'Neurología'),
(5, 901235, 'Charles', 'Martin', 'Ginecología');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id` bigint(20) NOT NULL,
  `identificacion` varchar(25) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `movil` varchar(10) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `eps` varchar(10) NOT NULL,
  `usuario` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`id`, `identificacion`, `nombres`, `apellidos`, `fecha_nacimiento`, `movil`, `telefono`, `eps`, `usuario`) VALUES
(1, '234567', 'John', 'Doe', '1990-05-15', '3012345678', '6012345678', 'Coosalud', 'johndoe'),
(2, '678901', 'Paul', 'Walker', '1985-11-22', '3023456789', '6023456789', 'Barrios Un', 'paulwalker'),
(3, '012345', 'Chris', 'Green', '1992-07-08', '3034567890', '6034567890', 'Sos', 'chrisgreen'),
(4, '456780', 'Daniel', 'Taylor', '1988-03-19', '3045678901', '6045678901', 'Coosalud', 'danieltaylor'),
(5, '890124', 'Sarah', 'Davis', '1995-01-25', '3056789012', '6056789012', 'Barrios Un', 'sarahdavis');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` bigint(20) NOT NULL,
  `identificacion` varchar(25) NOT NULL,
  `usuario` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `contraseña` varchar(250) NOT NULL,
  `rol` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `identificacion`, `usuario`, `email`, `contraseña`, `rol`) VALUES
(1, '123456', 'admin', 'admin@example.com', 'AdminPass2024', 'Administrador'),
(2, '234567', 'johndoe', 'johndoe@example.com', 'John1234', 'Paciente'),
(3, '345678', 'janedoe', 'janedoe@example.com', 'Jane1234', 'Medico'),
(4, '456789', 'mikejohnson', 'mikejohnson@example.com', 'Mike2024', 'Secretaria'),
(5, '567890', 'lisasimpson', 'lisasimpson@example.com', 'Lisa2024', 'Dispensario'),
(6, '678901', 'paulwalker', 'paulwalker@example.com', 'Paul2024', 'Paciente'),
(7, '789012', 'laurabrown', 'laurabrown@example.com', 'Laura2024', 'Medico'),
(8, '890123', 'davidwhite', 'davidwhite@example.com', 'David2024', 'Secretaria'),
(9, '901234', 'emilyclark', 'emilyclark@example.com', 'Emily2024', 'Dispensario'),
(10, '012345', 'chrisgreen', 'chrisgreen@example.com', 'Chris2024', 'Paciente'),
(11, '123457', 'amywilson', 'amywilson@example.com', 'Amy2024', 'Medico'),
(12, '234568', 'brianlee', 'brianlee@example.com', 'Brian2024', 'Secretaria'),
(13, '345679', 'sophiemartin', 'sophiemartin@example.com', 'Sophie2024', 'Dispensario'),
(14, '456780', 'danieltaylor', 'danieltaylor@example.com', 'Daniel2024', 'Paciente'),
(15, '567891', 'nicolasmurphy', 'nicolasmurphy@example.com', 'Nicolas2024', 'Medico'),
(16, '678902', 'victoriaperez', 'victoriaperez@example.com', 'Victoria2024', 'Secretaria'),
(17, '789013', 'oliverbrown', 'oliverbrown@example.com', 'Oliver2024', 'Dispensario'),
(18, '890124', 'sarahdavis', 'sarahdavis@example.com', 'Sarah2024', 'Paciente'),
(19, '901235', 'charlesmartin', 'charlesmartin@example.com', 'Charles2024', 'Medico'),
(20, '012346', 'angelawilson', 'angelawilson@example.com', 'Angela2024', 'Secretaria');

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
  ADD KEY `FK_idPaciente_citas` (`FK_idPaciente`),
  ADD KEY `FK_idmedico` (`FK_idMedico`);

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
  ADD KEY `FK_idPaciente` (`FK_idPaciente`),
  ADD KEY `FK_idFormula_medica` (`FK_idFormula_medica`);

--
-- Indices de la tabla `medicinas`
--
ALTER TABLE `medicinas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `NOMBRE` (`nombre`);

--
-- Indices de la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDENTIFICACION` (`identificacion`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDENTIFICACION` (`identificacion`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `identificacion` (`identificacion`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `campañas`
--
ALTER TABLE `campañas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `formulas_medicas`
--
ALTER TABLE `formulas_medicas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `historias_clinicas`
--
ALTER TABLE `historias_clinicas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `medicinas`
--
ALTER TABLE `medicinas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `medicos`
--
ALTER TABLE `medicos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `FK_idPaciente_citas` FOREIGN KEY (`FK_idPaciente`) REFERENCES `pacientes` (`id`),
  ADD CONSTRAINT `FK_idmedico` FOREIGN KEY (`FK_idMedico`) REFERENCES `medicos` (`id`);

--
-- Filtros para la tabla `historias_clinicas`
--
ALTER TABLE `historias_clinicas`
  ADD CONSTRAINT `FK_idFormula_medica` FOREIGN KEY (`FK_idFormula_medica`) REFERENCES `formulas_medicas` (`id`),
  ADD CONSTRAINT `FK_idPaciente` FOREIGN KEY (`FK_idPaciente`) REFERENCES `pacientes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
