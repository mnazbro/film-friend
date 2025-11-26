/* eslint-disable @typescript-eslint/unbound-method */
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { CapacitorStorageService } from "./storage";

// Mock Capacitor core
vi.mock("@capacitor/core", () => ({
  Capacitor: {
    isNativePlatform: vi.fn(),
  },
}));

// Mock Capacitor filesystem
vi.mock("@capacitor/filesystem", () => ({
  Filesystem: {
    stat: vi.fn(),
    writeFile: vi.fn(),
    readFile: vi.fn(),
  },
  Directory: {
    Data: "DATA",
  },
  Encoding: {
    UTF8: "utf8",
  },
}));

describe("CapacitorStorageService", () => {
  const mockKey = "test-key";
  const mockState = { foo: "bar" };
  const mockJson = JSON.stringify(mockState);
  const storageService = new CapacitorStorageService();

  beforeEach(() => {
    localStorage.clear();
  });

  describe("Native Platform", () => {
    beforeEach(() => {
      (Capacitor.isNativePlatform as Mock).mockReturnValue(true);
    });

    it("saveState should write to file", async () => {
      vi.mocked(Filesystem.stat).mockResolvedValue({} as never);

      await storageService.saveState(mockKey, mockState);

      expect(Filesystem.stat).toHaveBeenCalledWith({
        path: `${mockKey}.json`,
        directory: Directory.Data,
      });
      expect(Filesystem.writeFile).toHaveBeenCalledWith({
        path: `${mockKey}.json`,
        data: mockJson,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
    });

    it("saveState should create file if it does not exist", async () => {
      vi.mocked(Filesystem.stat).mockRejectedValue(new Error("File not found"));

      await storageService.saveState(mockKey, mockState);

      expect(Filesystem.stat).toHaveBeenCalled();
      expect(Filesystem.writeFile).toHaveBeenCalledWith({
        path: `${mockKey}.json`,
        data: "",
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
      expect(Filesystem.writeFile).toHaveBeenCalledWith({
        path: `${mockKey}.json`,
        data: mockJson,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
    });

    it("loadState should read from file and parse JSON", async () => {
      vi.mocked(Filesystem.readFile).mockResolvedValue({ data: mockJson });

      const result = await storageService.loadState(mockKey);

      expect(Filesystem.readFile).toHaveBeenCalledWith({
        path: `${mockKey}.json`,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
      expect(result).toEqual(mockJson);
    });

    it("loadState should return undefined if file read fails", async () => {
      vi.mocked(Filesystem.readFile).mockRejectedValue(new Error("Read error"));
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const result = await storageService.loadState(mockKey);

      expect(result).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  describe("Web Platform", () => {
    beforeEach(() => {
      vi.mocked(Capacitor.isNativePlatform).mockReturnValue(false);
    });

    it("saveState should save to localStorage", async () => {
      await storageService.saveState(mockKey, mockState);

      expect(localStorage.getItem(mockKey)).toBe(mockJson);
      expect(Filesystem.writeFile).not.toHaveBeenCalled();
    });

    it("loadState should load from localStorage", async () => {
      localStorage.setItem(mockKey, mockJson);

      const result = await storageService.loadState(mockKey);

      expect(result).toEqual(mockJson);
      expect(Filesystem.readFile).not.toHaveBeenCalled();
    });

    it("loadState should return undefined if item not in localStorage", async () => {
      const result = await storageService.loadState(mockKey);

      expect(result).toBeUndefined();
    });
  });
});

/* eslint-enable @typescript-eslint/unbound-method */
