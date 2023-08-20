import SignUpForm from "../../component/sign-up/sign-up-form.component";
import {signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
const SignIn = () => {


    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        // console.log(response);
        const userDocRef = await createUserDocumentFromAuth(user);

    }
    return (
        <div>
            <h1>SignIn</h1>
            <button onClick={logGoogleUser}>
                Signin with Google Popup
            </button>
            <SignUpForm />
        </div>
    )
}
export default SignIn;