import {
  primaryAccentNew1,
  primaryAccentNew2,
  primaryAccentNew3,
  primaryAccentNew4,
  primaryAccentNew5,
  primaryAccentNew6,
  primaryAccentNew7,
  primaryAccentNew8,
  primaryAccentNew9,
  primaryAccentNew10,
  primaryLighterAccent1,
  primaryLighterAccent2,
  primaryLighterAccent3,
  primaryLighterAccent4,
  primaryLighterAccent5,
  primaryLighterAccent6,
  primaryLighterAccent7,
  primaryLighterAccent8,
  primaryLighterAccent9,
  primaryLighterAccent10,
  primaryAccentButton1,
  primaryAccentInput1,
  primaryAccentButton2,
  primaryAccentInput2,
  primaryAccentButton3,
  primaryAccentInput3,
  primaryAccentButton4,
  primaryAccentInput4,
  primaryAccentButton5,
  primaryAccentInput5,
  primaryAccentButton6,
  primaryAccentInput6,
  primaryAccentButton7,
  primaryAccentInput7,
  primaryAccentButton8,
  primaryAccentInput8,
  primaryAccentButton9,
  primaryAccentInput9,
  primaryAccentButton10,
  primaryAccentInput10,
} from '@/configs/theme';
import Tooltip from '@/shared/components/tooltip';
import { useDispatch } from '@/store';
import { setTheme } from '@/store/theme';
import { Tag, Typography } from 'antd';
import { Check, Info, X } from 'lucide-react';
import { useState } from 'react';

const ChangeTheme = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>('');

  const dispatch = useDispatch();
  const handleSelectTheme = (color: string, btnColor: string, inpColor: string) => {
    setSelectedTheme(color);
    dispatch(setTheme({ color, btnColor, inpColor }));
  };
  return (
    <div className='w-[440px] p-1'>
      <div className='flex items-center'>
        <Typography.Text className='text-center text-base font-semibold'>
          Change theme
        </Typography.Text>
      </div>
      <div className='flex items-center gap-x-2'>
        <Typography.Text className='text-sm'>Choose a theme for your project</Typography.Text>
        <Tooltip title='Learn more'>
          <Info className='h-4 w-4' />
        </Tooltip>
      </div>
      <div className='mt-4 flex flex-wrap gap-2'>
        {themeColor.map((item, index) => (
          <ThemeItem
            selectedTheme={selectedTheme}
            onSelect={handleSelectTheme}
            key={index}
            color={item.inpColor}
            bgColor={item.bgColor}
            btnColor={item.btnColor}
            inpColor={item.inpColor}
            name={item.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ChangeTheme;

interface ThemeItemProps {
  color: string;
  bgColor: string;
  inpColor: string;
  btnColor: string;
  name: string;
  onSelect: (color: string, btnColor: string, inpColor: string) => void;
  selectedTheme: string;
}

const ThemeItem: React.FC<ThemeItemProps> = ({
  color,
  btnColor,
  bgColor,
  inpColor,
  name,
  onSelect,
  selectedTheme,
}) => {
  const handleClick = () => {
    onSelect(color, btnColor, inpColor);
  };

  return (
    <div
      className={`flex h-[38px] w-[128px] cursor-pointer items-center justify-center gap-x-2 rounded-lg  py-2 transition-all hover:shadow-md`}
      onClick={handleClick}
      style={{
        backgroundColor: selectedTheme === color ? bgColor : 'white',
        color: selectedTheme === color ? color : 'black',
        border: `1px solid ${selectedTheme === color ? btnColor : '#E0E0E0'}`,
      }}
    >
      <Tag color={btnColor} className='relative h-4 w-4'>
        {selectedTheme === color && (
          <Check className='absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform' />
        )}
      </Tag>
      <Typography.Text style={{ marginLeft: '8px', color: btnColor, fontWeight: '500' }}>
        {name}
      </Typography.Text>
    </div>
  );
};
const themeColor = [
  {
    id: 1,
    color: primaryAccentNew1,
    bgColor: primaryLighterAccent1,
    btnColor: primaryAccentButton1,
    inpColor: primaryAccentInput1,
    name: 'Purple',
  },
  {
    id: 2,
    color: primaryAccentNew2,
    bgColor: primaryLighterAccent2,
    btnColor: primaryAccentButton2,
    inpColor: primaryAccentInput2,
    name: 'Blue',
  },
  {
    id: 3,
    color: primaryAccentNew3,
    bgColor: primaryLighterAccent3,
    btnColor: primaryAccentButton3,
    inpColor: primaryAccentInput3,
    name: 'Pink',
  },
  {
    id: 4,
    color: primaryAccentNew4,
    bgColor: primaryLighterAccent4,
    btnColor: primaryAccentButton4,
    inpColor: primaryAccentInput4,
    name: 'Violet',
  },
  {
    id: 5,
    color: primaryAccentNew5,
    bgColor: primaryLighterAccent5,
    btnColor: primaryAccentButton5,
    inpColor: primaryAccentInput5,
    name: 'Indigo',
  },
  {
    id: 6,
    color: primaryAccentNew6,
    bgColor: primaryLighterAccent6,
    btnColor: primaryAccentButton6,
    inpColor: primaryAccentInput6,
    name: 'Orange',
  },
  {
    id: 7,
    color: primaryAccentNew7,
    bgColor: primaryLighterAccent7,
    btnColor: primaryAccentButton7,
    inpColor: primaryAccentInput7,
    name: 'Teal',
  },
  {
    id: 8,
    color: primaryAccentNew8,
    bgColor: primaryLighterAccent8,
    btnColor: primaryAccentButton8,
    inpColor: primaryAccentInput8,
    name: 'Bronze',
  },
  {
    id: 8,
    color: primaryAccentNew9,
    bgColor: primaryLighterAccent9,
    btnColor: primaryAccentButton9,
    inpColor: primaryAccentInput9,
    name: 'Black',
  },
  {
    id: 8,
    color: primaryAccentNew10,
    bgColor: primaryLighterAccent10,
    btnColor: primaryAccentButton10,
    inpColor: primaryAccentInput10,
    name: 'Mint',
  },
];
