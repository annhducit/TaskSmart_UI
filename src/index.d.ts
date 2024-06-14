/**
 * @description Import here so that it can be used in other files without having to import it again
 * @author Duc Nguyen
 */
interface TSMNote {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

/**Type create drag and drop */
type Id = string | number;

// type Column = {
//   id: Id;
//   title: string;
// };

// type Task = {
//   id: Id;
//   columnId: Id;
//   content: string;
// };

type Category = {
  id: string;
  name: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
  background: string;
  inviteCode : string;
  listCards: ListCard[];
  users: User[];
};

type ListCard = {
  id: string;
  name: string;
  listNumber?: number;
  isCollapse: boolean;
  cards: Card[];
}

type CheckList = {
  name: string;
  checked: boolean;
}

type EStatus = "ToDo" | "InProgress" | "Done" | "InReview" | "Approved" | "NotSure" | "none"; 
type ELevel = "Highest" | "High" | "Medium" | "Low" | "Lowest" | "NotSure" | "none"; 

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
}