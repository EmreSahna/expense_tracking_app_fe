import { Route, Routes } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import PrivateRoute from './components/PrivateRoute';
import Category from './components/Categories';
import Records from './components/Records';
function App() {
  const { Header, Content, Footer } = Layout;
  return (
    <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={new Array(3).fill(null).map((_, index) => ({
          key: String(index + 1),
          label: `nav ${index + 1}`,
        }))}
      />
    </Header>
    <Content className="site-layout" style={{ padding: '50px', marginTop: 64 }}>
      <Routes>
        <Route path='/register' element={<SignUp/>} />
        <Route path='/login' element={<SignIn/>} />
        <Route path='/categories' element={<PrivateRoute component={<Category />} />} />
        <Route path='/records' element={<PrivateRoute component={<Records />} />} />
      </Routes>
    </Content>
    <Footer style={{ textAlign: 'center' }}> ©2022 </Footer>
  </Layout>
  );
}

export default App;

/* private route usage

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
  isAuthenticated: !!sessionContext.isAuthenticated,
  authenticationPath: '/login',
};

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  outlet: JSX.Element;
};

export default function ProtectedRoute({isAuthenticated, authenticationPath, outlet}: ProtectedRouteProps) {
  if(isAuthenticated) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
};


<Route path='protected' element={<PrivateRoute {...defaultProtectedRouteProps} outlet={<Protected />} />} />
<Route path='nested' element={<PrivateRoute {...defaultProtectedRouteProps} outlet={<Layout />} />}>
  <Route path='one' element={<Protected />} />
  <Route path='two' element={<Protected />} />
</Route>
*/