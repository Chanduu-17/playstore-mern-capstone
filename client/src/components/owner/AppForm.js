import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

const initialState = {
  name: '', description: '', category: 'games', genre: '', version: '', features: '', imageUrl: ''
};

export default function AppForm({ onSubmit, editingApp, onCancel }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingApp) {
      setForm({ ...editingApp, features: (editingApp.features || []).join(', ') });
    } else {
      setForm(initialState);
    }
  }, [editingApp]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = e => {
    e.preventDefault();
    onSubmit({ ...form, features: form.features.split(',').map(item => item.trim()).filter(Boolean) });
    if (!editingApp) setForm(initialState);
  };

  return (
    <Form onSubmit={submit} className="card shadow-sm p-3 mb-4">
      <h5>{editingApp ? 'Edit App' : 'Add New App'}</h5>
      <Row className="g-3">
        <Col md={6}><Form.Control name="name" placeholder="App name" value={form.name} onChange={handleChange} required /></Col>
        <Col md={3}><Form.Control name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} required /></Col>
        <Col md={3}><Form.Control name="version" placeholder="Version" value={form.version} onChange={handleChange} required /></Col>
        <Col md={4}>
          <Form.Select name="category" value={form.category} onChange={handleChange}>
            <option value="games">Games</option><option value="beauty">Beauty</option><option value="fashion">Fashion</option><option value="women">Women</option><option value="health">Health</option><option value="social media">Social Media</option>
          </Form.Select>
        </Col>
        <Col md={8}><Form.Control name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} /></Col>
        <Col md={12}><Form.Control as="textarea" rows={3} name="description" placeholder="Description" value={form.description} onChange={handleChange} required /></Col>
        <Col md={12}><Form.Control name="features" placeholder="Features separated by comma" value={form.features} onChange={handleChange} /></Col>
      </Row>
      <div className="mt-3 d-flex gap-2">
        <Button type="submit">{editingApp ? 'Update App' : 'Create App'}</Button>
        {editingApp && <Button variant="secondary" onClick={onCancel}>Cancel</Button>}
      </div>
    </Form>
  );
}
