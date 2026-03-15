import { useEffect, useState } from 'react';
import { Card, Table, Spinner, Alert } from 'react-bootstrap';
import { fetchOwnerReviews } from '../../services/reviewService';

export default function OwnerReviewsPanel() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchOwnerReviews();
        setReviews(data);
      } catch (err) {
        setError('Failed to load reviews.');
      } finally {
        setLoading(false);
      }
    };
    loadReviews();
  }, []);

  if (loading) return <div className="text-center p-4"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger" className="m-4">{error}</Alert>;

  return (
    <Card className="shadow-sm mt-4 mb-4" style={{ backgroundColor: "#f1eded" }}>
      <Card.Body style={{ backgroundColor: "#f1eded", borderRadius: "20px" }}>
        <h4 className="mb-3">Recent Reviews</h4>
        
        {reviews.length === 0 ? (
          <p className="text-muted">No reviews found for any of your apps yet.</p>
        ) : (
          <div style={{ backgroundColor: "#f1eded" }}>
            <Table responsive hover className="align-middle mb-0" style={{ backgroundColor: "#f1eded" }}>
              <thead style={{ backgroundColor: "#f1eded" }}>
                <tr>
                  <th style={{ backgroundColor: "#f1eded" }}>App Name</th>
                  <th style={{ backgroundColor: "#f1eded" }}>User</th>
                  <th style={{ backgroundColor: "#f1eded" }}>Rating</th>
                  <th style={{ backgroundColor: "#f1eded" }}>Comment</th>
                  <th style={{ backgroundColor: "#f1eded" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(review => (
                  <tr key={review._id} style={{ backgroundColor: "#f1eded" }}>
                    <td style={{ backgroundColor: "#f1eded", fontWeight: 'bold' }}>{review.app?.name || 'Unknown App'}</td>
                    <td style={{ backgroundColor: "#f1eded" }}>{review.user?.name || 'Anonymous'}</td>
                    <td style={{ backgroundColor: "#f1eded" }}>
                      {'⭐'.repeat(review.rating)} ({review.rating}/5)
                    </td>
                    <td style={{ backgroundColor: "#f1eded", maxWidth: '300px', whiteSpace: 'normal' }}>
                      {review.comment}
                    </td>
                    <td style={{ backgroundColor: "#f1eded" }}>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
