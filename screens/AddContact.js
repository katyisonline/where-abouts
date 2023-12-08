
import { Text, View, Alert, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';


import { db, auth } from '../firebaseConfig';
import { ref, set } from '../node_modules/firebase/database';


import { styles } from '../styles/styles';


const AddContact = ({ navigation }) => {

    // Setting the hooks 
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


    // Handling the registration
    const registerHandler = () => {
        saveContact(firstName, lastName, phoneNumber);
        navigation.navigate('Map')
    }


    const generateUniqueID = () =>{
       let randID =  Math.floor(Math.random() * 10000)
       console.log(randID)
return randID
    }

    const saveContact = () => {
        // Function ensures user is logged in and authenticated
        var user = auth.currentUser;
        if (user) {
            var uid = user.uid;
            var contactID = generateUniqueID()
            // new node for contacts is created if user exists 
            set(ref(db, 'users/' + uid + '/contacts/' + contactID), {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
            }, { merge: false })
                .then(() => {
                    console.log('Contact saved successfully')
                })
                .catch(() => {
                    console.log('Contact not saved')
                })
        } else {
            console.log('User not found.')
        }

    }


    // Returning the layout of the register screen
    return (
        <View style={styles.verticalContainer}>
            <Text style={styles.header}>ADD CONTACT</Text>

            <View style={styles.inputContainer}>
                <Text>First Name</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(value) => setFirstName(value)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>Last Name</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(value) => setLastName(value)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>


            <View style={styles.inputContainer}>
                <Text>Phone Number</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(value) => setPhoneNumber(value)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoCompleteType="tel"
                    keyboardType="phone-pad"
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} title="ADD CONTACT" onPress={registerHandler}>
                    <Text style={styles.buttonText}>ADD CONTACT</Text>
                </TouchableOpacity>
            </View>
        </View>
    );


}

export default AddContact;