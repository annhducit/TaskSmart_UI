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

type Column = {
  id: Id;
  title: string;
};

type Task = {
  id: Id;
  columnId: Id;
  content: string;
};

type Category = {
  id: string;
  name: string;
};