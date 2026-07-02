// "use client";

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useAppDispatch } from '@/redux/hooks';
// import { loginSuccess } from '@/redux/slices/authSlice';
// import { useLoginMutation } from '@/redux/api/authApi';
// import { toast } from 'react-hot-toast';
// import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';

// const LoginPage = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//     });

//     const router = useRouter();
//     const dispatch = useAppDispatch();
//     const [login, { isLoading }] = useLoginMutation();

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         try {
//             const res = await login(formData).unwrap();

//             // Save to Redux
//             dispatch(loginSuccess({
//                 user: res.data.user,
//                 token: res.data.accessToken
//             }));

//             // Save to LocalStorage
//             localStorage.setItem('token', res.data.accessToken);

//             toast.success('Login Successful! Welcome back.', {
//                 style: {
//                     borderRadius: '10px',
//                     background: '#333',
//                     color: '#fff',
//                 },
//             });

//             // Redirect based on role
//             if (res.data.user.role === 'admin') {
//                 router.push('/dashboard/admin');
//             } else {
//                 router.push('/dashboard/user');
//             }
//         } catch (err: any) {
//             toast.error(err?.data?.message || 'Login failed. Please check credentials.', {
//                 duration: 4000
//             });
//         }
//     };

//     return (
//         <div className="bg-white p-8 rounded-md shadow-2xl shadow-gray-200 border border-gray-100">
//             <div className="text-center mb-10">
//                 <h1 className="text-3xl font-black text-gray-900 mb-2">Welcome Back</h1>
//                 <p className="text-gray-500 font-medium">Please enter your details to sign in</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                     <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Email Address</label>
//                     <div className="relative group">
//                         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors">
//                             <FiMail size={18} />
//                         </div>
//                         <input
//                             type="email"
//                             name="email"
//                             required
//                             value={formData.email}
//                             onChange={handleChange}
//                             className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-md text-gray-900 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none"
//                             placeholder="name@example.com"
//                         />
//                     </div>
//                 </div>

//                 <div>
//                     <div className="flex items-center justify-between mb-2 px-1">
//                         <label className="block text-sm font-bold text-gray-700">Password</label>
//                         <Link href="/forgot-password" title="Forgot Password" className="text-xs font-bold text-[var(--color-primary)] hover:underline">
//                             Forgot Password?
//                         </Link>
//                     </div>
//                     <div className="relative group">
//                         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors">
//                             <FiLock size={18} />
//                         </div>
//                         <input
//                             type={showPassword ? "text" : "password"}
//                             name="password"
//                             required
//                             value={formData.password}
//                             onChange={handleChange}
//                             className="block w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-md text-gray-900 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none"
//                             placeholder="••••••••"
//                         />
//                         <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
//                         >
//                             {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//                         </button>
//                     </div>
//                 </div>

//                 <div className="flex items-center">
//                     <input
//                         id="remember-me"
//                         name="remember-me"
//                         type="checkbox"
//                         className="h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)] border-gray-300 rounded cursor-pointer"
//                     />
//                     <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 font-medium cursor-pointer">
//                         Remember me for 30 days
//                     </label>
//                 </div>

//                 <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-md font-bold shadow-xl hover:shadow-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
//                 >
//                     {isLoading ? (
//                         <>
//                             <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
//                             Signing In...
//                         </>
//                     ) : (
//                         <>
//                             Sign In
//                             <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
//                         </>
//                     )}
//                 </button>
//             </form>

//             <div className="mt-8 pt-8 border-t border-gray-50 text-center">
//                 <p className="text-sm text-gray-500 font-medium">
//                     Don't have an account?{' '}
//                     <Link href="/register" className="text-[var(--color-primary)] font-bold hover:underline">
//                         Create Account
//                     </Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;


"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const res = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
        });

        setIsLoading(false);

        if (res?.error) {
            toast.error("Invalid email or password");
            return;
        }

        toast.success('Login Successful! Welcome back.');
        router.push('/dashboard/user');
        router.refresh();
    };

    const handleGoogleLogin = () => {
        signIn("google", { callbackUrl: "/dashboard/user" });
    };

    return (
        <div className="bg-white p-8 rounded-md shadow-2xl shadow-gray-200 border border-gray-100">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-black text-gray-900 mb-2">Welcome Back</h1>
                <p className="text-gray-500 font-medium">Please enter your details to sign in</p>
            </div>

            {/* Google Login Button */}
            <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-3.5 border border-gray-200 rounded-md font-semibold text-gray-700 hover:bg-gray-50 transition-all mb-6"
            >
                <FcGoogle size={20} />
                Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-gray-400 font-medium">OR</span>
                <div className="flex-1 h-px bg-gray-100" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 px-1">Email Address</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors">
                            <FiMail size={18} />
                        </div>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-md text-gray-900 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none"
                            placeholder="name@example.com"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-2 px-1">
                        <label className="block text-sm font-bold text-gray-700">Password</label>
                        <Link href="/forgot-password" className="text-xs font-bold text-[var(--color-primary)] hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors">
                            <FiLock size={18} />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="block w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-md text-gray-900 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-md font-bold shadow-xl hover:shadow-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            Signing In...
                        </>
                    ) : (
                        <>
                            Sign In
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-50 text-center">
                <p className="text-sm text-gray-500 font-medium">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-[var(--color-primary)] font-bold hover:underline">
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;