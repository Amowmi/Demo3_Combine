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
    currentFolder: '',
    folderList: [{name: 'tennis', id: 0, image: 'https://i.pinimg.com/564x/f3/6d/6d/f36d6d18240ccae47ad3932c9935ea2d.jpg'},
                 {name: 'quokka', id: 1, image: 'https://i.pinimg.com/564x/8b/c3/50/8bc3508f9b6b2ae990b4b15b0ffe14bb.jpg'},
                 {name: 'cat', id: 2, image: 'https://i.pinimg.com/736x/4b/58/f3/4b58f34182fdabf1e38f660d0ba20498.jpg'},
                 {name: 'pixel', id: 3, image: 'https://i.pinimg.com/564x/06/21/99/062199a60a5c693bec625e839f0e6c83.jpg'},
                 {name: 'pineapple', id: 4, image: 'https://i.pinimg.com/736x/8f/1c/01/8f1c0125387838a39f32b0132ab0ebf3.jpg'},
                 {name: 'tower', id: 5, image: 'https://i.pinimg.com/564x/91/ea/4b/91ea4bb453a9286951efb70b1409abae.jpg'},
                 {name: 'elf', id: 6, image: 'https://i.pinimg.com/564x/6c/80/9e/6c809e023e6635295720994b52eb4fdd.jpg'},
                 {name: 'avatar', id: 7, image: 'https://i.pinimg.com/564x/97/ed/4e/97ed4eb2f8fa26e3658a4b0ddbcf0ff2.jpg'},
                 {name: 'pua', id: 8, image: 'https://i.pinimg.com/564x/8b/5d/88/8b5d883efedaae6db53519d5327ffb57.jpg'},
                 {name: 'penguin', id: 9, image: 'https://i.pinimg.com/564x/fc/e2/56/fce2564630f927b9e53c6667b53c69e5.jpg'},],
    folderHasMore: true,
    folderLoading: false,
};

export function Folder(state = initFolder, action) {
    switch (action.type) {
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
    currentPreview: 0,
    previewList: [[]],
    previewHasMore : true,
    previewLoading: false,
};


export function Preview(state = initPreview, action) {
    switch (action.type) {
        case '@PREVIEW/START_LOADING':
            return {
                ...state,
                previewLoading: true
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
    previewMode : 'Home'
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

