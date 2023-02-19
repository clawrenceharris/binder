import { Colors } from "../../constants";
import { StyleSheet } from "react-native";

const descriptions = {
    password: "Enter a password you'll use to log back into your account.",
    email: 'This makes it easier for you to recover your account.',
    gpa: 'Your GPA is your grade point average. We use you unweighted GPA to help pair you with recommended study partners. You can choose to leave this field blank',
    name: "This is how you'll appear and how classmates can find you on Binder.",
    birthday: "We'll use this to determine your age, Zodiac Sign, and let your classmates know when your special day arrives.",
    school: "This makes it easier for us to show you the right classes, recommend study partners, inform you about school events and more!"


}

const styles = StyleSheet.create({



    textInputTitle: {
        color: '#00000050',
        alignSelf: 'flex-start',
        fontSize: 12
    },

    finePrint: {
        fontFamily: 'Kanit',
        color: 'darkgray',
        fontSize: 11,
        textAlign: 'center',
    },

    errorMessage: {
        color: '#FD6464',
        fontFamily: 'Kanit',
        alignSelf: 'flex-start'
    },

    screenTitle: {
        color: 'white',
        fontFamily: 'KanitMedium',
        fontSize: 26,
        alignSelf: 'center',
        width: '90%',
        textAlign: 'center'
    },

    birthdayInputContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },

    input: {
        width: '100%',
        fontSize: 20,
        padding: 10,
        fontFamily: 'Kanit',
        color: 'white',
        backgroundColor: '#00000010',
        borderRadius: 25
    },

    description: {
        fontFamily: 'Kanit',
        fontSize: 14,
        textAlign: 'center',
        color: 'white',
        marginTop: 10
    },

})

export { styles, descriptions }
