function createSlideFromFormResponse() {
  //get the response data
  var form = FormApp.openById('INSERT_FORM_ID_HERE');
  
  //retrieve the latest response
  var response = form.getResponses().pop();
  var itemResponses = response.getItemResponses();
  
  //debugging aid
  Logger.log(itemResponses);

  //obtain slides ID and open slides
  presentationId = "INSERT_SLIDES_ID_HERE";
  var presentation = SlidesApp.openById(presentationId);

  //create a new slide in the Google Slides presentation  
  var slide = presentation.appendSlide();

  //add the form response data (text) to the new slide
  var InMemoryOf = slide.insertTextBox(itemResponses[2].getResponse());
  //format text box
  InMemoryOf.getText().getTextStyle().setBold(true).setFontSize(24);
  InMemoryOf.getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
  //reposition text box
  InMemoryOf.setTop(290).setLeft(175).setWidth(500);
  InMemoryOf.alignOnPage(SlidesApp.AlignmentPosition.HORIZONTAL_CENTER);
  //repeat for other text box form responses
  var Message = slide.insertTextBox(itemResponses[5].getResponse());
  Message.getText().getTextStyle().setBold(true).setItalic(true).setFontSize(16);
  Message.getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
  Message.setTop(350).setLeft(175).setWidth(500);
  Message.alignOnPage(SlidesApp.AlignmentPosition.HORIZONTAL_CENTER);
  
  //if form elements are not required, check if form responses exist
  if(itemResponses[3].getResponse() && itemResponses[4].getResponse()){
    var Combined_Dates = formatDate(itemResponses[3].getResponse()) + " - " + formatDate(itemResponses[4].getResponse());
    var Dates = slide.insertTextBox(Combined_Dates);
    Dates.getText().getTextStyle().setBold(true).setFontSize(16);
    Dates.getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
    Dates.setTop(325).setLeft(175).setWidth(500);
    Dates.alignOnPage(SlidesApp.AlignmentPosition.HORIZONTAL_CENTER);
  }

  //Add form response data (Image) to the new slide
  var fileURL = 'https://drive.google.com/file/d/' + itemResponses[6].getResponse() + '/view?pli=1'
  var fileId = fileURL.match(/[-\w]{25,}/);
  var imageFile = DriveApp.getFileById(fileId);
  var image = slide.insertImage(imageFile);  
  
  //Resize and Reposition image on 
  var imageWidth = image.getWidth();
  var imageHeight = image.getHeight();
  scaleFactor = .65;
  image.setWidth(imageWidth * scaleFactor);
  image.setHeight(imageHeight * scaleFactor);
  image.setTop(25)
  image.alignOnPage(SlidesApp.AlignmentPosition.HORIZONTAL_CENTER);

  //Adjust slide background color
  slide.getBackground().setSolidFill("#faf0e6");
}

//format dates to be Month-DD-YYYY
function formatDate(dateString) {
  var date = new Date(dateString);
  var formattedDate = Utilities.formatDate(date, Session.getScriptTimeZone(), "MMM dd, yyyy");
  return formattedDate;
}
