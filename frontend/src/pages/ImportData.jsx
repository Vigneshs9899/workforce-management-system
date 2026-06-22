import { useState } from "react";
import api from "../services/api";

function ImportData() {

  const [file, setFile] = useState(null);

  const uploadFile = async () => {

    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    const token = localStorage.getItem("token");

    await api.post(
      "/import",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Import Successful");

  };

  return (

    <div className="container mt-5">

      <h2>Import Excel Data</h2>

      <input
      type="file"
      className="form-control mb-3"
      onChange={(e)=>setFile(e.target.files[0])}
      />

      <button
      className="btn btn-success"
      onClick={uploadFile}
      >
      Upload Excel
      </button>

    </div>

  );

}

export default ImportData;