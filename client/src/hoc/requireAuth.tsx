import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { ComponentType } from 'react';
import type { RootState } from '../store';

// Higher Order Component for authentication
function requireAuth<P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> {
  const AuthenticatedComponent = (props: P) => {
    const navigate = useNavigate();
    const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        navigate('/', { replace: true });
      }
    }, [isAuthenticated, loading, navigate]);

    if (loading) {
      return (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}>
          Loading...
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  AuthenticatedComponent.displayName = `requireAuth(${WrappedComponent.displayName || WrappedComponent.name})`;

  return AuthenticatedComponent;
}

export default requireAuth;
