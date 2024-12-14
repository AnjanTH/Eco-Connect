import React from "react";

const leaderboardData = [
  { name: "Alice", score: 250 },
  { name: "Bob", score: 320 },
  { name: "Charlie", score: 280 },
  { name: "Dave", score: 190 },
];

const Leaderboard = () => {
  
  const sortedLeaderboard = leaderboardData.sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-800">Leaderboard</h1>
        <p className="text-lg text-green-600 mt-2">Top scorers of the game!</p>
      </header>
      <main className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <ul className="space-y-4">
          {sortedLeaderboard.map((player, index) => (
            <li key={index} className="flex items-center justify-between p-4 border-b border-gray-200">
              <span className="text-lg font-semibold text-gray-800">{player.name}</span>
              <span className="text-xl font-bold text-green-600">{player.score}</span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Leaderboard;
