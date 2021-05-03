export interface IOffer {
  id?:number,
  name:string,
  description:string,
  image:File,
  place:string,
  date: Date,
  user_id?:number,
  Cat_id?:number,
  phone?:string

}