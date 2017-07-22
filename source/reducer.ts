import IState from "./IState";
import initialState from "./initialState";

function firstListOfUser(state: IState, userID: number | null = null): (number | null) {
    if (userID === null) {
        userID = state.currentUserIndex;
    }
    for (let i = 0; i < state.lists.length; i++) {
        const list = state.lists[i];
        if (list.user === userID) {
            return list.id;
        }
    }
    return null;
}

function lastListOfUser(state: IState, userID: number | null = null): (number | null) {
    if (userID === null) {
        userID = state.currentUserIndex;
    }
    for (let i = state.lists.length - 1; i > -1; i--) {
        const list = state.lists[i];
        if (list.user === userID) {
            return list.id;
        }
    }
    return null;
}

function selectedListItems(state: IState) {
    return state.listItems.filter(
        (listItem) => (listItem.list === state.selectedList)
    );
}

function newListID(state: IState) {
    const listIDs = state.lists.map((list) => list.id);
    const maxListID = Math.max(...listIDs) | 0;
    return maxListID + 1;
}

function firstListItem(state: IState) {
    for (let i = 0; i < state.listItems.length; i++) {
        const item = state.listItems[i];
        if (item.list === state.selectedList) {
            return i;
        }
    }
    return null;    
}

function lastListItem(state: IState) {
    for (let i = state.listItems.length - 1; i > -1; i--) {
        const item = state.listItems[i];
        if (item.list === state.selectedList) {
            return i;
        }
    }
    return null;    
}

function nextListItem(state: IState) {
    for (let i = 0; i < state.listItems.length; i++) {
        const item = state.listItems[i];
        if (item.list === state.selectedList) {
            if (state.selectedListItem === null) {
                return i;
            }
            if (i > state.selectedListItem) {
                return i;
            }
        }
    }
    return firstListItem(state);
}

function previousListItem(state: IState) {
    for (let i = state.listItems.length - 1; i > -1; i--) {
        const item = state.listItems[i];
        if (item.list === state.selectedList) {
            if (state.selectedListItem === null) {
                return i;
            }
            if (i < state.selectedListItem) {
                return i;
            }
        }
    }
    return lastListItem(state);
}

function nextList(state: IState) {
    for (let i = 0; i < state.lists.length; i++) {
        const list = state.lists[i];
        if (list.user !== state.currentUserIndex) {
            continue;
        }
        if (state.selectedList === null) {
            return list.id;
        }
        if (i > state.selectedList) {
            return list.id;
        }
    }
    return firstListOfUser(state, state.currentUserIndex);
}

function previousList(state: IState) {
    for (let i = state.lists.length - 1; i > -1; i--) {
        const list = state.lists[i];
        if (list.user !== state.currentUserIndex) {
            continue;
        }
        if (state.selectedList === null) {
            return list.id;
        }
        if (i < state.selectedList) {
            return list.id;
        }
    }
    return lastListOfUser(state, state.currentUserIndex);
}

function deleteListItem(state: IState, targetID: number): IState {
    const listItems = state.listItems.filter((listItem, listItemID) => {
        return listItemID !== targetID;
    });
    return Object.assign(
        {},
        state,
        { listItems },
    );
}

function deleteListItems(state: IState, targetID: number): IState {
    const listItems = state.listItems.filter((listItem) => {
        return listItem.list !== targetID;
    });
    return Object.assign(
        {},
        state,
        { listItems },
    );
}

function deleteList(state: IState, targetID: number): IState {
    const lists = state.lists.filter((list) => {
        return list.id !== targetID;
    });
    const newState = Object.assign({}, state, { lists, });
    return Object.assign(
        newState,
        { selectedList: firstListOfUser(newState) }
    );
}

export default function reducer(state = initialState, action: any): IState {

    if (action.type === "SELECT_USER") {
        const newState = Object.assign(
            {},
            state,
            {
                currentUserIndex: action.payload,
                selectedList: firstListOfUser(state, action.payload),
            },
        );
        return newState;
    }

    if (action.type === "SELECT_LIST") {
        return Object.assign(
            {},
            state,
            { selectedList: action.payload },
        );
    }

    if (action.type === "SELECT_LIST_ITEM") {
        return Object.assign(
            {},
            state,
            { selectedListItem: action.payload },
        );
    }

    if (action.type === "DELETE_LIST_ITEM") {
        return deleteListItem(state, action.payload);
    }

    if (action.type === "DELETE_LIST") {
        const listID = action.payload;
        let newState = deleteList(state, listID);
        newState = deleteListItems(newState, listID);
        return newState;
    }

    if (action.type === "RESOLVE_ALL"
        || action.type === "UNRESOLVE_ALL") {
        const listItems = state.listItems.map((item) => {
            if (item.list === action.payload) {
                const resolved = (action.type === "RESOLVE_ALL");
                return Object.assign(
                    {},
                    item,
                    { resolved },
                );
            }
            return item;
        });
        return Object.assign({}, state, { listItems });
    }

    if (action.type === "DELETE_ALL") {
        const listItems = state.listItems.filter((item) => {
            return item.list !== action.payload;
        });
        return Object.assign({}, state, { listItems });
    }

    if (action.type === "EDIT_LIST_ITEM") {
        const listItems = state.listItems.map((listItem, listItemID) => {
            const { itemID, label } = action.payload;
            if (listItemID === itemID) {
                return Object.assign({}, listItem, { label });
            }
            return listItem;
        });
        return Object.assign(
            {},
            state,
            { listItems },
        );
    }

    if (action.type === "RESOLVE_LIST_ITEM"
        || action.type === "UNRESOLVE_LIST_ITEM") {
        const listItems = state.listItems.map((listItem, itemID) => {
            if (itemID === action.payload) {
                const resolved = (action.type === "RESOLVE_LIST_ITEM"); 
                return Object.assign(
                    {},
                    listItem,
                    { resolved },
                );
            }
            return listItem;
        });
        return Object.assign(
            {},
            state,
            { listItems },
        );
    }

    if (action.type === "NEW_LIST") {

        const lists = state.lists.concat([{
            id: newListID(state),
            user: state.currentUserIndex,
            label: action.payload,
        }]);

        const newState = Object.assign(
            {},
            state,
            { lists },
        );

        return Object.assign(
            newState,
            { selectedList: lastListOfUser(newState) },
        );

    }

    if (action.type === "NEW_LIST_ITEM") {

        const { listID, label } = action.payload;

        const listItems = state.listItems.concat([{
            list: listID,
            resolved: false,
            label,
        }]);

        return Object.assign(
            {},
            state,
            { listItems },
        );

    }

    if (action.type === "MOVE_DOWN") {
        const selectedListItem = nextListItem(state);
        return Object.assign(
            {}, state, { selectedListItem },
        );
    }

    if (action.type === "MOVE_UP") {
        const selectedListItem = previousListItem(state);
        return Object.assign(
            {}, state, { selectedListItem },
        );
    }

    if (action.type === "MOVE_LEFT") {
        const selectedList = previousList(state);
        return Object.assign(
            {}, state, { selectedList },
        );
    }

    if (action.type === "MOVE_RIGHT") {
        const selectedList = nextList(state);
        return Object.assign(
            {}, state, { selectedList },
        );
    }

    if (action.type === "UNSELECT_LIST_ITEM") {
        const selectedListItem = null;
        return Object.assign({}, state, { selectedListItem });
    }

    return state;

}