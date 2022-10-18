import { Button, Form, Input, Result } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppState } from '../store';
import { login } from '../store/actions/userActions';
import { LoginForm } from '../types/user';
import showError from '../utils/showError';
import showSuccess from '../utils/showSuccess';

export default function SignIn() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const {data, loading, error} = useSelector((state: AppState) => state.user);

    const onFinish = (values: LoginForm) => {
        dispatch(login(values) as any);
    };

    useEffect(() => {
        error && showError(error);
    },[error]);
    
    useEffect(() => {
        data.username && showSuccess("You have sucessfully logged in!");
    },[data.username]);
    
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            navigate("/"); 
        }
    },[data]);
    

    return (
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        >
            <h2 style={{ textAlign: "center", marginBottom: "20px"}}>Login for an account</h2>

            {location.state?.newSignUp && (
                <Result
                status="success"
                title="You successfully signed up!"
                subTitle="Please login using your credentials."
                />
            )}
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
