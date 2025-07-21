import { useEffect, useState } from "react";
import api from "../api";
import CertificateCard from "../components/CertificateCard";

export default function Certifications() {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    api.get("/certificates")
      .then(res => setCerts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {certs.map(cert => (
        <CertificateCard key={cert._id} cert={cert} />
      ))}
    </div>
  );
}
