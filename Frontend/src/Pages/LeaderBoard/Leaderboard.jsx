import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/leaderboard"); 
        console.log(response.data);
        setLeaderboardData(response.data); // Response contains rank, username, and ecocoins
      } catch (err) {
        setError("Failed to load leaderboard data");
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-800">Leaderboard</h1>
        <p className="text-lg text-green-600 mt-2">Top EcoCoins holders!</p>
      </header>
      <main className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        {error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : (
          <ul className="space-y-4">
            {leaderboardData.map((player) => (
              <li
                key={player.rank} // Use rank or unique identifier
                className="flex items-center justify-between p-4 border-b border-gray-200"
              >
                
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold text-gray-800">{`${player.rank}`}</span>
                  <span className="text-lg font-semibold text-gray-800">{player.username}</span>
                </div>
                <div className="flex items-center gap-1">
                <span className="text-xl font-bold text-green-600">{player.ecocoins}</span>
                <img src="/Images/ecoCoin.jpeg" alt="" srcset="" className="w-8 h-8" />
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default Leaderboard;
