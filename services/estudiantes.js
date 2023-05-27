const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, nombre, apellidos, fecha_nac, celular, correo, cedula 
    FROM estudiantes LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}
// post estudiante//
async function create(estudiantes){
    const result = await db.query(
      `INSERT INTO estudiantes 
      (nombres, apellidos, fecha_nac, celular, correo, cedula) 
      VALUES 
      ("${estudiantes.nombre}",
       "${estudiantes.apellidos}",
       "${estudiantes.fecha_nac}",
        "${estudiantes.celular}",
       "${estudiantes.correo}"),
       "${estudiantes.cedula}")`
    );
  
    let message = 'Error in creating estudiantes';
  
    if (result.affectedRows) {
      message = 'estudiantes created successfully';
    }
  
    return {message};
  }

  async function update(id, estudiante){
    const result = await db.query(
      `UPDATE estudiantes 
      SET nombre="${estudiante.nombre}",
      apellidos="${estudiante.apellidos}",
      fecha_nac="${estudiante.fecha_nac}", 
      celular="${estudiante.celulark}",
      correo="${estudiante.correo}",
      cedula="${estudiante.cedula}",
      WHERE id=${id}` 
    );
  
    let message = 'Error in updating estudiantes';
  
    if (result.affectedRows) {
      message = 'estudiantes updated successfully';
    }
  
    return {message};
  }

  async function remove(id){
    const result = await db.query(
      `DELETE FROM estudiante WHERE id=${id}`
    );
  
    let message = 'Error in deleting estudiante';
  
    if (result.affectedRows) {
      message = 'estudiante deleted successfully';
    }
  
    return {message};
  }

module.exports = {
  getMultiple,
  create,
  update,
  remove,
}