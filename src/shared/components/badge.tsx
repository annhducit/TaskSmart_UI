export const Badge = ({ color }: { color: string }) => {
  return (
    <span
      className='h-2 w-2 rounded-full'
      style={{
        backgroundColor: color,
      }}
    />
  );
};
