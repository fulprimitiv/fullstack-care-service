import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/global/Header/Header';
import { Navigation } from './components/global/Navigation/Navigation';
import { HomePage } from './pages/HomePage/HomePage';

export function App() {
   return (
      <div className="app-wrapper">
         <Header />
         <Navigation />
         <div className="app-container">
            <Routes>
               <Route path="/" element={<Navigate to="/list" replace />} />
               <Route path="/list" element={<HomePage />} />
               <Route path="/profile" element={<span> профиль </span>} />
               <Route path="/my-orders" element={<span> мои заказы </span>} />
            </Routes>
         </div>
      </div>
   );
}
