export interface CategoryModel {
  id: number;
  name: string;
  linking: string;
}


export interface CommentModel {
  id: number;
  comment: string[];
  name: string;
  occupation: string;
}

export interface ContactModel{
  name: string;
  email: string;
  number: number;
  message: string;
}


export interface FAQModel{
  id: Number;
  question: String;
  answer: String;
}

export interface ImagesModel {
  id: number;
  name: string,
  location: string;
}

export interface PlaceModel{
  id: number;
  name: string;
  location: string;
}


export interface SkillModel {
  bigImageUrl:   string;
  category:      string;
  description:   string[];
  id:            number;
  name:          string;
  smallImageUrl: string;
}

export interface WorkModel {
  architecture:  string;
  bigImageUrl:   string;
  description:   string[];
  gitRepo:       string;
  id:            number;
  liveSite:      string;
  name:          string;
  smallImageUrl: string;
  techStack:     string[];
}







