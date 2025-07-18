import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Navigate } from 'react-router-dom';
import { Security, LoginCallback, useOktaAuth } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import { oktaConfig } from './config';
import TokenDisplay from './components/TokenDisplay';

const oktaAuth = new OktaAuth(oktaConfig);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authState } = useOktaAuth();

  if (!authState?.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const LoginButton = () => {
  const { oktaAuth } = useOktaAuth();

  const handleLogin = async () => {
    try {
      await oktaAuth.signInWithRedirect();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <button onClick={handleLogin} style={{ 
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    }}>
      Login
    </button>
  );
};

const LogoutButton = () => {
  const { oktaAuth } = useOktaAuth();

  const handleLogout = async () => {
    try {
      await oktaAuth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button onClick={handleLogout} style={{ 
      padding: '10px 20px',
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginLeft: '10px'
    }}>
      Logout
    </button>
  );
};

const Navigation = () => {
  const { authState } = useOktaAuth();
  const userCategory = authState?.idToken?.claims?.userCategory;
  const isAdminUser = authState?.idToken?.claims?.isAdmin === true;
  const isAdmin = (userCategory === 'partner' || userCategory === 'brokerages') && isAdminUser;
  const adminUrl = userCategory === 'brokerages' 
    ? 'https://usaa-b2b-trial.oktapreview.com/partner-portal/guoo3cy7mwXgAYnvj1d7'
    : 'https://usaa-b2b-trial.oktapreview.com/partner-portal/guoo1sbgvmBzqsXI31d7';

  return (
    <nav style={{ marginBottom: '20px' }}>
      <Link to="/" style={{ 
        marginRight: '10px',
        color: '#003366',
        textDecoration: 'none'
      }}>Home</Link>
      {authState?.isAuthenticated && (
        <>
          <Link to="/protected" style={{ 
            marginRight: '10px',
            color: '#003366',
            textDecoration: 'none'
          }}>Protected Page</Link>
          {isAdmin && (
            <a 
              href={adminUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                marginRight: '10px',
                color: '#003366',
                textDecoration: 'none'
              }}
            >
              Admin
            </a>
          )}
          <LogoutButton />
        </>
      )}
    </nav>
  );
};

const HomePage = () => {
  const { authState } = useOktaAuth();

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '40px',
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ 
            color: '#003366',
            margin: '0',
            fontSize: '24px'
          }}>Atko Insurance Partner Portal</h1>
        </div>
        {!authState?.isAuthenticated && <LoginButton />}
      </header>

      <main>
        <section style={{ 
          background: '#f5f9ff',
          padding: '40px',
          borderRadius: '8px',
          marginBottom: '40px'
        }}>
          <h2 style={{ 
            color: '#003366',
            marginBottom: '20px'
          }}>Welcome to Atko Insurance Partner Portal</h2>
          <p style={{ 
            fontSize: '18px',
            lineHeight: '1.6',
            color: '#333',
            marginBottom: '30px'
          }}>
            Streamline your insurance verification process with our secure partner portal. 
            Access real-time policy information, verify coverage, and manage customer data efficiently.
          </p>
        </section>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{ 
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#003366', marginBottom: '15px' }}>Real-time Verification</h3>
            <p style={{ color: '#666', lineHeight: '1.5' }}>
              Instantly verify insurance coverage and policy details for your customers.
            </p>
          </div>
          <div style={{ 
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#003366', marginBottom: '15px' }}>Secure Access</h3>
            <p style={{ color: '#666', lineHeight: '1.5' }}>
              Enterprise-grade security to protect sensitive customer information.
            </p>
          </div>
          <div style={{ 
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#003366', marginBottom: '15px' }}>24/7 Availability</h3>
            <p style={{ color: '#666', lineHeight: '1.5' }}>
              Access the portal anytime, anywhere to meet your business needs.
            </p>
          </div>
        </div>

        {!authState?.isAuthenticated && (
          <div style={{ 
            textAlign: 'center',
            padding: '40px',
            background: '#f5f9ff',
            borderRadius: '8px'
          }}>
            <h3 style={{ 
              color: '#003366',
              marginBottom: '20px'
            }}>Ready to Get Started?</h3>
            <p style={{ 
              marginBottom: '30px',
              color: '#666'
            }}>
              Log in to access the partner portal and start verifying insurance coverage.
            </p>
            <LoginButton />
          </div>
        )}
      </main>

      <footer style={{ 
        marginTop: '60px',
        paddingTop: '20px',
        borderTop: '1px solid #e0e0e0',
        color: '#666',
        fontSize: '14px'
      }}>
        <p>© 2024 Atko Insurance. All rights reserved.</p>
        <p style={{ marginTop: '10px' }}>
          For support, please contact: <a href="mailto:support@atko.com" style={{ color: '#003366' }}>support@atko.com</a>
        </p>
      </footer>
    </div>
  );
};

const CustomLoginCallback = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState?.isAuthenticated) {
      navigate('/protected', { replace: true });
    }
  }, [authState, navigate]);

  useEffect(() => {
    const handleAuth = async () => {
      try {
        await oktaAuth.handleLoginRedirect();
      } catch (err) {
        // Ignore the specific token parsing error if the user is authenticated
        if (authState?.isAuthenticated) {
          return;
        }
        
        // Only show other errors
        if (err instanceof Error && !err.message.includes('Unable to parse a token from the url')) {
          console.error('Authentication error:', err);
          setError('Failed to complete authentication. Please try again.');
        }
      }
    };

    handleAuth();
  }, [oktaAuth, authState]);

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Error during login</h2>
        <p>{error}</p>
        <Link to="/">Return to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Processing login...</h2>
      <p>Please wait while we complete your authentication.</p>
    </div>
  );
};

const App = () => {
  const navigate = useNavigate();
  
  const restoreOriginalUri = async (_oktaAuth: OktaAuth, originalUri: string) => {
    navigate(originalUri);
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <div style={{ padding: '20px' }}>
        <Navigation />
        
        <Routes>
          <Route path="/login/callback" element={<CustomLoginCallback />} />
          <Route path="/protected" element={
            <ProtectedRoute>
              <TokenDisplay />
            </ProtectedRoute>
          } />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Security>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
