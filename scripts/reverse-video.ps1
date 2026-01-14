# PowerShell script to reverse the clouds.mp4 video using ffmpeg
# This creates clouds-reversed.mp4 in the public directory

$inputVideo = "public\clouds.mp4"
$outputVideo = "public\clouds-reversed.mp4"

# Check if ffmpeg is available
$ffmpegCheck = Get-Command ffmpeg -ErrorAction SilentlyContinue
if (-not $ffmpegCheck) {
    Write-Host "Error: ffmpeg is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install ffmpeg: https://ffmpeg.org/download.html" -ForegroundColor Yellow
    Write-Host "Or use: winget install ffmpeg" -ForegroundColor Yellow
    exit 1
}

# Check if input video exists
if (-not (Test-Path $inputVideo)) {
    Write-Host "Error: Input video not found: $inputVideo" -ForegroundColor Red
    exit 1
}

Write-Host "Reversing video: $inputVideo" -ForegroundColor Green
Write-Host "Output will be: $outputVideo" -ForegroundColor Green

# Use ffmpeg to reverse the video
# -i: input file
# -vf reverse: reverse video filter
# -af areverse: reverse audio filter (if audio exists)
# -y: overwrite output file if it exists
ffmpeg -i $inputVideo -vf reverse -af areverse -y $outputVideo

if ($LASTEXITCODE -eq 0) {
    Write-Host "Success! Reversed video created: $outputVideo" -ForegroundColor Green
} else {
    Write-Host "Error: ffmpeg failed to reverse the video" -ForegroundColor Red
    exit 1
}
