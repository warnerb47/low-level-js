import { FileEntry } from "@tauri-apps/api/fs";

export interface FileIcon extends FileEntry {
    icon?: string;
}
