import { useEffect, useState } from 'react';
import { Form, Button, Alert, Row, Col, Spinner } from 'react-bootstrap';
import { getProfile, updateProfile } from '../services/userService';
import { useAuth } from '../context/AuthContext';
import AppList from '../components/apps/AppList';

export default function ProfilePage() {
    const { user, login } = useAuth(); // We might need to update the user in context if name changes
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [status, setStatus] = useState({ type: '', message: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setProfile(data.user);
                setFormData({ name: data.user.name, email: data.user.email });
            } catch (error) {
                setStatus({ type: 'danger', message: 'Failed to load profile details.' });
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setStatus({ type: '', message: '' });
        try {
            const data = await updateProfile(formData);
            setStatus({ type: 'success', message: 'Profile updated successfully!' });
            
            // Update auth context state if the user object is maintained there
            if (user && login) {
                // To keep token and update user, we'd need to emit a new token from backend, 
                // but since we aren't, we can just update local storage user if needed, 
                // or just rely on the next refresh. For now, we update local state.
                const updatedUser = { ...user, name: data.user.name, email: data.user.email };
                localStorage.setItem('user', JSON.stringify(updatedUser)); // Optional: align with AuthContext if it uses this
            }
            
            setProfile(data.user);
        } catch (error) {
            setStatus({ type: 'danger', message: error.response?.data?.message || 'Update failed.' });
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return <div className="text-center mt-5"><Spinner animation="border" /></div>;
    }

    if (!profile) {
        return <Alert variant="danger">Error loading profile.</Alert>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">My Profile</h2>
            
            {status.message && <Alert variant={status.type}>{status.message}</Alert>}

            <Row className="mb-5">
                <Col md={6}>
                    <div className="card shadow-sm p-4">
                        <h4 className="mb-3">Update Details</h4>
                        <Form onSubmit={handleUpdate}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            
                            <Button 
                                type="submit" 
                                variant="primary" 
                                disabled={updating}
                                style={{
                                    background: "linear-gradient(125deg, #007bff, #598abe)",
                                    border: "none",
                                    color: "black"
                                }}
                            >
                                {updating ? 'Updating...' : 'Save Changes'}
                            </Button>
                        </Form>
                    </div>
                </Col>
                <Col md={6}>
                    <div className="card shadow-sm p-4 h-100 bg-light">
                        <h4 className="mb-3">Account Info</h4>
                        <p><strong>Role:</strong> {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}</p>
                        <p><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
                    </div>
                </Col>
            </Row>

            <h3>{profile.role === 'owner' ? 'My Uploaded Apps' : 'My Downloaded Apps'}</h3>
            <hr />
            
            {profile.role === 'user' && (
                profile.downloadedApps?.length > 0 ? (
                    <AppList apps={profile.downloadedApps} />
                ) : (
                    <p className="text-muted">You haven't downloaded any apps yet.</p>
                )
            )}

            {profile.role === 'owner' && (
                profile.uploadedApps?.length > 0 ? (
                    <AppList apps={profile.uploadedApps} />
                ) : (
                    <p className="text-muted">You haven't uploaded any apps yet.</p>
                )
            )}
        </div>
    );
}
