export function getCompletImgUrl(url: string): string {
    const basePath = "https://firebasestorage.googleapis.com/v0/b/banana-ecoomerce.appspot.com/o/";
    const archiveType = "?alt=media"

    return `${basePath}${url}${archiveType}`
}