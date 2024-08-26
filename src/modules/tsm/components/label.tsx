const LabelItem = (props: { color: string }) => {
  return (
    <div
      className='h-6 w-[100px] rounded'
      style={{
        backgroundColor: props.color,
      }}
    />
  );
};

export default LabelItem;
