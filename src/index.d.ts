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

type Workspace = {
  id: string;
  name: string;
  description: string;
  category: Category;
  users: User;
  projects: Project[];
  type: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
  background: string;
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
  personalWorkSpace: WorkSpaceType;
  workspaces: WorkSpaceType[];
  projects: ProjectType[];
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
    background: string;
    description: string;
    listCards: ListCard[];
  };
  createdDate: string;
};
