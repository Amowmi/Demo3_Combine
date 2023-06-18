/* Username */
export function setUserName(userName){
    return{
        type: '@ACCOUNT/SET_USER_NAME',
        userName: userName
    }
}

export function setUserFolder(userFolderList){
    return{
        type: '@ACCOUNT/SET_USER_FOLDER',
        userFolderList: userFolderList
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

export function addImageToFolder(folderId, url){
    return{
        type: '@PREVIEW/ADD_IMAGE_TO_FOLDER',
        folderId: folderId,
        url: url
    }
}

export function checkFolderEmpty(folderId, url){
    return{
        type: '@FOLDER/CHECK_FOLDER_EMPTY',
        folderId: folderId,
        url: url
    }
}

export function addFolder(folderName){
    return{
        type: '@FOLDER/ADD_FOLDER',
        folderName: folderName
    }
}

export function pushPreviewList(){
    return{
        type: '@PREVIEW/PUSH_PREVIEWLIST'
    }
}

export function setCurFolder(id){
    return{
        type: '@FOLDER/SET_CURRENTFOLDER',
        id : id
    }
}

export function updateRecently(id){
    return{
        type: '@FOLDER/UPDATE_RECENTLY',
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

export function ToggleLove(isloved, folderId, URL){
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

export function SetEdit(folderId, url, scale, positionx, positiony, isflip, dist, bColor){
    console.log("in action SetEdit for edit, currentFolder :", folderId);
    return{
        type: '@PREVIEW/SET_EDIT_VALUE',
        folderId: folderId,
        url: url,
        scale: scale,
        positionX: positionx,
        positionY: positiony,
        isFlipped: isflip,
        distance: dist,
        bColor: bColor
    }

}
