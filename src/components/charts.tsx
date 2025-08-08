import React, { useEffect, useState } from "react";
import axios from "axios";

interface BatchVisualizationProps {
  batchId: string;
}

export default function BatchVisualization({ batchId }: BatchVisualizationProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);  // can be string or null
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // can be string or null

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:5000/visualize/${batchId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const imgUri = `data:image/${res.data.format};base64,${res.data.image}`;
        setImageSrc(imgUri);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching visualization:", err);
        setError("Failed to load chart");
        setLoading(false);
      });
  }, [batchId]);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Batch {batchId} Data</h2>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={`Batch ${batchId} visualization`}
          style={{ maxWidth: "100%" }}
        />
      )}
    </div>
  );
}
