import { useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      const data = await loginUser(form);
      login(data);
      navigate(data.user.role === 'owner' ? '/owner' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-page">
      <Card className="mx-auto glass-card auth-card">
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <h2 className="fw-bold">Welcome Back</h2>
            <p className="text-muted">Please enter your details</p>
          </div>
          {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}
          <Form onSubmit={submit}>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Email Address</Form.Label>
              <Form.Control 
                type="email" 
                required 
                value={form.email} 
                placeholder='name@example.com' 
                onChange={e => setForm({ ...form, email: e.target.value })} 
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="small fw-semibold">Password</Form.Label>
              <Form.Control 
                type="password" 
                required 
                value={form.password} 
                placeholder='••••••••' 
                onChange={e => setForm({ ...form, password: e.target.value })} 
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100 py-2">Sign In</Button>
          </Form>
          <div className="mt-4 text-center small">
            Don't have an account? <Link to="/register" className="fw-bold text-decoration-none">Register</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
