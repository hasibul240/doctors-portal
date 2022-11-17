import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = data => {
        console.log(data);
    }

    return (
        <div className='h-[600px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-3xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email"
                            {...register("email", { required: "Email Address is required" })}
                            className="p-0 input input-bordered w-full"
                        />
                        {errors.email && <p role="alert" className='text-red-600 text-sm mt-2'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password"
                            {...register("password", {
                                required: "Password is Required",
                                minLength: {value:6, message: "Password must be at least 6 characters"},
                            })}
                            className="input input-bordered w-full"
                        />
                        {errors.password && <p role="alert" className='text-red-600 text-sm mt-2'>{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text">Forgate Password!</span>
                        </label>

                    </div>
                    <input className='btn btn-accent w-full' value="Login" type="submit" />
                </form>
                <p className='mt-2'>New to Doctors Portal ? <Link className='text-secondary hover:underline' to="/signup">Create New Account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>Continue With Google</button>
            </div>
        </div>
    );
};

export default Login;