import Logo from '@/shared/components/logo';

const Header = () => {
  return (
    <header className='px-10 py-6'>
      <div className='flex items-center justify-between'>
        <Logo type='SINGLE_LOGO' />
      </div>
    </header>
  );
};

export default Header;
