import { Button, message,Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../types/user';
import api from '../utils/api';
import showError from '../utils/showError';
export default function SignUp() {
  const navigate = useNavigate();
  const onFinish = async (values: LoginForm) => {
    try{
      await api().post("/user/register",values);
      navigate("/login", { state:{newSignUp:true} });
    }catch(error){
      showError((error as any).response.data.error);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px"}}>Register for an account</h2>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

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
  );
}
