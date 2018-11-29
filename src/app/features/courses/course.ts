import { CoursesListItem } from './courses-list-item.model';

export class Course implements CoursesListItem {
    id: number;
    title: string;
    creationDate: string;
    duration: string;
    description: string;
}
