import { MediaMetaData } from './MediaMetaData';

export class AppState {
    allFilesMetaData: Map<String, MediaMetaData> = new Map();
    audioFilesMetaData: Map<String, MediaMetaData> = new Map();
    videoFilesMetaData: Map<String, MediaMetaData> = new Map();
    imageFilesMetaData: Map<String, MediaMetaData> = new Map();
    otherFilesMetaData: Map<String, MediaMetaData> = new Map();
    activeMediaSelectionType: String = 'Images';
}