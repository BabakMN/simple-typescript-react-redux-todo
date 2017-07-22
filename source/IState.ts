import IList from "./IList";
import IListItem from "./IListItem";

interface IState {
    currentUserIndex: number;
    selectedList: number | null;
    selectedListItem: number | null;
    userNames: string[];
    avatars: string[];
    lists: IList[];
    listItems: IListItem[];
};

export default IState;