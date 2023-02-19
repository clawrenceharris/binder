
import { StyleSheet } from "react-native";
import { Colors } from "../../constants";





const styles = StyleSheet.create({

    mainContainer: {
        padding: 10,
        alignItems: 'center'
    },
    description: {
        fontFamily: 'KanitLight',
        color: Colors.white,
        fontSize: 14,
        textAlign: 'center',
        margin: 5
    },
    finePrint: {
        fontFamily: 'KanitLight',
        color: Colors.white,
        fontSize: 11,
        textAlign: 'center',
    },

    errorMessage: {
        color: '#FD6464',
        fontFamily: 'Kanit'
    },
    successMessage: {
        color: '#77FF8C',
        fontFamily: 'Kanit'
    },

    birthdayInputContainer: {
        alignItems: 'center',
        width: '100%',
        padding: 20,
        marginTop: 40,
        flexDirection: 'row'
    },
    input: {
        width: '100%',
        fontSize: 20,
        padding: 10,
        fontFamily: 'Kanit',
        color: Colors.white,
        backgroundColor: '#00000070',
        borderRadius: 25


    },

})

const descriptions = {
    password: 'To change your password, enter your existing password first.',
    email: 'This makes it easier for you to recover your account and for people to find you.',
    gpa: 'Your GPA is your grade point average. We use your unweighted GPA to help pair you with recommended study partners. You can choose to leave this blank or manage who can see it.',
    name: "This is how you'll appear and how people can find you on Binder, so choose a name your classmates know you by.",
    birthday: "We'll use this to determine your age, Zodiac Sign, and let your classmates know when your special day arrives.",
    school: "This makes it easier for us to show you the right classes, recommend study partners, inform you about school events and more!"


}

export { styles, descriptions }