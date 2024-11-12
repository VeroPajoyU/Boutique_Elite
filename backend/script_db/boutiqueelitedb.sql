--
-- Database: `boutiqueelitedb`
--
CREATE DATABASE IF NOT EXISTS `boutiqueelitedb` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

USE boutiqueelitedb;

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- --------------------
-- PARAMETRIC TABLES --
-- --------------------
--
-- Table structure for table `roles`
--
CREATE TABLE IF NOT EXISTS `roles` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

INSERT INTO `roles` (`nombre_rol`) VALUES
	('Administrador'),
	('Usuario');
    
--
-- Table structure for table `marcas`
--
CREATE TABLE IF NOT EXISTS `marcas` (
  `id_marca` int NOT NULL AUTO_INCREMENT,
  `nombre_marca` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_marca`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

INSERT INTO `marcas` (`nombre_marca`) VALUES
	('Nike'),
	('Adidas'),
	('Puma'),
	('New Balance'),
	('Vans'),
	('Gap'),
	('H&M'),
	('Zara'),
	('Calvin Klein'),
	('American Eagle'),
	('Guess'),
	('Diesel'),
	('Gucci'),
	('Prada'),
	('Louis Vuitton'),
	('Chanel');

-- 
-- Table structure for table `tallas`
--
CREATE TABLE IF NOT EXISTS `tallas` (
  `id_talla` int NOT NULL AUTO_INCREMENT,
  `nombre_talla` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_talla`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

INSERT INTO `tallas` (`nombre_talla`) VALUES
	('S'),
	('M'),
	('L'),
	('XL'),
	('U'),
	('6'),
	('8'),
	('10'),
	('12'),
	('28'),
	('30'),
	('32'),
	('34'),
	('36'),
	('38');
    
-- 
-- Table structure for table `colores`
--
CREATE TABLE IF NOT EXISTS `colores` (
  `id_color` int NOT NULL AUTO_INCREMENT,
  `nombre_color` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_color`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

INSERT INTO `colores` (`nombre_color`) VALUES
	('Blanco'),
	('Negro'),
	('Gris'),
	('Azul'),
	('Rojo'),
	('Verde'),
	('Amarillo'),
	('Naranja'),
	('Rosa'),
	('Morado'),
	('Café'),
	('Beige'),
	('Turquesa'),
	('Violeta'),
	('Dorado'),
	('Plateado');

-- 
-- Table structure for table `categorias`
--
CREATE TABLE IF NOT EXISTS `categorias` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

INSERT INTO `categorias` (`nombre_categoria`) VALUES
	('Hombre'),
	('Mujer'),
	('Niño'),
	('Niña');

-- 
-- Table structure for table `usuarios`
--
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `login_usuario` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `nombre_usuario` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email_usuario` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  `celular_usuario` varchar(16) COLLATE utf8_unicode_ci,
  `password_usuario` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `fecha_registro_usuario` datetime NOT NULL DEFAULT Current_Timestamp,
  `id_rol_usuario` int NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `usuarios` 
(`id_usuario`, `login_usuario`, `nombre_usuario`, `email_usuario`, `celular_usuario`, `password_usuario`, `fecha_registro_usuario`, `id_rol_usuario`) VALUES
('1', 'cristianmusse', 'Cristian Musse', 'cristianmusse@gmail.com', '3151234567', 'clavecristian', NOW(), 1),
('2', 'veropajoy', 'Verónica Pajoy', 'veropajoy@gmail.com', '3109876543', 'clavevero', NOW(), 2),
('3', 'danilocollazos', 'Danilo Collazos', 'danilocollazos@gmail.com', '3109876543', 'clavedanilo', NOW(), 2);

ALTER TABLE `usuarios`
  ADD KEY (`id_rol_usuario`),
  ADD CONSTRAINT `fk_perfil_usuario` FOREIGN KEY (`id_rol_usuario`) REFERENCES `roles` (`id_rol`)
  on update no action
  on delete no action;

-- 
-- Table structure for table `productos`
--
CREATE TABLE IF NOT EXISTS `productos` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `costo_producto` int NOT NULL,
  `descripcion_producto` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `cantidad_producto` int NOT NULL,
  `id_marca_producto` int NOT NULL,
  `id_talla_producto` int NOT NULL,
  `id_color_producto` int NOT NULL,
  `id_categoria_producto` int NOT NULL,
  PRIMARY KEY (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

INSERT INTO `productos` 
(`nombre_producto`, `costo_producto`, `descripcion_producto`, `cantidad_producto`, `id_marca_producto`, 
`id_talla_producto`, `id_color_producto`, `id_categoria_producto`) VALUES
	('Blusas / Tops',		30000,'Esta es una descripción del producto Blusas / Tops.',		 23,  8,  2, 1,2),
	('Camisetas',			50000,'Esta es una descripción del producto Camisetas.',			234,  7,  3, 3,1),
	('Camisas',				30000,'Esta es una descripción del producto Camisas.',				 64,  7,  2, 4,1),
	('Camisas manga larga',	50000,'Esta es una descripción del producto Camisas manga larga.',	 64, 13,  1, 4,3),
	('Camisas manga larga',	50000,'Esta es una descripción del producto Camisas manga larga.',	 64, 13,  1, 9,3),
	('Pantalones de tela',	80000,'Esta es una descripción del producto Pantalones de tela.',	763, 13, 11, 3,1),
	('Pantalones de tela',	80000,'Esta es una descripción del producto Pantalones de tela.',	761, 13, 12, 3,1),
	('Pantalones Jeans',	90000,'Esta es una descripción del producto Pantalones Jeans.',		 23, 10, 12, 4,1),
	('Pantalonetas',		30000,'Esta es una descripción del producto Pantalonetas.',			654, 16,  8, 4,3),
	('Shorts',				40000,'Esta es una descripción del producto Shorts.',				865, 15,  6, 4,2),
	('Shorts',				40000,'Esta es una descripción del producto Shorts.',				865, 15,  7, 4,2),
	('Faldas',				40000,'Esta es una descripción del producto Faldas.',				232,  8,  6, 4,4),
	('Faldas',				40000,'Esta es una descripción del producto Faldas.',				232,  8,  6, 9,4),
	('Vestidos',			100000,'Esta es una descripción del producto Vestidos.',			 67,  8,  5, 2,2),
	('Trajes',				100000,'Esta es una descripción del producto Trajes.',				 23, 15, 12, 4,1),
	('Chaquetas',			100000,'Esta es una descripción del producto Chaquetas.',			 87, 10,  1, 2,3),
	('Chaquetas',			100000,'Esta es una descripción del producto Chaquetas.',			 87, 10,  1, 3,3),
	('Busos',				80000,'Esta es una descripción del producto Busos.',				 23,  2,  2, 1,1),
	('Sudaderas',			60000,'Esta es una descripción del producto Sudaderas.',			 98,  1,  6, 1,3),
	('Ropa Interior',		20000,'Esta es una descripción del producto Ropa Interior.',		 23,  9, 10, 1,1),
	('Calcetines',			10000,'Esta es una descripción del producto Calcetines.',			 98,  1,  5, 3,1),
	('Calcetines',			10000,'Esta es una descripción del producto Calcetines.',			 98,  3,  5, 3,3),
	('Trajes de Baño',		80000,'Esta es una descripción del producto Trajes de Baño.',		 86,  8,  1, 1,2),
	('Ropa Deportiva',		50000,'Esta es una descripción del producto Ropa Deportiva.',		 97,  4, 10, 1,1),
	('Ropa de Dormir',		40000,'Esta es una descripción del producto Ropa de Dormir.',		 34, 12,  7, 4,3),
	('Ropa de Dormir',		40000,'Esta es una descripción del producto Ropa de Dormir.',		 34, 12,  7, 1,3);
    
ALTER TABLE `productos`
  ADD KEY (`id_marca_producto`),
  ADD KEY (`id_talla_producto`),
  ADD KEY (`id_color_producto`),
  ADD KEY (`id_categoria_producto`),
  ADD CONSTRAINT `fk_marca_producto` FOREIGN KEY (`id_marca_producto`) REFERENCES `marcas` (`id_marca`)
  on update no action
  on delete no action,
  ADD CONSTRAINT `fk_talla_producto` FOREIGN KEY (`id_talla_producto`) REFERENCES `tallas` (`id_talla`)
  on update no action
  on delete no action,
  ADD CONSTRAINT `fk_color_producto` FOREIGN KEY (`id_color_producto`) REFERENCES `colores` (`id_color`)
  on update no action
  on delete no action,
  ADD CONSTRAINT `fk_categoria_producto` FOREIGN KEY (`id_categoria_producto`) REFERENCES `categorias` (`id_categoria`)
  on update no action
  on delete no action;

-- 
-- Table structure for table `fotos`
--
CREATE TABLE IF NOT EXISTS `fotos` (
  `id_foto` int NOT NULL AUTO_INCREMENT,
  `ruta_foto` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `id_producto_foto` int NOT NULL,
  PRIMARY KEY (`id_foto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `fotos` (`ruta_foto`, `id_producto_foto`) VALUES
	('foto_blusas.jpg', 1),
	('foto_camisetas.jpg', 2),
	('foto_camisas.jpg', 3),
	('foto_camisas_manga_larga_azul.jpg', 4),
	('foto_camisas_manga_larga_rosa.jpg', 5),
	('foto_pantalones_tela_talla30.jpg', 6),
	('foto_pantalones_tela_talla32.jpg', 7),
	('foto_pantalones_jeans.jpg', 8),
	('foto_pantalonetas.jpg', 9),
	('foto_shorts_talla6.jpg', 10),
	('foto_shorts_talla8.jpg', 11),
	('foto_faldas_azul.jpg', 12),
	('foto_faldas_rosa.jpg', 13),
	('foto_vestidos.jpg', 14),
	('foto_trajes.jpg', 15),
	('foto_chaquetas_negro.jpg', 16),
	('foto_chaquetas_gris.jpg', 17),
	('foto_busos.jpg', 18),
	('foto_sudaderas.jpg', 19),
	('foto_ropa_interior.jpg', 20),
	('foto_calcetines_hombre.jpg', 21),
	('foto_calcetines_nino.jpg', 22),
	('foto_trajes_de_baño.jpg', 23),
	('foto_ropa_deportiva.jpg', 24),
	('foto_ropa_de_dormir_azul.jpg', 25),
	('foto_ropa_de_dormir_blanco.jpg', 26);
    
ALTER TABLE `fotos`
  ADD KEY (`id_producto_foto`),
  ADD CONSTRAINT `fk_producto_foto` FOREIGN KEY (`id_producto_foto`) REFERENCES `productos` (`id_producto`)
  on update no action
  on delete no action;

-- 
-- Table structure for table `carritos`
--
CREATE TABLE IF NOT EXISTS `carritos` (
  `id_usuario_carrito` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `id_producto_carrito` int NOT NULL,
  `cantidadproducto_carrito` int NOT NULL,
  `fecha_registro_carrito` datetime NOT NULL DEFAULT Current_Timestamp
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `carritos` (`id_usuario_carrito`, `id_producto_carrito`,`cantidadproducto_carrito`,`fecha_registro_carrito`) VALUES
	('2',1,2,NOW());
    
ALTER TABLE `carritos`
  ADD KEY (`id_usuario_carrito`),
  ADD KEY (`id_producto_carrito`),
  ADD CONSTRAINT `fk_usuario_carrito` FOREIGN KEY (`id_usuario_carrito`) REFERENCES `usuarios` (`id_usuario`)
  on update no action
  on delete no action,
  ADD CONSTRAINT `fk_producto_carrito` FOREIGN KEY (`id_producto_carrito`) REFERENCES `productos` (`id_producto`)
  on update no action
  on delete no action;

-- 
-- Table structure for table `favoritos`
--
CREATE TABLE IF NOT EXISTS `favoritos` (
  `id_usuario_favorito` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `id_producto_favorito` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `favoritos` (`id_usuario_favorito`, `id_producto_favorito`) VALUES
	('2',1),('3',2);
    
ALTER TABLE `favoritos`
  ADD KEY (`id_usuario_favorito`),
  ADD KEY (`id_producto_favorito`),
  ADD CONSTRAINT `fk_usuario_favorito` FOREIGN KEY (`id_usuario_favorito`) REFERENCES `usuarios` (`id_usuario`)
  on update no action
  on delete no action,
  ADD CONSTRAINT `fk_producto_favorito` FOREIGN KEY (`id_producto_favorito`) REFERENCES `productos` (`id_producto`)
  on update no action
  on delete no action;