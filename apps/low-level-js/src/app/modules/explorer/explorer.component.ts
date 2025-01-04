import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { readDir, BaseDirectory, FileEntry } from '@tauri-apps/api/fs';
import { FileIcon, NavItem } from '../models';

@Component({
  selector: 'app-explorer',
  imports: [CommonModule],
  templateUrl: './explorer.component.html',
})
export class ExplorerComponent implements OnInit {
  navItems = signal<NavItem[]>([
    {label: 'Home', icon: 'home.svg', url: 'Desktop'},
    {label: 'Documents', icon: 'document.svg', url: 'Documents'},
    {label: 'Desktop', icon: 'desktop.svg', url: 'Desktop'},
    {label: 'Downloads', icon: 'downloads.svg', url: 'Downloads'},
    {label: 'Pictures', icon: 'picture.svg', url: 'Pictures'},
    {label: 'Videos', icon: 'video.svg', url: 'Videos'},
  ]);
  activeNavItem = signal<NavItem | null>(null);

  fileIcons = signal<FileIcon[]>([]);


  ngOnInit(): void {
      this.readDir({label: 'Home', icon: 'home.svg', url: 'Desktop'},);
  }

  buildFileIcons(entries: FileEntry[]): FileIcon[] {
    return entries.map(entry => {
      if (entry.children?.length) {
        const fileIcon: FileIcon = {...entry, icon: 'folder.svg'};
        return fileIcon;
      }
      if (entry.path.endsWith('pdf') || entry.path.endsWith('txt')) {
        const fileIcon: FileIcon = {...entry, icon: 'document-text.svg'};
        return fileIcon;
      }
      if (entry.path.endsWith('jpg') || entry.path.endsWith('png')) {
        const fileIcon: FileIcon = {...entry, icon: 'picture.svg'};
        return fileIcon;
      }
      if (entry.path.endsWith('exe') || entry.path.endsWith('msi')) {
        const fileIcon: FileIcon = {...entry, icon: 'command-line.svg'};
        return fileIcon;
      } else {
        return {...entry, icon: 'folder.svg'};
      }
    });
  }

  async readDir(navItem: NavItem) {
    this.activeNavItem.set(this.navItems()?.find(item => item?.label === navItem?.label) ?? null);
    const entries = await readDir(navItem?.url, { dir: BaseDirectory.Home, recursive: true });
    this.fileIcons.set(this.buildFileIcons(entries));
  }

  runFile(fileIcon: FileIcon) {
    console.log(fileIcon);
  }
}
