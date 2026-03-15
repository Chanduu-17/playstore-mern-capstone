import { Button, Card } from 'react-bootstrap';

export default function NotificationList({ items, onRead }) {
  if (!items.length) return <p>No notifications available.</p>;
  return items.map(item => (
    <Card key={item._id} className={`mb-3 ${item.isRead ? '' : 'border-primary'}`}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start gap-3">
          <div>
            <h5 className="mb-1">{item.title}</h5>
            <p className="mb-1">{item.message}</p>
            <small className="text-muted">{new Date(item.createdAt).toLocaleString()}</small>
          </div>
          {!item.isRead && <Button size="sm" onClick={() => onRead(item._id)}>Mark as read</Button>}
        </div>
      </Card.Body>
    </Card>
  ));
}
