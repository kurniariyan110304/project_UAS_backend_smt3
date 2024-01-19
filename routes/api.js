// import PatientController
const PatientController = require('../controllers/PatientController');

// import express
const express = require('express');

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */
router.get('/', (req, res) => {
  res.send("Hello Covid API Express");
});

// Membuat routing patient
router.get('/patients', PatientController.index);
router.post('/patients', PatientController.store);
router.put('/patients/:id', PatientController.update);
router.delete('/patients/:id', PatientController.destroy);
router.get('/patient/:id', PatientController.show);
router.get('/patient/search', PatientController.searchPatientByName);
router.get('/patient/status/positive', PatientController.positive);
router.get('/patient/status/recovered', PatientController.recovered);
router.get('/patient/status/dead', PatientController.dead);




// export router
module.exports = router;
