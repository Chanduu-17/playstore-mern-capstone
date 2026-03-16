import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge, Alert, Card, Spinner } from 'react-bootstrap';
import { getAllUsers, promoteUser } from '../services/userService';

const AdminUserPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await getAllUsers();
            if (data.success) {
                setUsers(data.users);
            } else {
                setError(data.message || 'Failed to fetch users');
            }
        } catch (err) {
            setError('Error connecting to server');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePromote = async (id) => {
        if (!window.confirm('Are you sure you want to promote this user to admin?')) return;

        try {
            const data = await promoteUser(id);
            if (data.success) {
                setSuccessMessage('User promoted to admin successfully');
                fetchUsers(); // Refresh list
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                setError(data.message || 'Promotion failed');
            }
        } catch (err) {
            setError('Error promoting user');
            console.error(err);
        }
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Loading users...</p>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <Card className="shadow-sm border-0">
                <Card.Header className="bg-white py-3">
                    <h3 className="mb-0 fw-bold text-primary">Manage Users</h3>
                </Card.Header>
                <Card.Body className="p-0">
                    {error && <Alert variant="danger" className="m-3">{error}</Alert>}
                    {successMessage && <Alert variant="success" className="m-3">{successMessage}</Alert>}
                    
                    <div className="table-responsive">
                        <Table hover className="align-middle mb-0">
                            <thead className="bg-light text-secondary">
                                <tr>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="py-3">Email</th>
                                    <th className="py-3">Role</th>
                                    <th className="py-3 text-end px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <tr key={user._id}>
                                            <td className="px-4 py-3 fw-semibold text-dark">{user.name}</td>
                                            <td className="py-3 text-secondary">{user.email}</td>
                                            <td className="py-3">
                                                <Badge bg={user.role === 'owner' ? 'dark' : (user.role === 'admin' ? 'success' : 'info')} className="text-capitalize px-3 py-2">
                                                    {user.role}
                                                </Badge>
                                            </td>
                                            <td className="py-3 text-end px-4">
                                                {user.role === 'user' && (
                                                    <Button 
                                                        variant="outline-primary" 
                                                        size="sm" 
                                                        className="rounded-pill px-3"
                                                        onClick={() => handlePromote(user._id)}
                                                    >
                                                        Promote to Admin
                                                    </Button>
                                                )}
                                                {user.role !== 'user' && (
                                                    <span className="text-muted small italic">No actions available</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-5 text-muted">No users found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AdminUserPage;
