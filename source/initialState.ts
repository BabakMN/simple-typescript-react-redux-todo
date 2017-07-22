import IState from "./IState";
import tom from "./avatars/tom.jpg";
import alice from "./avatars/alice.jpg";
import mike from "./avatars/mike.jpg";

const initialState: IState = {
    currentUserIndex: 0,
    selectedList: 0,
    selectedListItem: null,
    userNames: [
        "Alice",
        "Mike",
        "Tom",
    ],
    avatars: [
        alice,
        mike,
        tom,
    ],
    lists: [
        {
            id: 0,
            user: 0,
            label: "Groceries",    
        },
        {
            id: 1,
            user: 0,
            label: "Office",
        },
        {
            id: 2,
            user: 1,
            label: "Exam",
        },
        {
            id: 3,
            user: 2,
            label: "Kitchen renovation",
        },
        {
            id: 4,
            user: 2,
            label: "Reminders",
        }
    ],
    listItems: [
        { list: 0, resolved: true,  label: "Milk" },
        { list: 0, resolved: false, label: "Bread" },
        { list: 0, resolved: false, label: "Eggs" },
        { list: 0, resolved: false, label: "Butter" },
        { list: 0, resolved: false, label: "Lettuce & Spinach" },
        { list: 1, resolved: false, label: "Fix the door sign" },
        { list: 1, resolved: true,  label: "Stock-up the fridge" },
        { list: 1, resolved: false, label: "Configure the printer" },
        { list: 2, resolved: true,  label: "Study the lecture notes for week 1" },
        { list: 2, resolved: true,  label: "Study the lecture notes for week 2" },
        { list: 2, resolved: true,  label: "Study the lecture notes for week 3" },
        { list: 2, resolved: true,  label: "Study the lecture notes for week 4" },
        { list: 2, resolved: true,  label: "Study the lecture notes for week 5" },
        { list: 2, resolved: true,  label: "Study the lecture notes for week 6" },
        { list: 2, resolved: true,  label: "Study the lecture notes for week 7" },
        { list: 2, resolved: true,  label: "Study the lecture notes for week 8" },
        { list: 2, resolved: false, label: "Study the lecture notes for week 9" },
        { list: 2, resolved: false, label: "Study the lecture notes for week 10" },
        { list: 2, resolved: false, label: "Attempt the practice exam" },
        { list: 3, resolved: false, label: "Take the cabinet measurements" },
        { list: 3, resolved: false, label: "Choose the new tiles" },
        { list: 4, resolved: true,  label: "Call James" },
        { list: 4, resolved: false, label: "Change the water filter" },
    ],
};

export default initialState;
