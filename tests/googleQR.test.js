const googleQR = require('./../externalAPIs/googleQR');

describe('generateQR()', () => {
    beforeEach(() => {
        this.url = "www.google.com";
        this.color = "11111";
        this.height = "300";
        this.width = "300";
    });

   
       
    it('generates the correct url when all arguments are provided', () =>  {
        const expectedQRUrl = `https://chart.googleapis.com/chart?cht=qr&chl='${this.url}'&chs=${this.height}x${this.width}&chco=${this.color}`;
        const qrUrl = googleQR.generateQR(this.url, this.height, this.width, this.color);

        expect(qrUrl).toStrictEqual(expectedQRUrl);
    });

    it('generates the correct url when color parameter is missing', () => {
        const expectedQRUrl = `https://chart.googleapis.com/chart?cht=qr&chl='${this.url}'&chs=${this.height}x${this.width}`;
        const qrUrl = googleQR.generateQR(this.url, this.height, this.width);

        expect(qrUrl).toStrictEqual(expectedQRUrl);
    });

    it('generates the correct url when height and width parameters are missing', () => {
        const expectedQRUrl = `https://chart.googleapis.com/chart?cht=qr&chl='${this.url}'&chs=200x200`;
        const qrUrl = googleQR.generateQR(this.url);

        expect(qrUrl).toStrictEqual(expectedQRUrl);
    });
});