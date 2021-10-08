export class Exception {

  static exceptionMessage(error) {
    const errormessage = [];

    if (error !== undefined && error !== null
      && error.error !== undefined && error.error !== null
      && error.error.errors !== undefined && error.error.errors !== null) {

      const errorArray = error.error.errors;
      if (errorArray.length === 0) {
        errormessage.push(this.getExceptionMessage(error.error.message));
      } else {
        for (const i in errorArray) {
          if (i) {
            if (errorArray[i]['message'].includes('Key_')) {
              errormessage.push(this.getExceptionMessage(errorArray[i]['message']));
            } else {

              errormessage.push(this.getExceptionMessage(errorArray[i]['field']));
            }
          }
        }
      }
      return errormessage;
    } else if (error.status === 401) {
      // if (error.error.errors === undefined) {
      errormessage.push(this.getExceptionMessage('User is not authorized to access this resource'));
      return errormessage;
      // }
    } else if (error.status === 403) {
      if (error.error.errors === undefined) {
        errormessage.push(this.getExceptionMessage(error.error.message));
        return errormessage;
      }
    } else if (error.status === 404) {
      if (error.error.errors === undefined) {
        errormessage.push(this.getExceptionMessage(error.error.message));
        return errormessage;
      }
    } else if (error.status === 400) {
      if (error.error.errors === undefined) {
        errormessage.push(this.getExceptionMessage(error.error.message));
        return errormessage;
      }
    } else if (error.status === 500) {
      errormessage.push('Internal server error. Please contact administrator.');
      return errormessage;
    }
    errormessage.push('Something went wrong. Please contact administrator.');
    return errormessage;
  }

  static getExceptionMessage(error) {
    let toastMessage = '';
    error = error.charAt(0).toUpperCase() + error.slice(1);
    switch (error) {
      case 'Key_CaptchaNotFound':
        toastMessage = 'Captcha token not found. Bot suspected. Submission of form not allowed';
        break;
      case 'Key_InvalidCaptcha':
        toastMessage = 'Error in captcha token. Bot suspected. Submission of form not allowed';
        break;
      case 'Key_ErrorInCaptcha':
        toastMessage = 'Error in captcha token. Bot suspected. Submission of form not allowed';
        break;
      case 'Key_CaptchaVerificationFailed':
        toastMessage = 'Bot suspected. Submission of form not allowed';
        break;
      case 'Key_FormAlreadySubmitted':
        toastMessage = 'This data has been already recorded. Thank you.';
        break;
      case 'Key_CardHolderNameCannotBeEmpty':
        toastMessage = 'Card holder name cannot be blank';
        break;
      case 'Key_CardHolderNameNotString':
        toastMessage = 'Invalid card holder name';
        break;
      case 'Key_AccountHolderNameNotString':
        toastMessage = 'Invalid account holder name';
        break;
      case 'Key_AccountHolderNameCannotBeEmpty':
        toastMessage = 'Account holder name cannot Be blank';
        break;
      case 'Key_InvalidBankName':
        toastMessage = 'Invalid bank name';
        break;
      case 'Key_InvalidRoutingNumber':
        toastMessage = 'Invalid routing number';
        break;
      case 'Key_BankNameCannotBeBlank':
        toastMessage = 'Bank name cannot be blank';
        break;
      case 'Key_AccountNumberCannotBeBlank':
        toastMessage = 'Account number cannot be blank';
        break;
      case 'Key_RoutingNumberCannotBeBlank':
        toastMessage = 'Routing number cannot be blank';
        break;
      case 'Key_AccountHolderNameCannotBeBlank':
        toastMessage = 'Account holder name cannot be blank';
        break;
      case 'Key_AmountShouldBeMoreThanZero':
        toastMessage = 'Invalid amount';
        break;
      case 'Key_AmountNotToBeNegative':
        toastMessage = 'Negative amount is not accepted';
        break;
      case 'Key_AmountCannotBeBlank':
        toastMessage = 'Amount cannot be blank';
        break;
      case 'Key_CardHolderNameCannotBeBlank':
        toastMessage = 'Card holder name cannot be blank';
        break;
      case 'Key_CvDataCannotBeBlank':
        toastMessage = 'CVV cannot be blank';
        break;
      case 'Key_CardTypeCannotBeBlank':
        toastMessage = 'Card type cannot be blank';
        break;
      case 'Key_CardExpiryCannotBeBlank':
        toastMessage = 'Card expiry cannot be blank';
        break;
      case 'Key_CardNumberCannotBeBlank':
        toastMessage = 'Card number cannot be blank';
        break;
      case 'Key_PhoneCannotBeBlank':
        toastMessage = 'Phone cannot be blank';
        break;
      case 'Key_LastNameCannotBeBlank':
        toastMessage = 'Last name cannot be blank';
        break;
      case 'Key_FirstNameCannotBeBlank':
        toastMessage = 'First name cannot be blank';
        break;
      case 'Key_InvalidCreditCardNo':
        toastMessage = 'Invalid credit card number';
        break;
      case 'Key_InvalidCardNoExpiry':
        toastMessage = 'Invalid expiry date';
        break;
      case 'Key_CvvCannotBeBlank':
        toastMessage = 'CVV cannot be blank';
        break;
      case 'Key_CardNoCannotBeBlank':
        toastMessage = 'Card number cannot be blank';
        break;
      case 'Key_ExpirationCannotBeBlank':
        toastMessage = 'Card expiry cannot be blank';
        break;
      case 'Key_NameOnCardCannotBeBlank':
        toastMessage = 'Card holder name cannot be blank';
        break;
      case 'Key_NameOnAccountCannotBeBlank':
        toastMessage = 'Account holder name cannot be blank';
        break;
      case 'Key_CheckingAccountNoCannotBeBlank':
        toastMessage = 'Account number cannot be blank';
        break;
        case 'Key_InvalidSelectPaymentType':
        toastMessage = 'Selected payment type is not valid.';
        break;
        case 'Key_InvalidCardNumber':
        toastMessage = 'Please enter valid card number.';
        break;
        case 'Key_ChannelTypeNotMatchedWithCardNumber':
        toastMessage = 'Selected card type is incorrect. Please change Credit/Debit and try again.';
        break;
        case 'Key_InvalidCardType':
        toastMessage = 'Card type is not valid.';
        break;
        case 'Key_CheckingAccountNoCannotBeBlank':
        toastMessage = 'Account number cannot be blank';
        break;
        case 'Key_CheckingAccountNoCannotBeBlank':
        toastMessage = 'Account number cannot be blank';
        break;
      default:
        toastMessage = 'Something went wrong. Please contact administrator.';

    }
    return toastMessage;
  }
}
