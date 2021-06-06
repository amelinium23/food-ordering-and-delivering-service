import { Extra as ExtraType } from "./Extra";

export type IExtraType = 1 | 2;

export interface ExtrasGroup {
  name: string;
  extra_type: IExtraType;
  extras: ExtraType[];
}
