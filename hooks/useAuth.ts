import React, { useState, useEffect } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log(user);
      }
    });
    return subscriber;
  }, []);

  const verifyPhoneNumber = (
    phoneNumber: string,
    onSuccess: () => void,
    onError: (error: Error) => void
  ) => {
    auth()
      .signInWithPhoneNumber(phoneNumber)
      .then((confirmation) => {
        setConfirm(confirmation);
        onSuccess();
      })
      .catch((error) => {
        onError(error);
      })
      .finally(() => {
        console.log(user);
      });
  };

  const confirmCode = (
    code: string,
    onSuccess: () => void,
    onError: (error: Error) => void
  ) => {
    confirm?.confirm(code).then(onSuccess);
  };

  const signOut = () => {
    auth().signOut();
  };

  return { user, verifyPhoneNumber, confirmCode, signOut };
};

export default useAuth;
