
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='min-h-dvh w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 flex flex-col text-slate-100'>
      <div className='flex flex-1'>
        <main className='flex-1 p-5 overflow-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  )

}

export default MainLayout
