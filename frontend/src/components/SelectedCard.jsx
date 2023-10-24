import { Link } from 'react-router-dom';

const SelectedCard = ({img, url, text}) => {
  return (
    <Link to={null} className="relative w-[220px] h-[360px] font-poppins rounded-xl overflow-hidden z-10">
        <img className='' src={img} alt={text} />
        <div className="font-caprasimo absolute top-0 left-0 w-full h-full text-white flex justify-center text-3xl text-center gradiente">
            <p className='mt-5'>{text}</p>
        </div>
    </Link>
  )
}
export default SelectedCard