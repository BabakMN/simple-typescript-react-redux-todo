interface IUser {
    id: number;
    name: string;
    avatar: string | null;
    isCurrentUser: boolean;
    select: () => void;
    newList: (listName: string) => void;
    lists: any[];
};

export default IUser;