import * as Parse from 'parse';

export const initializeParse = () => {
    Parse.initialize(
        "kU7rMeE8oYGPJJPixUBBFWNIikXJpMip6VjnaAuT", 
        "iIgzaF9z8J2pjiUQTremh7Utrayvc5LJgnxYoT7q", 
        "CCNgxRdknduiXI2T26FjwiE70RyJsVV5eueQBfM0"
    );
    Parse.serverURL = 'https://parseapi.back4app.com/'
    return Parse;
}

export function handleParseError(err){
    switch (err.code) {
        case Parse.Error.INVALID_SESSION_TOKEN:
          Parse.User.logOut();
          break;
          
        default:
            return null;
      }
}
