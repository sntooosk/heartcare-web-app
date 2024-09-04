export class User {
    id: number = 0;
    name: string = '';
    lastname: string = '';
    dob: string = '';
    gender: string = '';
    photo: string = '';

    constructor(
        id: number = 0,
        name: string = '',
        lastname: string = '',
        dob: string = '',
        gender: string = '',
        photo: string = ''
    ) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.dob = dob;
        this.gender = gender;
        this.photo = photo;
    }
}
