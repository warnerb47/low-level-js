import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { readDir, BaseDirectory } from '@tauri-apps/api/fs';

@Component({
  selector: 'app-explorer',
  imports: [CommonModule],
  templateUrl: './explorer.component.html',
})
export class ExplorerComponent implements OnInit {
  ngOnInit(): void {
      this.readDir();
  }

  async readDir() {
    const entries = await readDir('Desktop', { dir: BaseDirectory.Home, recursive: false });
    for (const entry of entries) {
      console.log(`Entry: ${entry.path}`);
    }

  }
}
