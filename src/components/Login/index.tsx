import './index.less'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()

    return (
        <div className='loginContain'>
            欢迎来到
            <h2>Electron React</h2>
            <Button type='primary' onClick={() => navigate('/home')}>前往首页</Button>
        </div>
    )
}

export default Login