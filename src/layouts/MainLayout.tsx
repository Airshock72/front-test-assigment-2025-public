
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='h-dvh flex flex-col'>
      <div className='flex flex-1'>
        <main className='flex-1 bg-slate-100 p-5 overflow-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  )

}

export default MainLayout
