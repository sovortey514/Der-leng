import {Routes, Route} from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import NotFoundPage from '../pages/NotFoundPage'

function Routers() {
    return (
        <>
            <Routes>
                <Route path='' element={<HomePage/>} />
                <Route path='login' element={<LoginPage/>} />
                <Route path='register' element={<RegisterPage/>} />
                <Route path='*' element={<NotFoundPage/>}/>
            </Routes>
        </>
    )
}

export default Routers