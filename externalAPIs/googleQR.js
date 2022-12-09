const googleAPIURL = 'https://chart.googleapis.com/chart?cht=qr';

module.exports = {
    generateQR(data, height, width, color){
      
        return `${googleAPIURL}&chl='${data}'${height && width ? "&chs=" + height + "x" + width :"&chs=200x200"}${color?"&chco=" + color :""}`;
    }
}