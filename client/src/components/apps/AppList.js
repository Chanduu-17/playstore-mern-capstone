import { Row, Col } from "react-bootstrap";
import AppCard from "./AppCard";

export default function AppList({ apps }) {
  return (
    <Row className="g-3">
      {apps.map((app) => (
        <Col key={app._id} lg={3} md={4} sm={6} xs={12}>
          <AppCard app={app} />
        </Col>
      ))}
    </Row>
  );
}