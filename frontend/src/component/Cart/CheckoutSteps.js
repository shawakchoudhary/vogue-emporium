import React, { Fragment } from 'react';
import "./CheckoutSteps.css";
import { Step, StepLabel, Stepper, Typography } from  "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";


const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        {
            label:<Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />
        },
        {
            label:<Typography>Confirm Orders</Typography>,
            icon: <LibraryAddCheckIcon />
        },
        {
            label:<Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />
        },
    ];

    const stepStyles = {
        boxSizing: "border-box"
    };
    return (
       <Fragment>
           <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
               { steps.map((item,index)=>(
                   <Step
                   key = { index }
                   active = { activeStep === index ? true : false}
                   completed = { activeStep >= index ? true : false}
                   >
                       <StepLabel
                          style = {{
                              color: activeStep >= index ? "red" : "rgba(0,0,0,0.567)",
                          }}
                         icon={item.icon}
                       >
                           { item.label }

                       </StepLabel>

                   </Step>
               ))}

           </Stepper>
       </Fragment>
    )
}

export default CheckoutSteps
