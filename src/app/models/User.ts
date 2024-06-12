interface User {
    id: number;
    name: string;
    lastname: string;
    dob: string;
    gender: string;
    photo: string;
    auth: {
        id: number;
    };
  }
  
  export default User;
  