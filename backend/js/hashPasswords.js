import bcrypt from 'bcrypt';
import connection from './database.js'; 

// Función para hashear las contraseñas no hasheadas
const hashExistingPasswords = async () => {
  try {
    // Seleccionamos todos los usuarios que no tienen una contraseña hasheada (es decir, las que no empiezan con "$2b$")
    const [results] = await connection.execute('SELECT * FROM usuarios WHERE password_usuario NOT LIKE "$2b$%"');
    // console.log(results);

    // Si no hay usuarios sin hashear
    if (results.length === 0) {
      console.log('Todas las contraseñas ya están hasheadas.');
      return;
    }

    // Recorremos los resultados y actualizamos las contraseñas
    for (let user of results) {
      const password = user.password_usuario;
      console.log('Contraseña:', password);

      // Verificamos si la contraseña es vacía, nula o indefinida
      if (!password) {
        console.log(`Usuario ${user.id_usuario} (${user.login_usuario}) no tiene una contraseña válida.`);
        continue; // Saltamos este usuario si la contraseña no está definida correctamente
      }

      const saltRounds = 10;

      // Hasheamos la contraseña
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log('Contraseña hasheada:', hashedPassword);

      // Verificamos que la contraseña hasheada y la original no sean iguales
      if (hashedPassword === password) {
        console.log(`La contraseña del usuario ${user.id_usuario} (${user.login_usuario}) ya está hasheada.`);
        continue; // Si ya está hasheada, no hacemos nada
      }

      // Actualizamos la contraseña hasheada en la base de datos
      const [updateResult] = await connection.execute(
        'UPDATE usuarios SET password_usuario = ? WHERE id_usuario = ?',
        [hashedPassword, user.id_usuario] // Actualizamos solo si la contraseña es válida
      );

      if (updateResult.affectedRows > 0) {
        console.log(`Contraseña de usuario ${user.id_usuario} (${user.login_usuario}) actualizada exitosamente.`);
      } else {
        console.log(`Usuario ${user.id_usuario} (${user.login_usuario}) no requiere actualización.`);
      }
    }
  } catch (err) {
    console.error('Error al procesar las contraseñas:', err);
  }
};

// Llamamos la función para ejecutar el script
hashExistingPasswords();

/**
 * Ejecutar al abrir el proyecto, para hashear las contraseñas de los usuarios creados en la base de datos inicialmente.
 * Abrir terminal en la carpeta raiz y seguir los comandos: 
 * cd backend
 * cd js
 * node hashPasswords.js
 */