export default interface Facts {
    _id: string;
    type: string;
    text: string;
    upvotes: number;
    userUpvoted?: any;
    user: User;
}

interface User {
    _id: string;
    name: UserName;
}

interface UserName {
    first: string;
    last: string;
}