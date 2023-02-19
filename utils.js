import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from 'expo-media-library'
import { useState } from "react";
import { auth, db } from "./Firebase/firebase";
import * as Haptics from 'expo-haptics'
import { EMAIL_ALREADY_IN_USE, INCORRECT_PASSWORD, INCORRECT_USERNAME_OR_PASSWORD, INVALID_EMAIL, INVALID_PASSWORD, NETWORK_REQUEST_FAILED, SOMETHING_WENT_WRONG, TOO_MANY_REQUESTS, USER_NOT_FOUND, WEAK_PASSWORD } from "./constants/ErrorMessages";

export async function pickImage() {
    let result = ImagePicker.launchCameraAsync();
    return result;
}

export async function askForCameraPermission() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status;
}

export async function openMediaLibrary(mediaType, selectionLimit) {

    const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (galleryStatus.status === 'granted') {
        const userGalleryMedia = await MediaLibrary.getAssetsAsync({ sortBy: ['creationTime'], mediaType: [mediaType] })

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            selectionLimit: selectionLimit
        });

        if (!result.cancelled && result != null) {
            return result.uri;
        }
    }
    return null


}

export function getDeskCategory(contentType) {
    switch (contentType) {
        case "notes": return "Notes"
        case "flashcards": "Flashcards"
        case "poll": "Poll"
        case "burning question": "Burning Question"

    }
}



export function getZodiacSign(day, month, isEmoji) {

    let sign = "Unknown";
    console.log("Day ", day)

    if (month == 12) {

        if (day < 22)
            sign = !isEmoji ? "Sagittarius" : '♐️';
        else
            sign = !isEmoji ? "Capricorn" : '♑️';
    }

    else if (month == 1) {
        if (day < 20)
            sign = !isEmoji ? "Capricorn" : '♑️';
        else
            sign = !isEmoji ? "Aquarius" : '♒️';
    }

    else if (month == 2) {
        if (day < 19)
            sign = !isEmoji ? "Aquarius" : '♒️';
        else
            sign = !isEmoji ? "Pisces" : '♓️';
    }

    else if (month == 3) {
        if (day < 21)
            sign = !isEmoji ? "Pisces" : '♓️';
        else
            sign = !isEmoji ? "Aries" : '♈️';
    }
    else if (month == 4) {
        if (day < 20)
            sign = !isEmoji ? "Aries" : '♈️';
        else
            sign = !isEmoji ? "Taurus" : '♉️';
    }

    else if (month == 5) {
        if (day < 21)
            sign = !isEmoji ? "Taurus" : '♉️';
        else
            sign = !isEmoji ? "Gemini" : '♊️';
    }

    else if (month == 6) {
        if (day < 21)
            sign = !isEmoji ? "Gemini" : '♊️';
        else
            sign = !isEmoji ? "Cancer" : '♋️';
    }

    else if (month == 7) {
        if (day < 23)
            sign = !isEmoji ? "Cancer" : '♋️';
        else
            sign = !isEmoji ? "Leo" : '♌️';
    }

    else if (month == 8) {
        if (day < 23)
            sign = !isEmoji ? "Leo" : '♌️';
        else
            sign = !isEmoji ? "Virgo" : '♍️';
    }

    else if (month == 9) {
        if (day < 23)
            sign = !isEmoji ? "Virgo" : '♍️';
        else
            sign = !isEmoji ? "Libra" : '♎️';
    }

    else if (month == 10) {
        if (day < 23)
            sign = !isEmoji ? "Libra" : '♎️';
        else
            sign = !isEmoji ? "Scorpio" : '♏️';
    }

    else if (month == 11) {
        if (day < 22)
            sign = !isEmoji ? "Scorpio" : '♏️';
        else
            sign = !isEmoji ? "Sagittarius" : '♐️';
    }

    return sign


}





export function getItemLayout(data, index) {
    const productHeight = 100;
    return {
        length: productHeight,
        offset: productHeight * index,
        index,
    };
};


export function getDisplayNameOrYou(userData) {



    if (userData?.uid === auth.currentUser.uid) {
        return "You"
    }

    return userData?.displayName


}

export function getNumberOfCookies(tier) {
    switch (tier) {

    }
}


export function isSelected(selectedData, item) {
    return selectedData.includes(item)
}

export const handleSearchByName = (collectionPath, search, setData) => {
    db.collection(collectionPath)
        .orderBy('name', 'asc')
        .startAt(search.toUpperCase())
        .endAt(search.toLowerCase + '\uf8ff')
        .get()
        .then(query => {
            let data = query.docs.map(doc => {
                const data = doc.data()
                const id = doc.id
                return { id, ...data }
            })
            setData(data)
        })

}
export function isValidEmail(email) {

    return email.indexOf('.') <= (email.length - 1) - 2 &&
        email.indexOf('.') >= 0 &&
        email.indexOf('@') >= 1 &&
        email.substring(email.indexOf('@'), email.indexOf('.')).length > 1
}

export function getErrorMessage(message) {
    console.log(message)
    if (message.includes('(auth/invalid-email).')) {
        return INVALID_EMAIL
    }
    else if (message.includes('(auth/user-not-found).')) {
        return USER_NOT_FOUND
    }
    else if (message.includes('(auth/wrong-password).')) {
        return INVALID_PASSWORD
    }
    else if (message.includes('(auth/too-many-requests)')) {
        return TOO_MANY_REQUESTS
    }

    else if (message.includes('(auth/network-request-failed).')) {
        return NETWORK_REQUEST_FAILED
    }
    else if (message.includes('(auth/weak-password).')) {
        return WEAK_PASSWORD
    }
    else if (message.includes('(auth/email-already-in-use).')) {
        return EMAIL_ALREADY_IN_USE
    }
    else return SOMETHING_WENT_WRONG
}

export function onSelect(selectedData, setSelectedData, item, selectionLimit) {

    if (selectedData.includes(item)) //if we select an item that is already selected
    {
        const deselect = selectedData.filter(selected => selected != item) // create a new data array that does not include the selected item
        return setSelectedData(deselect)
    }

    if (selectedData.length === selectionLimit && selectionLimit != 1) {
        return
    }

    if (selectedData.length === selectionLimit && selectionLimit == 1) {
        return setSelectedData([item]); // add item to selected items array

    }

    setSelectedData([...selectedData, item]); // add item to selected items array

}


export function haptics(feedbackStyle) {
    if (feedbackStyle === 'light')
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    else if (feedbackStyle === 'medium')
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    else if (feedbackStyle === 'heavy')
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)


}





export function getName(firstName, lastName) {
    let name = ""
    if (!firstName) {
        name = lastName
    }
    else if (!lastName) {
        name = firstName
    }
    if (name)
        return name
    return "Someone"

}

