import IState from "./IState";
import IAppProps from "./IAppProps";
import IUser from "./IUser";

export default function mergeProps(stateProps: IState, dispatchProps: any): IAppProps {

    const dispatch = dispatchProps.dispatch;

    const selectUser = (id: number) => dispatch({
        type: "SELECT_USER",
        payload: id,
    });

    const userCreateList = (userID: number, listName: string) => dispatch({
        type: "NEW_LIST",
        payload: {
            userID,
            listName,
        },
    });

    let currentUser = null;
    let currentList = null;

    const users: IUser[] = stateProps.userNames.map((name, userID) => {

        const lists: any[] = [];

        stateProps.lists.forEach((originalList) => {

            const list: any = Object.assign({}, originalList);

            if (list.user !== userID) {
                return;
            }

            list.items = [];

            stateProps.listItems.forEach((originalItem: any, itemID: number) => {

                const item = Object.assign({}, originalItem);

                if (item.list !== list.id) {
                    return;
                }

                item.select = () => dispatch({
                    type: "SELECT_LIST_ITEM",
                    payload: itemID,
                });

                item.delete = () => dispatch({
                    type: "DELETE_LIST_ITEM",
                    payload: itemID,
                });

                item.edit = (label: string) => dispatch({
                    type: "EDIT_LIST_ITEM",
                    payload: {
                        itemID: itemID,
                        label,
                    },
                });

                item.resolve = () => dispatch({
                    type: "RESOLVE_LIST_ITEM",
                    payload: itemID,
                });

                item.unresolve = () => dispatch({
                    type: "UNRESOLVE_LIST_ITEM",
                    payload: itemID,
                });

                item.toggle = () => {
                    if (item.resolved === true) {
                        item.unresolve();
                    } else {
                        item.resolve();
                    }
                };

                item.selected = (stateProps.selectedListItem === itemID);

                list.items.push(item);

            });

            list.resolveAll = () => dispatch({
                type: "RESOLVE_ALL",
                payload: list.id,
            });

            list.unresolveAll = () => dispatch({
                type: "UNRESOLVE_ALL",
                payload: list.id,
            });

            list.deleteAll = () => dispatch({
                type: "DELETE_ALL",
                payload: list.id,
            });

            list.delete = () => dispatch({
                type: "DELETE_LIST",
                payload: list.id,
            });

            list.newItem = (label: string) => dispatch({
                type: "NEW_LIST_ITEM",
                payload: {
                    listID: list.id,
                    label,
                },
            });

            list.select = () => dispatch({
                type: "SELECT_LIST",
                payload: list.id,
            });

            list.resolvedItems = list.items.filter((item: any) => item.resolved === true);
            list.unresolvedItems = list.items.filter((item: any) => item.resolved !== true);
            list.selected = (list.id === stateProps.selectedList);

            if (list.selected) {
                currentList = list;
            }

            lists.push(list);

        });

        const user: IUser = {
            id: userID,
            name,
            avatar: stateProps.avatars[userID],
            isCurrentUser: stateProps.currentUserIndex === userID,
            select: () => selectUser(userID),
            newList: (listName: string) => userCreateList(userID, listName),
            lists,
        };       

        if (user.isCurrentUser) {
            currentUser = user;
        }

        return user;

    });

    if (currentUser === null) {
        throw new Error("Current user must be selected (null found).");
    }

    const unselectListItem = () => dispatch({
        type: "UNSELECT_LIST_ITEM",
    });

    const moveUp = () => dispatch({ type: "MOVE_UP" });
    const moveDown = () => dispatch({ type: "MOVE_DOWN" });
    const moveLeft = () => dispatch({ type: "MOVE_LEFT" });
    const moveRight = () => dispatch({ type: "MOVE_RIGHT" });

    const newList = (listName: string) => dispatch({
        type: "NEW_LIST",
        payload: listName,
    });

    return {
        moveUp,
        moveDown,
        moveLeft,
        moveRight,
        unselectListItem,
        users,
        currentUser,
        currentList,
        newList,
    }

}