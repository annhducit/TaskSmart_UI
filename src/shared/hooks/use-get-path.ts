import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useGetPath = () => {
  const location = useLocation();
  const [path, setPath] = useState<string[]>([]);

  const [pageName, setPageName] = useState<string>('');

  useEffect(() => {
    const paths = location.pathname.split('/').filter((path) => path !== '');
    setPath(paths);
    setPageName(paths[paths.length - 1]);
  }, [location]);

  return { path, pageName };
};

export default useGetPath;
