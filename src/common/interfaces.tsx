export interface Cat {
    x: number;
    y: number; 
    requiresItem: boolean; 
  }
  
export type CatsType = Cat[];

export interface ItemType {
  name: string;
  description: string;
  addedCats: number; 
  scoreMultiplier: number; 
  cost: number;
  quantity: number;
}

export type ItemsType = ItemType[]; 