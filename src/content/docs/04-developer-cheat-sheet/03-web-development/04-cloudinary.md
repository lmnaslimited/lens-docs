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





