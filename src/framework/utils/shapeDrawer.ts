import { Global } from "..";

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
  private static ctx: CanvasRenderingContext2D;

  private static setContextProperties(options: ShapeOptions) {
    this.ctx.globalAlpha = options.alpha ?? 1;
    this.ctx.lineWidth = options.lineWidth ?? 1;
    this.ctx.lineCap = options.lineCap ?? "butt";
    this.ctx.lineJoin = options.lineJoin ?? "miter";
    this.ctx.miterLimit = options.miterLimit ?? 10;
    this.ctx.setLineDash(options.lineDash ?? []);
    this.ctx.lineDashOffset = options.lineDashOffset ?? 0;
    if (options.shadow) {
      this.ctx.shadowColor = options.shadow.color ?? "rgba(0, 0, 0, 0.5)";
      this.ctx.shadowBlur = options.shadow.blur ?? 5;
      this.ctx.shadowOffsetX = options.shadow.offsetX ?? 0;
      this.ctx.shadowOffsetY = options.shadow.offsetY ?? 0;
    } else {
      this.ctx.shadowColor = "rgba(0, 0, 0, 0)";
      this.ctx.shadowBlur = 0;
      this.ctx.shadowOffsetX = 0;
      this.ctx.shadowOffsetY = 0;
    }
  }

  private static createGradient(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    stops: GradientStop[]
  ): CanvasGradient {
    const gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
    stops.forEach((stop) => gradient.addColorStop(stop.offset, stop.color));
    return gradient;
  }

  private static fillAndStroke(options: ShapeOptions) {
    if (options.fill) {
      this.ctx.fillStyle =
        typeof options.fill === "string"
          ? options.fill
          : this.createGradient(
              options.fill.x1,
              options.fill.y1,
              options.fill.x2,
              options.fill.y2,
              options.fill.stops
            );
      this.ctx.fill();
    }
    if (options.stroke) {
      this.ctx.strokeStyle =
        typeof options.stroke === "string"
          ? options.stroke
          : this.createGradient(
              options.stroke.x1,
              options.stroke.y1,
              options.stroke.x2,
              options.stroke.y2,
              options.stroke.stops
            );
      this.ctx.stroke();
    }
  }

  static circle(
    x: number,
    y: number,
    radius: number,
    options: ShapeOptions = {}
  ) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.setContextProperties(options);
    this.fillAndStroke(options);
  }

  static rectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    options: ShapeOptions = {}
  ) {
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    this.setContextProperties(options);
    this.fillAndStroke(options);
  }

  static line(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    options: ShapeOptions = {}
  ) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.setContextProperties(options);
    this.ctx.stroke();
  }

  static polygon(points: [number, number][], options: ShapeOptions = {}) {
    this.ctx.beginPath();
    this.ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i][0], points[i][1]);
    }
    this.ctx.closePath();
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
    this.ctx.font = `${options.fontStyle ?? ""} ${options.fontWeight ?? ""} ${
      options.fontSize ?? "12px"
    } ${options.fontFamily ?? "Arial"}`;
    this.ctx.textAlign = options.textAlign ?? "start";
    this.ctx.textBaseline = options.textBaseline ?? "alphabetic";
    if (options.fill) {
      this.ctx.fillText(text, x, y, options.maxWidth);
    }
    if (options.stroke) {
      this.ctx.strokeText(text, x, y, options.maxWidth);
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
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.arcTo(x + width, y, x + width, y + height, radius);
    this.ctx.arcTo(x + width, y + height, x, y + height, radius);
    this.ctx.arcTo(x, y + height, x, y, radius);
    this.ctx.arcTo(x, y, x + width, y, radius);
    this.ctx.closePath();
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
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, radiusX, radiusY, rotation, 0, Math.PI * 2);
    this.setContextProperties(options);
    this.fillAndStroke(options);
  }
}
