import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CollaboratePage = () => {
    const [roomCode, setRoomCode] = useState('');
    const [showRoomInput, setShowRoomInput] = useState(false);
    const navigate = useNavigate();

    const handleVideoCallClick = () => {
        setShowRoomInput(true);
    };

    const handleJoinRoom = () => {
        if (roomCode.trim()) {
            navigate(`/room/${roomCode}`);
        } else {
            alert('Please enter a valid room code');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center mt-10">
            
            <main className="flex flex-col items-center mt-10 space-y-8">
                <section className="bg-white p-6 rounded shadow-md w-11/12 max-w-md">
                    <h2 className="text-xl font-semibold mb-4">Share Resources</h2>
                    <p className="mb-4 text-gray-700">Share your resources via Google Drive to enhance collaboration and learning.</p>
                    <a
                        href="https://drive.google.com/drive/my-drive"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Open Google Drive
                    </a>
                </section>

                <section className="bg-white p-6 rounded shadow-md w-11/12 max-w-md">
                    <h2 className="text-xl font-semibold mb-4">Start a Video Call</h2>
                    <p className="mb-4 text-gray-700">Connect with your team through real-time video calls.</p>
                    <button
                        onClick={handleVideoCallClick}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Start Video Call
                    </button>

                    {showRoomInput && (
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Enter Room Code"
                                value={roomCode}
                                onChange={(e) => setRoomCode(e.target.value)}
                                className="border border-gray-300 rounded px-4 py-2 w-full mb-2"
                            />
                            <button
                                onClick={handleJoinRoom}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                            >
                                Join Room
                            </button>
                        </div>
                    )}
                </section>
            </main>

           
        </div>
    );
};

export default CollaboratePage;
