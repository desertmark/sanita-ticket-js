const fs = require('fs');
const path = require('path');

// Función para actualizar la versión en un archivo package.json
function updateVersion(filePath, version) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    packageJson.version = version;
    fs.writeFileSync(filePath, `${JSON.stringify(packageJson, null, 2)}\n`);
    console.log(`✅ Versión actualizada en ${filePath} a ${version}`);
    return true;
  } catch (error) {
    console.error(`❌ Error al actualizar ${filePath}:`, error.message);
    return false;
  }
}

// Verifica si se pasó un parámetro de versión
if (process.argv.length < 3) {
  console.error('❌ Debes proporcionar un número de versión como parámetro.');
  console.log('Uso: node update-version.js 1.6.0');
  process.exit(1);
}

const newVersion = process.argv[2];
const rootDir = path.resolve(__dirname, '..');

// Rutas de los archivos a actualizar
const mainPackageJsonPath = path.join(rootDir, 'package.json');
const appPackageJsonPath = path.join(rootDir, 'release', 'app', 'package.json');
const appPackageLockJsonPath = path.join(rootDir, 'release', 'app', 'package-lock.json');

// Actualizar versiones
const results = [
  updateVersion(mainPackageJsonPath, newVersion),
  updateVersion(appPackageJsonPath, newVersion),
  updateVersion(appPackageLockJsonPath, newVersion),
];

// Verificar si todas las actualizaciones fueron exitosas
if (results.every((result) => result)) {
  console.log(`✅ La versión se ha actualizado exitosamente a ${newVersion} en todos los archivos.`);
} else {
  console.error('❌ Hubo errores al actualizar la versión en algunos archivos.');
  process.exit(1);
}
