import { Navigate } from 'react-router-dom';
import ProtectedRoute3 from './useFetchWithMembershipCheck';

function ProtectedRoute2({ element }) {
    const isMember = ProtectedRoute3();

    console.log(isMember,"isMEmber")
    if (!isMember) {
        alert('Only access for Members.')
        return <Navigate to="/membership" replace />;
    }

    return element;
}

export default ProtectedRoute2;
