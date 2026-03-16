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
    <Form onSubmit={submit} className="app-form">
      <Row className="g-3">
        <Col md={12}>
          <Form.Label className="small fw-semibold">Application Name</Form.Label>
          <Form.Control name="name" placeholder="e.g. Super Productivity" value={form.name} onChange={handleChange} required />
        </Col>
        <Col md={6}>
          <Form.Label className="small fw-semibold">Genre</Form.Label>
          <Form.Control name="genre" placeholder="e.g. Action" value={form.genre} onChange={handleChange} required />
        </Col>
        <Col md={6}>
          <Form.Label className="small fw-semibold">Version</Form.Label>
          <Form.Control name="version" placeholder="e.g. 1.0.0" value={form.version} onChange={handleChange} required />
        </Col>
        <Col md={12}>
          <Form.Label className="small fw-semibold">Category</Form.Label>
          <Form.Select name="category" value={form.category} onChange={handleChange} className="form-select">
            <option value="games">Games</option>
            <option value="beauty">Beauty</option>
            <option value="fashion">Fashion</option>
            <option value="women">Women</option>
            <option value="health">Health</option>
            <option value="social media">Social Media</option>
          </Form.Select>
        </Col>
        <Col md={12}>
          <Form.Label className="small fw-semibold">Icon URL</Form.Label>
          <Form.Control name="imageUrl" placeholder="https://example.com/icon.png" value={form.imageUrl} onChange={handleChange} />
        </Col>
        <Col md={12}>
          <Form.Label className="small fw-semibold">Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" placeholder="Describe your app..." value={form.description} onChange={handleChange} required />
        </Col>
        <Col md={12}>
          <Form.Label className="small fw-semibold">Key Features (comma separated)</Form.Label>
          <Form.Control name="features" placeholder="Cloud Sync, Dark Mode, Offline..." value={form.features} onChange={handleChange} />
        </Col>
      </Row>
      <div className="mt-4 d-grid gap-2">
        <Button type="submit" variant="primary" className="py-2">
          {editingApp ? 'Update Application' : 'Create Application'}
        </Button>
        {editingApp && (
          <Button variant="outline-secondary" onClick={onCancel} className="py-2">
            Cancel Edit
          </Button>
        )}
      </div>
    </Form>
  );
}
