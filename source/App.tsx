import React, { PureComponent as Component } from "react";
import IAppProps from "./IAppProps";
import tom from "./tom.jpg";

export default class App extends Component<IAppProps, any> {

    private static BATCH_HANDLING_THRESHOLD = 2;

    constructor(props: IAppProps) {
        super(props);
        this.resolveAllItems = this.resolveAllItems.bind(this);
        this.unresolveAllItems = this.unresolveAllItems.bind(this);
        this.deleteAllItems = this.deleteAllItems.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.newListItem = this.newListItem.bind(this);
        this.handleKeyboard = this.handleKeyboard.bind(this);
        this.newListHandler = this.newListHandler.bind(this);
    }

    public componentDidMount() {
        document.addEventListener(
            "keydown",
            this.handleKeyboard,
            false,
        );
    }

    public componentWillUnmount() {
        document.removeEventListener(
            "keydown",
            this.handleKeyboard,
            false,
        );
    }

    public render() {

        const newListButton = <a href="#" className="list" onClick={this.newListHandler}>
            New list
        </a>;

        return <div className="app">
           {this.getTopBar()}
            <div className="todo lists section container">
                <div className="lists container">
                    <ul>
                        {
                            this.props.currentUser.lists.map((list) => {

                                const onClick = (event: any) => {
                                    event.preventDefault();
                                    list.select();
                                };

                                if (list.selected) {
                                    return <li key={`list-${list.id}`} className="active list">
                                        <a href="#" onClick={onClick}>{ list.label }</a>
                                    </li>;
                                } else {
                                    return <li key={`list-${list.id}`} className="list">
                                        <a href="#" onClick={onClick}>{ list.label }</a>
                                    </li>;
                                }
                            })
                        }
                        <li className="list">
                            {newListButton}
                        </li>
                    </ul>
                </div>
                <div className="list items container">                   
                        {
                            this.props.currentList !== null
                            ?
                            <div>
                                {this.getListOperationButtons()}
                                <ul>
                                    { this.props.currentList.items.map(this.getItem) }
                                </ul>
                            </div>
                            :
                            null
                        }  
                </div>
            </div>
        </div>;
    }

    private getTopBar() {
        return <div className="top bar">
            <ul className="current user selector">
            {
                this.props.users.map((user, userID) => {
                    const onClick = (event: any) => {
                        event.preventDefault();
                        user.select();
                    };
                    return <li key={`user-${userID}`}>
                        <a href="#" title={user.name} onClick={onClick}>
                        {
                            user.isCurrentUser
                            ?
                            <img className="active user avatar" src={user.avatar as any} title={user.name} alt={user.name} />
                            :
                            <img className="user avatar" src={user.avatar as any} title={user.name} alt={user.name} />
                        }
                        </a>
                    </li>
                })
            }
            </ul>
            <h1 className="current user name">
                {this.props.currentUser.name}
            </h1>
        </div>;
    }

    private getItem(item: any, itemID: number) {

        const onItemSelect = (event: any) => {
            event.preventDefault();
            event.stopPropagation();
            item.select();
        };

        const onDelete = (event: any) => {
            event.preventDefault();
            event.stopPropagation();
            item.delete();
        };

        const onEdit = (event: any) => {
            event.preventDefault();
            event.stopPropagation();
            const newLabel = prompt("Please enter the new item title:");
            if (newLabel) {
                item.edit(newLabel);
            }
        };

        const onResolve = (event: any) => {
            event.preventDefault();
            event.stopPropagation();
            item.resolve();
        };

        const onUnResolve = (event: any) => {
            event.preventDefault();
            event.stopPropagation();
            item.unresolve();
        };

        const resolveButton = <a href="#" onClick={onResolve}>Resolve</a>;
        const unresolveButton = <a href="#" onClick={onUnResolve}>Unresolve</a>;
        const deleteButton = <a href="#" onClick={onDelete}>Delete</a>;
        const editButton = <a href="#" onClick={onEdit}>Edit</a>;

        let classNames = ["list", "item"];
        let buttons = null;

        if (item.selected) {
            classNames = ["active", "list", "item"];
            buttons = <div className="buttons container">
                {
                    item.resolved
                    ?
                    unresolveButton
                    :
                    resolveButton
                }
                {editButton}
                {deleteButton}
            </div>;
        }

        return <li key={`item-${itemID}`}>
            <div className={classNames.join(" ")} onClick={onItemSelect}>
                <div className="task label container">
                    <div className="checkmark">
                        <span>
                        {item.resolved ? "✔" : null}
                        </span>
                    </div>
                    <div className="label">
                        { item.label }
                    </div>
                </div>
                {buttons}
            </div>
        </li>;

    }

    private getListOperationButtons() {

        const batchHandling = (
            this.props.currentList.items.length
            >=
            App.BATCH_HANDLING_THRESHOLD
        );

        let resolveAllButton = null;
        let unresolveAllButton = null;
        let deleteAllButton = null;

        if (batchHandling) {

            if (this.props.currentList.unresolvedItems.length > 0) {
                resolveAllButton = <a href="#" onClick={this.resolveAllItems}>
                    Resolve all
                </a>;
            }

            if (this.props.currentList.resolvedItems.length > 0) {
                unresolveAllButton = <a href="#" onClick={this.unresolveAllItems}>
                    Unresolve all
                </a>;
            }

            deleteAllButton = <a href="#" onClick={this.deleteAllItems}>
                Delete list items
            </a>;

        }

        const deleteListButton = <a href="#" onClick={this.deleteList}>
            Delete list
        </a>;

        const newItemButton = <a href="#" onClick={this.newListItem}>
            New item
        </a>;

        return <ul className="list operation buttons container">
            <li>{newItemButton}</li>
            <li>{resolveAllButton}</li>
            <li>{unresolveAllButton}</li>
            <li>{deleteListButton}</li>
            <li>{deleteAllButton}</li>
        </ul>;

    }

    private deleteAllItems(event: any) {
        event.preventDefault();
        this.props.currentList.deleteAll();
    }

    private deleteList(event: any) {
        event.preventDefault();
        this.props.currentList.delete();
    }

    private resolveAllItems(event: any) {
        event.preventDefault();
        this.props.currentList.resolveAll();
    }

    private unresolveAllItems(event: any) {
        event.preventDefault();
        this.props.currentList.unresolveAll();
    }

    private newListItem(event: any) {
        event.preventDefault();
        const itemName = prompt("Please enter the name of the new to-do item.");
        if (itemName && itemName.trim()) {
            this.props.currentList.newItem(itemName.trim());
        }
    }

    private newListHandler(event: any) {
        event.preventDefault();
        const listName = prompt("Please enter a name for the new list.");
        if (listName && listName.trim()) {
            this.props.newList(listName.trim());
        }
    }

    private handleKeyboard(event: any) {
        
        const { code } = event;

        if (code === "ArrowUp") {
            this.props.moveUp();
        } else if (code === "ArrowDown") {
            this.props.moveDown();
        } else if (code === "ArrowLeft") {
            this.props.moveLeft();
        } else if (code === "ArrowRight") {
            this.props.moveRight();
        } else if (code === "Enter"
            || code === "Space"
            || code === "NumpadEnter") {
            const selectedItem = this.selectedItem;
            if (selectedItem) {
                selectedItem.toggle();
            }
        } else if (code === "Delete") {
            const selectedItem = this.selectedItem;
            if (selectedItem) {
                selectedItem.delete();
            } else if (this.props.currentList) {
                this.props.currentList.delete();
            }
        } else if (code === "Escape") {
            this.props.unselectListItem();
        } else if (code === "F1") {
            event.preventDefault();
            this.props.users[0].select();
        } else if (code === "F2") {
            event.preventDefault();
            this.props.users[1].select();
        } else if (code === "F3") {
            event.preventDefault();
            this.props.users[2].select();
        }

    }

    private get selectedItem() {
        for (const item of this.props.currentList.items) {
            if (item.selected) {
                return item;
            }
        }
        return null;
    }

}