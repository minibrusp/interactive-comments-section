import { Link } from 'react-router-dom'
import Image404 from '../assets/images/404.png'

export default function Page404() {
  return (
    <section className="min-h-[80vh] font-rubik mx-auto p-4">
      <div className='flex flex-col justify-center items-center p-4 gap-4'>
        <img className='w-full mb-6 max-w-[400px]' src={Image404} alt="image 404" />
        <h1 className='text-xl uppercase tracking-widest p-4 mb-12 border-4 border-dashed border-primary-light-grayish-blue rounded-md'>page not found</h1>
        <Link 
          className='text-lg uppercase text-neutral-light-gray py-4 px-6 bg-primary-soft-red rounded-lg shadow-2xl hover:bg-primary-moderate-blue tracking-widest' 
          to="/"
        >home</Link>
      </div>
    </section>
  )
}
