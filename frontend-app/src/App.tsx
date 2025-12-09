import { Routes, Route, Navigate } from 'react-router-dom';

export function App() {
   return (
      <div className="app-wrapper">
         <span> хедер </span>
         <div className="app-container">
            <Routes>
               <Route path="/" element={<Navigate to="/list" replace />} />
               <Route path="/list" element={<span> мейн </span>} />
            </Routes>
         </div>
      </div>
   );
}
