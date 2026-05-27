import {ISort} from "./sort";
import {IPageable} from "./pageable";

export interface IPage<T> {
  content?: T[]
  pageable?: IPageable
  last?: boolean
  totalElements?: number
  totalPages?: number
  size?: number
  number?: number
  sort?: ISort
  first?: boolean
  numberOfElements?: number
  empty?: boolean
}
