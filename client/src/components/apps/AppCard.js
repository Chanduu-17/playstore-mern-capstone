import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function AppCard({ app }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={app.imageUrl} height="180" style={{ objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title>{app.name}</Card.Title>
          <Badge bg="primary">{app.category}</Badge>
        </div>
        <Card.Text className="text-muted">{app.description.slice(0, 90)}...</Card.Text>
        <div className="small mb-2">Version: {app.version}</div>
        <div className="small mb-3">Rating: {app.ratings?.average ?? app.ratingAverage} / 5</div>
        <Button as={Link} to={`/apps/${app.id || app._id}`} className="mt-auto">View Details</Button>
      </Card.Body>
    </Card>
  );
}
