export type currentUserType = {
    _id?:string,
    userName?:string,
    userEmail?:string,
    password?:string,
    profilePicture?: string
}

export type ErrorType = {
    message?: string;
    statusCode?: string;
    success?: string;
}