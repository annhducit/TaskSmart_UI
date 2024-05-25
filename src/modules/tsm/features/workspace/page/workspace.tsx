import { Link } from 'react-router-dom';

const Workspace = () => {
  return (
    <div>
      {data.map((item) => {
        return (
          <div className='flex flex-col gap-4'>
            <Link to={`/tsm/workspace/${item.id}`} key={item.id}>
              <h1>{item.name}</h1>
              <p>{item.description}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Workspace;

const data = [
  {
    id: 1,
    name: 'Workspace 1',
    description: 'Description 1',
  },
  {
    id: 2,
    name: 'Workspace 2',
    description: 'Description 2',
  },
  {
    id: 3,
    name: 'Workspace 3',
    description: 'Description 3',
  },
  {
    id: 4,
    name: 'Workspace 4',
    description: 'Description 4',
  },
  {
    id: 5,
    name: 'Workspace 5',
    description: 'Description 5',
  },
  {
    id: 6,
    name: 'Workspace 6',
    description: 'Description 6',
  },
  {
    id: 7,
    name: 'Workspace 7',
    description: 'Description 7',
  },
  {
    id: 8,
    name: 'Workspace 8',
    description: 'Description 8',
  },
  {
    id: 9,
    name: 'Workspace 9',
    description: 'Description 9',
  },
  {
    id: 10,
    name: 'Workspace 10',
    description: 'Description 10',
  },
];
