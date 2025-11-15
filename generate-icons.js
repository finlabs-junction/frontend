/**
 * Quick Icon Generator for PWA
 * This script copies the existing QualitySlop.png to all required icon sizes
 * For production, use proper icon generation tools like PWABuilder
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const sourceIcon = path.join(__dirname, "public", "Finlabs.png");
const publicDir = path.join(__dirname, "public");

console.log("🎨 Generating PWA icons from Finlabs.png...\n");

if (!fs.existsSync(sourceIcon)) {
  console.error("❌ Error: Finlabs.png not found in public folder");
  process.exit(1);
}

let successCount = 0;

sizes.forEach((size) => {
  const iconName = `icon-${size}x${size}.png`;
  const iconPath = path.join(publicDir, iconName);

  try {
    // Copy the source icon to the new size name
    // Note: This doesn't actually resize, just copies
    // For proper resizing, use ImageMagick or an online tool
    fs.copyFileSync(sourceIcon, iconPath);
    console.log(`✅ Created ${iconName}`);
    successCount++;
  } catch (error) {
    console.error(`❌ Failed to create ${iconName}:`, error.message);
  }
});

console.log(
  `\n🎉 Successfully generated ${successCount}/${sizes.length} icons!`
);
console.log("\n⚠️  Note: These are copies of the original image.");
console.log("For production, use proper icon generation:");
console.log("https://www.pwabuilder.com/imageGenerator\n");
