const enum previewTypes {
    IMAGE = 'image',
    PDF = 'pdf'
};

export function getPreviewType(mime: string): string {
    let preview: string = 'undefined';

    if (isImage(mime)) {
        return previewTypes.IMAGE;
    }

    if (isPdf(mime)) {
        return previewTypes.PDF;
    }

    return preview;
}

function isImage(mime: string): boolean {
    return mime.indexOf('image') > -1;
}

function isPdf(mime: string): boolean {
    return mime.indexOf('application/pdf') > -1;
}