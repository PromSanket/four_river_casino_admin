import React, { FC, ReactNode, useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';

interface IProtectedRouteProps {
	children: ReactNode;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }) => {
	const { user } = useContext(AuthContext);
	const location = useLocation();

	if (!user) {
		// Redirect to login page but save the attempted location
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
