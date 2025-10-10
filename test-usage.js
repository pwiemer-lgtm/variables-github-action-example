// Test JavaScript usage
import {
    tokens
} from './dist/tokens.js';

console.log('🎨 Design Tokens Test');
console.log('========================');

// Test token structure
console.log('\n📁 Token Structure:');
console.log('Available categories:', Object.keys(tokens));

// Test specific tokens
console.log('\n🎯 Sample Tokens:');
console.log('Interactive tokens:', tokens.interactive);
console.log('Space tokens:', tokens.space);
console.log('Radius tokens:', tokens.radius);
console.log('Opacity tokens:', tokens.opacity);

// Test specific values
console.log('\n🎨 Specific Values:');
console.log('Primary accent color:', tokens.interactive.primaryAccent);
console.log('Medium space:', tokens.space.global.md);
console.log('Control radius:', tokens.radius.global.control.md);
console.log('Hover opacity:', tokens.opacity.global.hover);

// Test CSS variables
console.log('\n🎨 CSS Variables Test:');
import {
    readFileSync
} from 'fs';
const css = readFileSync('dist/tokens.css', 'utf8');
const cssVars = css.match(/--ds-[^:]+/g);
console.log('Generated CSS variables:', cssVars ? .length || 0);
console.log('Sample CSS variables:', cssVars ? .slice(0, 5));

// Test SCSS variables
console.log('\n🎨 SCSS Variables Test:');
const scss = readFileSync('dist/tokens.scss', 'utf8');
const scssVars = scss.match(/\$ds-[^:]+/g);
console.log('Generated SCSS variables:', scssVars ? .length || 0);
console.log('Sample SCSS variables:', scssVars ? .slice(0, 5));

console.log('\n✅ Test Complete!');