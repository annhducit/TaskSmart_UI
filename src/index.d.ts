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

type TsmError = {
  message: string;
  status: number;
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
  speDocPath: string;
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

type Role = 'ADMIN' | 'USER';
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
  role: Role[];
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
  image: UnsplashResponse;
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
  image: UnsplashResponse;
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
  name: TSMTemplate['name'];
  description: TSMTemplate['description'];
  categoryId: TSMTemplate['category']['id'];
  imageUnsplashId: string;
  project: {
    name: TSMTemplate['name'];
    background: string;
    description: TSMTemplate['description'];
    listCards: ListCardRequest[];
  };
  createdDate: TSMTemplate['createdDate'];
};

type TSMProjectSearch = {
  id: string;
  name: string;
  backgroundColor: string;
  backgroundUnsplash: UnsplashResponse;
  workspace: Partial<Workspace>;
};

type TSMListCardSearch = {
  id: string;
  name: string;
  project: TSMProjectSearch;
};

type TSMCardSearch = {
  id: string;
  name: string;
  project: TSMProjectSearch;
};

type TSMSearchEverything = {
  workspaces: Partial<Workspace>[];
  projects: TSMProjectSearch[];
  listCards: TSMListCardSearch[];
  cards: TSMCardSearch[];
  templates: TSMTemplate[];
  notes: TSMNote[];
};

type TasksGenerate = {
  listCards: ListCardGenerate[];
};

type ListCardGenerate = {
  id: string;
  name: string;
  cards: CardGenerate[];
};

type CardGenerate = {
  id: string;
  listCardId?: string;
  name: string;
  description: string;
  listCardId: string;
  checkLists: CheckListGroupGenerate[];
};

type CheckListGenerate = {
  name: CheckList['name'];
  checked?: CheckList['checked'];
};

type CheckListGroupGenerate = {
  name: CheckListGroup['name'];
  checkList: CheckListGenerate[];
};

type DatabaseRAGRequest = {
  question: string;
  database: string;
};

type Statement = {
  statement: string;
  title: string;
  result?: string;
}

type DatabaseRAGResponse = {
  statements: Statement[];
  database: string;
}