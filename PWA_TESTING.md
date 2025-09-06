# PWA Testing Guide

## How to Test PWA Compliance

### 1. Chrome DevTools PWA Audit
1. Open your website in Chrome
2. Press F12 to open DevTools
3. Go to the "Lighthouse" tab
4. Select "Progressive Web App" category
5. Click "Generate report"
6. Look for a score of 90+ for full PWA compliance

### 2. Manual PWA Testing

#### Service Worker Testing
1. Open DevTools → Application → Service Workers
2. Verify service worker is registered and running
3. Check "Offline" checkbox to test offline functionality
4. Refresh the page - should still work offline

#### Manifest Testing
1. Go to DevTools → Application → Manifest
2. Verify all manifest properties are correctly loaded
3. Check that icons are properly displayed

#### Install Prompt Testing
1. Look for the install button in Chrome's address bar
2. Click "Install" to add to home screen
3. Test the installed app functionality

### 3. Mobile Testing
1. Open the website on mobile Chrome/Safari
2. Look for "Add to Home Screen" prompt
3. Install the app and test offline functionality

### 4. Network Testing
1. Open DevTools → Network tab
2. Set throttling to "Offline"
3. Navigate through the site - should work with cached content

## Expected PWA Features

✅ **Service Worker**: Caches static and dynamic content
✅ **Web App Manifest**: Properly configured with icons and metadata
✅ **Offline Support**: Works without internet connection
✅ **Installable**: Can be installed on home screen
✅ **Responsive**: Works on all device sizes
✅ **HTTPS Ready**: Secure connection required for PWA
✅ **Update Notifications**: Users get notified of new versions

## Troubleshooting

### Service Worker Not Registering
- Check browser console for errors
- Ensure serviceworker.js is accessible
- Verify HTTPS is enabled (required for service workers)

### Manifest Issues
- Check icon paths are correct
- Verify manifest.json is valid JSON
- Ensure all referenced icons exist

### Offline Issues
- Check if files are being cached properly
- Verify service worker is active
- Test with different network conditions
