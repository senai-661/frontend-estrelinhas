

.login-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 88vh;
  background: #ffffff; /* ✅ fundo branco */
  position: relative;
  overflow: hidden;
}

.login-form-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: -50%;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(255, 115, 0, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.login-form {
  background-color: #ffffff;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0px 20px 60px rgba(0, 0, 0, 0.4), 0px 0px 0px 1px rgba(255, 115, 0, 0.2);
  width: 100%;
  max-width: 420px;
  border-top: 4px solid #ff7300;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.login-form:hover {
  box-shadow: 0px 30px 80px rgba(255, 115, 0, 0.2), 0px 0px 0px 1px rgba(255, 115, 0, 0.3);
  transform: translateY(-5px);
}

.login-form h2 {
  text-align: center;
  margin: 0 0 30px 0;
  color: #000000;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.login-header {
  font-size: 2rem;
  color: #000000;
  font-weight: 700;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #1a1a1a;
  font-weight: 600;
  font-size: 0.95rem;
}

.form-group input {
  width: 100%;
  padding: 12px 14px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background-color: #ffffff;
  color: #000000;
  font-size: 1rem;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-group input::placeholder {
  color: #999999;
}

.form-group input:focus {
  outline: none;
  border-color: #ff7300;
  background-color: #fffbf0;
  box-shadow: 0px 0px 0px 3px rgba(255, 115, 0, 0.1);
}

.login-button {
  width: 100%;
  padding: 13px;
  margin-top: 2.5rem;
  background: linear-gradient(135deg, #ff7300 0%, #ff8c00 100%);
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 6px 20px rgba(255, 115, 0, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.login-button:hover {
  background: linear-gradient(135deg, #ff8c00 0%, #ffaa00 100%);
  box-shadow: 0px 10px 30px rgba(255, 115, 0, 0.4);
  transform: translateY(-2px);
}

.login-button:active {
  transform: translateY(0);
}

.input-email-login,
.input-password-login {
  margin-top: 0.75rem;
}