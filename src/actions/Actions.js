/* Username */
export function setUserName(userName){
    return{
        type: '@USER_NAME/SETUSERNAME',
        userName: userName
    }
}

/* Mode */
export function setDarkMode(isDarkMode){
    return{
        type: '@MODE/SETDARKMODE',
        isDarkMode: isDarkMode
    }
}

export function setPreviewMode(previewMode){
    return{
        type: '@MODE/SETPREVIEWMODE',
        previewMode :previewMode
    }
}