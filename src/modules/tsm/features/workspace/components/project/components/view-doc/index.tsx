import { useParams } from 'react-router-dom';
import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import useGetPdf from '../../hooks/query/use-get-pdf';
import { useEffect, useState } from 'react';
import Loading from '@/shared/components/loading';
import { useSelector } from '@/store';

export default function ViewDoc() {
  const { projectId } = useParams();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const { data, isLoading } = useGetPdf(projectId as string);

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { btnColor } = useSelector((state) => state.theme);
  useEffect(() => {
    if (data) {
      const url = URL.createObjectURL(data);
      setPdfUrl(url);

      /**
       * Revoke the object URL when the component is unmounted
       */
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [data]);

  /**
   * Show loading spinner while loading the PDF
   */
  if (isLoading) {
    return (
      <div className='flex items-center justify-center'>
        <Loading.Page size='full' />
      </div>
    );
  }

  if (!pdfUrl) {
    return null;
  }
  return (
    <div
      style={{
        border: `1px solid ${btnColor}`,
      }}
      className='h-screen'
    >
      <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'>
        <Viewer fileUrl={pdfUrl} enableSmoothScroll plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </div>
  );
}
