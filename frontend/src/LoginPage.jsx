import { useState } from "react"

export default function LoginPage({ onChange }) {
    const [cred, setCred] = useState({
        username: '',
        password: ''
    })

    const handleInput = (field, value) => {
        setCred(prev => ({ ...prev, [field]: value }))
    }

    const login = () => {

    }

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="bg-blue-400 w-80 px-5 py-5 rounded-xl flex flex-col gap-5">
                <h1 className="text-xl font-semibold">Login</h1>
                <section className="flex flex-col">
                    <label htmlFor="" className="">Enter username: </label>
                    <input type="text" id="username" onChange={(e) => handleInput(e.target.id, e.target.value)} placeholder="Enter here your username..." className="outline-none bg-white pl-3 py-1 rounded-xl" />
                </section>

                <section className="flex flex-col">
                    <label htmlFor="">Enter password: </label>
                    <input type="text" id="password" onChange={(e) => handleInput(e.target.id, e.target.value)} placeholder="Enter here your password..." className="outline-none bg-white pl-3 py-1 rounded-xl" />
                </section>

                <button onClick={login} className="bg-green-200 py-1.5 cursor-pointer rounded-md">Login</button>
                <button onChange={() => onChange(true)}>I dont have account yet</button>
            </div>
        </div>
    )
}