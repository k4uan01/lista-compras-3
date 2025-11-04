import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RegisterPage, LoginPage } from './Auth';
import { NotFoundPage, HomePage } from './General';
import { CreateProductPage } from './Products';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/products/create" element={<CreateProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;