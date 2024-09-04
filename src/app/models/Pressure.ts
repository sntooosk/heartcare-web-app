export class Pressure {
    id: number = 0;
    diastolic: string = '';
    systolic: string = '';
    pulse: string = '';
    date: Date = new Date();
    userId: number = 0;
    userName: string = '';
    userLastName: string = '';
    userPhoto: string = '';

    constructor(
        id: number = 0,
        diastolic: string = '',
        systolic: string = '',
        pulse: string = '',
        date: Date = new Date(),
        userId: number = 0,
        userName: string = '',
        userLastName: string = '',
        userPhoto: string = ''
    ) {
        this.id = id;
        this.diastolic = diastolic;
        this.systolic = systolic;
        this.pulse = pulse;
        this.date = date;
        this.userId = userId;
        this.userName = userName;
        this.userLastName = userLastName;
        this.userPhoto = userPhoto;
    }
}
