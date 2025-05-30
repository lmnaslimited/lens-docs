---
title: Web Development - Cloudinary
---


## Cloudinary Basic Transformation
* Combined Image Transformations using Cloudinary
* Helps to apply multiple image adjustments in a single URL for optimized delivery and styling

**Prerequisite :**
Cloudinary account with uploaded images (public ID available)

**Syntax**
https://res.cloudinary.com/<cloud_name>/image/upload<combined-transformations>/<public_id>.<format>

**URL Explanation**:
| URL | Description |
|-------------|-------------|
| `https://res.cloudinary.com/` | Cloudinary's CDN base URL |
| `<cloud_name>` | Your Cloudinary account's cloud name |
| `image` | Resource type (e.g., `image`, `video`, or `raw`) |
| `upload` | Delivery type (e.g., `upload`, `fetch`, `private`, etc.) |
| `<transformation_string>` | One or more chained transformation parameters separated by commas |
| `<public_id>` | The unique ID or path of the image uploaded to your Cloudinary account |
| `<format>` | Output format like `jpg`, `png`, `webp`, `auto`, etc. |


**Parameters & Options**
| Parameter | Type   | Description                                                |
|-----------|--------|------------------------------------------------------------|
| `w`       | param  | Width in pixels                                            |
| `h`       | param  | Height in pixels                                           |
| `c`       | param  | Crop mode: `fill`, `fit`, `scale`, `crop`, `thumb`, `pad` |
| `e`       | param  | Effect: `sepia`, `grayscale`, `blur`, etc.                |
| `r`       | param  | Radius: `r=20`, `r=max` for circle                         |
| `q`       | param  | Quality: `auto`, `80`, `100`                               |
| `f`       | param  | Format: `auto`, `jpg`, `png`, `webp`, etc.                |
| `g`       | param  | Gravity: `face`, `auto`, `north`, `south`                 |
| `l_`      | param  | Overlay: text or image overlay                             |
| `x`, `y`  | param  | Position offset for overlays                               |
| `dpr`     | param  | Device pixel ratio: `auto`, `2.0`, `3.0`                    |
| `a`       | param  | Angle/rotation: `a_90`, `a_auto_right`                     |
| `l_`      | param  | Overlay: `text`, `image` overlays                          |
| `fl_`     | param  | Flags: `progressive`, `lossy`, `preserve_transparency`     |
| `t_`      | param  | Named transformation presets                                |


**Common Patterns or Use Cases**
* `fill` + `rounded corners` + `quality` + `format auto`
https://res.cloudinary.com/demo/image/upload/c_fill,w_400,h_300,r_20,q_auto,f_auto/sample.jpg


* `fit` + `sepia effect` + `overlay logo top-right`
https://res.cloudinary.com/demo/image/upload/c_fit,w_500,h_350,e_sepia,l_logo,g_north_east,x_10,y_10/sample.jpg


* `thumb` + `face detection` + `blur` + `circle avatar`
https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,w_200,h_200,e_blur:200,r_max/sample.jpg


* `crop` + `face focus` + `text overlay bottom`
https://res.cloudinary.com/demo/image/upload/c_crop,g_face,w_400,h_400,l_text:Arial_30:Hello%20User,g_south,y_10/sample.jpg


* `scale` + `grayscale` + `format webp`
https://res.cloudinary.com/demo/image/upload/c_scale,w_600,e_grayscale,f_webp/sample.jpg


* `pad` + `background white` + `radius 30`
https://res.cloudinary.com/demo/image/upload/c_pad,w_400,h_400,b_white,r_30/sample.jpg


* `fill` + `overlay text` + `shadow effect`
https://res.cloudinary.com/demo/image/upload/c_fill,w_500,h_300,e_shadow,l_text:Arial_40:LMNAs%20Labs,g_south,y_20/sample.jpg


* `fill` + `sharpen` + `format auto` + `dpr auto`
https://res.cloudinary.com/demo/image/upload/c_fill,w_600,h_400,e_sharpen,f_auto,dpr_auto/sample.jpg


* `pad` + `background rgb` + `radius max` + `quality 80`
https://res.cloudinary.com/demo/image/upload/c_pad,w_300,h_300,b_rgb:ffffff,r_max,q_80/sample.jpg


* `crop` + `gravity auto` + `vignette` + `rotation`
https://res.cloudinary.com/demo/image/upload/c_crop,g_auto,e_vignette,a_10,w_500,h_400/sample.jpg


* `scale` + `oil_paint` effect + `format webp`
https://res.cloudinary.com/demo/image/upload/c_scale,w_700,e_oil_paint,f_webp/sample.jpg


* `limit` + `blur` + `overlay logo` + `gravity south`
https://res.cloudinary.com/demo/image/upload/c_limit,w_800,e_blur:200,l_logo,g_south,y_20/sample.jpg


* `fill` + `rounded corner` + `text overlay` with shadow
https://res.cloudinary.com/demo/image/upload/c_fill,w_400,h_400,r_30,l_text:Roboto_30:Welcome!,g_north,e_shadow/sample.jpg


* `crop` + `face detection` + `cartoonify` + `png output`
https://res.cloudinary.com/demo/image/upload/c_crop,g_face,w_300,h_300,e_cartoonify,f_png/sample.png


* `scale` + `negate` effect + `angle rotate 90`
https://res.cloudinary.com/demo/image/upload/c_scale,w_500,e_negate,a_90/sample.jpg


* `fit` + `overlay image` + `x/y position` + `dpr`
https://res.cloudinary.com/demo/image/upload/c_fit,w_600,h_600,l_logo,x_10,y_10,dpr_2.0/sample.jpg


* `thumb` + `multiple face detection` + `sharpen`
https://res.cloudinary.com/demo/image/upload/c_thumb,g_faces,w_200,h_200,e_sharpen/sample.jpg


* `mpad` (pad with margin) + `blurred background` + `auto format`
https://res.cloudinary.com/demo/image/upload/c_mpad,w_500,h_500,b_auto:predominant,e_blur:300,f_auto/sample.jpg

**Breakdown**
| Segment | Meaning |
|---------|---------|
| `c_fill` | Crop the image to fill the specified dimensions |
| `w_300` | Set the width to 300px |
| `h_200` | Set the height to 200px |
| `e_grayscale` | Apply a grayscale effect |
| `sample.jpg` | Image public ID is `sample`, output format is JPG |


**Sample Output :**
https://res.cloudinary.com/demo/image/upload/c_crop,g_face,w_300,h_300,e_cartoonify,f_png/sample.png

https://res.cloudinary.com/demo/image/upload/c_fill,w_400,h_300,r_20,q_auto,f_auto/sample.jpg


---
title: Overlay Image with Position
---
**Description:**
* Overlaying another image onto a base image
* Helps add logos, icons, or watermarks at specific coordinates

**Prerequisite :**
Upload both base image and overlay image to Cloudinary

**Syntax**
https://res.cloudinary.com/<cloud_name>/image/upload/l_<overlay_public_id>,g_north_west,x_<x_offset>,y_<y_offset>/<base_public_id>

**Parameters & Options**

| Parameter | Description |
|----------|-------------|
| `l_` | Overlay image layer |
| `g_` | Gravity (position origin) |
| `x_` | Horizontal offset |
| `y_` | Vertical offset |

**Sample Output :**
https://res.cloudinary.com/demo/image/upload/l_logo,g_south_east,x_10,y_20/sample.jpg
**Output Description:**
`sample.jpg` will be displayed with  `logo` overlays at bottom right corner, 10px from right, 20px from bottom.



---
title: Blur Image
---
**Description:**
* Apply a blur effect to the image
* Helps to create focus on foreground content

**Prerequisite :**
Uploaded image with visible background content

**Syntax**
https://res.cloudinary.com/<cloud_name>/image/upload/e_blur:<intensity>/<public_id>

**Parameters & Options**

| Parameter | Description |
|----------|-------------|
| `e_blur` | Blur effect |
| `<intensity>` | Integer from 1–200 to define blur strength |

**Sample Output :**
https://res.cloudinary.com/demo/image/upload/e_blur:200/sample.jpg
**Output Description:**
Applies a strong blur to the image.



---
title: Remove Background
---
**Description:**
* Automatically remove image background
* Useful for isolating subjects

**Prerequisite :**
Cloudinary add-on: Remove Background (requires subscription)

**Syntax**
https://res.cloudinary.com/<cloud_name>/image/upload/e_background_removal/<public_id>

**Parameters & Options**

| Parameter | Description |
|----------|-------------|
| `e_background_removal` | Applies background removal AI |

**Sample Output :**
https://res.cloudinary.com/demo/image/upload/e_background_removal/sample.jpg

**Output Description :**
Image with background removed, leaving subject only.




---
title: Text Overlay
---
**Description:**
* Overlay custom text on an image
* Useful for captions, watermarks, banners

**Prerequisite :**
Use correct encoding for space and special characters (e.g., %20 for space)

**Syntax**
https://res.cloudinary.com/<cloud_name>/image/upload/l_text:<font><size>:<text>,co<color>,g_<gravity>,x_<x>,y_<y>/<public_id>

**Parameters & Options**

| Parameter | Description |
|----------|-------------|
| `l_text:` | Adds text as overlay |
| `<font>_<size>` | Font family and size |
| `<text>` | Encoded text |
| `co_` | Color |
| `g_` | Gravity/position |
| `x_, y_` | Offsets |

**Sample Output :**
https://res.cloudinary.com/demo/image/upload/l_text:arial_30:Hello%20World,co_white,g_south,y_20/sample.jpg

**Output Description :**
"Hello World" in white, positioned 20px above bottom of sample.jpg




---
title: Image Format (Auto)
---
**Description:**
* Serve the best image format for faster loading
* Browser-based automatic format like WebP, AVIF, JPEG

**Prerequisite :**
Image should be publicly accessible

**Syntax**
https://res.cloudinary.com/<cloud_name>/image/upload/f_auto/<public_id>

**Parameters & Options**

| Parameter | Description |
|----------|-------------|
| `f_auto` | Automatically selects best image format for browser |

**Sample Output :**
https://res.cloudinary.com/demo/image/upload/f_auto/sample.jpg

**Output Description :**
Image converted as WebP/AVIF/JPEG based on browser support.




---
title: Fetch External Image with Transformations
---
## title
* Apply transformations to external images
* Avoid uploading to Cloudinary manually

**Prerequisite :**
Ensure the external image URL is publicly accessible and encoded

**Syntax**
https://res.cloudinary.com/<cloud_name>/image/fetch/<transformation>/<encoded_external_image_url>

**Parameters & Options**

| Parameter | Description |
|----------|-------------|
| `image/fetch` | Cloudinary delivery type to fetch external image |
| `<transformation>` | Any valid transformation string (e.g., `w_400,h_300,c_fill`) |
| `<encoded_url>` | URL-encoded link to the external image |

**Sample Output :**
https://res.cloudinary.com/demo/image/fetch/w_400,h_300,c_fill/https%3A%2F%2Fexample.com%2Fimage.jpg

**Output Description :**
Image is fetched from external source and resized to 400x300 using fill mode.




