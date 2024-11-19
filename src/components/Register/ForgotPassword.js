import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

function ForgotPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    securityQuestion: '',
    answer: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const data = {
    email: formData.email,
    // securityQuestion: formData.securityQuestion, // Included if needed
    credential: formData.answer,
    password: formData.password,
    confirm_password: formData.confirmPassword
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (response.ok) {
        setMessage('Password reset link has been sent to your email.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage(json.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-img">
      <div className="contentR">
        <header>Forgot Password</header>
        {message && (
          <div className={`alert ${message.includes('sent') ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <span className="fas fa-envelope"></span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={onChange}
              required
            />
          </div>
          <div className="field space">
            <span className="fas fa-question-circle"></span>
            <select
              name="securityQuestion"
              value={formData.securityQuestion}
              onChange={onChange}
              required
            >
              <option value="" disabled>Select your security question</option>
              <option value="first_pet">What was the name of your first pet?</option>
              <option value="childhood_nickname">What was your childhood nickname?</option>
              <option value="favorite_book_movie">What is your favorite book or movie?</option>
              <option value="first_school">What was the name of your first school?</option>
              <option value="childhood_best_friend">What is the name of your best friend from childhood?</option>
              <option value="first_employer">What was the name of your first employer?</option>
            </select>
          </div>
          <div className="field space">
            <span className="fas fa-lock"></span>
            <input
              type="text"
              name="answer"
              placeholder="Answer"
              value={formData.answer}
              onChange={onChange}
              required
            />
          </div>
          <div className="field space">
            <span className="fas fa-lock"></span>
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={onChange}
              required
            />
          </div>
          <div className="field space">
            <span className="fas fa-lock"></span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={onChange}
              required
            />
          </div>
          <div className="field">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
