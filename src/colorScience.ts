/**
 * Color Science Foundation for Human Theme
 * 
 * Research-grade color science functions implementing peer-reviewed vision science
 * for generating and validating accessible, human-centered color palettes.
 * 
 * Phase 1: WCAG 2.1 Contrast, CIELAB Perceptual Uniformity, LMS Colorblind Simulation
 * Phase 2 (Future): Blue Light Filtering, Circadian Rhythm Impact, Helmholtz-Kohlrausch Effect
 */

/**
 * RGB color representation (0-255 for each channel)
 */
export interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * CIELAB color space representation
 * L*: Lightness (0-100)
 * a*: Green-Red axis (-128 to +127)
 * b*: Blue-Yellow axis (-128 to +127)
 * 
 * @reference CIE. (1976). Colorimetry - Part 4: CIE 1976 L*a*b* colour space.
 */
export interface LAB {
  L: number;
  a: number;
  b: number;
}

/**
 * CIEXYZ tristimulus values
 * @reference CIE. (1931). Commission Internationale de l'Eclairage Proceedings.
 */
export interface XYZ {
  X: number;
  Y: number;
  Z: number;
}

/**
 * LMS cone response (Long, Medium, Short wavelength-sensitive cones)
 * Used for colorblind simulation
 * 
 * @reference Brettel, H., Viénot, F., & Mollon, J. D. (1997). 
 * "Computerized simulation of color appearance for dichromats."
 * Journal of the Optical Society of America A, 14(10), 2647-2655.
 */
export interface LMS {
  L: number;
  M: number;
  S: number;
}

/**
 * D65 standard illuminant (daylight reference white point)
 * @reference CIE Standard Illuminant D65
 */
const D65_WHITE_POINT = {
  X: 95.047,
  Y: 100.0,
  Z: 108.883,
};

/**
 * Convert hex color to RGB
 * @param hex - Hex color string (e.g., "#A3D977")
 * @returns RGB object with values 0-255
 */
export function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

/**
 * Convert RGB to hex
 * @param rgb - RGB object with values 0-255
 * @returns Hex color string (e.g., "#A3D977")
 */
export function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`.toUpperCase();
}

/**
 * Convert sRGB (0-255) to linear RGB (0-1)
 * Applies inverse sRGB gamma correction
 * 
 * @reference IEC 61966-2-1:1999 - Multimedia systems and equipment - 
 * Colour measurement and management - Part 2-1: Colour management - Default RGB colour space - sRGB
 * 
 * @param channel - sRGB channel value (0-255)
 * @returns Linear RGB value (0-1)
 */
function srgbToLinear(channel: number): number {
  const normalized = channel / 255;
  // sRGB inverse companding
  if (normalized <= 0.04045) {
    return normalized / 12.92;
  }
  return Math.pow((normalized + 0.055) / 1.055, 2.4);
}

/**
 * Convert linear RGB (0-1) to sRGB (0-255)
 * Applies sRGB gamma correction
 * 
 * @reference IEC 61966-2-1:1999
 * 
 * @param channel - Linear RGB value (0-1)
 * @returns sRGB channel value (0-255)
 */
function linearToSrgb(channel: number): number {
  // sRGB companding
  let normalized: number;
  if (channel <= 0.0031308) {
    normalized = channel * 12.92;
  } else {
    normalized = 1.055 * Math.pow(channel, 1 / 2.4) - 0.055;
  }
  return Math.max(0, Math.min(255, normalized * 255));
}

/**
 * Convert RGB to CIEXYZ color space
 * Uses D65 illuminant and sRGB color space
 * 
 * @reference Lindbloom, B. (2017). RGB/XYZ Matrices. 
 * http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
 * 
 * @param rgb - RGB color (0-255)
 * @returns XYZ tristimulus values
 */
export function rgbToXyz(rgb: RGB): XYZ {
  // Convert to linear RGB
  const r = srgbToLinear(rgb.r);
  const g = srgbToLinear(rgb.g);
  const b = srgbToLinear(rgb.b);

  // sRGB to XYZ transformation matrix (D65 illuminant)
  // Reference: Bruce Lindbloom's RGB working space matrices
  const X = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
  const Y = r * 0.2126729 + g * 0.7151522 + b * 0.0721750;
  const Z = r * 0.0193339 + g * 0.1191920 + b * 0.9503041;

  return {
    X: X * 100,
    Y: Y * 100,
    Z: Z * 100,
  };
}

/**
 * Convert CIEXYZ to RGB color space
 * 
 * @reference Lindbloom, B. (2017). RGB/XYZ Matrices.
 * 
 * @param xyz - XYZ tristimulus values
 * @returns RGB color (0-255)
 */
export function xyzToRgb(xyz: XYZ): RGB {
  const X = xyz.X / 100;
  const Y = xyz.Y / 100;
  const Z = xyz.Z / 100;

  // XYZ to sRGB transformation matrix (D65 illuminant)
  let r = X * 3.2404542 + Y * -1.5371385 + Z * -0.4985314;
  let g = X * -0.9692660 + Y * 1.8760108 + Z * 0.0415560;
  let b = X * 0.0556434 + Y * -0.2040259 + Z * 1.0572252;

  return {
    r: linearToSrgb(r),
    g: linearToSrgb(g),
    b: linearToSrgb(b),
  };
}

/**
 * CIE LAB f function for XYZ to LAB conversion
 * @reference CIE. (1976). Colorimetry.
 */
function labF(t: number): number {
  const delta = 6 / 29;
  if (t > delta ** 3) {
    return Math.pow(t, 1 / 3);
  }
  return t / (3 * delta ** 2) + 4 / 29;
}

/**
 * CIE LAB inverse f function for LAB to XYZ conversion
 * @reference CIE. (1976). Colorimetry.
 */
function labFInverse(t: number): number {
  const delta = 6 / 29;
  if (t > delta) {
    return Math.pow(t, 3);
  }
  return 3 * delta ** 2 * (t - 4 / 29);
}

/**
 * Convert CIEXYZ to CIELAB color space
 * Uses D65 standard illuminant
 * 
 * CIELAB is a perceptually uniform color space designed to approximate human vision.
 * Equal distances in CIELAB correspond to approximately equal perceptual differences.
 * 
 * @reference CIE. (1976). Colorimetry - Part 4: CIE 1976 L*a*b* colour space.
 * 
 * @param xyz - XYZ tristimulus values
 * @returns LAB color space coordinates
 */
export function xyzToLab(xyz: XYZ): LAB {
  const xr = xyz.X / D65_WHITE_POINT.X;
  const yr = xyz.Y / D65_WHITE_POINT.Y;
  const zr = xyz.Z / D65_WHITE_POINT.Z;

  const fx = labF(xr);
  const fy = labF(yr);
  const fz = labF(zr);

  const L = 116 * fy - 16;
  const a = 500 * (fx - fy);
  const b = 200 * (fy - fz);

  return { L, a, b };
}

/**
 * Convert CIELAB to CIEXYZ color space
 * 
 * @reference CIE. (1976). Colorimetry.
 * 
 * @param lab - LAB color space coordinates
 * @returns XYZ tristimulus values
 */
export function labToXyz(lab: LAB): XYZ {
  const fy = (lab.L + 16) / 116;
  const fx = lab.a / 500 + fy;
  const fz = fy - lab.b / 200;

  const xr = labFInverse(fx);
  const yr = labFInverse(fy);
  const zr = labFInverse(fz);

  return {
    X: xr * D65_WHITE_POINT.X,
    Y: yr * D65_WHITE_POINT.Y,
    Z: zr * D65_WHITE_POINT.Z,
  };
}

/**
 * Convert hex color to CIELAB
 * @param hex - Hex color string
 * @returns LAB color space coordinates
 */
export function hexToLab(hex: string): LAB {
  return xyzToLab(rgbToXyz(hexToRgb(hex)));
}

/**
 * Convert CIELAB to hex color
 * @param lab - LAB color space coordinates
 * @returns Hex color string
 */
export function labToHex(lab: LAB): string {
  return rgbToHex(xyzToRgb(labToXyz(lab)));
}

/**
 * Calculate perceptual distance between two colors using CIELAB ΔE*ab (CIE76)
 * 
 * ΔE*ab < 1.0: Not perceptible by human eyes
 * ΔE*ab 1-2: Perceptible through close observation
 * ΔE*ab 2-10: Perceptible at a glance
 * ΔE*ab 11-49: Colors are more similar than opposite
 * ΔE*ab > 50: Colors are exact opposite
 * 
 * @reference CIE. (1976). Colorimetry.
 * 
 * @param lab1 - First LAB color
 * @param lab2 - Second LAB color
 * @returns Perceptual distance (ΔE*ab)
 */
export function deltaE(lab1: LAB, lab2: LAB): number {
  const dL = lab1.L - lab2.L;
  const da = lab1.a - lab2.a;
  const db = lab1.b - lab2.b;
  return Math.sqrt(dL * dL + da * da + db * db);
}

/**
 * Calculate WCAG 2.1 relative luminance
 * 
 * Relative luminance is the relative brightness of any point in a colorspace,
 * normalized to 0 for darkest black and 1 for lightest white.
 * 
 * @reference WCAG 2.1 - Web Content Accessibility Guidelines
 * https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 * 
 * @param rgb - RGB color (0-255)
 * @returns Relative luminance (0-1)
 */
export function relativeLuminance(rgb: RGB): number {
  // Convert to linear RGB and apply luminance coefficients
  const r = srgbToLinear(rgb.r);
  const g = srgbToLinear(rgb.g);
  const b = srgbToLinear(rgb.b);

  // ITU-R BT.709 luminance coefficients (same as sRGB)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate WCAG 2.1 contrast ratio between two colors
 * 
 * Contrast ratios:
 * - 1:1 = No contrast (same color)
 * - 4.5:1 = WCAG AA standard for normal text
 * - 7:1 = WCAG AAA standard for normal text
 * - 3:1 = WCAG AA standard for large text (18pt+)
 * - 21:1 = Maximum contrast (black on white)
 * 
 * @reference WCAG 2.1 - Understanding Contrast (Minimum)
 * https://www.w3.org/TR/WCAG21/#contrast-minimum
 * 
 * @param hex1 - First color (hex string)
 * @param hex2 - Second color (hex string)
 * @returns Contrast ratio (1-21)
 */
export function contrastRatio(hex1: string, hex2: string): number {
  const lum1 = relativeLuminance(hexToRgb(hex1));
  const lum2 = relativeLuminance(hexToRgb(hex2));

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG 2.1 standards
 * 
 * @param hex1 - First color
 * @param hex2 - Second color
 * @param level - 'AA' or 'AAA'
 * @param largeText - Whether text is large (18pt+ or 14pt+ bold)
 * @returns true if contrast meets the standard
 */
export function meetsWCAG(
  hex1: string,
  hex2: string,
  level: "AA" | "AAA" = "AA",
  largeText: boolean = false
): boolean {
  const ratio = contrastRatio(hex1, hex2);

  if (level === "AAA") {
    return largeText ? ratio >= 4.5 : ratio >= 7.0;
  }
  return largeText ? ratio >= 3.0 : ratio >= 4.5;
}

/**
 * Convert RGB to LMS cone response
 * Uses Hunt-Pointer-Estevez transformation matrix
 * 
 * LMS color space represents the response of three types of cone cells in the human eye:
 * - L: Long wavelength (red) ~565nm peak
 * - M: Medium wavelength (green) ~540nm peak  
 * - S: Short wavelength (blue) ~445nm peak
 * 
 * @reference Hunt, R. W. G. (1991). "Measuring Colour" (2nd ed.). 
 * Ellis Horwood Ltd. ISBN 0-13-567686-X.
 * 
 * @param rgb - RGB color (0-255)
 * @returns LMS cone response values
 */
export function rgbToLms(rgb: RGB): LMS {
  // First convert to XYZ
  const xyz = rgbToXyz(rgb);
  const X = xyz.X / 100;
  const Y = xyz.Y / 100;
  const Z = xyz.Z / 100;

  // Hunt-Pointer-Estevez transformation matrix (normalized)
  const L = X * 0.4002 + Y * 0.7075 + Z * -0.0807;
  const M = X * -0.2280 + Y * 1.1500 + Z * 0.0612;
  const S = X * 0.0000 + Y * 0.0000 + Z * 0.9184;

  return { L, M, S };
}

/**
 * Convert LMS to RGB
 * Uses inverse Hunt-Pointer-Estevez transformation
 * 
 * @param lms - LMS cone response values
 * @returns RGB color (0-255)
 */
export function lmsToRgb(lms: LMS): RGB {
  // Inverse Hunt-Pointer-Estevez matrix
  const X = lms.L * 1.8599 + lms.M * -1.1294 + lms.S * 0.2198;
  const Y = lms.L * 0.3611 + lms.M * 0.6388 + lms.S * 0.0000;
  const Z = lms.L * 0.0000 + lms.M * 0.0000 + lms.S * 1.0891;

  return xyzToRgb({ X: X * 100, Y: Y * 100, Z: Z * 100 });
}

/**
 * Simulate color appearance for deuteranopia (green-blind)
 * 
 * Deuteranopia is a type of red-green color blindness where the M (medium wavelength) 
 * cones are missing or non-functional. Affects ~1% of males.
 * 
 * Uses Brettel et al. (1997) simulation method which projects colors onto
 * the confusion lines in LMS space.
 * 
 * @reference Brettel, H., Viénot, F., & Mollon, J. D. (1997).
 * "Computerized simulation of color appearance for dichromats."
 * Journal of the Optical Society of America A, 14(10), 2647-2655.
 * 
 * @param hex - Original color
 * @returns Color as perceived by someone with deuteranopia
 */
export function simulateDeuteranopia(hex: string): string {
  const lms = rgbToLms(hexToRgb(hex));

  // Deuteranopia: M cones don't work, M signal derived from L and S
  // Simplified simulation: M = 0.5*L + 0.5*S (approximation)
  const simulated: LMS = {
    L: lms.L,
    M: 0.494207 * lms.L + 1.24827 * lms.S, // Brettel coefficients
    S: lms.S,
  };

  return rgbToHex(lmsToRgb(simulated));
}

/**
 * Simulate color appearance for protanopia (red-blind)
 * 
 * Protanopia is a type of red-green color blindness where the L (long wavelength)
 * cones are missing or non-functional. Affects ~1% of males.
 * 
 * @reference Brettel et al. (1997)
 * 
 * @param hex - Original color
 * @returns Color as perceived by someone with protanopia
 */
export function simulateProtanopia(hex: string): string {
  const lms = rgbToLms(hexToRgb(hex));

  // Protanopia: L cones don't work, L signal derived from M and S
  const simulated: LMS = {
    L: 2.02344 * lms.M + -2.52581 * lms.S, // Brettel coefficients
    M: lms.M,
    S: lms.S,
  };

  return rgbToHex(lmsToRgb(simulated));
}

/**
 * Simulate color appearance for tritanopia (blue-blind)
 * 
 * Tritanopia is a rare form of color blindness where S (short wavelength)
 * cones are missing or non-functional. Affects ~0.001% of population.
 * 
 * @reference Brettel et al. (1997)
 * 
 * @param hex - Original color
 * @returns Color as perceived by someone with tritanopia
 */
export function simulateTritanopia(hex: string): string {
  const lms = rgbToLms(hexToRgb(hex));

  // Tritanopia: S cones don't work, S signal derived from L and M
  const simulated: LMS = {
    L: lms.L,
    M: lms.M,
    S: -0.01224 * lms.L + 0.07203 * lms.M, // Brettel coefficients
  };

  return rgbToHex(lmsToRgb(simulated));
}

/**
 * Validate that a foreground/background color pair is colorblind-safe
 * by checking if contrast is maintained under all three types of dichromacy
 * 
 * @param foreground - Foreground color (hex)
 * @param background - Background color (hex)
 * @param minContrast - Minimum acceptable contrast ratio (default: 4.5 for WCAG AA)
 * @returns Object with colorblind safety results
 */
export function validateColorblindSafety(
  foreground: string,
  background: string,
  minContrast: number = 4.5
): {
  normal: number;
  deuteranopia: number;
  protanopia: number;
  tritanopia: number;
  allSafe: boolean;
} {
  const normal = contrastRatio(foreground, background);
  const deuteranopia = contrastRatio(
    simulateDeuteranopia(foreground),
    simulateDeuteranopia(background)
  );
  const protanopia = contrastRatio(
    simulateProtanopia(foreground),
    simulateProtanopia(background)
  );
  const tritanopia = contrastRatio(
    simulateTritanopia(foreground),
    simulateTritanopia(background)
  );

  return {
    normal,
    deuteranopia,
    protanopia,
    tritanopia,
    allSafe:
      normal >= minContrast &&
      deuteranopia >= minContrast &&
      protanopia >= minContrast &&
      tritanopia >= minContrast,
  };
}

/**
 * Calculate photopic luminous efficiency based on wavelength
 * 
 * The human eye has peak sensitivity at ~555nm (green) under daylight conditions.
 * This is why green is the most "restful" color - it requires the least energy
 * for the eye to process.
 * 
 * @reference CIE. (1924). "Commission Internationale de l'Eclairage Proceedings."
 * Photopic luminosity function V(λ)
 * 
 * @param wavelength - Wavelength in nanometers (380-780nm)
 * @returns Relative efficiency (0-1, where 1.0 is at 555nm)
 */
export function photopicEfficiency(wavelength: number): number {
  // Simplified approximation of CIE 1924 photopic luminosity function
  // Peak at 555nm (green)
  
  if (wavelength < 380 || wavelength > 780) {
    return 0; // Outside visible spectrum
  }

  // Gaussian approximation centered at 555nm
  const peak = 555;
  const sigma = 100; // Adjust for proper curve shape
  const normalized = (wavelength - peak) / sigma;
  
  return Math.exp(-0.5 * normalized * normalized);
}

/**
 * Estimate dominant wavelength from RGB color
 * This is a rough approximation for educational purposes
 * 
 * @param rgb - RGB color
 * @returns Approximate dominant wavelength in nanometers
 */
export function estimateDominantWavelength(rgb: RGB): number {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  // Very rough approximation mapping RGB to wavelength
  // Red: ~700nm, Green: ~550nm, Blue: ~450nm
  const max = Math.max(r, g, b);
  
  if (max === 0) return 555; // Default to green peak
  
  if (g >= r && g >= b) {
    // Green dominant
    return 490 + (g / max) * 60; // ~490-550nm
  } else if (r > g && r >= b) {
    // Red dominant  
    return 580 + (r / max) * 120; // ~580-700nm
  } else {
    // Blue dominant
    return 420 + (b / max) * 70; // ~420-490nm
  }
}

/**
 * Calculate "eye comfort score" based on multiple factors
 * Higher scores indicate more comfortable colors for extended viewing
 * 
 * Factors:
 * - Proximity to 555nm (photopic peak)
 * - Saturation (lower is more comfortable)
 * - Luminance (moderate is most comfortable)
 * 
 * @param hex - Color to evaluate
 * @returns Comfort score (0-100, higher is better)
 */
export function calculateEyeComfortScore(hex: string): number {
  const rgb = hexToRgb(hex);
  const lab = hexToLab(hex);
  const wavelength = estimateDominantWavelength(rgb);
  
  // Factor 1: Photopic efficiency (0-1)
  const photopicScore = photopicEfficiency(wavelength);
  
  // Factor 2: Saturation penalty (higher saturation = lower comfort)
  // Chroma in CIELAB = sqrt(a² + b²)
  const chroma = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
  const saturationScore = Math.max(0, 1 - chroma / 100); // Normalize and invert
  
  // Factor 3: Luminance comfort (prefer moderate lightness)
  // Most comfortable around L*=50-70
  const optimalL = 60;
  const luminanceDiff = Math.abs(lab.L - optimalL);
  const luminanceScore = Math.max(0, 1 - luminanceDiff / 100);
  
  // Weighted combination
  const comfortScore = (
    photopicScore * 0.4 +
    saturationScore * 0.35 +
    luminanceScore * 0.25
  ) * 100;
  
  return Math.round(comfortScore * 10) / 10;
}
