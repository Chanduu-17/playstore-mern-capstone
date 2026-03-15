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
    <Card className="mx-auto shadow-sm auth-card border-900">
      <Card.Body >
        <h3 className="mb-3">Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={submit}>
          <Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" required value={form.email} placeholder='Enter Email' onChange={e => setForm({ ...form, email: e.target.value })} /></Form.Group>
          <Form.Group className="mb-3"><Form.Label>Password</Form.Label><Form.Control type="password" required value={form.password} placeholder='Enter Password' onChange={e => setForm({ ...form, password: e.target.value })} /></Form.Group>
          <Button type="submit" className="w-100">Login</Button>
        </Form>
        <div className="mt-3 text-center">You don't have account? <Link to="/register">Register</Link></div>
      </Card.Body>
    </Card>
  );
}
