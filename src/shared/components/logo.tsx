import logo from '@/assets/images/logo.png';
import single_logo from '@/assets/images/logo.png';

type Logo = 'LOGO' | 'SINGLE_LOGO';
const Logo = ({ type }: { type: Logo }) => {
  return (
    <div className='block'>
      {type === 'LOGO' && (
        <div className='h-[40px] w-[157px]'>
          <img src={logo} alt='' className='h-full w-full object-contain' />
        </div>
      )}
      {type === 'SINGLE_LOGO' && (
        <div className='h-5 w-5'>
          <img src={single_logo} alt='' className='h-full w-full' />
        </div>
      )}
    </div>
  );
};

export default Logo;
