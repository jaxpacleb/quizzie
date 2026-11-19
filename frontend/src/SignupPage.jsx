import { useState } from "react"
import { registerUser } from "./services/taskServices"

export default function SignupPage({ onChange }) {
    const [name, setName] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    })

    const handleInput = (field, value) => {
        setName(prev => ({ ...prev, [field]: value }))
    }
    const submit = async () => {
        console.log(name)

        try {
            const res = await registerUser(name)
            console.log(res.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="bg-blue-400 w-80 px-5 py-5 rounded-xl flex flex-col gap-5">
                <h1 className="text-xl font-semibold">Signup</h1>
                <section className="flex flex-col">
                    <label htmlFor="" className="">Enter username: </label>
                    <input type="text" id="username" onChange={(e) => handleInput(e.target.id, e.target.value)} placeholder="Enter here your username..." className="outline-none bg-white pl-3 py-1 rounded-xl" />
                </section>

                <section className="flex flex-col">
                    <label htmlFor="">Enter password: </label>
                    <input type="text" id="password" onChange={(e) => handleInput(e.target.id, e.target.value)} placeholder="Enter here your password..." className="outline-none bg-white pl-3 py-1 rounded-xl" />
                </section>

                <section className="flex flex-col">
                    <label htmlFor="">Confirm password: </label>
                    <input type="text" id="confirmPassword" onChange={(e) => handleInput(e.target.id, e.target.value)} placeholder="Confirm your password..." className="outline-none bg-white pl-3 py-1 rounded-xl" />
                </section>

                <button onClick={submit} className="bg-green-200 py-1.5 cursor-pointer rounded-md">Sign up</button>
                <button className="cursor-pointer" onClick={() => onChange(false)}>I already have an account</button>
            </div>
        </div>
    )
}