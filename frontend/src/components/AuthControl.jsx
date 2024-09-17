import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function AuthControl(Component) {
    return function AuthenticatedComponent(props) {
        const token = localStorage.getItem("auth-token")
        const navigate = useNavigate()

        useEffect(() => {
            if (!token) {
                toast.error('You are not logged in!', { toastId: '1', theme: "dark" })
                navigate('/auth')
            }
        }, [navigate])

        return <Component {...props} />
    }
}