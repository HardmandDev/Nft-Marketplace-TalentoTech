import { Outlet } from 'react-router-dom'
import NavBar from '@/components/NavBar'

const LayoutPublic = () => {
    return (
        <div>
            <NavBar />
            <main className='container'>
                <Outlet />
            </main>
        </div>
    )
}

export default LayoutPublic
