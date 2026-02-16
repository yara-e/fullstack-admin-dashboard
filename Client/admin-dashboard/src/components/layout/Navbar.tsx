import {Menu} from 'lucide-react'
import {  useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/app/store'
import { logout } from '../../features/auth/authSlice'

interface NavbarProps{
    openSidebar: ()=> void
}

const Navbar=({openSidebar}: NavbarProps)=>{
const dispatch = useDispatch();
const user = useSelector((state:RootState)=> state.auth.user)
    return(
         <header className='flex items-center justify-between bg-white shadow px-4 py-3'>
<button onClick={openSidebar} className='md:hidden'>
    <Menu/>
</button>
<div className="ml-auto flex items-center gap-4">
        <span className="hidden sm:block font-medium">
          {user?.name}
        </span>

        <button
          onClick={() => dispatch(logout())}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
         </header>
    )

}

export default Navbar