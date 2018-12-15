interface CoursesListItem {
    id: number;
    title: string;
    creationDate: string;
    duration: string;
    description: string;
}

export class Course implements CoursesListItem {
    id: number;
    title: string;
    creationDate: string;
    duration: string;
    description: string;
}
