import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { addReview } from '../../services/reviewService';

export default function ReviewForm({ appId, onAdded }) {
  const [form, setForm] = useState({ rating: 5, comment: '' });
  const [error, setError] = useState('');

  const submit = async e => {
    e.preventDefault();
    try {
      await addReview(appId, { ...form, rating: Number(form.rating) });
      setForm({ rating: 5, comment: '' });
      setError('');
      onAdded();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add review');
    }
  };

  return (
    <Form onSubmit={submit} className="card p-3 shadow-sm mt-4">
      <h5>Add Review</h5>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group className="mb-3">
        <Form.Label>Rating</Form.Label>
        <Form.Select value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })}>
          {[5,4,3,2,1].map(r => <option key={r} value={r}>{r}</option>)}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Comment</Form.Label>
        <Form.Control as="textarea" rows={3} required value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })} />
      </Form.Group>
      <Button type="submit">Submit Review</Button>
    </Form>
  );
}
