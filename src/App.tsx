
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import Profile from "./pages/Profile";
import Internships from "./pages/Internships";
import PaidInternships from "./pages/PaidInternships";
import FreeInternships from "./pages/FreeInternships";
import FreeCourses from "./pages/FreeCourses";
import MyCertificates from "./pages/MyCertificates";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/student-dashboard" element={
              <ProtectedRoute userType="student">
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/company-dashboard" element={
              <ProtectedRoute userType="company">
                <CompanyDashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/internships" element={
              <ProtectedRoute>
                <Internships />
              </ProtectedRoute>
            } />
            <Route path="/paid-internships" element={
              <ProtectedRoute userType="student">
                <PaidInternships />
              </ProtectedRoute>
            } />
            <Route path="/free-internships" element={
              <ProtectedRoute userType="student">
                <FreeInternships />
              </ProtectedRoute>
            } />
            <Route path="/free-courses" element={
              <ProtectedRoute userType="student">
                <FreeCourses />
              </ProtectedRoute>
            } />
            <Route path="/my-certificates" element={
              <ProtectedRoute userType="student">
                <MyCertificates />
              </ProtectedRoute>
            } />
            <Route path="/messages" element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
