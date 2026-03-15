import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import AppFilters from '../components/apps/AppFilters';
import AppList from '../components/apps/AppList';
import { fetchApps } from '../services/appService';
import Footer from '../components/layout/Footer';

export default function HomePage() {
  const [apps, setApps] = useState([]);
  const [error, setError] = useState('');

  const loadApps = async filters => {
    try {
      const data = await fetchApps(filters || {});
      setApps(data);
      setError('');
    } catch (err) {
      setError('Unable to load apps');
    }
  };

  useEffect(() => { loadApps(); }, []);

  return (
    <>
      <div className="hero-card mb-4">
        <h1 className="mb-2">Explore Top Applications</h1>
        <p className="mb-0">Browse categories, search apps instantly, filter by ratings, and stay updated with the newest releases.</p>
      </div>
      <AppFilters onApply={loadApps} />
      {error && <Alert variant="danger">{error}</Alert>}
      <AppList apps={apps} />
      <Footer />
    </>
  );
}
