interface CoursesListItem {
    id: number;
    title: string;
    creationDate: string;
    duration: string;
    description: string;
    topRated: boolean;
}

export class Course implements CoursesListItem {
    id: number;
    title: string;
    creationDate: string;
    duration: string;
    description: string;
    topRated: boolean;
}
