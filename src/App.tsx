import React from 'react';

const App = () => {
  const handleCreateGroup = () => {
    // Send a pre-filled message to guide the user
    const createGroupMessage = encodeURIComponent(
      'Create a new group and add me as a member! Tap this link to invite me: https://t.me/YourBotUsername'
    );
    const createGroupUrl = `tg://msg?text=${createGroupMessage}`;
    window.open(createGroupUrl, '_blank');
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Telegram Group Creator</h1>
      <p>Click the button below to create a group and add this bot!</p>
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#0088cc',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={handleCreateGroup}
      >
        Create Group
      </button>
    </div>
  );
};

export default App;
