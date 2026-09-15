$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$assetRoot = Join-Path $projectRoot 'public\research\formula-student'
$manifest = Get-Content -LiteralPath (Join-Path $projectRoot 'app\formula-photos.json') -Raw -Encoding UTF8 | ConvertFrom-Json

foreach ($entry in $manifest.PSObject.Properties) {
    $crop = $entry.Value
    $sourcePath = Join-Path $assetRoot $crop.source
    $outputPath = Join-Path $assetRoot ($entry.Name + '.png')
    $original = [System.Drawing.Bitmap]::FromFile($sourcePath)
    try {
        if ($crop.x -lt 0 -or $crop.y -lt 0 -or ($crop.x + $crop.width) -gt $original.Width -or ($crop.y + $crop.height) -gt $original.Height) {
            throw "Crop outside source image: $($entry.Name)"
        }
        $bounds = [System.Drawing.Rectangle]::new($crop.x, $crop.y, $crop.width, $crop.height)
        $singlePhoto = $original.Clone($bounds, $original.PixelFormat)
        try {
            # Lossless PNG output: extract original pixels without resampling or distortion.
            $singlePhoto.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
        } finally { $singlePhoto.Dispose() }
    } finally { $original.Dispose() }

    $check = [System.Drawing.Bitmap]::FromFile($outputPath)
    try {
        if ($check.Width -ne $crop.width -or $check.Height -ne $crop.height) { throw "Incorrect output size: $($entry.Name)" }
        Write-Output "$($entry.Name).png: $($check.Width) x $($check.Height)"
    } finally { $check.Dispose() }
}
