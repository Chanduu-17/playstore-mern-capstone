import { useEffect, useState } from 'react';
import { Alert, Badge, Button, Card, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ReviewForm from '../components/apps/ReviewForm';
import ReviewList from '../components/apps/ReviewList';
import { useAuth } from '../context/AuthContext';
import { downloadApp, fetchAppById } from '../services/appService';
import { fetchReviews } from '../services/reviewService';

export default function AppDetailsPage() {
  const { id } = useParams();
  const { user, updateDownloadedApps } = useAuth();
  const [app, setApp] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      const [appData, reviewData] = await Promise.all([fetchAppById(id), fetchReviews(id)]);
      setApp(appData);
      setReviews(reviewData);
    } catch (err) {
      setError('Unable to load app details');
    }
  };

  useEffect(() => { loadData(); }, [id]);

  const handleDownload = async () => {
    try {
      const result = await downloadApp(id);
      setMessage(result.message);
      updateDownloadedApps(id);
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || 'Download failed');
    }
  };

  if (!app) return <div>{error || 'Loading...'}</div>;

  return (
    <>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Card className="shadow-sm mb-4">
        <Row className="g-0">
          <Col md={4}><img src={app.imageUrl} alt={app.name} className="w-100 h-100" style={{ objectFit: 'cover', minHeight: 280 }} /></Col>
          <Col md={8}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                <div>
                  <h2>{app.name}</h2>
                  <p className="text-muted mb-2">{app.description}</p>
                </div>
                <Badge bg="primary" pill>{app.category}</Badge>
              </div>
              <p><strong>Genre:</strong> {app.genre}</p>
              <p><strong>Version:</strong> {app.version}</p>
              <p><strong>Release Date:</strong> {new Date(app.releaseDate).toLocaleDateString()}</p>
              <p><strong>Ratings:</strong> {app.ratings.average} / 5 ({app.ratings.count} reviews)</p>
              <p><strong>Downloads:</strong> {app.downloadCount}</p>
              <div className="mb-3"><strong>Features:</strong> {(app.features || []).map(item => <Badge key={item} bg="light" text="dark" className="me-2">{item}</Badge>)}</div>
              
              {!user ? (
                <Button variant="secondary" onClick={() => window.location.href='/login'}>Login to Download</Button>
              ) : (
                user.downloadedApps?.includes(id) ? (
                  <Button variant="success" disabled>Downloaded</Button>
                ) : (
                  <Button onClick={handleDownload}>Download App</Button>
                )
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <h4>Reviews</h4>
      <ReviewList reviews={reviews} />
      {user && <ReviewForm appId={id} onAdded={loadData} />}
    </>
  );
}
