# FormToSlides
Automatically format and position your form responses to newly appended google slides.

I wrote this in Google Forms' Script Editor, which takes you to Google Apps Script. The goal of the project was to send out a form to people from my village in India where they could fill out information that would be presented during our village reunion. This script allows form responses to be automatically uploaded, positioned, and formatted as desired to a newly appended slide of a google slides presentation.

Certain parts of the script are specific to my project. These include:
- Since I only had 7 form elements and they were all different form response types, I didn't implement an iteration technique
- itemResponses[3].getResponse() and itemResponses[4].getResponse() (the 4th and 5th fields in my google form) were not mandatory fields, so I have to check if they exist before adding them to the slide
- itemResponses[6].getResponse() (the 7th field in my google form) is an image, which requires a workaround to get the image appear on the slide and not just the image ID
- Retrieve the "Form ID" and "Slides ID" by looking at the characters between /d/ and /edit in the URL.

With a little bit of creative thinking, you can figure out how to modify this template to successfully meet your specifications. Hope this helps!
