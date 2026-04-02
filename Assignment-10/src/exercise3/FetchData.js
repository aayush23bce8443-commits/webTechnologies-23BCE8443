import React, { useEffect, useState } from "react";

function FetchData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // runs only once

  return (
    <div style={styles.container}>
      <h2>User List (API Data)</h2>

      {/* Loading */}
      {loading && <p style={styles.loading}>Loading...</p>}

      {/* Error */}
      {error && <p style={styles.error}>{error}</p>}

      {/* Data */}
      {!loading && !error && (
        <div style={styles.list}>
          {data.map((user) => (
            <div key={user.id} style={styles.card}>
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>City: {user.address.city}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "90%",
    margin: "40px auto",
    textAlign: "center"
  },
  list: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  card: {
    width: "250px",
    margin: "10px",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9"
  },
  loading: {
    color: "blue",
    fontSize: "18px"
  },
  error: {
    color: "red",
    fontSize: "16px"
  }
};

export default FetchData;