import { useParams } from 'react-router-dom';

const WorkspaceDetail = () => {
  const { id } = useParams();

  return <div>This is workspace detail has ID: {id}</div>;
};

export default WorkspaceDetail;
