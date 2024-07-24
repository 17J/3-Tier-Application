import React, { useState, useEffect } from 'react';

function App() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch('/api/guestbook'); // Replace with your API endpoint
        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    fetchEntries();
  }, []);

  const handleSubmit = async (e) => {
    console.log(e.target.value)
    e.preventDefault();
    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, message }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      // Handle success, e.g., clear form, display success message
    } catch (error) {
      console.error('Error submitting entry:', error);
      // Handle error, e.g., display error message
    }
    setName('');
    setMessage('');
  };

  return (
    <div>
      <h1>Guestbook</h1>
      <ul>
        {entries.map(entry => (
          <li key={entry.id}>{entry.name}: {entry.message}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="message">Message:</label>
        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}


export default App;