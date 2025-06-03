import React from 'react';

const getRankBadge = (index) => {
  if (index === 0) return <span className="inline-block bg-yellow-400 text-white px-2 py-1 rounded-full font-bold mr-2">🥇 1</span>;
  if (index === 1) return <span className="inline-block bg-gray-400 text-white px-2 py-1 rounded-full font-bold mr-2">🥈 2</span>;
  if (index === 2) return <span className="inline-block bg-orange-400 text-white px-2 py-1 rounded-full font-bold mr-2">🥉 3</span>;
  return <span className="inline-block bg-green-200 text-green-800 px-2 py-1 rounded-full font-bold mr-2">{index + 1}</span>;
};

const LeaderboardList = ({ leaderboard }) => {
  return (
    <div>
      <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700">Leaderboard</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="space-y-3">
          {leaderboard.length === 0 && (
            <div className="text-center text-gray-500">Belum ada data leaderboard.</div>
          )}
          {leaderboard.map((user, index) => (
            <div
              key={user.id || user.email || index}
              className={`flex items-center justify-between p-4 rounded-lg border transition-shadow hover:shadow-md ${
                index === 0
                  ? 'bg-yellow-50 border-yellow-300'
                  : index === 1
                  ? 'bg-gray-50 border-gray-300'
                  : index === 2
                  ? 'bg-orange-50 border-orange-300'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center">
                {getRankBadge(index)}
                <div>
                  <p className="font-semibold text-lg text-gray-800">{user.name || 'User'}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-green-700">{user.points || 0}</span>
                <span className="text-sm text-gray-600 ml-1">poin</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardList; 