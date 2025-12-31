import "styled-components";
import { defaultThemes } from "../styles/themes/default";

//* Guarda o valor de tipagem do que está no default.ts
type TypeTheme = typeof defaultThemes;

//* Toda vez que exportar o styled-components, ele virá com essas configurações do default
declare module "styled-components"{
    export interface DefaultTheme extends TypeTheme{}
}