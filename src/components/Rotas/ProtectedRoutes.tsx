import { Navigate } from 'react-router-dom';
import { type ComponentType } from 'react';

interface ProtectedRouteProps {
    element: ComponentType;
    [key: string]: unknown;
}

const ProtectedRoute = ({ element: Element, ...rest }: ProtectedRouteProps) => {
    const isAuthenticated = !!localStorage.getItem('isAuth');
    return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;