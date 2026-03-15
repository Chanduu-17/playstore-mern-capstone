import { Card } from 'react-bootstrap';

export default function ReviewList({ reviews }) {
  if (!reviews.length) return <p>No reviews yet.</p>;
  return reviews.map(review => (
    <Card key={review._id} className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <strong>{review.user?.name}</strong>
          <span>{review.rating}/5</span>
        </div>
        <p className="mb-0 mt-2">{review.comment}</p>
      </Card.Body>
    </Card>
  ));
}
