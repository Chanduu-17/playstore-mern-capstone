import { useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      const data = await registerUser(form);
      login(data);
      navigate(data.user.role === 'owner' ? '/owner' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Card className="mx-auto shadow-sm auth-card">
      <Card.Body>
        <h3 className="mb-3">Register</h3>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={submit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              placeholder="Full Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              minLength={8}
              maxLength={15}
              pattern="^(?=.*@)[A-Za-z0-9@]{8,15}$"
              title="Password must be 8–15 characters and include @"
              placeholder="Enter password 8–15 characters, include @"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
            {/* <Form.Text className="text-muted">
              8–15 characters, include @
            </Form.Text> */}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Register as</Form.Label>
            <Form.Select
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="owner">Owner</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" className="w-100">Create Account</Button>
        </Form>

        <div className="mt-3 text-center">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </Card.Body>
    </Card>
  );
}