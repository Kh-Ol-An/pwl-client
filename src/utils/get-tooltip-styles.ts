import StylesVariables from "@/styles/utils/variables.module.scss";

interface IStyles {
    backgroundColor: string;
    color: string;
    width: string;
    fontSize: string;
    zIndex: number;
}

export default (screenWidth: number): IStyles => ({
    backgroundColor: StylesVariables.blackColor,
    color: StylesVariables.lightColor,
    width: screenWidth > 411 ? '300px' : '200px',
    fontSize: '14px',
    zIndex: 9,
});
