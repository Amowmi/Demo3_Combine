/* Username */
export function setUserName(userName){
    return{
        type: '@USER_NAME/SETUSERNAME',
        userName: userName
    }
}
// export function listPreview(id){
//     return{
//         type: '@PREVIEW/LIST_PREVIEW',
//         id: id
//     }
// }

/* Mode */
export function setDarkMode(isDarkMode){
    return{
        type: '@MODE/SETDARKMODE',
        isDarkMode: isDarkMode
    }
}
export function setCurFolder(id){
    return{
        type: '@FOLDER/SET_CURRENTFOLDER',
        id : id
    }
}
export function setCurPreview(url){
    return{
        type: '@PREVIEW/SET_CURRENTPREVIEW',
        url : url
    }
}
export function setPreviewMode(previewMode){
    return{
        type: '@MODE/SETPREVIEWMODE',
        previewMode :previewMode
    }
}

export function ToggleLove(isloved,folderId,URL){
    console.log('Toggle');
    if(isloved){
        return{
            type: '@PREVIEW/DELETE_FAVORITE',
            folderId: folderId,
            URL:URL
        }
    }
    else{
        return{
            type: '@PREVIEW/ADD_FAVORITE',
            folderId: folderId,
            URL:URL
        }
    }

}
