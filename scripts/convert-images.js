#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const sharp = require('sharp');
const yaml = require('js-yaml');

const SRC_DIR = path.join(__dirname, '../src');
const PUBLIC_IMAGES_DIR = path.join(__dirname, '../public/images');
const DEVICES_DIR = path.join(SRC_DIR, 'data/devices');

if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
  fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });
}

async function processAllYamls() {
  const yamlFiles = [];
  
  const files = fs.readdirSync(DEVICES_DIR);
  
  for (const file of files) {
    const devicePath = path.join(DEVICES_DIR, file);
    
    if (!fs.statSync(devicePath).isDirectory()) continue;
    
    const yamls = fs.readdirSync(devicePath).filter(f => f.endsWith('.yaml'));
    
    for (const yamlFile of yamls) {
      const yamlPath = path.join(devicePath, yamlFile);
      yamlFiles.push({ yamlPath, deviceName: file });
    }
  }
  
  return yamlFiles;
}

function extractImageUrl(yamlPath) {
  try {
    const content = fs.readFileSync(yamlPath, 'utf-8');
    const data = yaml.load(content);
    
    if (data && data.img && typeof data.img === 'string') {
      return data.img;
    }
  } catch (error) {
    console.warn(`Warning reading ${yamlPath}: ${error.message}`);
  }
  
  return null;
}

async function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const timeout = setTimeout(() => reject(new Error('Timeout')), 30000);
    
    protocol.get(url, { timeout: 30000, headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      clearTimeout(timeout);
      
      if (response.statusCode !== 200) {
        reject(new Error(`Status ${response.statusCode}`));
        return;
      }
      
      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    }).on('error', reject);
  });
}

async function downloadAndConvert(url, deviceName) {
  try {
    console.log(`Downloading image for ${deviceName}...`);
    const buffer = await downloadImage(url);
    
    const filename = `${deviceName}.avif`;
    const outputPath = path.join(PUBLIC_IMAGES_DIR, filename);
    
    console.log(`Converting to AVIF (300x300)...`);
    
    await sharp(buffer)
      .resize(300, 300, {
        fit: 'cover',
        position: 'center'
      })
      .avif({ 
        quality: 80,
        effort: 9
      })
      .toFile(outputPath);
    
    const newSize = fs.statSync(outputPath).size;
    const originalSize = buffer.length;
    const compression = (((originalSize - newSize) / originalSize) * 100).toFixed(2);
    
    const newPath = `/images/${filename}`;
    
    console.log(`OK: ${filename}`);
    console.log(`  ${(originalSize / 1024).toFixed(2)}KB -> ${(newSize / 1024).toFixed(2)}KB (${compression}% smaller)\n`);
    
    return newPath;
  } catch (error) {
    console.error(`Error processing ${deviceName}: ${error.message}\n`);
    return null;
  }
}

function updateYamlImage(yamlPath, newImagePath) {
  try {
    const content = fs.readFileSync(yamlPath, 'utf-8');
    const data = yaml.load(content);
    
    if (data) {
      data.img = newImagePath;
      const updatedContent = yaml.dump(data, { lineWidth: -1 });
      fs.writeFileSync(yamlPath, updatedContent, 'utf-8');
      return true;
    }
  } catch (error) {
    console.error(`Error updating ${yamlPath}: ${error.message}`);
  }
  
  return false;
}

async function main() {
  console.log('Processing device YAMLs...\n');
  
  try {
    const yamlFiles = await processAllYamls();
    
    if (yamlFiles.length === 0) {
      console.log('No YAML files found.\n');
      return;
    }
    
    console.log(`Found ${yamlFiles.length} YAML files\n`);
    console.log('='.repeat(60));
    console.log('\nProcessing images...\n');
    
    let processedImages = 0;
    let updatedYamls = 0;
    
    for (const { yamlPath, deviceName } of yamlFiles) {
      const imageUrl = extractImageUrl(yamlPath);
      
      if (!imageUrl) {
        console.log(`Skip ${deviceName}: no 'img' field\n`);
        continue;
      }
      
      const newPath = await downloadAndConvert(imageUrl, deviceName);
      
      if (newPath && updateYamlImage(yamlPath, newPath)) {
        const relPath = path.relative(DEVICES_DIR, yamlPath);
        console.log(`Updated: ${relPath}`);
        console.log(`  img field: ${imageUrl} -> ${newPath}\n`);
        processedImages++;
        updatedYamls++;
      }
    }
    
    console.log('='.repeat(60));
    console.log('\nCompleted!\n');
    console.log(`  Images processed: ${processedImages}`);
    console.log(`  YAMLs updated: ${updatedYamls}`);
    console.log(`  Images saved in: ${PUBLIC_IMAGES_DIR}\n`);
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();