import { links } from "./data";
import { homeLink } from "./data";


export type SectionName = (typeof links)[number]["name"];
export type SectionNameHome = (typeof homeLink)[number]["name"];

