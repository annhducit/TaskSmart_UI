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
  active: boolean;
};

type Workspace = {
  id: string;
  name: string;
  description: string;
  category: Category;
  users: User;
  projects: Project[];
  type: string;
  backgroundUnsplash: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
  workspace: {
    id: Workspace['id'];
    name: Workspace['name'];
  };
  backgroundColor: string;
  backgroundUnsplash: UnsplashResponse;
  inviteCode: string;
  listCards: ListCard[];
  users: UserRelation[];
};

type UserGeneral = {
  id: string;
  name: string;
  username: string;
  email: string;
  profileImagePath: string;
};

type UserRelation = {
  userId: string;
  name: string;
  username: string;
  email: string;
  profileImagePath: string;
};

type UserData = {
  id: string;
  name: string;
  username: string;
  email: string;
  gender: string;
  position: string;
  organization: string;
  timeZone: number;
  profileImagePath: string;
  personalWorkSpace: {
    id: Workspace['id'];
    name: Workspace['name'];
  };
  workspaces: WorkSpace[];
  projects: Project[];
};

type ListCard = {
  id: string;
  name: string;
  listNumber?: number;
  isCollapse: boolean;
  cards: Card[];
};

type CheckList = {
  id: string;
  name: string;
  checked: boolean;
};

type CheckListGroup = {
  id: string;
  name: string;
  checkList: CheckList[];
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
  estimate: Date | string | null;
  listCardId?: string;
  checkLists: CheckListGroup[];
  attachments: Attachment[];
  comments: CommentType[];
  implementers: UserRelation[];
};

type Attachment = {
  fileId: string;
  title: string;
  type: 'image' | 'pdf';
  description?: string;
};

type CommentType = {
  id: string;
  user: UserRelation;
  content: string;
  createdAt: string;
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

type TSMProjectRequest = {
  name: string;
  description: string;
  workspaceId: string;
  background: string;
};

type TSMTemplate = {
  id: string;
  name: string;
  description: string;
  viewCount: number;
  useCount: number;
  imageUrl: string;
  category: {
    id: Category['id'];
    name: Category['name'];
    active: boolean;
  };
  createdDate: string;
};

type TSMTemplateDetail = {
  id: string;
  name: string;
  description: string;
  viewCount: number;
  useCount: number;
  imageUrl: null | string;
  category: {
    id: Category['id'];
    name: Category['name'];
  };
  project: {
    id: string;
    name: string;
    backgroundColor: string;
    backgroundUnsplash: UnsplashResponse;
    description: string;
    listCards: ListCard[];
  };
  createdDate: string;
};

type UnsplashResponse = {
  id: string;
  color: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
};

/**
 * Create new template
 */
type CheckListRequest = {
  name: CheckList['name'];
  checked: CheckList['checked'];
};

type CheckListGroupRequest = {
  name: CheckListGroup['name'];
  checkList: CheckListRequest[];
};

type CardRequest = {
  id: Card['id'];
  name: Card['name'];
  description: Card['description'];
  listCardId: Card['listCardId'];
  checkLists: CheckListGroupRequest[];
};

type ListCardRequest = {
  id: ListCard['id'];
  name: ListCard['name'];
  cards: CardRequest[];
};

type TSMTemplateRequest = {
  name: string;
  description: string;
  // imageUrl: null | string;
  categoryId: string;
  project: {
    name: string;
    background: string;
    description: string;
    listCards: ListCardRequest[];
  };
  createdDate: string;
};
