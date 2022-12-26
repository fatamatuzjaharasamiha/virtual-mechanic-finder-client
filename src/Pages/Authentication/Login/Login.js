import React from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';

const Login = () => {

    const [signInWithEmailAndPassword, user, loading, error,] = useSignInWithEmailAndPassword(auth);
    const { register, getValues, formState: { errors }, handleSubmit } = useForm();
    const location = useLocation()
    const navigate = useNavigate()
    let from = location.state?.from?.pathname || "/";
    const email = getValues("email")
    // const [token] = useToken(user || googleUser)

    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(
        auth
    );

    let signInError
    // useEffect(() => {
    //     if (token) {
    //         navigate(from, { replace: true });
    //     }

    // }, [token, from, navigate])

    if (loading || sending) {
        return <Loading></Loading>
    }
    if (error) {
        signInError = <p className='text-red-500'><small>{error?.message}</small></p>
    }

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)
    };

    const resetPassword = async () => {
        if (email) {
            await sendPasswordResetEmail(email)
            // toast.success('Verification email sent')
        }

    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div>
                <div className='bg-primary w-full '>
                    <h2 className="text-2xl font-bold text-white p-4">Login</h2>

                </div>
                <div className="card w-96 bg-base-100 shadow-xl rounded-none">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Email is required"
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: "Provide a valid email"
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.email?.type === 'required' &&
                                        <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                    {errors.email?.type === 'pattern' &&
                                        <span className="label-text-alt text-red-500">{errors.email.message}</span>}

                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: "Password is required"
                                        },
                                        minLength: {
                                            value: 6,
                                            message: "Must be 6 characters or longer"
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.password?.type === 'required' &&
                                        <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' &&
                                        <span className="label-text-alt text-red-500">{errors.password.message}</span>}

                                </label>
                            </div>
                            {signInError}
                            <input className='btn w-full max-w-xs btn-secondary rounded-full' type="submit" value="Login" />
                        </form>
                        <p className='text-center'><small><Link className='text-primary' to='/providersignup'>Didn't have an account?</Link></small></p>
                        <p className='text-center'><small> <button onClick={resetPassword} className='text-primary btn btn-link' >Forgot Password</button></small></p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;