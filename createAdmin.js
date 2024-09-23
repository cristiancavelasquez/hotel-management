const { hash } = require("@node-rs/argon2");

// Función para crear el usuario administrador
async function createAdmin() {
  const plainPassword = "miContrasenaSegura";
  const passHashed = await hash(plainPassword, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  console.log(passHashed);
}
// Ejecuta la función
createAdmin();
