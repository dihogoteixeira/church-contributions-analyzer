export async function extractTextFromImage(imageData: string): Promise<string> {
    const { data: { text } } = await Tesseract.recognize(imageData, 'por');
    return text;
}
