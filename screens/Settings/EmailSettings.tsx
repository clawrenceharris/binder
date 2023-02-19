import { View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import BackButton from '../../components/BackButton'
import { assets, Colors } from '../../constants'
import { SHADOWS, SIZES } from '../../constants/Theme'
import { useNavigation } from '@react-navigation/native'
import { descriptions, styles } from '.'
import ToggleButton from '../../components/ToggleButton'
import { auth, updateUserProfile } from '../../Firebase/firebase'
import ModalComponent from '../../components/Modal'
import CustomInput from '../../components/CustomInput'
import Button from '../../components/Button'
import firebase from 'firebase/compat'
import { sendEmailVerification } from 'firebase/auth'
import Header from '../../components/Header'
import ToggleSwitch from 'toggle-switch-react-native'
import Input from '../../components/StyledTextInput'
import useColorScheme from '../../hooks/useColorScheme'
import { SubmitModal } from '../../components/Modals'
import { rewordError } from '../../utils'
const EmailSettings = ({ route }) => {
    const navigation = useNavigation()
    const [email, setEmail] = useState(route.params.email)
    const [currentState, setCurrentState] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [verificationPending, setVerificationPending] = useState(!auth.currentUser.emailVerified)
    const [showModal, setShowModal] = useState(false)
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [findMe, setFindMe] = useState(false)
    const colorScheme = useColorScheme()

    function reauthenticate(currentPassword) {
        var user = auth.currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);

        return user.reauthenticateWithCredential(cred);
    }




    function changeEmail() {
        reauthenticate(password).then(() => {
            var user = auth.currentUser;
            user.updateEmail(email).then(() => {
                setErrorMessage('')
                setSuccessMessage("");
                setSuccessMessage("Email successfully updated!");

            }).catch((error) => {
                setErrorMessage(rewordError(error.message))
            });
        }).catch((error) => {
            console.log(error.message)
            setErrorMessage(rewordError(error.message))

        });
        return null

    }
    const handleChangeEmail = () => {
        console.log(changeEmail())
    }
    const handleSave = () => {
        setErrorMessage('')
        setSuccessMessage("");

        setShowModal(true)
    }


    return (


        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <Header
                title={'Email'}
                navigation={navigation}
                style={{ backgroundColor: Colors.primary }}
                color={Colors.white}
            />

            <SubmitModal
                title="Password"
                subtitle={"Wait a sec! For security, enter your password first."}
                onSubmitPress={() => {
                    setShowModal(false);
                    setPassword('')
                    changeEmail()
                }}
                onCancelPress={() => setShowModal(false)}
            >

                <Input
                    placeholder='Password'
                    autoFocus
                    value={password}
                    onChangeText={(value) => { setPassword(value); }}
                    secureTextEntry={!showPassword}
                    style={{ width: '100%', alignSelf: 'center' }}
                    placeholderTextColor={'#00000080'}
                />

            </SubmitModal>

            <View style={{ padding: 20 }}>



                {!verificationPending ? <Text style={styles.description}>{descriptions.email}</Text> :

                    <Text style={styles.description}>{"⚠️ We've sent a verification email to you. Please open the link to finish verifying your address."}</Text>}



                <View style={{ marginTop: 20, backgroundColor: Colors[colorScheme].background, padding: 20, borderRadius: 25 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>


                        <Input
                            returnKeyType='done'
                            placeholder='Email'
                            onChangeText={(value) => { setEmail(value); setErrorMessage(''); setSuccessMessage('') }}
                            value={email}
                            selectionColor={Colors.accent}

                        />

                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={email !== route.params.value ? handleSave : () => { }}>
                            <Text style={{ position: 'absolute', bottom: -12, right: 10, color: email !== route.params.value ? Colors.accent : '#00000060', fontFamily: "KanitMedium", fontSize: 16 }}>{"Save"}</Text>

                        </TouchableOpacity>
                    </View>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <Text style={styles.successMessage}>{successMessage}</Text>


                    <View style={{ marginTop: 20, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, backgroundColor: Colors.white, ...SHADOWS[colorScheme], shadowRadius: 15 }}>
                        <Text style={{ fontFamily: 'Kanit', color: Colors[colorScheme].tint, fontSize: 17, width: '50%' }}>{"Show this email on my profile"}</Text>
                        <ToggleSwitch circleColor={'#fff'} isOn={currentState} size={'large'} offColor={'#00000030'} onColor={Colors.accent} onToggle={() => setCurrentState(!currentState)} />

                    </View>



                </View>

            </View>
        </View >

    )
}

export default EmailSettings