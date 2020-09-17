import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
  if(firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
  }
}

// Google Sign In Handler
export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then( (res) =>{
      const { displayName, email } = res.user;
      const signedInUser = { name: displayName, email: email, success:true };
      return signedInUser;
    })
    .catch(function (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

// Facebook Sign In handler
export const handleFbSignIn = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
    .then(function (res) {
      const { displayName, email } = res.user;
      const signedInUser = { name: displayName, email: email };
      return signedInUser;
       })
    .catch(function (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};


// Github Sign In
export const handleGithubSignIn=()=>{
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase
      .auth()
      .signInWithPopup(githubProvider)
      .then(function (res) {
        const { displayName, email } = res.user;
      const signedInUser = { name: displayName, email: email };
      return signedInUser;
      })
      .catch(function (err) {
        const errorMessage = err.message;
       console.log(errorMessage);
      });
  ;

  
}



// Sign Out handler:
export const handleSignOut = () => {
  return firebase.auth().signOut()
  .then(res => {
    const signedOutUser = {
      isSignedIn: false,
      name: '',
      email: '',
      error: '',
      success: false
    }
    return signedOutUser;
  }).catch(err => {
    const errorMessage = err.message;
      console.log(errorMessage);
  });
}


// reset password
export const resetPassword = (email) => {
  let auth = firebase.auth();
  auth
    .sendPasswordResetEmail(email)
    .then(function () {
      // Email sent.
    })
    .catch(function (error) {
      // An error happened.
    });
};







// not working for error message
// Update user name
// const updateUserName = name =>{
//   const user = firebase.auth().currentUser;

//   user.updateProfile({
//     displayName: name
//   }).then(function() {
//     console.log('user name updated successfully')
//   }).catch(function(error) {
//     console.log(error)
//   });
// }


// // Create user with email and password
// export const createUserWithEmailAndPassword = (name, email, password) => {
//   return firebase.auth().createUserWithEmailAndPassword(email, password)
//   .then( res => {
//     const newUserInfo = res.user;
//     newUserInfo.error = '';
//     newUserInfo.success = true;
//     updateUserName(name);
//     verifyEmail();
//     return newUserInfo;
//   })
//   .catch( error => {
//     const newUserInfo = {};
//     newUserInfo.error = error.message;
//     newUserInfo.success = false;
//     return newUserInfo;
//   });
// }


// // sign in with email and password
// export const signInWithEmailAndPassword = (email, password) =>{
//   return firebase.auth().signInWithEmailAndPassword(email, password)
//   .then(res => {
//     const newUserInfo = res.user;
//     newUserInfo.error = '';
//     newUserInfo.success = true;
//     return newUserInfo;
//   })
//   .catch(function(error) {
//     const newUserInfo = {};
//     newUserInfo.error = error.message;
//     newUserInfo.success = false;
//     console.log(newUserInfo);
//     return newUserInfo;
//   });
// }


//  const verifyEmail = () => {
//   const userVerify = firebase.auth().currentUser;
//   userVerify
//     .sendEmailVerification()
//     .then(function () {
//       // Email sent.
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };




