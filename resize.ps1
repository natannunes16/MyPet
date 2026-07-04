Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("C:\Users\natan\OneDrive\Documents\PetApp\MyPet\assets\logo-oficial.png")
$bmp = New-Object System.Drawing.Bitmap 1080, 1080
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.Clear([System.Drawing.Color]::White)

# Maintain aspect ratio
$ratioX = 1080 / $img.Width
$ratioY = 1080 / $img.Height
$ratio = if ($ratioX -lt $ratioY) { $ratioX } else { $ratioY }
$newWidth = [int]($img.Width * $ratio)
$newHeight = [int]($img.Height * $ratio)
$posX = [int]((1080 - $newWidth) / 2)
$posY = [int]((1080 - $newHeight) / 2)

$g.DrawImage($img, $posX, $posY, $newWidth, $newHeight)
$g.Dispose()
$bmp.Save("C:\Users\natan\OneDrive\Documents\PetApp\MyPet\assets\logo-oficial-1080.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$img.Dispose()
