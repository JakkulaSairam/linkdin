export class User{

private first_name:string;
private last_name:string;
private email:string;
private phone:number;
private password:string;
private gender:string;


  constructor(firstname: string, lastname: string, email: string, phno: number, password: string,  gender: string) {
    this.first_name = firstname;
    this.last_name = lastname;
    this.email = email;
    this.phone = phno;
    this.password = password;
    this.gender = gender;
  }
}
