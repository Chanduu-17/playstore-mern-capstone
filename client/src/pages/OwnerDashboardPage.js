import { useEffect, useState } from 'react';
import { Alert, Button, Card, Form, Table } from 'react-bootstrap';
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
    await announceUpdate(id, announcement[id] || 'A new update is available for your downloaded app.');
    setStatus('Update announced successfully');
  };

  return (
    <>
      {status && <Alert variant="success">{status}</Alert>}
      <AppForm onSubmit={handleSave} editingApp={editingApp} onCancel={() => setEditingApp(null)} />
      <Card className="shadow-sm mb-4" style={{ backgroundColor: "#f1eded" }}>
        <Card.Body style={{ backgroundColor: "#f1eded", borderRadius: "20px" }}>
          <h4 className="mb-3">My Applications</h4>

          <div style={{ backgroundColor: "#f1eded" }}>
            <Table
              responsive
              hover
              className="align-middle mb-0"
              style={{ backgroundColor: "#f1eded" }}
            >
              <thead style={{ backgroundColor: "#f1eded" }}>
                <tr>
                  <th style={{ backgroundColor: "#f1eded" }}>Name</th>
                  <th style={{ backgroundColor: "#f1eded" }}>Category</th>
                  <th style={{ backgroundColor: "#f1eded" }}>Version</th>
                  <th style={{ backgroundColor: "#f1eded" }}>Rating</th>
                  <th style={{ backgroundColor: "#f1eded" }}>Downloads</th>
                  <th style={{ backgroundColor: "#f1eded" }}>Visible</th>
                  <th style={{ backgroundColor: "#f1eded" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {apps.map(app => (
                  <tr key={app.id} style={{ backgroundColor: "#f1eded" }}>
                    <td style={{ backgroundColor: "#f1eded" }}>{app.name}</td>
                    <td style={{ backgroundColor: "#f1eded" }}>{app.category}</td>
                    <td style={{ backgroundColor: "#f1eded" }}>{app.version}</td>
                    <td style={{ backgroundColor: "#f1eded" }}>{app.ratings.average}</td>
                    <td style={{ backgroundColor: "#f1eded" }}>{app.downloadCount}</td>
                    <td style={{ backgroundColor: "#f1eded" }}>{app.visible ? 'Yes' : 'No'}</td>
                    <td style={{ backgroundColor: "#f1eded" }}>
                      <div className="d-flex flex-column gap-2">
                        <div className="d-flex gap-2">
                          <Button
                            size="sm"
                            className="flex-fill"
                            onClick={() => setEditingApp(app)}
                          >
                            Edit
                          </Button>

                          <Button
                            size="sm"
                            variant="warning"
                            className="flex-fill"
                            onClick={() => handleVisibility(app.id, app.visible)}
                          >
                            {app.visible ? 'Hide' : 'Show'}
                          </Button>

                          <Button
                            size="sm"
                            variant="danger"
                            className="flex-fill"
                            onClick={() => handleDelete(app.id)}
                          >
                            Delete
                          </Button>
                        </div>

                        <Form.Control
                          size="sm"
                          placeholder="Announcement message"
                          value={announcement[app.id] || ''}
                          onChange={e =>
                            setAnnouncement({ ...announcement, [app.id]: e.target.value })
                          }
                        />

                        <Button
                          size="sm"
                          variant="success"
                          onClick={() => handleAnnounce(app.id)}
                        >
                          Announce Update
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
      <OwnerReviewsPanel />
      <Footer />
    </>
  );
}
