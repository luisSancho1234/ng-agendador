import {ISort} from "./sort";

export interface IPageable {
  sort?: ISort
  offset?: number
  size: number
  page: number
  unpaged?: boolean
  paged?: boolean
}
