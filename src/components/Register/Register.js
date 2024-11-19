import React from 'react'
import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';

import './Register.css'

function Register() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "", privacyQuestion: "", privacyAnswer: "" });
  const [state, setState] = useState(false);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (credentials.password !== credentials.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Ensure a privacy question is selected
    if (!credentials.privacyQuestion) {
      alert("Please select a privacy question");
      return;
    }

    // Ensure the privacy question answer is provided
    if (!credentials.privacyAnswer) {
      alert("Please provide an answer to the privacy question");
      return;
    }

    // Send POST request to create user
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: credentials.name,
        email: credentials.email,
        password: credentials.password,
        privacyQuestion: credentials.privacyQuestion,
        credintial: credentials.privacyAnswer
      })
    });

    const json = await response.json();

    if (json.success) {
      setState(true);
      localStorage.setItem('username', json.username);

      // Storing date information for profile section
      const month = {
        '01': "Jan", '02': "Feb", '03': "Mar", '04': "Apr", '05': "May", '06': "June",
        '07': "July", '08': "Aug", '09': "Sep", '10': "Oct", '11': "Nov", '12': "Dec"
      };

      const year = json.date.substring(0, 4);
      const mn = json.date.substring(5, 7);
      localStorage.setItem("since", `${month[mn]} ${year}`);

      setTimeout(() => {
        navigate("/login");
        window.location.reload(true);
      }, 2000);
    } else {
      alert(json.error);
    }
  }

  return (
    <>
      <div style={{ marginTop: '80px' }}></div>
      {state && (
        <div className="alert alert-success alert-dismissible" role="alert" style={{ backgroundColor: 'green', color: 'white' }}>
          You are <strong>Successfully</strong> Registered!!
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
      <div className="bg-img">
        <div className="contentR">
          <header style={{ color: 'black' }}>Register</header>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <span className="fa fa-user"></span>
              <input type="text" name='name' onChange={onChange} required placeholder="Name" />
            </div>
            <div className="field space">
              <span className="fa fa-user"></span>
              <input type="email" name='email' onChange={onChange} required placeholder="Email " />
            </div>
            <div className="field space">
              <span className="fa fa-lock"></span>
              <input type="password" name='password' onChange={onChange} className="pass-key" required placeholder="Password" />
            </div>
            <div className="field space">
              <span className="fa fa-lock"></span>
              <input type="password" name='confirmPassword' onChange={onChange} className="pass-key" required placeholder="Confirm Password" />
            </div>
            
            <div className="field space">
              <span className="fa fa-lock"></span>
              <select name='privacyQuestion' onChange={onChange} className="pass-key" required>
                  <option value="" disabled selected>Select a Privacy Question</option>
                  <option value="first_pet">What was the name of your first pet?</option>
                  <option value="childhood_nickname">What was your childhood nickname?</option>
                  <option value="favorite_book_movie">What is your favorite book or movie?</option>
                  <option value="first_school">What was the name of your first school?</option>
                  <option value="childhood_best_friend">What is the name of your best friend from childhood?</option>
                  <option value="first_employer">What was the name of your first employer?</option>
              </select>
            </div>

            <div className="field space">
              <span className="fa fa-key"></span>
              <input type="text" name='privacyAnswer' onChange={onChange} className="pass-key" required placeholder="Answer to Privacy Question" />
            </div>

            <div className="pass">
              {/* <a href='/'>Forgot Password?</a> */}
            </div>
            <div className="field">
              <button type="submit" value="Register">Register</button>
            </div>
          </form>
          <div className="signup">Already Have An Account?
            <NavLink to="/login">Sign In Now</NavLink>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Register;
