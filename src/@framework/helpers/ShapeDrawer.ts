import { Game } from "../globals/Game";

interface GradientStop {
  offset: number;
  color: string;
}

interface ShapeOptions {
  fill?: string | GradientOptions;
  stroke?: string | GradientOptions;
  lineWidth?: number;
  lineCap?: CanvasLineCap;
  lineJoin?: CanvasLineJoin;
  miterLimit?: number;
  lineDash?: number[];
  lineDashOffset?: number;
  alpha?: number;
  shadow?: ShadowOptions;
}

interface GradientOptions {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stops: GradientStop[];
}

interface ShadowOptions {
  color?: string;
  blur?: number;
  offsetX?: number;
  offsetY?: number;
}

interface TextOptions {
  fontStyle?: string;
  fontWeight?: string;
  fontSize?: string;
  fontFamily?: string;
  textAlign?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;
  maxWidth?: number;
}

export class ShapeDrawer {
  private static setContextProperties(options: ShapeOptions) {
    Game.ctx.globalAlpha = options.alpha ?? 1;
    Game.ctx.lineWidth = options.lineWidth ?? 1;
    Game.ctx.lineCap = options.lineCap ?? "butt";
    Game.ctx.lineJoin = options.lineJoin ?? "miter";
    Game.ctx.miterLimit = options.miterLimit ?? 10;
    Game.ctx.setLineDash(options.lineDash ?? []);
    Game.ctx.lineDashOffset = options.lineDashOffset ?? 0;
    if (options.shadow) {
      Game.ctx.shadowColor = options.shadow.color ?? "rgba(0, 0, 0, 0.5)";
      Game.ctx.shadowBlur = options.shadow.blur ?? 5;
      Game.ctx.shadowOffsetX = options.shadow.offsetX ?? 0;
      Game.ctx.shadowOffsetY = options.shadow.offsetY ?? 0;
    } else {
      Game.ctx.shadowColor = "rgba(0, 0, 0, 0)";
      Game.ctx.shadowBlur = 0;
      Game.ctx.shadowOffsetX = 0;
      Game.ctx.shadowOffsetY = 0;
    }
  }

  private static createGradient(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    stops: GradientStop[]
  ): CanvasGradient {
    const gradient = Game.ctx.createLinearGradient(x1, y1, x2, y2);
    stops.forEach((stop) => gradient.addColorStop(stop.offset, stop.color));
    return gradient;
  }

  private static fillAndStroke(options: ShapeOptions) {
    if (options.fill) {
      Game.ctx.fillStyle =
        typeof options.fill === "string"
          ? options.fill
          : this.createGradient(
              options.fill.x1,
              options.fill.y1,
              options.fill.x2,
              options.fill.y2,
              options.fill.stops
            );
      Game.ctx.fill();
    }
    if (options.stroke) {
      Game.ctx.strokeStyle =
        typeof options.stroke === "string"
          ? options.stroke
          : this.createGradient(
              options.stroke.x1,
              options.stroke.y1,
              options.stroke.x2,
              options.stroke.y2,
              options.stroke.stops
            );
      Game.ctx.stroke();
    }
  }

  static circle(
    x: number,
    y: number,
    radius: number,
    options: ShapeOptions = {}
  ) {
    Game.ctx.beginPath();
    Game.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.setContextProperties(options);
    this.fillAndStroke(options);
  }

  static text(
    text: string,
    x: number,
    y: number,
    options: TextOptions & ShapeOptions = {}
  ) {
    this.setContextProperties(options);

    Game.ctx.font = `${options.fontStyle ?? ""} ${options.fontWeight ?? ""} ${
      options.fontSize ?? "12px"
    } ${options.fontFamily ?? "Arial"}`;
    Game.ctx.textAlign = options.textAlign ?? "start";
    Game.ctx.textBaseline = options.textBaseline ?? "alphabetic";

    if (options.fill) {
      Game.ctx.fillStyle =
        typeof options.fill === "string"
          ? options.fill
          : this.createGradient(
              options.fill.x1,
              options.fill.y1,
              options.fill.x2,
              options.fill.y2,
              options.fill.stops
            );
      Game.ctx.fillText(text, x, y, options.maxWidth);
    }

    if (options.stroke) {
      Game.ctx.strokeStyle =
        typeof options.stroke === "string"
          ? options.stroke
          : this.createGradient(
              options.stroke.x1,
              options.stroke.y1,
              options.stroke.x2,
              options.stroke.y2,
              options.stroke.stops
            );
      Game.ctx.strokeText(text, x, y, options.maxWidth);
    }
  }

  static roundedRectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    options: ShapeOptions = {}
  ) {
    Game.ctx.beginPath();
    Game.ctx.moveTo(x + radius, y);
    Game.ctx.arcTo(x + width, y, x + width, y + height, radius);
    Game.ctx.arcTo(x + width, y + height, x, y + height, radius);
    Game.ctx.arcTo(x, y + height, x, y, radius);
    Game.ctx.arcTo(x, y, x + width, y, radius);
    Game.ctx.closePath();
    this.setContextProperties(options);
    this.fillAndStroke(options);
  }

  static ellipse(
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    rotation: number,
    options: ShapeOptions = {}
  ) {
    Game.ctx.beginPath();
    Game.ctx.ellipse(x, y, radiusX, radiusY, rotation, 0, Math.PI * 2);
    this.setContextProperties(options);
    this.fillAndStroke(options);
  }
}
