import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [telegramUser, setTelegramUser] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]); // State to store logs

  const addLog = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, message]); // Append new logs
  };

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready(); // Initialize the Telegram WebApp
      setTelegramUser(tg.initDataUnsafe?.user);
      addLog('Telegram WebApp initialized.');
      addLog(`User data: ${JSON.stringify(tg.initDataUnsafe?.user)}`);
    } else {
      addLog('Telegram WebApp is not available.');
    }
  }, []);

  const handleCreateFamily = async () => {
    const apiUrl = 'https://tgbot-xn2d.onrender.com/create-family';
    addLog(`API URL: ${apiUrl}`);
  
    if (!telegramUser) {
      addLog('Error: Telegram user data not available.');
      return alert('Telegram user data is missing. Please try again.');
    }
  
    try {
      addLog('Sending request to create family...');
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: telegramUser.id,
        }),
      });
  
      addLog(`Response status: ${response.status}`);
      const data = await response.json();
      addLog(`Response data: ${JSON.stringify(data)}`);
  
      if (response.ok) {
        alert('Family group created successfully!');
      } else {
        alert(`Failed to create family group: ${data.error}`);
        addLog(`Error: ${data.error}`);
      }
    } catch (error) {
      addLog(`Request failed: ${error}`);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to Family Creator</h1>
      {telegramUser && <p>Hello, {telegramUser.first_name}!</p>}
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#0088cc',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={handleCreateFamily}
      >
        Create Family
      </button>
      <div style={{ marginTop: '20px', textAlign: 'left', maxHeight: '200px', overflowY: 'auto' }}>
        <h3>Logs:</h3>
        <ul>
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
