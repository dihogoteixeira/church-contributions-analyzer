import { extractTextFromImage } from './ocr.js';

// Função principal para extrair texto de um PDF
export async function extractTextFromPDF(file: File): Promise<string[]> {
    // Importando a biblioteca PDF.js
    const pdfjsLib = window['pdfjsLib'] || window['pdfjs-dist/build/pdf'];

    // Carregando o documento PDF
    const pdfDoc = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
    const numPages = pdfDoc.numPages;
    let textContents: string[] = [];

    // Iterando sobre todas as páginas do PDF
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdfDoc.getPage(pageNum);
        const textContent = await page.getTextContent();
        let pageText = textContent.items.map((item: any) => item.str).join(' ');

        // Verificação se o texto foi extraído
        if (pageText.trim() === '') {
            const canvas = document.createElement('canvas');
            const viewport = page.getViewport({ scale: 1 });
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const context = canvas.getContext('2d')!;
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            // Renderização da página no canvas
            await page.render(renderContext).promise;

            // Convertendo o canvas em uma imagem base64
            const imageData = canvas.toDataURL('image/png');

            // Extração de texto via OCR
            pageText = await extractTextFromImage(imageData);
        }

        // Adicionando o texto da página à lista de conteúdos
        textContents.push(pageText);
    }

    // Retorno do conteúdo extraído de todas as páginas
    return textContents;
}
