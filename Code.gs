function createSlideFromFormResponse() {
  //get the response data

  var form = FormApp.openById('1HHImHMabUaMrdPL43HPqsjnCNWCGvQH2np_0Ii6YKls');
  var response = form.getResponses().pop();
  var itemResponses = response.getItemResponses();
  Logger.log(itemResponses);

  //obtain slides ID and open slides

  presentationId = "1m5aHsCecw3TBTAuoV3c2JzDVfRi50ttdbIS90LPTK-E";
  var presentation = SlidesApp.openById(presentationId);

  //create a new slide in the Google Slides presentation  

  var slide = presentation.appendSlide();

  //add the form response data to the new slide

  var InMemoryOf = slide.insertTextBox(itemResponses[2].getResponse());

  if(itemResponses[3].getResponse() && itemResponses[4].getResponse()){
    var Combined_Dates = formatDate(itemResponses[3].getResponse()) + " - " + formatDate(itemResponses[4].getResponse());
    var Dates = slide.insertTextBox(Combined_Dates);
    Dates.getText().getTextStyle().setBold(true).setFontSize(16);
    Dates.getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
    Dates.setTop(325).setLeft(175).setWidth(500);
    Dates.alignOnPage(SlidesApp.AlignmentPosition.HORIZONTAL_CENTER);
  }
  else{
    var Dates = slide.insertTextBox("");
  }

  var Message = slide.insertTextBox(itemResponses[5].getResponse());
  Logger.log(itemResponses[6].getResponse())
 
  //Image

  var fileURL = 'https://drive.google.com/file/d/' + itemResponses[6].getResponse() + '/view?pli=1'
  var fileId = fileURL.match(/[-\w]{25,}/);
  var imageFile = DriveApp.getFileById(fileId);
  var image = slide.insertImage(imageFile);  
  
  //resize and reposition image

  var imageWidth = image.getWidth();
  var imageHeight = image.getHeight();
  scaleFactor = .65;
  image.setWidth(imageWidth * scaleFactor);
  image.setHeight(imageHeight * scaleFactor);
  image.setTop(25)
  image.alignOnPage(SlidesApp.AlignmentPosition.HORIZONTAL_CENTER);

  //Apply formatting to text boxes

  InMemoryOf.getText().getTextStyle().setBold(true).setFontSize(24);
  InMemoryOf.getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
  
  Message.getText().getTextStyle().setBold(true).setItalic(true).setFontSize(16);
  Message.getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);

  //Position text boxes on the slide

  InMemoryOf.setTop(290).setLeft(175).setWidth(500);
  InMemoryOf.alignOnPage(SlidesApp.AlignmentPosition.HORIZONTAL_CENTER);
  
  Message.setTop(350).setLeft(175).setWidth(500);
  Message.alignOnPage(SlidesApp.AlignmentPosition.HORIZONTAL_CENTER);
  
  //Format slide background

  slide.getBackground().setSolidFill("#faf0e6");
}
//format dates to be Month-DD-YYYY
function formatDate(dateString) {
  var date = new Date(dateString);
  var formattedDate = Utilities.formatDate(date, Session.getScriptTimeZone(), "MMM dd, yyyy");
  return formattedDate;
}
