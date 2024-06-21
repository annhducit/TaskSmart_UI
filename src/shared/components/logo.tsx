import logo from '@/assets/images/logo.png';
import single_logo from '@/assets/images/logo-single.png';
import { useNavigate } from 'react-router-dom';

type Logo = 'LOGO' | 'SINGLE_LOGO';
const Logo = ({ type, size = 'h-5 w-5' }: { type: Logo; size?: string }) => {
  const naviagte = useNavigate();
  return (
    <div className='block' onClick={() => naviagte('..')}>
      {type === 'LOGO' && (
        <div className='h-[35px] w-[152px]'>
          <img src={logo} alt='' className='h-full w-full object-contain' />
        </div>
      )}
      {type === 'SINGLE_LOGO' && (
        <div className={size}>
          <img src={single_logo} alt='' className='h-full w-full' />
        </div>
      )}
    </div>
  );
};

export default Logo;
