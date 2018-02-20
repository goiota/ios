goiotaApp.config(['$translateProvider', function($translateProvider){
  // Adding a translation table for the English language
  $translateProvider.translations('en', {
    "INVALID_GRANT" : "Invalid Email or Password, Please try again",
    "ERROR"     : {
      "GENERAL" : {
        "INTERNET_CONNECTION" : "Please check your internet connection.",
        "SYSTEM_ERROR"  : "Please check your internet connection and try again later.",
        "ERROR"  : "There has been a problem. Please try again."
      },
      "ADDRESS_NOT_VALID" : "The Address you entered is not valid.",
      "SEED_NOT_VALID"  : "Please enter your Seed.",
      "PIN_CODE_VALID"  : "Please enter the correct Pin.",
      "NOT_ENOUGH_BALANCE"  : "You don't have enough Balance. Please check your Balance.",
      "ENTER_CUSTOM_NODE"  : "Please enter a correct Url.",
      "NODE_DOES_NOT_SUPPORT_ATTACH_TO_TANGLE" : "Your Custom Node does not support AttachToTangle command.",
      "NODE_NOT_AVAILABLE" : "Current Node is not responding. Please try later or enter a new Node."
    },
    "INFO" : {
      "SUCCESS_TRANSACTION" : "Your Transaction is confirmed",
      "SUCCESS_CUSTOM_NODE_ADDED" : "Node has been changed.",
      "SUCCESS_CUSTOM_NODE_REMOVED" : "Node has been removed.",
      "SUCCESS_ADDRESS_COPYIED" : "Address was copied to your clipboard"
    },
    "COPY" : {
      "BUNDLE" : "Your Bundle has been copied to clipboard",
      "ADDRESS" : "Your Address has been copied to clipboard",
      "HASH" : "Your Hash has been copied to clipboard",
    },
    "STATUS" : {
      "CONFIRMED" : "confirmed",
      "PENDING" : "pending",
      "REJECTED" : "rejected",
    },
    "MENU" : {
            "RECEIVE" : "Receive",
            "SEND" : "Send",
            "MARKETCAP" : "Market Cap",
    },
    "PAGE" : {
            "RECEIVE" : {
              "HEADLINE" : "Receive IOTA"
            },
            "SEND" : {
              "HEADLINE" : "Send IOTA"
            },
            "MARKETCAP" : {
              "HEADLINE" : "Market Cap",
              "LABEL" : {
                "BALANCE" : "Balance",
                "RANK" : "Rank",
                "MARKETCAP" : "Market Cap",
                "VOLUME" : "Volume (24H)",
                "POWERD_BY" : "Powered by CoinMarketCap"
              }
            },
    },
    "MODAL" : {
        "CHANGE_NODE" : {
          "HEADER" : "Change Node Settings",
          "SUBHEADLINE" : "LOREM LOREM LOREM"
        },
        "CREATE_SEED" : {
          "HEADER" : "Create Seed",
          "SUBHEADLINE" : "LOREM LOREM LOREM",
          "HINT" : "Please save the Seed in a secure place (i.e. printout/screenshot). Your Seed cannot be restored. If you loose your Seed you will never have acces to your Wallet again.",
          "HINT_SELF_GEN_SEED" : "Here is a link how you can create your seed on Linux or Mac by using the console/terminal.",
          "GENERATE_NEW" : "Generate New Seed"
        },
        "SEND_TRANSFER" : {
          "CONFIRM_QUESTION" : "Do you really wont to transfer",
          "HEADER" : "Confirm Transaction",
          "SUBHEADLINE" : "LOREM LOREM LOREM"
        },
        "DONATE_NOW" : {
          "HEADER" : "Donate Now",
          "HEADLINE" : "Help us keep making awesome stuff",
          "SUBHEADLINE" : "By donating you will support further development of features."
        },
    },
    "LABEL" : {
            "BALANCE" : "Balance",
            "SHOW_ZERO_TRANSACTIONS" : "Show Zero Transactions",
            "NO_TRANSACTIONS" : "No Transactions",
            "LOGIN" : "Login",
            "CREATE_ACCOUNT" : "Create Account",
            "GO_IOTA_CLAIM" : "Your Local Wallet",
            "INFO"  : "Info",
            "DETAILS" : "Details",
            "BUNDLE"  : "Bundle",
            "ADDRESS" : "Address",
            "CLOSE" : "CLOSE",
            "SEND"  : "Send",
            "OR"  : "OR",
            "NEW_ADDRESS" : "New Address",
            "SEND_TRANSFER" : "Transfer",
            "DONATENOW" : "Donate Now",
            "COPY_TO_CLIP" : "copy to clipboard",
            "WAIT_TILL_CONFIGURATED" : "Please wait till your Wallet will be configurated.",
            "FALLBACK_ENTER_PIN_CODE" : "Please enter a fallback Pin-Code for your TouchId",
            "ENTER_PIN_CODE" : "Please enter your Pin-Code, to Secure your App.",
            "PIN_CODE" : "Pin Code",
            "HOW_TO_SECURE_APP" : "How do you wont to secure your App?",
            "ENTER_SEED" : "Please enter your Seed, to login to your Wallet."
    },
    "PLACEHOLDER" : {
            "ENTER_NODE" : "http://server:port",
            "SELECT_NODE" : "Select Node",
            "MESSAGE" : "Message",
            "ADDRESS" : "Address",
            "ENTER_SEED" : "Enter Seed"
    },
    "BUTTON" : {
            "COPY" : "Copy",
            "EMAIL" : "Email",
            "WHATSAPP" : "Whatsapp",
            "BACK" : "Back",
            "NEXT" : "Next",
            "SAVE" : "Save",
            "CANCEL" : "Cancel",
            "CLSOE" : "Close",
            "LOGIN" : "Login",
            "SEND" : "Send",
            "TANGLE_EXPLORER" : "Tangle Explorer",
            "PROMOTE" : "Promote",
            "NEW_ADDRESS" : "New Address",
            "GENERATE_NEW_SEED" : "Generate New Seed"
    },
    "CURRENCY" : {
        "EUR" : {
          "SHORT" : "€",
          "LONG" : "EUR"
        },
        "USD" : {
          "SHORT" : "$",
          "LONG" : "USD"
        }
    },
    "LOADING" : {
        "LABEL" : "Loading"
    }
  });

  // Tell the module what language to use by default
  $translateProvider.preferredLanguage('en');
}])
