/**
 * @description Import here so that it can be used in other files without having to import it again
 * @author Duc Nguyen
 */

type EStatus = 'ToDo' | 'InProgress' | 'Done' | 'InReview' | 'Approved' | 'NotSure' | 'none';
type ELevel = 'Highest' | 'High' | 'Medium' | 'Low' | 'Lowest' | 'NotSure' | 'none';
type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';

type BaseResponseType<T> = {
  message: string;
  status: number;
  totalRecords: number;
  data: T;
};

/**Type create drag and drop */
type Id = string | number;

type Category = {
  id: string;
  name: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
  background: string;
  inviteCode: string;
  listCards: ListCard[];
  users: User[];
};

type ListCard = {
  id: string;
  name: string;
  listNumber?: number;
  isCollapse: boolean;
  cards: Card[];
};

type CheckList = {
  name: string;
  checked: boolean;
};

type Card = {
  id: string;
  name: string;
  color: string;
  description: string;
  status: EStatus;
  priority: ELevel;
  risk: ELevel;
  effort: ELevel;
  estimate: Date;
  checkLists: CheckList[];
  listCardId?: string;
};

type TSMNote = {
  id: string;
  title: string;
  userId: string;
  archived: boolean;
  pinned: boolean;
  deleted: boolean;
  content: null | string;
  createdAt: string;
};
