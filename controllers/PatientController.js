// import Model Patient
const Patient = require("../models/Patient")

// buat class PatientController
class PatientController {
  async index(req, res) {
    // TODO 4: Tampilkan data pasien
    const patients = await Patient.all();

    const data = {
        message: "Menampilkan data pasien",
        data: patients
    };

    res.status(200).json(data);
}

async store(req, res) {
  /**
   * TODO 2: memanggil method create.
   * Method create mengembalikan data yang baru diinsert.
   * Mengembalikan response dalam bentuk json.
   */

  const patients = await Patient.create(req.body);
  const data = {
      message: "Menambahkan data pasien",
      data: patients,
  };

  res.status(201).json(data);
}

async update(req, res) {
  /**
   * check id students
   * jika ada, lakukan update
   * jika tidak, kirim data tidak ada
   */
  const { id } = req.params;

  const patients = await Patient.find(id);

  if (patients) {
      // update data
      const patientUpdated = await Patient.update(id, req.body);
      const data = {
          message: "Mengupdate data pasien",
          data: patientUpdated,
      };

      res.status(200).json(data);
  }
  else {
      // kirim data tidak ada
      const data = {
          message: "Data tidak ada",
      };

      res.status(404).json(data);
  }



}

async destroy(req, res) {
  const { id } = req.params;

  /**
   * cari id
   * jika ada, hapus data
   * jika tidak, kirim data tidak ada
   */

  const patients = await Patient.find(id);

  if (patients) {
      // hapus data
      await Patient.delete(id);
      const data = {
          message: "Menghapus data pasien",
      };

      res.status(200).json(data);
  }
  else {
      // data tidak ada
      const data = {
          message: "Data tidak ada",
      };

      res.status(404).json(data);
  }
}

async show(req, res) {
  /**
   * cari id
   * jika ada, kirim datanya
   * jika tidak, kirim data tidak ada
   */
  const { id } = req.params;

  const patients = await Patient.find(id);

  if (patients) {
      const data = {
          message: "Menampilkan detail data pasien",
          data: patient,
      };

      res.status(200).json(data);
  }
  else {
      const data = {
          message: "Data tidak ada",
      };

      res.status(404).json(data);
  }

}

//One Resource
async getPatientById(req, res) {
  try {
    const { id } = req.params;
    const patient = await Patient.find(id);

    if (patient) {
      return res.status(200).json({
        message: 'Get Detail Resource',
        data: patient,
      });
    } else {
      return res.status(404).json({
        message: 'Resource not found',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

//Search Resource
async searchPatientByName(req, res) {
  try {
    const { name } = req.query;
    const searchedPatients = await Patient.searchByName(name);

    if (searchedPatients.length > 0) {
      return res.status(200).json({
        message: 'Get searched resource',
        data: searchedPatients,
      });
    } else {
      return res.status(404).json({
        message: 'Resource not found',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}


async positive(req, res) {
  // Mengambil data positif dari database menggunakan model Patient
  const positiveResourceData = await Patient.getPositiveResources();

  if (positiveResourceData.length === 0) {
    const response = {
      message: "Tidak ada pasien yang positif",
    };
    return res.status(404).json(response);
  }

  const responseData = {
    message: "Menampilkan Pasien Positif",
    total: positiveResourceData.length,
    data: positiveResourceData,
  };

  res.status(200).json(responseData);
}

async recovered(req, res) {
  // Mengambil data pasien dengan status "recovered" dari database menggunakan model Patient
  const recoveredResourceData = await Patient.getRecoveredResources();

  if (recoveredResourceData.length === 0) {
    const response = {
      message: "Tidak ada pasien yang sembuh",
    };
    return res.status(404).json(response);
  }

  const responseData = {
    message: "Menampilkan Pasien yang telah sembuh",
    total: recoveredResourceData.length,
    data: recoveredResourceData,
  };

  res.status(200).json(responseData);
}

async dead(req, res) {
  const deadResourceData = await Patient.getDeadResources();

  if (deadResourceData.length === 0) {
    const response = {
      message: "Tidak ada pasien yang telah meninggal",
    };
    return res.status(404).json(response);
  }

  const responseData = {
    message: "Menampilkan Pasien yang Telah Meninggal",
    total: deadResourceData.length,
    data: deadResourceData,
  };

  res.status(200).json(responseData);
}

async search(req, res) {
  const { name } = req.params;

  const searchedResourceData = await Patient.getByName(name);

  if (searchedResourceData.length === 0) {
    const response = {
      message: "Data Pasien tidak ada",
    };
    return res.status(404).json(response);
  }

  const responseData = {
    message: "Data Pasien ditemukan",
    data: searchedResourceData,
  };

  res.status(200).json(responseData);
}
}

// membuat object PatientController
const object = new PatientController();

// export object PatientController
module.exports = object;
