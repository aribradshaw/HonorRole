#!/bin/bash
# Bash script to reverse the clouds.mp4 video using ffmpeg
# This creates clouds-reversed.mp4 in the public directory

INPUT_VIDEO="public/clouds.mp4"
OUTPUT_VIDEO="public/clouds-reversed.mp4"

# Check if ffmpeg is available
if ! command -v ffmpeg &> /dev/null; then
    echo "Error: ffmpeg is not installed or not in PATH"
    echo "Please install ffmpeg: https://ffmpeg.org/download.html"
    exit 1
fi

# Check if input video exists
if [ ! -f "$INPUT_VIDEO" ]; then
    echo "Error: Input video not found: $INPUT_VIDEO"
    exit 1
fi

echo "Reversing video: $INPUT_VIDEO"
echo "Output will be: $OUTPUT_VIDEO"

# Use ffmpeg to reverse the video
# -i: input file
# -vf reverse: reverse video filter
# -af areverse: reverse audio filter (if audio exists)
# -y: overwrite output file if it exists
ffmpeg -i "$INPUT_VIDEO" -vf reverse -af areverse -y "$OUTPUT_VIDEO"

if [ $? -eq 0 ]; then
    echo "Success! Reversed video created: $OUTPUT_VIDEO"
else
    echo "Error: ffmpeg failed to reverse the video"
    exit 1
fi
