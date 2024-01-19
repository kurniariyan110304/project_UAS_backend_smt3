// import database
const db = require("../config/database");

// membuat class Patient
class Patient {
  static all() {
    return new Promise((resolve, reject) => {
        // lakukan query ke db untuk ambil data
        const sql = "SELECT * FROM covid";
        db.query(sql, (sql, results) => {
            resolve(results);
        });
    });
}

static async create(Patient) {
  const id = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO covid SET ?";
      db.query(sql, Patient, (err, results) => {
          resolve(results.insertId);
      });
  });


  // promise 2
  return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM covid WHERE id = ?`;
      db.query(sql, id, (err, results) => {
          resolve(results);
      });
  });
}

static find(id) {
  // lakukan promise, select by id
  return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM covid WHERE id = ?`;
      db.query(sql, id, (err, results) => {
          resolve(results[0]);
      });
  });
}

static async update(id, data) {
  // update data
  await new Promise((resolve, reject) => {
      // query untuk update data
      const sql = "UPDATE covid SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
          resolve(results);
      });
  });

  // select data by id
  const patients = await this.find(id);
  return patients;
}

static async delete(id) {
  // query delete
  return new Promise((resolve, reject) => {
      // query sql
      const sql = "DELETE FROM covid WHERE id = ?";
      db.query(sql, id, (err, results) => {
          resolve(results);
      });
  });
}

//Search Resource
searchByName(name) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM covid WHERE name LIKE ?";
    const searchTerm = `%${name}%`;

    db.query(sql, searchTerm, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

//Positive Resource
getPositivePatients() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM covid WHERE status = 'positive'";
    
    db.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}


//Recovered Resource
getRecoveredPatients() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM covid WHERE status = 'recovered'";
    
    db.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

//Dead Resource
getDeadPatients() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM covid WHERE status = 'dead'";
    
    db.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}
}

// export class Patient
module.exports = Patient;
