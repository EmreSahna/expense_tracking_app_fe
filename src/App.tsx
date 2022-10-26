import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import PrivateRoute from './components/PrivateRoute';
import Category from './components/Categories';
import Records from './components/Records';
import AppHeader from './components/AppHeader';
import Logout from './components/Logout';
function App() {
  const { Content, Footer } = Layout;
  return (
    <Layout>
    <AppHeader/>
    <Content className="site-layout" style={{ padding: '50px', marginTop: 64 }}>
      <Routes>
        <Route path='/register' element={<SignUp/>} />
        <Route path='/login' element={<SignIn/>} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='/categories' element={<PrivateRoute component={<Category />} />} />
        <Route path='/records' element={<PrivateRoute component={<Records />} />} />
      </Routes>
    </Content>
    <Footer style={{ textAlign: 'center' }}> ©2022 </Footer>
  </Layout>
  );
}

export default App;