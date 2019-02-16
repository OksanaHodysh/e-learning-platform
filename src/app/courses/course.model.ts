interface CoursesListItem {
    id: number;
    title: string;
    creationDate: string;
    duration: string;
    description: string;
    authors: Array<string>;
    topRated: boolean;
}

export class Course implements CoursesListItem {

    constructor(
        public id: number = null,
        public title = '',
        public creationDate = '',
        public duration = '',
        public description = '',
        public authors: Array<string> = [],
        public topRated = false
    ) {}
}
