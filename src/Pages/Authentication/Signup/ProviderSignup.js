import React from 'react';
import { useCreateUserWithEmailAndPassword, useSendEmailVerification, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';

const ProviderSignup = () => {

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate()

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [sendEmailVerification, sending] = useSendEmailVerification(auth);

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    // const [token] = useToken(user || googleUser)

    let signInError


    if (loading || googleLoading || updating || sending) {
        return <Loading></Loading>
    }
    if (error || googleError || updateError) {
        signInError = <p className='text-red-500'><small>{error?.message || googleError?.message || updateError?.message}</small></p>
    }

    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password)
        await updateProfile({ displayName: data.name });
        await sendEmailVerification()
    };

    // if (token) {
    //     navigate('/')
    // }


    // const handleProvider = () => {
    //     return (

    //         navigate('/providersignup')
    //     );
    // }
    // const handleCustomer = () => {
    //     return (

    //         navigate('/customersignup')
    //     );
    // }

    const slots = ['Police', 'City Corporation', 'WASA', 'BPDB', 'DPDC', 'DESCO', 'Palli Bidyut', 'Karnaphuli Gas', 'Titas Gas', 'Bashundhara LP Gas',]
    return (
        <div className='flex justify-center items-center h-screen'>

            <div className='mt-56'>
                <div className='bg-primary w-full '>
                    <h2 className="text-2xl font-bold text-white p-4">Sign Up from provider</h2>

                </div>
                <div className='flex'>

                    <NavLink to='/providersignup' className={({ isActive }) => isActive ? 'btn btn-secondary text-black rounded-none' : 'btn glass text-black rounded-none'}>Provider</NavLink>
                    <NavLink to='/customersignup' className={({ isActive }) => isActive ? 'btn btn-secondary text-black rounded-none' : "btn glass text-black rounded-none"}>Customer</NavLink>
                </div>
                <div className="card w-full bg-base-100 shadow-xl rounded-none">
                    <div className="card-body">

                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className='flex'>
                                <div className="form-control w-full max-w-xs mr-4">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="input input-bordered w-full max-w-xs"
                                        {...register("name", {
                                            required: {
                                                value: true,
                                                message: "Name is required"
                                            }
                                        })}
                                    />
                                    <label className="label">
                                        {errors.name?.type === 'required' &&
                                            <span className="label-text-alt text-red-500">{errors.name.message}</span>}

                                    </label>
                                </div>
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
                            </div>

                            {/* --------------------- Password ------------------ */}

                            <div className='flex'>
                                <div className="form-control w-full max-w-xs mr-4">
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
                                                value: /[!@#\$%\^&\*_]/,
                                                message: "Please provide a strong password"
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

                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Confirm Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        className="input input-bordered w-full max-w-xs"
                                        {...register("confirmPassword", {
                                            required: {
                                                value: true,
                                                message: "Password is required"
                                            },
                                            minLength: {
                                                value: /[!@#\$%\^&\*_]/,
                                                message: "Please provide a strong password"
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
                            </div>
                            <div className='flex'>
                                <div className="form-control w-full max-w-xs mr-4">
                                    <label className="label">
                                        <span className="label-text">Shop Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your Shop Name"
                                        className="input input-bordered w-full max-w-xs"
                                        {...register("shopName", {
                                            required: {
                                                value: true,
                                                message: "Shop Name is required"
                                            }
                                        })}
                                    />
                                    <label className="label">
                                        {errors.shopName?.type === 'required' &&
                                            <span className="label-text-alt text-red-500">{errors.shopName.message}</span>}

                                    </label>
                                </div>
                                <div className="form-control w-full max-w-xs ">
                                    <label className="label">
                                        <span className="label-text">City</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your City"
                                        className="input input-bordered w-full max-w-xs"
                                        {...register("city", {
                                            required: {
                                                value: true,
                                                message: "City is required"
                                            }
                                        })}
                                    />
                                    <label className="label">
                                        {errors.city?.type === 'required' &&
                                            <span className="label-text-alt text-red-500">{errors.city.message}</span>}

                                    </label>
                                </div>
                            </div>
                            {/* -------------------------------------------- */}
                            <div className='flex'>
                                <div className="form-control w-full max-w-xs mr-4">
                                    <label className="label">
                                        <span className="label-text">Mobile</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Your Number"
                                        className="input input-bordered w-full max-w-xs"
                                        {...register("number", {
                                            required: {
                                                value: true,
                                                message: "Number is required"
                                            }
                                        })}
                                    />
                                    <label className="label">
                                        {errors.number?.type === 'required' &&
                                            <span className="label-text-alt text-red-500">{errors.number.message}</span>}

                                    </label>
                                </div>

                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Catagory</span>
                                    </label>
                                    <select
                                        className="input input-bordered w-full max-w-xs"
                                        {...register("catagory", {
                                            required: {
                                                value: true,
                                                message: "Catagory is required"
                                            }
                                        })}
                                    >
                                        {
                                            slots.map((slot, index) => <option
                                                key={index}
                                                value={slot}
                                            >{slot}</option>)
                                        }
                                    </select>
                                    <label className="label">
                                        {errors.department?.type === 'required' &&
                                            <span className="label-text-alt text-red-500">{errors.name.message}</span>}

                                    </label>
                                </div>
                            </div>

                            {signInError}
                            <div className='w-full'>
                                <input className='btn w-full  btn-secondary rounded-full' type="submit" value="SIGN UP" />
                            </div>
                        </form>
                        <p className='text-center'><small><Link to='/login'>Already registered? </Link></small></p>

                    </div>
                </div>
            </div>
        </div>
    );

};

export default ProviderSignup;