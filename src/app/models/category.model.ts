import ICategoryType from './category_type.model';
interface ICategory {
  name: string;
  tagname: ICategoryType;
  limit: number;
  desc?: string;
}
export default ICategory;
