
import React, { useState, useEffect } from 'react';

function App() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch('http://44.222.204.142:8080/backend/index.php'); // Replace with your API endpoint
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
      const response = await fetch('http://44.222.204.142:8080/backend/index.php', {
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
    <div className="guestbook-container">
      <h1>Guestbook</h1>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="textarea"
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      <ul className="entries-list">
	  {entries.map((entry) => (
		  <li key={entry.id} className="entry">
		     {entry.name}: {entry.message}
		  </li>  
       ))}
      </ul>
    </div>
  );
}


export default App;
