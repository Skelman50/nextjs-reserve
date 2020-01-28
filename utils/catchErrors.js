export const catchErrors = (error, displayError) => {
  let errMsg = "";
  if (error.response) {
    errMsg = error.response.data;
    console.log("err response", errMsg);
    if (error.response.data.error) {
      errMsg = error.response.data.error.message;
    }
  } else if (error.request) {
    errMsg = error.request;
    console.log("err request", errMsg);
  } else {
    errMsg = error.message;
    console.log("err message", errMsg);
  }
  displayError(errMsg);
};
