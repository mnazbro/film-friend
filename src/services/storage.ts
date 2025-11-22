import { Capacitor } from "@capacitor/core";
import { Directory, Filesystem, Encoding } from "@capacitor/filesystem";

export interface StorageService {
    saveState(key: string, state: any): Promise<void>;
    loadState(key: string): Promise<any>;
}

class CapacitorStorageService implements StorageService {
    private async ensureFileExists(path: string) {
        try {
            await Filesystem.stat({
                path,
                directory: Directory.Data,
            });
        } catch (e) {
            // File does not exist, create it
            await Filesystem.writeFile({
                path,
                data: "",
                directory: Directory.Data,
                encoding: Encoding.UTF8,
            });
        }
    }

    async saveState(key: string, state: any): Promise<void> {
        const fileName = `${key}.json`;
        const data = JSON.stringify(state);

        if (Capacitor.isNativePlatform()) {
            await this.ensureFileExists(fileName);
            await Filesystem.writeFile({
                path: fileName,
                data,
                directory: Directory.Data,
                encoding: Encoding.UTF8,
            });
        } else {
            localStorage.setItem(key, data);
        }
    }

    async loadState(key: string): Promise<any> {
        const fileName = `${key}.json`;

        if (Capacitor.isNativePlatform()) {
            try {
                const result = await Filesystem.readFile({
                    path: fileName,
                    directory: Directory.Data,
                    encoding: Encoding.UTF8,
                });
                if (typeof result.data === "string" && result.data) {
                    return JSON.parse(result.data);
                }
                return undefined;
            } catch (e) {
                console.warn("Failed to load state from file", e);
                return undefined;
            }
        } else {
            const data = localStorage.getItem(key);
            if (data) {
                return JSON.parse(data);
            }
            return undefined;
        }
    }
}

export const storageService = new CapacitorStorageService();
