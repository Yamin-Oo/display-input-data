import { useState, useRef, useEffect } from 'react'

function App() {
  // 1. State Management using the style from your reference
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    gender: "",
    role: "General Staff"
  });
  const [hobbies, setHobbies] = useState([]);

  // 2. Refs for focus and checkbox mapping as per instructions
  const usernameRef = useRef(null);
  const hobbyRef = useRef([]);

  const hobbyOptions = [
    { label: "Music", value: "music" },
    { label: "Movies", value: "movies" },
    { label: "Plastic Models", value: "plastic models" }
  ];

  // Auto-focus the first field when returning to form
  useEffect(() => {
    if (!isSubmitted && usernameRef.current) {
      usernameRef.current.focus();
    }
  }, [isSubmitted]);

  // 3. Change Handler using 'prev' as seen in your hobbieChanged function
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      if (checked) {
        setHobbies((prev) => [...prev, value]); // Using prev to append
      } else {
        setHobbies((prev) => prev.filter((h) => h !== value)); // Using prev to filter
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value, 
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  
  return (
    <div style={{ background: "white", padding: "20px", border: "1px solid black" }}>
      {isSubmitted ? (
        <div>
          <h2>Submit Data</h2>
          <p>Username: <span style={{ color: "brown" }}>{formData.username}</span></p>
          <p>Firstname: <span style={{ color: "brown" }}>{formData.firstname}</span></p>
          <p>Lastname: <span style={{ color: "brown" }}>{formData.lastname}</span></p>
          <p>Gender: <span style={{ color: "brown" }}>{formData.gender}</span></p>
          <p>Hobbies: <span style={{ color: "brown" }}>{hobbies.join(", ")}</span></p>
          <p>Role: <span style={{ color: "brown" }}>{formData.role}</span></p>
          <button onClick={() => setIsSubmitted(false)}>Back to form</button>
        </div>
      ) : (
        
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username </label>
            <br />
            <input 
              ref={usernameRef} 
              name="username" 
              value={formData.username} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>Firstname </label>
            <br />
            <input 
              name="firstname" 
              value={formData.firstname} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>Lastname </label>
            <br />
            <input 
              name="lastname" 
              value={formData.lastname} 
              onChange={handleChange} 
            />
          </div>

          <div>
            <p>Gender</p>
            <input type="radio" name="gender" value="male" onChange={handleChange} /> Male
            <input type="radio" name="gender" value="female" onChange={handleChange} /> Female
            <input type="radio" name="gender" value="others" onChange={handleChange} /> Others
          </div>

          <div>
            <p>Hobbies</p>
            {hobbyOptions.map((item, index) => (
              <div key={item.value}>
                <input
                  type="checkbox"
                  id={item.value}
                  name="hobbies"
                  value={item.value}
              
                  ref={(el) => (hobbyRef.current[index] = el)}
                  onChange={handleChange}
                /> {item.label}
              </div>
            ))}
          </div>

          <div>
            <p>Role</p>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="General Staff">General Staff</option>
              <option value="developer">Developer</option>
              <option value="System Analyst">System Analyst</option>
            </select>
          </div>

          <br />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default App;