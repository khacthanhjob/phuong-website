export function driveImageUrl(fileId: string, width = 2000): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${width}`;
}
