import React, { useState } from 'react';

const App: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const logMessage = (message: string): void => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  const handleCreateFamily = async () => {
    setLoading(true);
    logMessage('Creating family group...');

    const telegramUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (!telegramUser) {
      logMessage('Telegram user data is not available.');
      alert('Error: Telegram user data is missing.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://fdc1-93-152-210-204.ngrok-free.app/create-family', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telegramUserId: telegramUser.id,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        logMessage(`Family group created: ${data.groupName}`);
        alert(`Family group "${data.groupName}" created!`);
      } else {
        logMessage(`Failed to create group: ${data.error}`);
        alert(`Error: ${data.error}`);
      }
    } catch (error: any) {
      logMessage(`Error: ${error.message}`);
      alert('An error occurred. Please try again.');
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
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
