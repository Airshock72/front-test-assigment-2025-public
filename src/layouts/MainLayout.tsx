import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import { Content } from 'antd/es/layout/layout'

const MainLayout = () => {
  return (
    <Layout className='h-dvh'>
      <Layout>
        <Content className='bg-slate-100 p-5 overflow-auto'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
