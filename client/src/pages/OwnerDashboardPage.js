import { useEffect, useState } from 'react';
import { Alert, Button, Card, Form, Table } from 'react-bootstrap';
import { FaDownload, FaStar } from 'react-icons/fa';
import AppForm from '../components/owner/AppForm';
import OwnerReviewsPanel from '../components/owner/OwnerReviewsPanel';
import { announceUpdate, createApp, deleteApp, fetchApps, toggleVisibility, updateApp } from '../services/appService';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/layout/Footer';

export default function OwnerDashboardPage() {
  const { user } = useAuth();
  const [apps, setApps] = useState([]);
  const [editingApp, setEditingApp] = useState(null);
  const [status, setStatus] = useState('');
  const [announcement, setAnnouncement] = useState({});

  const loadApps = async () => {
    const data = await fetchApps({ includeHidden: true, ownerId: user.id });
    setApps(data);
  };

  useEffect(() => { if (user) loadApps(); }, [user]);

  const handleSave = async payload => {
    if (editingApp) {
      await updateApp(editingApp.id, payload);
      setStatus('App updated successfully');
      setEditingApp(null);
    } else {
      await createApp(payload);
      setStatus('App created successfully');
    }
    loadApps();
  };

  const handleDelete = async id => {
    await deleteApp(id);
    setStatus('App deleted successfully');
    loadApps();
  };

  const handleVisibility = async (id, visible) => {
    await toggleVisibility(id, !visible);
    setStatus('Visibility updated');
    loadApps();
  };

  const handleAnnounce = async id => {
    const res = await announceUpdate(id, announcement[id] || 'A new update is available for your downloaded app.');
    if (res.notifiedUsers === 0) {
      setStatus(`Update announced, but no users have downloaded this app yet, so no one was notified.`);
    } else {
      setStatus(`Update announced successfully to ${res.notifiedUsers} users`);
    }
    setAnnouncement({ ...announcement, [id]: '' });
  };

  return (
    <div className="container-fluid pb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">Owner Dashboard</h2>
        <div className="text-muted small">Logged in as {user.name}</div>
      </div>

      {status && <Alert variant="success" className="border-0 shadow-sm mb-4">{status}</Alert>}

      <div className="row g-4">
        <div className="col-lg-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-4">{editingApp ? 'Update Application' : 'Add New Application'}</h5>
              <AppForm onSubmit={handleSave} editingApp={editingApp} onCancel={() => setEditingApp(null)} />
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-8">
          <Card className="dashboard-table-card border-0">
            <Card.Body className="p-0">
              <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                <h5 className="fw-bold m-0">My Applications</h5>
                <span className="badge bg-soft-primary text-primary px-3 py-2 rounded-pill" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}>
                  {apps.length} Total Apps
                </span>
              </div>

              <div className="table-responsive">
                <Table hover className="align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Application</th>
                      <th>Category</th>
                      <th>Stats</th>
                      <th>Visibility</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apps.map(app => (
                      <tr key={app.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div 
                              className="rounded-3 me-3 d-flex align-items-center justify-content-center fw-bold text-white shadow-sm"
                              style={{ width: '40px', height: '40px', background: 'var(--primary-gradient)', fontSize: '0.9rem' }}
                            >
                              {app.name.charAt(0)}
                            </div>
                            <div>
                              <div className="fw-bold">{app.name}</div>
                              <div className="text-muted small">v{app.version}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark px-2 py-1">{app.category}</span>
                        </td>
                        <td>
                          <div className="small text-muted">
                            <div><FaStar className="text-warning me-1" />{app.ratings.average} Rating</div>
                            <div><FaDownload className="me-1" />{app.downloadCount} Downloads</div>
                          </div>
                        </td>
                        <td>
                          {app.visible ? (
                            <span className="badge bg-success-subtle text-success px-3 py-1 rounded-pill">Visible</span>
                          ) : (
                            <span className="badge bg-secondary-subtle text-secondary px-3 py-1 rounded-pill">Hidden</span>
                          )}
                        </td>
                        <td>
                          <div className="d-flex justify-content-end gap-2">
                            <Button 
                              variant="outline-primary" 
                              size="sm" 
                              className="px-3"
                              onClick={() => setEditingApp(app)}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant={app.visible ? "outline-warning" : "outline-success"} 
                              size="sm" 
                              className="px-3"
                              onClick={() => handleVisibility(app.id, app.visible)}
                            >
                              {app.visible ? 'Hide' : 'Show'}
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm" 
                              className="px-3"
                              onClick={() => handleDelete(app.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {apps.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center py-5 text-muted">
                          No applications found. Add your first app to get started.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>

          {apps.map(app => (
            <Card key={`announcement-${app.id}`} className="mt-3 border-0 shadow-sm overflow-hidden">
              <Card.Body className="p-0">
                <div className="p-3 bg-light border-bottom fw-bold d-flex align-items-center">
                  <span className="small me-2 text-muted">Send Update for:</span> {app.name}
                </div>
                <div className="p-3">
                  <div className="input-group">
                    <Form.Control
                      placeholder="Type an announcement for your users..."
                      value={announcement[app.id] || ''}
                      className="border-end-0 shadow-none"
                      style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                      onChange={e =>
                        setAnnouncement({ ...announcement, [app.id]: e.target.value })
                      }
                    />
                    <Button
                      variant="success"
                      className="px-4"
                      style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                      onClick={() => handleAnnounce(app.id)}
                    >
                      Notify Users
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="mt-5">
        <h4 className="fw-bold mb-4">User Feedback</h4>
        <OwnerReviewsPanel />
      </div>
      
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
}
