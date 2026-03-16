import { useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const data = await registerUser(form);
      setSuccess(data.message || 'Registration successful! Please login to continue.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-page">
      <Card className="mx-auto glass-card auth-card">
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <h2 className="fw-bold">Create Account</h2>
            <p className="text-muted">Join our community today</p>
          </div>
          {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}
          {success && <Alert variant="success" className="py-2 small">{success}</Alert>}

          <Form onSubmit={submit}>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Full Name</Form.Label>
              <Form.Control
                required
                placeholder="John Doe"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Email Address</Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="name@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="small fw-semibold">Password</Form.Label>
              <Form.Control
                type="password"
                required
                minLength={8}
                maxLength={15}
                pattern="^(?=.*@)[A-Za-z0-9@]{8,15}$"
                title="Password must be 8–15 characters and include @"
                placeholder="Include '@', 8-15 chars"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100 py-2">Create Account</Button>
          </Form>

          <div className="mt-4 text-center small">
            Already have an account? <Link to="/login" className="fw-bold text-decoration-none">Login</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}