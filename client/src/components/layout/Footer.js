import { useState } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { submitContact } from '../../services/contactService';
import { useAuth } from '../../context/AuthContext';

export default function Footer() {
    const { user } = useAuth();
    const [show, setShow] = useState(false);
    const [contact, setContact] = useState({
        name: '',
        email: '',
        message: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleAdd = async () => {
        setLoading(true);
        setStatus({ type: '', message: '' });
        try {
            await submitContact(contact);
            setStatus({ type: 'success', message: 'Message sent successfully!' });
            setContact({ name: '', email: '', message: '', phone: '' });
            setTimeout(() => {
                setShow(false);
                setStatus({ type: '', message: '' });
            }, 2000);
        } catch (error) {
            setStatus({ type: 'danger', message: error.response?.data?.message || 'Failed to send message.' });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleHideModal = () => {
        setShow(false);
        setStatus({ type: '', message: '' });
    };

    return (
        <>
            <footer
                style={{
                    background: "#262637",
                    width: "100vw",
                    position: "absolute",
                    left: "50%",
                    right: "50%",
                    marginLeft: "-50vw",
                    marginRight: "-50vw",
                    color: "white",
                    textAlign: "left",
                    padding: "30px 20px",
                    marginTop: "60px",
                }}
            >
                <div
                    style={{
                        maxWidth: "1100px",
                        margin: "0 auto",
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "30px"
                    }}
                >
                    <div style={{ flex: "1 1 250px" }}>
                        <h2 style={{ color: "#dacf09", marginBottom: "10px" }}>Play Store</h2>
                        <p style={{ color: "#aaa", fontSize: "0.9rem" }}>
                            Discover and download your favorite apps. Browse categories,
                            explore trending apps, and stay updated with the latest releases.
                        </p>
                    </div>

                    <div style={{ flex: "1 1 200px" }}>
                        <h5 style={{ marginBottom: "12px" }}>Categories</h5>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px", color: "#aaa" }}>
                            <span>🎮 Games</span>
                            <span>💄 Beauty</span>
                            <span>📚 Education</span>
                            <span>🛍 Shopping</span>
                            <span>🎬 Entertainment</span>
                        </div>
                    </div>

                    <div style={{ flex: "1 1 200px" }}>
                        <h5 style={{ marginBottom: "12px" }}>Quick Links</h5>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px", color: "#aaa" }}>
                            <a href="/" style={{ color: "#aaa", textDecoration: "none" }}>
                                Home
                            </a>

                            {user?.role !== 'owner' && (
                                <span style={{ cursor: "pointer" }} onClick={() => setShow(true)}>
                                    Contact Us
                                </span>
                            )}

                            {/* <span style={{ display: "flex", gap: "18px", alignItems: "center" }}>
                                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" style={{ color: "#315ae0" }}>
                                    <FaLinkedin size={30} />
                                </a>

                                <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: "#33d972" }}>
                                    <FaGithub size={30} />
                                </a>
                            </span> */}
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        borderTop: "1px solid #444",
                        marginTop: "30px",
                        paddingTop: "15px",
                        textAlign: "center",
                        color: "#777",
                        fontSize: "0.85rem"
                    }}
                >
                    © {new Date().getFullYear()} PlayStore. All rights reserved.
                </div>
            </footer>

            <Modal show={show} onHide={handleHideModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Let’s Connect</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {status.message && (
                        <Alert variant={status.type} onClose={() => setStatus({ type: '', message: '' })} dismissible>
                            {status.message}
                        </Alert>
                    )}
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={contact.name}
                                onChange={handleChange}
                                placeholder="Enter name"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={contact.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                            />
                        </Form.Group>



                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={contact.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="message"
                                value={contact.message}
                                onChange={handleChange}
                                placeholder="Enter message"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer >
                    <Button
                        onClick={handleAdd}
                        disabled={loading}
                        style={{
                            background: "linear-gradient(125deg, #007bff, #598abe)",
                            border: "none",
                            color: "black",
                            fontSize: "1.1rem",
                        }}
                    >
                        {loading ? (
                            <>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                <span className="ms-2">Sending...</span>
                            </>
                        ) : (
                            'Send Message'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
