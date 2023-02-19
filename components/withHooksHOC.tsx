import { useSafeAreaInsets } from "react-native-safe-area-context"

export const withHooksHOC = (Component: any) => {
    return (props: any) => {
        const insets = useSafeAreaInsets();
        return <Component insets={insets} {...props} />
    }
}