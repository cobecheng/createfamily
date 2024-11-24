import React, { useState } from 'react';

const App: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const logMessage = (message: string): void => {
    setLogs((prevLogs) => [...prevLogs, message]);
    console.log(message); // Log to the browser console as well
  };

  const handleCreateFamily = async () => {
    setLoading(true);
    logMessage('Starting process to create family group...');

    const telegramUser = window.Telegram?.WebApp?.initDataUnsafe?.user;

    if (!telegramUser) {
      logMessage('Error: Telegram user data is not available.');
      alert('Error: Telegram user data is missing.');
      setLoading(false);
      return;
    }

    logMessage(`Telegram user data found: ${JSON.stringify(telegramUser)}`);

    const apiUrl = 'https://fdc1-93-152-210-204.ngrok-free.app/create-family';
    logMessage(`Sending request to API: ${apiUrl}`);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: telegramUser.id, // Ensure the key matches what your backend expects
        }),
      });

      logMessage(`Received response: Status ${response.status}`);

      const data = await response.json();
      logMessage(`Response body: ${JSON.stringify(data)}`);

      if (response.ok) {
        logMessage(`Family group created successfully: ${data.groupName}`);
        alert(`Family group "${data.groupName}" created successfully!`);
      } else {
        logMessage(`API returned an error: ${data.error}`);
        alert(`Failed to create family group: ${data.error}`);
      }
    } catch (error: any) {
      logMessage(`Unexpected error occurred: ${error.message}`);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Family</h1>
      <button onClick={handleCreateFamily} disabled={loading}>
        {loading ? 'Creating...' : 'Create Family'}
      </button>
      <div style={{ marginTop: '20px', maxHeight: '200px', overflowY: 'auto' }}>
        <h2>Logs</h2>
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
