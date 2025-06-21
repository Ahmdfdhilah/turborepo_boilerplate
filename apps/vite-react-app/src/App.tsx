// src/App.jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { TooltipProvider } from '@workspace/ui/components/tooltip';
// Import your layouts/components
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { Toaster } from "@workspace/ui/components/sonner";
import { AuthProvider } from './components/Auth/AuthProvider';
import { DefaultLayout, AdminLayout } from './components/layouts';

function App() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <TooltipProvider>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <AuthProvider>
                <Toaster />
                <Routes>
                  {/* Public routes with DefaultLayout */}
                  <Route path="/" element={
                    <DefaultLayout>
                      <div className="container mx-auto px-4 py-8">
                        <h1 className="text-4xl font-bold text-center">Welcome to Our App</h1>
                        <p className="text-center mt-4 text-gray-600">This is the homepage using DefaultLayout</p>
                      </div>
                    </DefaultLayout>
                  } />
                  
                  {/* Admin routes with AdminLayout */}
                  <Route path="/admin/*" element={
                    <AdminLayout>
                      <div className="container mx-auto px-4">
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <p className="mt-4 text-gray-600">This is the admin area using AdminLayout</p>
                      </div>
                    </AdminLayout>
                  } />
                  
                  {/* <Route path="*" element={<NotFoundPage />} /> */}
                </Routes>
              </AuthProvider>
            </BrowserRouter>
          </PersistGate>
        </TooltipProvider>
      </Provider>
    </HelmetProvider>
  );
}

export default App;