export class Post {
    id: number = 0;
    title: string = '';
    comment: string = '';
    date: Date = new Date();

    constructor(
        id: number = 0,
        title: string = '',
        comment: string = '',
        date: Date = new Date()
    ) {
        this.id = id;
        this.title = title;
        this.comment = comment;
        this.date = date;
    }
}
