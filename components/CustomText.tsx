import { Text } from "react-native";
import { Colors } from "../constants";

const CustomText = (props) => {
    const text = props.text.split(' ');
    return <Text style={{ ...props.textStyle }}>{text.map((text, index) => {
        if (text.startsWith('##')) {
            return <Text style={{ color: props.highlightedColor || Colors.primary, ...props.highlightedTextStyle }}>{text.substring(2, text.length)} </Text>;
        }
        else if (text.startsWith(',##')) {
            return <Text style={{ color: props.highlightedColor || Colors.primary, ...props.highlightedTextStyle }}>{text.substring(3, text.length)} </Text>;

        }
        return `${text} `;
    })}</Text>;
}
export default CustomText