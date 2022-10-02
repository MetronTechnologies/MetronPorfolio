import { DataState } from "./DataState";


export interface WorkState<T>{
  workDataState: DataState;
  workState?: T;
  error?: string;
}

export interface SkillState<T> {
  skillDataState1: DataState;
  skillDataState2: DataState;
  skillDataState3: DataState;
  skillState?: T;
  error?: string;
}


export interface CommentState<T> {
  commentDataState: DataState;
  commentState?: T;
  error?: string;
}


export interface ContactState<T> {
  contactDataState: DataState;
  contactState?: T;
  error?: string;
}



