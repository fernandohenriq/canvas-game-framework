export class AssetLoader {
  static async loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  static async loadAudio(url: string): Promise<HTMLAudioElement> {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.oncanplaythrough = () => resolve(audio);
      audio.onerror = reject;
      audio.src = url;
    });
  }

  static async loadJSON(url: string): Promise<any> {
    return fetch(url).then((response) => response.json());
  }
}
