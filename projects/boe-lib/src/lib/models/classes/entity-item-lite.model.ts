export class EntityItemLite {
  id: string;
  parentId: string;
  name: string;
  hasChilds: boolean;
  iconKey: string;
  childs: EntityItemLite[]
}
