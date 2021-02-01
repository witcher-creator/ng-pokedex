export interface IPokemon {
  id: number;
  name: string;
  height?: number;
  weight?: number;
  types?: any[]
  photoURL?: string;
  abilities?: any[];
}

export class Pokemon implements IPokemon {
  constructor(
    public id: number,
    public name: string,
    public photoURL?: string,
    public height?: number,
    public weight?: number,
    public types?: any[],
    public abilities?: any[],
  ){}
}