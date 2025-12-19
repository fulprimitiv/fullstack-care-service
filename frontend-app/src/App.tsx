import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/global/Header/Header';
import { Navigation } from './components/global/Navigation/Navigation';
import { HomePage } from './pages/HomePage/HomePage';
import { OrdersPage } from './pages/OrdersPage/OrdersPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { RegistrationPage } from './pages/AuthPage/RegistrationPage';
import { LoginPage } from './pages/AuthPage/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';


export function App() {
   return (
      <div className="app-wrapper">
         <Header />
         <Navigation />

         <div className="app-container">
            <Routes>
               <Route path="/" element={<Navigate to="/list" replace />} />
               <Route path="/list" element={<HomePage />} />

               <Route path="/auth/login" element={<LoginPage />} />
               <Route path="/auth/registration" element={<RegistrationPage />} />

               <Route path="/profile/:id" element={<ProfilePage />} />

               <Route path="/my-orders/:id" element={<OrdersPage />} />

               {/* <Route path="/my-orders/:id" element={<OrderDetailsPage />} />
               <Route path="/my-orders/:id/edit" element={<EditOrderPage />} />
               <Route path="/orders/new" element={<CreateOrderPage />} /> */}

               <Route path="/404" element={<NotFoundPage />} />
               <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
         </div>
      </div>
   );
}
