//import axios from "axios";


/* User */
export function userName(state = '', action) {
    switch (action.type) {
        case '@USER_NAME/SETUSERNAME':
            return action.userName;
        default:
            return state;
    }
};

/* Favorite */
export function favorite(state = [], action) {
    switch (action.type) {
        case '@FAVORITE/ADD_FAVORITE':
            return {
                ...state,
                addURL: action.URL
            };
        case '@FAVORITE/DELETE_FAVORITE':
            return {
                ...state,
                deleteURL: action.URL
            };
        default:
            return state;
    }
};


/* Folder */
const initFolder = {
    currentFolder: 0,
    folderList: [{name: 'favorite', id: 0, image: 'https://i.pinimg.com/564x/f3/6d/6d/f36d6d18240ccae47ad3932c9935ea2d.jpg'},
                 {name: 'quokka', id: 1, image: 'https://i.pinimg.com/564x/8b/c3/50/8bc3508f9b6b2ae990b4b15b0ffe14bb.jpg'}]
                 /*{name: 'cat', id: 2, image: 'https://i.pinimg.com/736x/4b/58/f3/4b58f34182fdabf1e38f660d0ba20498.jpg'},
                 {name: 'pixel', id: 3, image: 'https://i.pinimg.com/564x/06/21/99/062199a60a5c693bec625e839f0e6c83.jpg'},
                 {name: 'pineapple', id: 4, image: 'https://i.pinimg.com/736x/8f/1c/01/8f1c0125387838a39f32b0132ab0ebf3.jpg'},
                 {name: 'tower', id: 5, image: 'https://i.pinimg.com/564x/91/ea/4b/91ea4bb453a9286951efb70b1409abae.jpg'},
                 {name: 'elf', id: 6, image: 'https://i.pinimg.com/564x/6c/80/9e/6c809e023e6635295720994b52eb4fdd.jpg'},
                 {name: 'avatar', id: 7, image: 'https://i.pinimg.com/564x/97/ed/4e/97ed4eb2f8fa26e3658a4b0ddbcf0ff2.jpg'},
                 {name: 'pua', id: 8, image: 'https://i.pinimg.com/564x/8b/5d/88/8b5d883efedaae6db53519d5327ffb57.jpg'},
                 {name: 'penguin', id: 9, image: 'https://i.pinimg.com/564x/fc/e2/56/fce2564630f927b9e53c6667b53c69e5.jpg'},]*/,
    folderHasMore: true,
    folderLoading: false,
};

export function Folder(state = initFolder, action) {
    switch (action.type) {
        case '@FOLDER/ADD_FOLDER':
            if(action.folderName.length!==0){
                var newFolderList = JSON.parse(JSON.stringify(state.folderList));
                var len = state.folderList.length;
                newFolderList.push({name: action.folderName, id: len, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1280px-HD_transparent_picture.png'});
                return{
                    ...state,
                    folderList: newFolderList

                };
            }; 
        case '@FOLDER/SET_CURRENTFOLDER':
            // var newFolderList = JSON.parse(JSON.stringify(state.folderList));
            // console.log('action.id : ', action.id);
            // var folderIdByid = 0;
            // if(action.id != undefined){
            //     var len = newFolderList.length;
            //     console.log('action.id : ', action.id);
            //     var folderIdByid = newFolderList[action.id].id;

            // }
            // for(var i = 0; i < len; i++){
            //     if(action.id == newFolderList[i].id){
            //         folderIdByid = i;
            //         break;
            //     }
            // }
            return {
                ...state,
                currentFolder: action.id
            };
        case '@FOLDER/UPDATE_RECENTLY':
            // 誰id對到action.id就要換到前面
            var newFolderList = JSON.parse(JSON.stringify(state.folderList));
            var len = newFolderList.length;
            var switchId = 1;
            for(var i = 0; i < len; i++){
                if(newFolderList[i].id == action.id){
                    switchId = i;
                    break;
                }
            } 
            if(action.id != 0){
                var head = newFolderList[0];
                console.log('head ', head);
                var recent = newFolderList[switchId];
                console.log('recent ', recent);
                newFolderList.splice(switchId, 1);
                newFolderList.splice(0, 1);
                newFolderList.unshift(recent);
                newFolderList.unshift(head);
                console.log('\nnew folder list : ', newFolderList);
            }
            
            return {
                ...state,
                folderList: newFolderList
            };
        case '@FOLDER/CHECK_FOLDER_EMPTY':
            var newFolderList = JSON.parse(JSON.stringify(state.folderList));
            var len = newFolderList.length;
            var chosenId = 1;
            for(var i = 0; i < len; i++){
                if(newFolderList[i].id == action.id){
                    chosenId = i;
                    break;
                }
            } 
            if(state.folderList[chosenId].image == 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1280px-HD_transparent_picture.png'){
                newFolderList[chosenId].image = action.url;
                
            }
            return{
                ...state,
                folderList: newFolderList
            };
        case '@FOLDER/START_LOADING':
            return {
                ...state,
                postLoading: true
            };
        case '@FOLDER/END_LOADING':
            return {
                ...state,
                postLoading: false
            };
        case '@FOLDER/END_LIST_FOLDER':
            return {
                ...state,
                posts: action.posts,
                hasMore: action.posts.length > 0
            };
        case '@FOLDER/END_LIST_MORE_FOLDER':
            return {
                ...state,
                posts: [...state.posts, ...action.posts],
                hasMore: action.posts.length > 0
            };
        case '@FOLDER/END_CREATE_FOLDER':
            var newPosts = state.posts.map(p => {
                return p;
            });
            return {
                ...state,
                posts: newPosts,
            };
        default:
            return state;
    }
}

/* Preview */
const initPreview = {
    currentPreview:'',
    previewList: [[{loved: true, URL: 'https://i.pinimg.com/564x/f3/6d/6d/f36d6d18240ccae47ad3932c9935ea2d.jpg', date: '2023 / 06 / 14'}, 
                   {loved: true, URL: 'https://i.pinimg.com/564x/8b/c3/50/8bc3508f9b6b2ae990b4b15b0ffe14bb.jpg', date: '2023 / 06 / 14'}, 
                   {loved: true, URL: 'https://i.pinimg.com/564x/8b/5d/88/8b5d883efedaae6db53519d5327ffb57.jpg', date: '2023 / 06 / 14'}],
                   [{loved: false, URL: 'https://i.pinimg.com/564x/8b/c3/50/8bc3508f9b6b2ae990b4b15b0ffe14bb.jpg', date: '2023 / 06 / 16'}, 
                   {loved: false, URL: 'https://i.pinimg.com/736x/04/94/86/04948650402abec7620dab8e458fdd37.jpg', date: '2023 / 06 / 16'}, 
                   {loved: false, URL: 'https://i.pinimg.com/564x/27/9c/9b/279c9bbdc613979ad32879cf5e5772e9.jpg', date: '2023 / 06 / 16'}]],
    previewHasMore : true,
    previewLoading: false,
};


export function Preview(state = initPreview, action) {
    switch (action.type) {
        case '@PREVIEW/SET_CURRENTPREVIEW':
            return {
                ...state,
                currentPreview: action.url
        };
        case '@PREVIEW/DELETE_FAVORITE':
            var newFavorite = JSON.parse(JSON.stringify(state.previewList));
            for(j=0;j<newFavorite.length;j++){
                for(i = 0; i < newFavorite[j].length; i++){
                    if(newFavorite[j][i].URL == action.URL){
                        newFavorite[j][i].loved = false;
                    }
                }
            }
            
            for(i = 0; i < newFavorite[0].length; i++){
                if(newFavorite[0][i].URL == action.URL){
                    newFavorite[0].splice(i, 1);
                    break;
                }
            }
            return{
                ...state,
                previewList : newFavorite
            };

        case '@PREVIEW/ADD_FAVORITE':
            var newFavorite = JSON.parse(JSON.stringify(state.previewList));
            for(i = 0; i < newFavorite[action.folderId].length; i++){
                if(newFavorite[action.folderId][i].URL == action.URL){
                    newFavorite[action.folderId][i].loved = true;
                }
            }
            newFavorite[0].push({loved: true, URL: action.URL});
            return{
                ...state,
                previewList: newFavorite
            };
            
        case '@PREVIEW/PUSH_PREVIEWLIST':
            var newPreviewList = JSON.parse(JSON.stringify(state.previewList));
            newPreviewList.push([]);
            return{
                ...state,
                previewList: newPreviewList
            };
        
        case '@PREVIEW/ADD_IMAGE_TO_FOLDER':
            var newPreviewList = JSON.parse(JSON.stringify(state.previewList));
            const DATE = new Date();
            var d = '';
            d += DATE.getFullYear();
            d += ' / ';
            d += DATE.getMonth() + 1;
            d += ' / ';
            d += DATE.getDate();
            //console.log(d);
            
            newPreviewList[action.folderId].push({loved: false, URL: action.url, date: d});
            return{
                ...state,
                previewList: newPreviewList
            };
        case '@PREVIEW/END_LOADING':
            return {
                ...state,
                previewLoading: false
            };
        case '@PREVIEW/END_PREVIEW_POSTS':
            return {
                ...state,
                previewList: action.previewList,
                previewHasMore: action.previewList.length > 0
            };
        case '@PREVIEW/END_LIST_MORE_PREVIEWS':
            return {
                ...state,
                previewList: [...state.previewList, ...action.previewList],
                previewHasMore: action.previewList.length > 0
            };
        case '@PREVIEW/END_CREATE_PREVIEW':
            var newPreviews = state.previews.map(p => {
                return p;
            });
            return {
                ...state,
                previewList: newPreviews,
            };
        default:
            
            return state;
    }
}

/* Mode */
const initModeState = {
    isDarkMode: false,
    previewMode : 'Lock'
};


export function Mode(state = initModeState, action) {
    switch (action.type) {
        case '@MODE/SETDARKMODE':
            return {
                ...state,
                isDarkMode: action.isDarkMode,
                
            };
        case '@MODE/SETPREVIEWMODE':
            return {
                ...state,
                previewMode : action.previewMode,
            };
        default:
            return state;
    }
}

