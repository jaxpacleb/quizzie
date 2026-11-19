import { useState } from "react"
import { registerUser } from "./services/taskServices"
import { Lock, User, ShieldCheck, Eye, EyeOff, Shield } from 'lucide-react'

export default function SignupPage({ onChange }) {
    const [cred, setName] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    })

    const [showPassword, setShowPassword] = useState(false);

    const handleInput = (field, value) => {
        setName(prev => ({ ...prev, [field]: value }))
        if (field === 'password' && value === '') setShowPassword(false)
    }
    const signup = async () => {
        if (cred.username.trim() == '' || cred.password.trim() == '' || cred.confirmPassword.trim() == '')
            return alert('Your field/s is EMPTY!')

        if (cred.password.trim() !== cred.confirmPassword.trim())
            return alert('Your password DID NOT MATCH!')

        try {
            const res = await registerUser(cred)
            console.log(res.data.message)
        } catch (error) {
            const { detail } = error.response.data
            const { status } = error.response
            console.log(status)
            console.log(detail)
        }
    }

    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center'>

            <main className='w-full p-8 flex flex-col gap-10'>
                <section>
                    <h1 className='font-semibold text-3xl font-fredoka'>Quizzie</h1>
                </section>

                <section className=''>
                    <h1 className='font-semibold text-3xl font-fredoka'>Join the fun!</h1>
                    <p className='font-extralight text-text-color font-nunito'>Make an account and start your first quiz.</p>
                </section>

                <section className='flex flex-col gap-4'>
                    <div className=''>

                        <label htmlFor='username' className='block font-fredoka font-medium mb-1'>Username</label>
                        <div className='relative'>
                            <input type='text' placeholder='Choose a username' className='border border-primary outline-none font-nunito rounded-xl w-full py-2 pl-12' id='username' onChange={(e) => handleInput(e.target.id, e.target.value)} />
                            <User size={26} strokeWidth={1.25} nonScalingStroke className='text-text-color absolute left-3 top-1/2 -translate-y-1/2' />
                        </div>

                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor='password' className='block font-fredoka font-medium mb-1'>Password</label>
                        <div className='relative'>
                            <input
                                autoComplete=""
                                type={showPassword ? 'text' : 'password'}
                                value={cred.password}
                                placeholder='Enter your password'
                                className='border border-primary outline-none rounded-xl w-full py-2 pl-12 pr-12'
                                id='password'
                                onChange={(e) => handleInput(e.target.id, e.target.value)}
                            />

                            {/* Kaliwang Icon (Lock) */}
                            <Lock
                                size={24}
                                strokeWidth={1.25}
                                nonScalingStroke
                                className='text-text-color absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none'
                            />

                            {/* Kanang Icon (Eye / EyeOff) nakabalot sa button para clickable */}
                            {cred.password && (<button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='text-text-color absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'
                            >
                                {showPassword ? (
                                    <Eye size={24} strokeWidth={1.25} nonScalingStroke />
                                ) : (
                                    <EyeOff size={24} strokeWidth={1.25} nonScalingStroke />
                                )}
                            </button>)}
                        </div>

                    </div>


                </section>

                <button onClick={signup} className='bg-primary font-semibold text-white p-3 rounded-2xl text-xl font-fredoka shadow-[0_5px_1px_rgba(0,0,0,0.40)]'>Sign up</button>

            </main>

            <span className='fixed bottom-0 my-5 font-extralight text-text-color font-nunito'>Already have an account?<button onClick={() => onChange(false)} className='cursor-pointer text-primary font-semibold font-fredoka'>Log in</button></span>
        </div>
    )
}