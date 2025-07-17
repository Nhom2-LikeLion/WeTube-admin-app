import React, { useState, useEffect } from 'react';
import {
  Eye, EyeOff, Shield, Video, Lock, User, AlertCircle
} from 'lucide-react';
import { useAuthQuery } from '../../../services/api/authApi'; // Auth API hook
import ForgotPasswordPage from './ForgotPasswordPage';

interface LoginPageProps {
  onLogin: (data: { email: string; role: string }) => void;
}

/**
 * LoginPage Component
 * - Displays the login form
 * - Validates input fields
 * - Handles login logic using useAuthQuery
 * - Supports switching to ForgotPasswordPage
 */
const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [triggerLogin, setTriggerLogin] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  // Call auth API only when triggerLogin is true
  const { data, isLoading } = useAuthQuery(formData, {
    skip: !triggerLogin,
  });

  // Handle login response
  useEffect(() => {
    if (data && data.length > 0) {
      const user = data[0];
      onLogin({ email: user.email, role: user.role });
      localStorage.setItem('user', JSON.stringify(user));
    } else if (data && data.length === 0) {
      setErrors({ general: 'Invalid email or password' });
      setTriggerLogin(false);
    }
  }, [data, onLogin]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!formData.email.trim()) newErrors.email = 'Please enter your email';
    if (!formData.password.trim()) newErrors.password = 'Please enter your password';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setTriggerLogin(true);
  };

  // Show forgot password page
  if (showForgotPassword) {
    return <ForgotPasswordPage onBackToLogin={() => setShowForgotPassword(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Video size={32} className="text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">WebTube Admin</h1>
            <p className="text-blue-100 text-sm">Video platform admin system</p>
          </div>

          {/* Body */}
          <div className="px-8 py-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-50 p-3 rounded-full">
                <Shield size={24} className="text-blue-600" />
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">Login to the system</h2>

            {/* General error */}
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertCircle size={16} className="text-red-600 mr-2" />
                <span className="text-red-700 text-sm">{errors.general}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg ${
                      errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              {/* Options */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex justify-center"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 text-center mb-2">
                <strong>Demo:</strong>
              </p>
              <p className="text-xs text-gray-500 text-center">
                Email: <code className="bg-gray-200 px-1 rounded">admin@example.com</code> | 
                Password: <code className="bg-gray-200 px-1 rounded">123456</code>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white text-sm opacity-75">
          © 2024 WebTube
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
