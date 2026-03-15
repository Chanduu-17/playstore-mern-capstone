import { Button, Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const initialState = { search: '', category: '', rating: '' };

export default function AppFilters({ onApply }) {
  const [filters, setFilters] = useState(initialState);

  const handleChange = e =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <Form className="card p-3 shadow-sm mb-4">
      <Row className="g-3 align-items-end">

        {/* Search */}
        <Col md={4} style={{ position: "relative" }}>
          <Form.Control
            name="search"
            placeholder="Search apps, games, and more"
            value={filters.search}
            onChange={handleChange}
            style={{ paddingRight: "35px" }}
          />

          <FaSearch
            style={{
              position: "absolute",
              right: "24px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#888",
              pointerEvents: "none"
            }}
          />
        </Col>

        {/* Category */}
        <Col md={3}>
          <Form.Select
            name="category"
            value={filters.category}
            onChange={handleChange}
          >
            <option value="">All Categories</option>
            <option value="games">Games</option>
            <option value="beauty">Beauty</option>
            <option value="fashion">Fashion</option>
            <option value="women">Women</option>
            <option value="health">Health</option>
            <option value="social media">Social Media</option>
          </Form.Select>
        </Col>

        {/* Rating */}
        <Col md={3}>
          <Form.Select
            name="rating"
            value={filters.rating}
            onChange={handleChange}
          >
            <option value="">Any Rating</option>
            <option value="4">4 & above</option>
            <option value="3">3 & above</option>
            <option value="2">2 & above</option>
          </Form.Select>
        </Col>

        {/* Apply Button */}
        <Col md={2} className="d-grid gap-2">
          <Button onClick={() => onApply(filters)}>Apply</Button>
        </Col>

      </Row>
    </Form>
  );
}