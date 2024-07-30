import { RefObject } from 'react';

export const scrollToResult = ({ resultDOM }: { resultDOM: RefObject<HTMLDivElement> }) => {
  resultDOM.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
};
