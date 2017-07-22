import IUser from "./IUser";

interface IAppProps {
    users: IUser[];
    currentUser: IUser;
    currentList: any;
    moveUp: () => void;
    moveDown: () => void;
    moveLeft: () => void;
    moveRight: () => void;
    unselectListItem: () => void;
    newList: (listName: string) => void;
}

export default IAppProps;