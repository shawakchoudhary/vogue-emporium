import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch , useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const ResetPassword = ({ history, match }) => {

     const dispatch = useDispatch();
     const alert = useAlert();

     const { loading, success, error} = useSelector(state => state.forgotPassword);

       const [password, setPassword] = useState();
        const [confirmPassword, setConfirmPassword] = useState();

        const resetPasswordSubmit = (e)=>{
             e.preventDefault();

             const myForm = new FormData();

             myForm.set("password", password);
             myForm.set("confirmPassword", confirmPassword);

             dispatch(resetPassword(match.params.token,myForm));
        }

        useEffect(() => {
              if(error){
                  alert.error(error);
                  dispatch(clearErrors());
              }
             if(success){
                 alert.success("Password Updated Successfully");
                 history.push("/login");
             }
        },[ alert , error, dispatch, history, success]);
    return <Fragment>
           { loading ? (<Loader />):(
            <Fragment>
                 <MetaData title = "Reset Password" />
                <div className="resetPasswordContainer">
                    <div className="resetPasswordBox">
                        <h2 className ="resetPasswordHeading">Update Password</h2>
                        <form
                        className="resetPasswordForm"
                        onSubmit = {resetPasswordSubmit} 
                        >
                         <div className="loginPassword">
                             <LockOpenIcon />
                             <input 
                             type="password"
                             placeholder="New Password"
                             required
                             value={password}
                             onChange={(e)=>setPassword(e.target.value)}
                              />
                         </div>
                         <div className="loginPassword">
                             <LockIcon />
                             <input 
                             type="password"
                             placeholder="Confirm Password"
                             required
                             value={confirmPassword}
                             onChange={(e)=>setConfirmPassword(e.target.value)}
                              />
                         </div>
                         <input 
                         type="submit"
                          value="Confirm" 
                          className="resetPasswordBtn"
                          />

                        </form>
                    </div>
                </div>
            </Fragment>
        )}
    </Fragment>;
}

export default ResetPassword;
