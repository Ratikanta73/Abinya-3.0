# ABINYA 3.0 Website

A premium SaaS-style website for college innovation and project showcase platform.

## Project Management

All project data is stored in `projects.json` for easy management. This allows you to add, edit, or remove projects without modifying the JavaScript code.

### Project Data Structure

Each project in the JSON file has the following structure:

```json
{
    "id": 1,
    "title": "Project Title",
    "description": "Short description for the project card",
    "category": "ai",
    "categoryName": "AI & ML",
    "tags": ["Tag1", "Tag2", "Tag3"],
    "team": "Team Name",
    "thumbnail": "image-url.jpg",
    "about": "Detailed project description (200-300 words)",
    "technologies": ["Tech1", "Tech2", "Tech3"],
    "videoUrl": "https://www.youtube.com/embed/VIDEO_ID",
    "gallery": [
        "image1-url.jpg",
        "image2-url.jpg",
        "image3-url.jpg"
    ],
    "developers": [
        {
            "name": "Developer Name",
            "designation": "Role/Position",
            "photo": "developer-photo-url.jpg"
        }
    ]
}
```

### Field Descriptions

- **id**: Unique number for each project (must be unique)
- **title**: Project name
- **description**: Brief description shown on project cards (keep under 150 characters)
- **category**: Category ID for filtering (ai, web, iot, mobile, blockchain)
- **categoryName**: Display name for the category
- **tags**: 2-4 main technology tags shown on project card
- **team**: Team name
- **thumbnail**: Project thumbnail image URL (600x400px recommended)
- **about**: Full project description for the detail page (200-300 words)
- **technologies**: Complete list of technologies used
- **videoUrl**: YouTube embed URL (format: `https://www.youtube.com/embed/VIDEO_ID`)
- **gallery**: Array of 3 project images (800x600px recommended)
- **developers**: Array of team members with name, designation, and photo (300x300px recommended)

### Available Categories

- `ai` - AI & ML
- `web` - Web Development
- `iot` - IoT & Hardware
- `mobile` - Mobile Apps
- `blockchain` - Blockchain

### Adding a New Project

1. Open `projects.json`
2. Copy an existing project object
3. Update all fields with your new project data
4. Increment the `id` to be unique
5. Save the file

### YouTube Video Setup

To get the correct embed URL:
1. Go to your YouTube video
2. Click "Share" → "Embed"
3. Copy the URL from `src="..."` in the iframe code
4. Use format: `https://www.youtube.com/embed/VIDEO_ID`

### Image Recommendations

- **Thumbnails**: 600x400px (16:10 aspect ratio)
- **Gallery Images**: 800x600px (4:3 aspect ratio)
- **Developer Photos**: 300x300px (square, will be displayed as circular)
- Format: JPG or PNG
- Optimize images for web (compress to under 200KB each)

### Managing 40+ Projects

For large numbers of projects:

1. Keep `projects.json` well-formatted (use a JSON formatter)
2. Use consistent naming conventions
3. Consider organizing by category
4. Validate JSON syntax before deploying (use a JSON validator)
5. Keep backup copies of `projects.json`

### Testing Changes

After editing `projects.json`:

1. Save the file
2. Refresh your browser (Ctrl/Cmd + R)
3. Check if projects load correctly
4. Test filtering by category
5. Click into project details to verify all data displays

### Troubleshooting

**Projects not loading?**
- Check `projects.json` for syntax errors (missing commas, brackets)
- Verify file is in the same directory as `index.html`
- Check browser console (F12) for error messages

**Images not displaying?**
- Verify image URLs are accessible
- Check for HTTPS (not HTTP) if your site uses HTTPS
- Ensure URLs don't have spaces or special characters

**Video not embedding?**
- Use embed URL format, not watch URL
- Verify video is public (not private)
- Check YouTube video ID is correct

## File Structure

```
├── index.html          # Main homepage
├── project.html        # Project detail page
├── style.css           # All styles
├── script.js           # Main JavaScript
├── projects.json       # Project data (EDIT THIS FILE)
└── README.md           # This file
```

## Design System

The website follows a strict premium SaaS design system:
- Colors: #F6F3EE (background), #2CA58D (accent)
- Typography: Inter font family
- Spacing: 8pt grid system
- Border radius: 12px, 20px, 24px, 999px (pills)

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Credits

- Designed & Developed by Ratikanta
- SOA Pramima Project
- ABINYA 3.0 © 2026