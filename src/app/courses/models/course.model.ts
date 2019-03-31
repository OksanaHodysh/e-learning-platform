import { Author } from './author.model';

interface CoursesListItem {
    id: number;
    title: string;
    date: string;
    duration: number;
    description: string;
    authors: Array<Author>;
    isTopRated: boolean;
}

export class Course implements CoursesListItem {

    constructor(
        public id: number = null,
        public title = '',
        public date = '',
        public duration = 0,
        public description = '',
        public authors: Array<Author> = [],
        public isTopRated = false
    ) {}
}
