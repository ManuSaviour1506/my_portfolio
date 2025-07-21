export default function CertificateCard({ cert }) {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-lg font-semibold">
        <h1>Certificate</h1>
        {cert.name}
      </h2>
      <p className="text-gray-600">Issued by: {cert.issuer}</p>
      <p className="text-gray-500 text-sm">
        {cert.date ? new Date(cert.date).toLocaleDateString() : ''}
      </p>
      {cert.fileUrl && (
        <a
          href={cert.fileUrl}
          target="_blank"
          className="text-blue-500 mt-2 inline-block"
        >
          View Certificate
        </a>
      )}
    </div>
  );
}
